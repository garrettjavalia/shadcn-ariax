import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "@babel/parser";
import { types as t } from "@babel/core";

export type ExampleRequirements = {
  items: string[];
  packages: string[];
  toaster: boolean;
  assets: { path: string; url: string }[];
};
type Item = {
  name: string;
  files: { target: string }[];
  dependencies?: string[];
  devDependencies?: string[];
};

function packageName(specifier: string) {
  return specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/");
}

export async function loadExampleRequirements(root: string) {
  const json = async <T>(path: string) =>
    JSON.parse(await readFile(resolve(root, path), "utf8")) as T;
  const [registry, pkg, upstream, avatars] = await Promise.all([
    json<{ items: Item[] }>("registry.json"),
    json<{
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    }>("package.json"),
    json<{ repository: string; commit: string }>("upstream/source.json"),
    readdir(resolve(root, "generated/upstream/shadcn/apps/v4/public/avatars"), {
      withFileTypes: true,
    }),
  ]);
  const itemsByName = new Map(registry.items.map((item) => [item.name, item]));
  const owns = new Map<string, Set<string>>();
  for (const item of registry.items) {
    const paths = item.files
      .map((file) => file.target)
      .filter((path) => path.startsWith("@ui/"))
      .map((path) => path.slice(4).replace(/\.tsx?$/, ""));
    owns.set(item.name, new Set(paths));
  }
  const pinned = { ...pkg.devDependencies, ...pkg.dependencies };
  const publicAssets = new Map<string, string>();
  for (const avatar of avatars.filter((a) => a.isFile())) {
    const path = "/avatars/" + avatar.name;
    const url =
      "https://raw.githubusercontent.com/" +
      upstream.repository +
      "/" +
      upstream.commit +
      "/apps/v4/public" +
      path;
    publicAssets.set(path, url);
  }
  // This is the revision that introduced the OFL-licensed font in AriaX.
  const ownPublic =
    "https://raw.githubusercontent.com/garrettjavalia/shadcn-ariax/42f5f4ca9016bc2335ebc56f389ee0b33dba8a54/public";
  for (const asset of ["/fonts/vazirmatn.ttf", "/avatar-controlled.svg"]) {
    publicAssets.set(asset, ownPublic + asset);
  }
  return function prepareExample(
    source: string,
    css?: string,
    initialItems: string[] = [],
  ) {
    const requiredModules = new Set<string>();
    const external = new Set<string>();
    // Parse real imports; strings appearing inside displayed code samples do
    // not become dependencies of the example itself.
    const ast = parse(source, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });
    function collect(specifier: string) {
      if (specifier.startsWith("@/components/ui/")) {
        requiredModules.add(
          specifier.slice("@/components/ui/".length).replace(/\.tsx?$/, ""),
        );
      } else if (specifier.startsWith(".")) {
        assert.ok(
          specifier === "./example.css",
          "Unbundled local example import: " + specifier,
        );
      } else {
        const name = packageName(specifier);
        assert.ok(
          Object.hasOwn(pinned, name),
          "Unresolved example package: " + specifier,
        );
        external.add(name);
      }
    }
    t.traverseFast(ast.program, (node) => {
      if (
        (t.isImportDeclaration(node) ||
          t.isExportNamedDeclaration(node) ||
          t.isExportAllDeclaration(node)) &&
        node.source
      )
        collect(node.source.value);
      if (
        t.isCallExpression(node) &&
        t.isImport(node.callee) &&
        t.isStringLiteral(node.arguments[0])
      )
        collect(node.arguments[0].value);
    });
    const toaster = external.has("sonner");
    if (toaster) requiredModules.add("sonner");
    const items = new Set(initialItems);
    const covered = (file: string) =>
      [...items].some((name) => owns.get(name)?.has(file));
    // Install components providing the most shared files first. For example,
    // installing a field already installs its label; another add is unnecessary.
    const compare = (a: string, b: string) =>
      (owns.get(b)?.size ?? 0) - (owns.get(a)?.size ?? 0) || a.localeCompare(b);
    for (const file of [...requiredModules].sort(compare)) {
      if (covered(file)) continue;
      let owner = itemsByName.has(file)
        ? file
        : file.replace(/\.recipe\.stylex$/, "");
      if (!owns.get(owner)?.has(file)) {
        const providers = registry.items
          .filter((item) => owns.get(item.name)!.has(file))
          .sort(
            (a, b) =>
              a.files.length - b.files.length || a.name.localeCompare(b.name),
          );
        assert.ok(
          providers.length,
          "No registry item provides @/components/ui/" + file,
        );
        owner = providers[0].name;
      }
      items.add(owner);
    }
    // React and React DOM are supplied by the prerequisite React application.
    const provided = new Set(["react", "react-dom"]);
    for (const item of items) {
      const registryItem = itemsByName.get(item);
      assert.ok(registryItem, "Unknown AriaX registry item " + item);
      for (const spec of [
        ...(registryItem.dependencies ?? []),
        ...(registryItem.devDependencies ?? []),
      ])
        provided.add(spec.replace(/@[^@/]+$/, ""));
    }
    const packages = [...external]
      .filter((name) => !provided.has(name))
      .sort()
      .map((name) => name + "@" + pinned[name]);
    const assets = new Set<string>();
    function portable(code: string) {
      return code.replace(
        /(["'`])(\/avatar-controlled\.svg|\/avatars\/[^"'\s`)]+|\/fonts\/[^"'\s`)]+|https:\/\/raw\.githubusercontent\.com\/garrettjavalia\/shadcn-ariax\/main\/public\/fonts\/[^"'\s`)]+)\1/g,
        (_match, delimiter: string, original: string) => {
          const path = original.startsWith("https:")
            ? original.slice(original.indexOf("/public/") + "/public".length)
            : original;
          const url = publicAssets.get(path);
          assert.ok(url, "Missing public example asset: " + path);
          assets.add(path);
          return delimiter + url + delimiter;
        },
      );
    }
    const code = portable(source);
    const stylesheet = css ? portable(css) : undefined;
    return {
      code,
      ...(stylesheet ? { stylesheet } : {}),
      requirements: {
        items: [...items],
        packages,
        toaster,
        assets: [...assets]
          .sort()
          .map((path) => ({ path, url: publicAssets.get(path)! })),
      },
    };
  };
}
