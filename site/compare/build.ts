import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { once } from "node:events";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { promisify } from "node:util";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { build } from "vite";
import { babel } from "../vite.config";
import { fixtureStates } from "./states";

const require = createRequire(import.meta.url);

async function installButton(root: string, app: string) {
  const schema = JSON.parse(
    await readFile(join(root, "registry/button.json"), "utf8"),
  );
  const packages = (entries: string[]) =>
    Object.fromEntries(
      entries.map((entry) => {
        const version = entry.lastIndexOf("@");
        return [entry.slice(0, version), entry.slice(version + 1)];
      }),
    );
  await Promise.all([
    writeFile(join(app, "pnpm-workspace.yaml"), 'packages:\n  - "."\n'),
    writeFile(
      join(app, "package.json"),
      JSON.stringify({
        name: "ariax-button-comparison",
        private: true,
        type: "module",
        dependencies: packages(schema.dependencies),
        devDependencies: packages(schema.devDependencies),
      }),
    ),
    writeFile(
      join(app, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./*"] },
          jsx: "react-jsx",
        },
      }),
    ),
    writeFile(
      join(app, "components.json"),
      JSON.stringify({
        style: "aria-nova",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "",
          css: "index.css",
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
    ),
    writeFile(join(app, "index.css"), ""),
  ]);
  const color = await readFile(
    join(
      root,
      "generated/upstream/shadcn/apps/v4/public/r/colors/neutral.json",
    ),
  );
  const server = createServer((req, res) => {
    if (req.url === "/colors/neutral.json")
      res.writeHead(200, { "Content-Type": "application/json" }).end(color);
    else res.writeHead(404).end();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    await promisify(execFile)(
      process.execPath,
      [
        join(root, "node_modules/shadcn/dist/index.js"),
        "add",
        join(root, "registry/button.json"),
        "--yes",
        "--overwrite",
        "--cwd",
        app,
      ],
      {
        cwd: app,
        env: {
          ...process.env,
          CI: "true",
          REGISTRY_URL: "http://127.0.0.1:" + address.port,
        },
      },
    );
  } finally {
    await new Promise<void>((done, fail) =>
      server.close((error) => (error ? fail(error) : done())),
    );
  }
}

export async function buildComparison(
  root: string,
  output: string,
  base: string,
) {
  const app = join(root, "generated/site-compare");
  const implementations = ["upstream", "ariax"] as const;
  await Promise.all(
    implementations.map((name) => mkdir(join(app, name), { recursive: true })),
  );
  await installButton(root, app);
  const reference = join(root, "generated/reference/aria-nova");
  // Keep the complete reference stylesheet while scanning only this fixture's component.
  const css = (await readFile(join(reference, "tailwind.css"), "utf8"))
    .replace(/^@source [^;]+;/gm, "")
    .replace(
      '"./cli.css"',
      JSON.stringify(relative(app, join(reference, "cli.css"))),
    );
  await writeFile(
    join(app, "reference.css"),
    css + '\n@source "../reference/aria-nova/ui/button.tsx";\n',
  );
  for (const name of implementations) {
    const folder = join(app, name);
    const upstream = name === "upstream";
    const button = relative(
      folder,
      upstream
        ? join(reference, "ui/button")
        : join(app, "components/ui/button"),
    );
    const stylesheet = upstream
      ? "../reference.css"
      : "../components/ui/ariax/styles/entry.css";
    await writeFile(
      join(folder, "entry.ts"),
      `import ${JSON.stringify(stylesheet)};\nimport "../../../site/theme.css";\nimport {Button} from ${JSON.stringify(button)};\nimport {mount} from "../../../site/compare/mount";\nmount(Button);\n`,
    );
    await writeFile(
      join(folder, "index.html"),
      '<!doctype html><html lang="en" data-ariax-themed><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Button</title><style>html,body{height:100%;margin:0;background:transparent}#parity-root{display:grid;place-items:center;height:100%}</style></head><body><main id="parity-root"></main><script type="module" src="./entry.ts"></script></body></html>',
    );
  }
  await build({
    configFile: false,
    root: app,
    base: base + "compare/",
    publicDir: false,
    plugins: [tailwind(), react({ babel })],
    resolve: { dedupe: ["react", "react-dom", "react-aria-components"] },
    css: {
      postcss: {
        plugins: [
          require("@stylexjs/postcss-plugin")({
            include: [join(app, "components/ui/**/*.{ts,tsx}")],
            babelConfig: babel,
            useCSSLayers: false,
          }),
          fixtureStates,
        ],
      },
    },
    build: {
      outDir: join(output, "compare"),
      emptyOutDir: true,
      rollupOptions: {
        input: implementations.map((name) => join(app, name, "index.html")),
      },
    },
  });
}
