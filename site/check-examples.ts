import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import { types as t } from "@babel/core";
import type { ExampleRequirements } from "./example-requirements";
import { chromium } from "@playwright/test";
import { preview } from "vite";
import { toastExampleApp } from "./example-setup";
import { collectInstallFixtures } from "../scripts/install-fixtures";

type Example = {
  name: string;
  kind: string;
  hideCode: boolean;
  source: {
    code: string;
    stylesheet?: string;
    requirements: ExampleRequirements;
  } | null;
};
type PageProps = {
  locale: string;
  nav: { slug: string }[];
  data?: { slug: string; blocks: Example[] };
};
const project = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(project, "dist/site/docs/components");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function publishedPage(path: string): Promise<PageProps> {
  const html = await readFile(join(path, "index.html"), "utf8");
  const match =
    /<script id="site-props" type="application\/json">([\s\S]*?)<\/script>/.exec(
      html,
    );
  assert.ok(
    match,
    `Missing built page data: ${path}. Run pnpm build:site first.`,
  );
  return JSON.parse(match[1]);
}

async function publishedExamples() {
  const { nav, locale } = await publishedPage(output);
  assert.ok(
    locale.startsWith("en") && nav.length,
    "Expected the English catalog",
  );
  const examples = new Map<string, NonNullable<Example["source"]>>();
  for (const { slug } of nav) {
    assert.match(slug, slugPattern);
    const { data } = await publishedPage(join(output, slug));
    assert.ok(
      data && data.slug === slug && data.blocks.length,
      `Empty component page: ${slug}`,
    );
    for (const block of data.blocks) {
      assert.equal(block.kind, "preview", `Unexpected catalog block: ${slug}`);
      assert.match(block.name, slugPattern);
      const id = `${slug}/${block.name}`;
      assert.ok(
        !block.hideCode && block.source?.code.trim(),
        `Missing shown source: ${id}`,
      );
      assert.ok(!examples.has(id), `Duplicate example: ${id}`);
      examples.set(id, block.source!);
    }
  }
  return { examples, pageCount: nav.length };
}

async function run(command: string, args: string[], cwd: string) {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32" && command === "pnpm",
    env: { ...process.env, CI: "true", NODE_PATH: "" },
  });
  const [code, signal] = await once(child, "exit");
  assert.equal(code, 0, `${command} ${args[0]} failed (${signal ?? code})`);
}

async function renderBuiltExamples(app: string, entries: string[]) {
  const server = await preview({
    root: app,
    configFile: false,
    preview: { host: "127.0.0.1", port: 0 },
    logLevel: "error",
  });
  let browser;
  try {
    browser = await chromium.launch({
      executablePath: process.env.ARIAX_CHROMIUM_EXECUTABLE_PATH,
    });
    const origin =
      "http://127.0.0.1:" + (server.httpServer.address() as AddressInfo).port;
    const pending = [...entries];
    const errors: string[] = [];
    const context = await browser.newContext();
    await Promise.all(
      Array.from({ length: 4 }, async () => {
        const page = await context.newPage();
        let entry: string | undefined;
        page.on("pageerror", (error) =>
          errors.push(entry + ": " + error.message),
        );
        while ((entry = pending.shift())) {
          try {
            await page.goto(origin + "/" + entry, {
              waitUntil: "domcontentloaded",
            });
            await page.waitForFunction(
              () => document.querySelector("#root")?.childElementCount,
              {},
              { timeout: 12000 },
            );
            await page.evaluate(
              () =>
                new Promise((resolve) =>
                  requestAnimationFrame(() => requestAnimationFrame(resolve)),
                ),
            );
          } catch (error) {
            errors.push(entry + ": " + String(error));
          }
        }
      }),
    );
    assert.deepEqual(
      errors,
      [],
      "Consumer example render failures: " + errors.join("\n"),
    );
  } finally {
    await browser?.close();
    await server.close();
  }
}

async function main() {
  const { examples, pageCount } = await publishedExamples();
  const fixtures = await collectInstallFixtures(project);
  const pkg = JSON.parse(await readFile(join(project, "package.json"), "utf8"));
  const items = new Map(fixtures.map(({ item }) => [item.name, item]));
  const app = await mkdtemp(join(tmpdir(), "ariax-site-examples-"));
  const save = async (path: string, contents: string) => {
    const file = join(app, path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, contents);
  };
  const registry = new Map<string, Buffer>(
    await Promise.all(
      fixtures.map(
        async ({ item }) =>
          [
            `/${item.name}.json`,
            await readFile(join(project, "registry", item.name + ".json")),
          ] as const,
      ),
    ),
  );
  const server = createServer((request, response) => {
    const item = registry.get(request.url ?? "");
    if (!item) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { "Content-Type": "application/json" }).end(item);
  });
  try {
    const dependencies = new Map<string, string>();
    const selectedItems = new Set<string>();
    const entryFiles: string[] = [];
    for (const [id, source] of examples) {
      const dir = "src/examples/" + id;
      assert.ok(
        source.requirements,
        `Missing installation instructions: ${id}`,
      );
      const provided = new Set(["react", "react-dom"]);
      const installedFiles = new Set<string>();
      for (const name of source.requirements.items) {
        const item = items.get(name);
        assert.ok(item, `${id}: unknown registry item ${name}`);
        selectedItems.add(name);
        for (const file of item.files ?? []) {
          if (file.target?.startsWith("@ui/"))
            installedFiles.add(file.target.slice(4).replace(/\.tsx?$/, ""));
        }
        for (const dep of [
          ...(item.dependencies ?? []),
          ...(item.devDependencies ?? []),
        ]) {
          provided.add(dep.replace(/@[^@/]+$/, ""));
        }
      }
      for (const spec of source.requirements.packages) {
        const split = spec.lastIndexOf("@");
        assert.ok(split > 0, `${id}: package version missing: ${spec}`);
        const name = spec.slice(0, split);
        const version = spec.slice(split + 1);
        assert.ok(
          !dependencies.has(name) || dependencies.get(name) === version,
          `Conflicting package version: ${spec}`,
        );
        dependencies.set(name, version);
        provided.add(name);
      }
      const checkImport = (spec: string) => {
        if (spec.startsWith("@/components/ui/")) {
          const path = spec
            .slice("@/components/ui/".length)
            .replace(/\.tsx?$/, "");
          assert.ok(
            installedFiles.has(path),
            `${id}: published commands do not install ${spec}`,
          );
        } else if (spec === "./example.css") {
          assert.ok(source.stylesheet, `${id}: missing published example.css`);
        } else {
          const name = spec.startsWith("@")
            ? spec.split("/").slice(0, 2).join("/")
            : spec.split("/")[0];
          assert.ok(
            provided.has(name),
            `${id}: published commands do not install ${spec}`,
          );
        }
      };
      const ast = parse(source.code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
        createImportExpressions: true,
      });
      t.traverseFast(ast.program, (node) => {
        if (
          (t.isImportDeclaration(node) ||
            t.isExportNamedDeclaration(node) ||
            t.isExportAllDeclaration(node)) &&
          node.source
        ) {
          checkImport(node.source.value);
        } else if (t.isImportExpression(node) && t.isStringLiteral(node.source))
          checkImport(node.source.value);
      });
      if (source.requirements.toaster) checkImport("@/components/ui/sonner");
      await save(dir + "/example.tsx", source.code);
      if (source.stylesheet)
        await save(dir + "/example.css", source.stylesheet);
      if (source.requirements?.toaster)
        await save(dir + "/App.tsx", toastExampleApp);
      await save(
        dir + "/main.tsx",
        `import Example from "${source.requirements?.toaster ? "./App" : "./example"}";\nimport { mount } from "../../../mount";\nmount(<Example />);\n`,
      );
      const html = "pages/" + id + ".html";
      await save(
        html,
        `<!doctype html><div id="root"></div><script type="module" src="/${dir}/main.tsx"></script>`,
      );
      entryFiles.push(html);
    }
    await save(
      "src/mount.tsx",
      `import { createRoot } from "react-dom/client";\nimport type { ReactNode } from "react";\nimport "./components/ui/ariax/styles/entry.css";\nexport function mount(example: ReactNode) { createRoot(document.getElementById("root")!).render(example); }\n`,
    );
    const exactVersions = async (names: Iterable<string>) =>
      Object.fromEntries(
        await Promise.all(
          Array.from(names, async (name) => {
            const data = JSON.parse(
              await readFile(
                join(project, "node_modules", name, "package.json"),
                "utf8",
              ),
            );
            return [name, data.version] as const;
          }),
        ),
      );
    await save(
      "package.json",
      JSON.stringify(
        {
          name: "ariax-published-examples",
          private: true,
          type: "module",
          packageManager: pkg.packageManager,
          dependencies: {
            ...(await exactVersions(["react", "react-dom"])),
            ...Object.fromEntries(dependencies),
          },
          devDependencies: await exactVersions([
            "vite",
            "@vitejs/plugin-react",
            "typescript",
            "@types/react",
            "@types/react-dom",
          ]),
        },
        null,
        2,
      ),
    );
    await save("pnpm-workspace.yaml", 'packages:\n  - "."\n');
    await save("src/index.css", "");
    await save(
      "components.json",
      JSON.stringify({
        $schema: "https://ui.shadcn.com/schema.json",
        style: "aria-nova",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "",
          css: "src/index.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          ui: "@/components/ui",
          utils: "@/lib/utils",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      }),
    );
    await save(
      "tsconfig.json",
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          types: ["vite/client"],
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      }),
    );
    const setup = await readFile(join(project, "README.md"), "utf8");
    for (const name of ["babel.config.cjs", "postcss.config.cjs"]) {
      const example = [...setup.matchAll(/```js\n([\s\S]*?)```/g)].find((m) =>
        m[1].startsWith("// " + name + "\n"),
      );
      assert.ok(example, `Missing documented setup: ${name}`);
      await save(name, example[1]);
    }
    await save(
      "vite.config.ts",
      `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
  resolve: { alias: { "@": ${JSON.stringify(join(app, "src"))} } },
  build: { manifest: true, rollupOptions: { input: ${JSON.stringify(entryFiles)} } }
});
`,
    );
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    console.log(
      `Checking ${examples.size} published examples from ${pageCount} component pages in ${app}`,
    );
    await run(
      process.execPath,
      [
        join(project, "node_modules/shadcn/dist/index.js"),
        "add",
        ...Array.from(selectedItems, (name) => origin + "/" + name + ".json"),
        "--yes",
        "--cwd",
        app,
      ],
      app,
    );
    await run("pnpm", ["install", "--no-frozen-lockfile"], app);
    await run("pnpm", ["exec", "tsc", "--noEmit"], app);
    await run("pnpm", ["exec", "vite", "build", "--logLevel", "warn"], app);
    const manifest = JSON.parse(
      await readFile(join(app, "dist/.vite/manifest.json"), "utf8"),
    );
    for (const path of entryFiles) {
      assert.ok(manifest[path]?.isEntry, `Missing built entry: ${path}`);
      const script = manifest[path].file;
      assert.ok((await stat(join(app, "dist", script))).size > 0);
      assert.ok(
        (await readFile(join(app, "dist", path), "utf8")).includes(script),
        `Missing script in ${path}`,
      );
    }
    await renderBuiltExamples(app, entryFiles);
    console.log(
      `PASS: ${examples.size} published examples, ${pageCount} component pages, skipped=0. Public CLI install, TypeScript, production StyleX/Vite build, and Chromium render.`,
    );
  } finally {
    if (server.listening) {
      server.close();
      await once(server, "close");
    }
    await rm(app, { recursive: true, force: true });
  }
}
await main();
