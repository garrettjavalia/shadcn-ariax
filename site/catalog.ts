import assert from "node:assert/strict";
import { stat, readFile, readdir } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { bundleExample } from "./bundle-example";
import { exampleStylesheet } from "./example-css";
import { types as t, transformFromAstSync } from "@babel/core";
import { parse } from "@babel/parser";
import { format } from "prettier";
import {
  fixtureMappings,
  type OriginalStoriesManifest,
} from "../scripts/upstream/original-stories";
import { previewOverrides } from "./preview-overrides";

export type CatalogSource = {
  kind: "ariax" | "story";
  stylesheet?: string;
  requirements?: import("./example-requirements").ExampleRequirements;
  label: string;
  code: string;
  url: string;
};
export type CatalogPreview = {
  kind: "preview";
  name: string;
  storyId: string | null;
  note: string | null;
  source: CatalogSource | null;
  upstreamUrl: string;
  hideCode: boolean;
  description: string | null;
  line: number;
};
export type CatalogBlock =
  { kind: "markdown"; markdown: string } | CatalogPreview;
export type CatalogPage = {
  slug: string;
  title: string;
  description: string;
  upstreamUrl: string;
  installCommand: string | null;
  installTargets: string[];
  blocks: CatalogBlock[];
};
export type Catalog = {
  upstreamCommit: string;
  pages: CatalogPage[];
};

type Counterpart = (typeof previewOverrides)[string];
type StoryModule = ReturnType<typeof parse>["program"];
const docsRoot =
  "generated/upstream/shadcn/apps/v4/content/docs/components/aria";
const compositionTargets: Record<string, string[]> = {
  "data-table": ["table"],
  "date-picker": ["popover", "calendar"],
};

function property(
  object: t.Node | null | undefined,
  key: string,
): t.Expression | undefined {
  if (t.isTSSatisfiesExpression(object) || t.isTSAsExpression(object))
    return property(object.expression, key);
  if (!t.isObjectExpression(object)) return;
  for (const part of object.properties) {
    if (
      t.isObjectProperty(part) &&
      t.isIdentifier(part.key, { name: key }) &&
      t.isExpression(part.value)
    )
      return part.value;
  }
}

function variable(program: StoryModule, name: string) {
  for (const statement of program.body) {
    const declaration = t.isExportNamedDeclaration(statement)
      ? statement.declaration
      : statement;
    if (t.isVariableDeclaration(declaration)) {
      const match = declaration.declarations.find((d) =>
        t.isIdentifier(d.id, { name }),
      );
      if (match) return match.init;
    }
  }
}

function componentName(element: t.Node | undefined) {
  if (
    !t.isJSXElement(element) ||
    element.children.length ||
    element.openingElement.attributes.length
  )
    return;
  if (t.isJSXIdentifier(element.openingElement.name))
    return element.openingElement.name.name;
}

function fixtureImport(program: StoryModule, name: string | undefined) {
  if (!name) return;
  for (const item of program.body) {
    if (!t.isImportDeclaration(item) || !item.source.value.startsWith("."))
      continue;
    const match = item.specifiers.find((spec) => spec.local.name === name);
    if (t.isImportDefaultSpecifier(match))
      return { path: item.source.value, exported: "default" };
    if (t.isImportSpecifier(match) && t.isIdentifier(match.imported))
      return { path: item.source.value, exported: match.imported.name };
  }
}

// Select only the declarations and imports needed by this example. Storybook
// metadata, unrelated examples, and test decorators don't belong in a code tab.
function selectedModule(
  program: StoryModule,
  example: t.ExportDefaultDeclaration,
  installed: Set<string>,
) {
  const names = new Set<string>();
  function collect(node: t.Node) {
    t.traverseFast(node, (child) => {
      if (t.isIdentifier(child) || t.isJSXIdentifier(child))
        names.add(child.name);
    });
  }
  collect(example);
  const selected = new Set<t.Declaration>();
  const declarations = program.body.flatMap((item) => {
    const node = t.isExportNamedDeclaration(item) ? item.declaration : item;
    return t.isDeclaration(node) &&
      !t.isImportDeclaration(node) &&
      !t.isExportDeclaration(node)
      ? [node]
      : [];
  });
  let previous: number;
  do {
    previous = names.size;
    for (const declaration of declarations) {
      if (selected.has(declaration)) continue;
      if (
        (t.isTSModuleDeclaration(declaration) && declaration.global) ||
        Object.keys(t.getOuterBindingIdentifiers(declaration)).some((name) =>
          names.has(name),
        ) ||
        ((t.isTSInterfaceDeclaration(declaration) ||
          t.isTSTypeAliasDeclaration(declaration)) &&
          names.has(declaration.id.name))
      ) {
        selected.add(declaration);
        collect(declaration);
      }
    }
  } while (names.size !== previous);
  const body: t.Statement[] = [];
  for (const item of program.body) {
    if (t.isImportDeclaration(item)) {
      const used = item.specifiers.filter((spec) => names.has(spec.local.name));
      if (!used.length && item.specifiers.length) continue;
      const copy = t.cloneNode(item);
      copy.specifiers = used;
      const slug = copy.source.value.startsWith("@")
        ? copy.source.value.slice(1)
        : "";
      if (installed.has(slug))
        copy.source = t.stringLiteral("@/components/ui/" + slug);
      body.push(copy);
    } else {
      const node = t.isExportNamedDeclaration(item) ? item.declaration : item;
      if (t.isDeclaration(node) && selected.has(node)) body.push(node);
    }
  }
  body.push(example);
  const ast = t.file(t.program(body, program.directives));
  const output = transformFromAstSync(ast, undefined, {
    babelrc: false,
    configFile: false,
    comments: false,
  });
  assert.ok(output?.code);
  return format(output.code, { parser: "typescript" });
}

function fixtureExport(program: StoryModule, name: string) {
  if (name === "default") {
    const entry = program.body.find((item) =>
      t.isExportDefaultDeclaration(item),
    );
    assert.ok(
      t.isExportDefaultDeclaration(entry),
      "Missing default example export",
    );
    return entry;
  }
  return t.exportDefaultDeclaration(t.identifier(name));
}

function renderExample(module: StoryModule, exportName: string) {
  const story = variable(module, exportName);
  assert.ok(story, "Missing story export " + exportName);
  const render = property(story, "render");
  if (t.isArrowFunctionExpression(render)) return render;
  // Args-only CSF entries use the component on the story's meta object.
  const entry = module.body.find((item) => t.isExportDefaultDeclaration(item));
  const meta =
    t.isExportDefaultDeclaration(entry) && t.isIdentifier(entry.declaration)
      ? variable(module, entry.declaration.name)
      : undefined;
  const component = property(meta, "component");
  assert.ok(t.isIdentifier(component), "Missing component for " + exportName);
  const name = t.jsxIdentifier(component.name);
  const args = [property(meta, "args"), property(story, "args")].filter(
    (value): value is t.Expression => !!value,
  );
  return t.arrowFunctionExpression(
    [],
    t.jsxElement(
      t.jsxOpeningElement(
        name,
        args.map((value) => t.jsxSpreadAttribute(value)),
        true,
      ),
      null,
      [],
      true,
    ),
  );
}

function frontmatter(text: string, key: string) {
  const match = new RegExp("^" + key + ":[ \\t]*(.*)$", "m").exec(text);
  return match?.[1].trim().replace(/^(['"])(.*)\1$/, "$2") ?? "";
}

async function resolveModuleFile(path: string) {
  for (const option of [
    path,
    path + ".ts",
    path + ".tsx",
    resolve(path, "index.ts"),
    resolve(path, "index.tsx"),
  ]) {
    if ((await stat(option).catch(() => null))?.isFile()) return option;
  }
  throw new Error("Missing example dependency: " + path);
}

// Resolve installed components to their public aliases and link private fixture
// modules into the displayed standalone example.
function portableSources(repo: string, installed: Set<string>) {
  const cache = new Map<
    string,
    Promise<{ contents: string; children: string[] }>
  >();
  const reExports = new Map<string, Promise<Map<string, string>>>();
  function publicExports(file: string) {
    if (!reExports.has(file))
      reExports.set(
        file,
        readFile(file, "utf8").then((source) => {
          const exports = new Map<string, string>();
          const { program } = parse(source, {
            sourceType: "module",
            plugins: ["typescript", "jsx"],
          });
          for (const statement of program.body) {
            if (
              !t.isExportNamedDeclaration(statement) ||
              !statement.source?.value.startsWith(".")
            )
              continue;
            const target = relative(
              resolve(repo, "src/ariax/ui"),
              resolve(dirname(file), statement.source.value),
            );
            if (target.startsWith(".." + sep)) continue;
            for (const binding of statement.specifiers) {
              if (
                t.isExportSpecifier(binding) &&
                t.isIdentifier(binding.exported, { name: binding.local.name })
              )
                exports.set(
                  binding.local.name,
                  "@/components/ui/" + target.replace(/\.tsx?$/, ""),
                );
            }
          }
          return exports;
        }),
      );
    return reExports.get(file)!;
  }
  const helperPath = (file: string) => {
    const local = relative(repo, file).split(sep).join("/");
    assert.ok(
      !local.startsWith("../"),
      "Example dependency outside repository",
    );
    return (
      "helpers/" +
      local
        .replace(/^stories\//, "")
        .replace(/^generated\/upstream\/shadcn\/apps\/v4\//, "shared/")
    );
  };
  async function rewrite(code: string, file: string, target: string) {
    if (file.endsWith(".css")) return { contents: code, children: [] };
    const { program } = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    const changes: { start: number; end: number; value: string }[] = [];
    const children: string[] = [];
    for (const statement of program.body) {
      if (
        !t.isImportDeclaration(statement) &&
        !t.isExportAllDeclaration(statement) &&
        !t.isExportNamedDeclaration(statement)
      )
        continue;
      const literal = statement.source;
      if (!literal) continue;
      const spec = literal.value;
      if (spec === "./portal" && file.includes("/stories/sidebar-examples/")) {
        changes.push({
          start: literal.start!,
          end: literal.end!,
          value: JSON.stringify("@/components/ui/sidebar"),
        });
        continue;
      }
      const slug = spec.replace(/^@/, "");
      let value: string;
      if (spec.startsWith("@") && installed.has(slug))
        value = "@/components/ui/" + slug;
      else {
        const isHelper =
          /^@[a-z][a-z-]*customizations$/.test(spec) ||
          spec === "@customizations";
        if (!isHelper && !spec.startsWith(".")) continue;
        const path = await resolveModuleFile(
          isHelper
            ? resolve(repo, "stories", slug)
            : resolve(dirname(file), spec),
        );
        if (
          isHelper &&
          t.isImportDeclaration(statement) &&
          statement.specifiers.length
        ) {
          const exports = await publicExports(path);
          const paths = new Set(
            statement.specifiers.map((binding) =>
              t.isImportSpecifier(binding) && t.isIdentifier(binding.imported)
                ? exports.get(binding.imported.name)
                : undefined,
            ),
          );
          const [direct] = paths;
          if (direct && paths.size === 1) {
            changes.push({
              start: literal.start!,
              end: literal.end!,
              value: JSON.stringify(direct),
            });
            continue;
          }
        }
        const rel = relative(resolve(repo, "src/ariax/ui"), path);
        if (!rel.startsWith(".." + sep) && rel !== "..")
          value = "@/components/ui/" + rel.replace(/\.tsx?$/, "");
        else {
          const dest = helperPath(path);
          value = relative(dirname(target), dest)
            .split(sep)
            .join("/")
            .replace(/\.tsx?$/, "");
          if (!value.startsWith(".")) value = "./" + value;
          children.push(path);
        }
      }
      changes.push({
        start: literal.start!,
        end: literal.end!,
        value: JSON.stringify(value),
      });
    }
    for (const change of changes.reverse())
      code =
        code.slice(0, change.start) + change.value + code.slice(change.end);
    return { contents: code, children };
  }
  return async (code: string, file: string, label: string) => {
    const entry = await rewrite(code, file, label);
    const files = [{ path: label, contents: entry.contents }];
    const seen = new Set<string>();
    const queue = [...entry.children];
    while (queue.length) {
      const path = queue.pop()!;
      if (seen.has(path)) continue;
      seen.add(path);
      const target = helperPath(path);
      if (!cache.has(path))
        cache.set(
          path,
          readFile(path, "utf8").then((source) =>
            rewrite(source, path, target),
          ),
        );
      const helper = await cache.get(path)!;
      files.push({ path: target, contents: helper.contents });
      queue.push(...helper.children);
    }
    const sheets = files.filter((f) => f.path.endsWith(".css"));
    const modules = files.filter((f) => !f.path.endsWith(".css"));
    const portable = await bundleExample(modules);
    const stylesheet = await exampleStylesheet(portable, sheets);
    // Each displayed file can be imported directly by a Next.js server page.
    const body = portable.replace(/^"use client";\s*/, "");
    const cssImport = stylesheet ? 'import "./example.css";\n' : "";
    return { code: '"use client";\n\n' + cssImport + body, stylesheet };
  };
}

export async function loadCatalog(repo = process.cwd()): Promise<Catalog> {
  const json = async <T>(path: string): Promise<T> =>
    JSON.parse(await readFile(resolve(repo, path), "utf8"));
  const [manifest, nav, registry, upstream, files, exampleFiles] =
    await Promise.all([
      json<OriginalStoriesManifest>(
        "generated/original-stories/public/manifest.json",
      ),
      json<{ pages: string[] }>(docsRoot + "/meta.json"),
      json<{ items: { name: string }[] }>("registry.json"),
      json<{ commit: string }>("upstream/source.json"),
      readdir(resolve(repo, docsRoot)),
      readdir(resolve(repo, "generated/upstream/shadcn/apps/v4/examples/aria")),
    ]);
  assert.equal(manifest.version, 1);
  const installed = new Set(registry.items.map((item) => item.name));
  const portable = portableSources(repo, installed);
  const modules = new Map<string, Promise<StoryModule>>();
  function getModule(path: string) {
    if (!modules.has(path)) {
      modules.set(
        path,
        readFile(path, "utf8").then(
          (code) =>
            parse(code, {
              sourceType: "module",
              plugins: ["jsx", "typescript"],
            }).program,
        ),
      );
    }
    return modules.get(path)!;
  }
  async function exampleSource(
    counterpart: Counterpart,
  ): Promise<CatalogSource> {
    let file = resolve(repo, counterpart.metaSource);
    const story = await getModule(file);
    const render = renderExample(story, counterpart.exportName);
    const fixture = fixtureImport(story, componentName(render.body));
    let module = story;
    let example: t.ExportDefaultDeclaration;
    if (fixture) {
      file = resolve(
        dirname(file),
        fixture.path.replace(/\.(tsx?|jsx?)$/, "") + ".tsx",
      );
      module = await getModule(file);
      example = fixtureExport(module, fixture.exported);
    } else {
      example = t.exportDefaultDeclaration(
        t.functionDeclaration(
          t.identifier("ComponentExample"),
          render.params,
          t.isBlockStatement(render.body)
            ? render.body
            : t.blockStatement([t.returnStatement(render.body)]),
        ),
      );
    }
    const code = await selectedModule(module, example, installed);
    const label = fixture ? basename(file) : counterpart.exportName + ".tsx";
    return {
      kind: fixture ? "ariax" : "story",
      ...(await portable(code, file, label)),
      label,
      url:
        "https://github.com/garrettjavalia/shadcn-ariax/blob/main/" +
        relative(repo, file).split(sep).map(encodeURIComponent).join("/"),
    };
  }

  const slugs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -4));
  const order = [...new Set([...nav.pages, ...slugs.sort()])].filter((slug) =>
    slugs.includes(slug),
  );
  type Placement = { name: string; line: number; counterpart?: Counterpart };
  const byComponent = new Map<string, Placement[]>();
  function add(component: string, placement: Placement) {
    const list = byComponent.get(component);
    if (list) list.push(placement);
    else byComponent.set(component, [placement]);
  }
  const documented = new Set(manifest.previews.map((item) => item.name));
  for (const item of manifest.previews) {
    add(item.component, {
      name: item.name,
      line: item.line,
      counterpart:
        previewOverrides[item.name] ??
        (item.status === "mapped"
          ? item.counterparts.find(
              (entry) => entry.stylexStoryId === item.storyId,
            )
          : undefined),
    });
  }
  // The pinned registry includes component examples that have no ComponentPreview
  // in MDX. Reuse the same AriaX fixture discovery used by the parity suite.
  const exampleNames = exampleFiles
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.slice(0, -4))
    .sort();
  const { mapping } = await fixtureMappings(
    repo,
    new Set([...documented, ...exampleNames]),
  );
  const families = order
    .filter(
      (slug) => installed.has(slug) || Object.hasOwn(compositionTargets, slug),
    )
    .sort((a, b) => b.length - a.length);
  const otherFamilies: Record<string, string> = {
    "muted-item-group": "item",
    "outline-item-group": "item",
    "data-picker-with-dropdowns": "date-picker",
    "radio-fields": "radio-group",
  };
  for (const name of exampleNames) {
    if (documented.has(name)) continue;
    const component =
      otherFamilies[name] ??
      families.find((slug) => name.startsWith(slug + "-"));
    if (!component) continue;
    add(component, {
      name,
      line: 1,
      counterpart: previewOverrides[name] ?? mapping.get(name)?.[0],
    });
  }
  const sources = new Map<string, Promise<CatalogSource>>();
  const pages = await Promise.all(
    order
      .filter((slug) => byComponent.has(slug) || installed.has(slug))
      .map(async (slug) => {
        const text = await readFile(
          resolve(repo, docsRoot, slug + ".mdx"),
          "utf8",
        );
        const meta = text.split(/^---\s*$/m)[1] ?? "";
        const installTargets = installed.has(slug)
          ? [slug]
          : (compositionTargets[slug] ?? []).filter((item) =>
              installed.has(item),
            );
        const seen = new Set<string>();
        const blocks: CatalogPreview[] = [];
        for (const item of byComponent.get(slug) ?? []) {
          if (seen.has(item.name)) continue;
          seen.add(item.name);
          const { counterpart } = item;
          assert.ok(
            counterpart,
            "Missing AriaX example for " + slug + "/" + item.name,
          );
          const id = counterpart.stylexStoryId;
          if (!sources.has(id)) sources.set(id, exampleSource(counterpart));
          blocks.push({
            kind: "preview",
            name: item.name,
            storyId: id,
            source: await sources.get(id)!,
            line: item.line,
            hideCode: false,
            note: null,
            description: null,
            upstreamUrl: "https://ui.shadcn.com/docs/components/aria/" + slug,
          });
        }
        return {
          slug,
          title: frontmatter(meta, "title") || slug,
          description: frontmatter(meta, "description"),
          upstreamUrl: "https://ui.shadcn.com/docs/components/aria/" + slug,
          installTargets,
          installCommand: installTargets.length
            ? `pnpm dlx shadcn add ${installTargets.map((item) => "garrettjavalia/shadcn-ariax/" + item).join(" ")}`
            : null,
          blocks,
        };
      }),
  );
  return { upstreamCommit: upstream.commit, pages };
}
