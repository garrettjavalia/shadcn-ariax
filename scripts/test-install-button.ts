import assert from "node:assert/strict";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { chromium, expect } from "@playwright/test";

const registry = process.argv[2];
assert.ok(
  registry,
  "Provide a GitHub item, e.g. garrettjavalia/shadcn-ariax/button#<revision>",
);
const app = await mkdtemp(join(tmpdir(), "ariax-button-"));
const output = resolve("generated/install-button");
const pkg = JSON.parse(await readFile("package.json", "utf8"));
const readme = await readFile("README.md", "utf8");
const example = (file: string) => {
  const block = [...readme.matchAll(/```\w+\n([\s\S]*?)```/g)]
    .map((match) => match[1])
    .find((code) => code.startsWith(`// ${file}\n`));
  assert.ok(block, `README example missing: ${file}`);
  return block;
};
const run = (command: string, args: string[]) => {
  const result = spawnSync(command, args, {
    cwd: app,
    stdio: "inherit",
    env: { ...process.env, CI: "true" },
    timeout: 180_000,
  });
  assert.equal(
    result.status,
    0,
    `${command} failed: ${result.error ?? result.status}`,
  );
};
let server: ChildProcess | undefined;
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
const stop = async () => {
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    await exited;
  }
  server = undefined;
};
const start = (preview: boolean) =>
  new Promise<string>((done, fail) => {
    server = spawn(
      process.execPath,
      [
        join(app, "node_modules/vite/bin/vite.js"),
        ...(preview ? ["preview"] : []),
        "--host",
        "127.0.0.1",
        "--port",
        "0",
      ],
      { cwd: app, stdio: ["ignore", "pipe", "pipe"] },
    );
    let logs = "";
    const timeout = setTimeout(
      () => fail(new Error(`Vite startup timed out: ${logs}`)),
      30_000,
    );
    server.once("error", (error) => {
      clearTimeout(timeout);
      fail(error);
    });
    server.once("exit", (code) => {
      clearTimeout(timeout);
      fail(new Error(`Vite exited (${code}): ${logs}`));
    });
    const record = (chunk: Buffer) => {
      logs += chunk.toString().replace(/\x1b\[[0-9;]*m/g, "");
      const url = /http:\/\/127\.0\.0\.1:\d+\//.exec(logs)?.[0];
      if (url) {
        clearTimeout(timeout);
        done(url);
      }
    };
    server.stdout!.on("data", record);
    server.stderr!.on("data", record);
  });
try {
  await mkdir(join(app, "src"), { recursive: true });
  await mkdir(output, { recursive: true });
  await writeFile(
    join(app, "package.json"),
    JSON.stringify(
      {
        name: "ariax-button-consumer",
        private: true,
        type: "module",
        dependencies: {
          react: pkg.dependencies.react,
          "react-dom": pkg.dependencies["react-dom"],
        },
        devDependencies: {
          vite: "7.3.6",
          "@vitejs/plugin-react": pkg.devDependencies["@vitejs/plugin-react"],
          typescript: pkg.devDependencies.typescript,
          "@types/react": pkg.devDependencies["@types/react"],
          "@types/react-dom": pkg.devDependencies["@types/react-dom"],
        },
      },
      null,
      2,
    ),
  );
  await writeFile(join(app, "pnpm-workspace.yaml"), 'packages:\n  - "."\n');
  await writeFile(
    join(app, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2022", "DOM"],
        module: "ESNext",
        moduleResolution: "Bundler",
        jsx: "react-jsx",
        strict: true,
        skipLibCheck: true,
        types: ["vite/client"],
        paths: { "@/*": ["./src/*"] },
      },
      include: ["src", "vite.config.ts"],
    }),
  );
  await writeFile(
    join(app, "components.json"),
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
  await writeFile(join(app, "src/index.css"), "");
  await writeFile(
    join(app, "index.html"),
    '<html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
  );
  run("pnpm", ["dlx", "shadcn@4.21.1", "add", registry, "--yes"]);
  for (const file of ["babel.config.cjs", "postcss.config.cjs"])
    await writeFile(join(app, file), example(file));
  // The README requires an existing @ alias; preserve it when adding the documented plugin setup.
  await writeFile(
    join(app, "vite.config.ts"),
    example("vite.config.ts").replace(
      "plugins:",
      `resolve: { alias: { '@': ${JSON.stringify(join(app, "src"))} } },\n  plugins:`,
    ),
  );
  const appSource = [...readme.matchAll(/```tsx\n([\s\S]*?)```/g)]
    .map((match) => match[1])
    .find((code) => code.includes("export default function App"));
  assert.ok(appSource);
  await writeFile(join(app, "src/App.tsx"), appSource);
  await writeFile(
    join(app, "src/main.tsx"),
    `${example("src/main.tsx")}\nimport {createRoot} from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')!).render(<App />);\n`,
  );
  assert.equal(
    await readFile(join(app, "src/components/ui/ariax/LICENSE"), "utf8"),
    await readFile("LICENSE", "utf8"),
    "The CLI must install the project's complete license notice",
  );
  const installed = JSON.parse(
    await readFile(join(app, "package.json"), "utf8"),
  );
  assert.ok(!installed.pnpm?.patchedDependencies);
  assert.ok(
    !installed.dependencies.tailwindcss &&
      !installed.devDependencies?.tailwindcss,
  );
  for (const name of [
    "@stylexjs/stylex",
    "@babel/core",
    "@stylexjs/babel-plugin",
    "@stylexjs/postcss-plugin",
    "postcss",
  ])
    assert.ok(
      installed.dependencies?.[name] || installed.devDependencies?.[name],
      `Missing ${name}`,
    );
  run("pnpm", ["exec", "tsc", "--noEmit"]);
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 640, height: 320 } });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const check = async (url: string, mode: string) => {
    await page.goto(url);
    await page.mouse.move(600, 300);
    const button = page.getByRole("button", { name: "Continue" });
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS("display", "inline-flex");
    await expect(button).toHaveCSS("height", "32px");
    await expect(button).toHaveCSS("padding-left", "10px");
    await expect(button).toHaveCSS("font-size", "14px");
    await expect(button).toHaveCSS("border-radius", "10px");
    await expect(button).toHaveCSS("background-color", "oklch(0.205 0 0)");
    await expect(button).toHaveCSS("color", "oklch(0.985 0 0)");
    await page.screenshot({ path: join(output, `${mode}.png`) });
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    await expect(button).not.toHaveCSS("box-shadow", "none");
    assert.deepEqual(errors, []);
  };
  await check(await start(false), "development");
  await writeFile(
    join(app, "src/App.tsx"),
    appSource.replace("<Button>", '<Button size="lg">'),
  );
  await expect(page.getByRole("button", { name: "Continue" })).toHaveCSS(
    "height",
    "36px",
  );
  await stop();
  await writeFile(join(app, "src/App.tsx"), appSource);
  run("pnpm", ["exec", "vite", "build"]);
  const assets = await readdir(join(app, "dist/assets"));
  const css = assets.filter((file) => file.endsWith(".css"));
  assert.ok(css.length);
  const builtCSS = (
    await Promise.all(
      css.map((file) => readFile(join(app, "dist/assets", file), "utf8")),
    )
  ).join("\n");
  assert.doesNotMatch(builtCSS, /@stylex\s*;/);
  assert.match(
    await readFile(join(app, "dist/index.html"), "utf8"),
    /rel="stylesheet"/,
  );
  await check(await start(true), "production");
  const result = {
    registry,
    checks: [
      "GitHub shadcn add",
      "project MIT license installed intact",
      "README configurations",
      "consumer typecheck",
      "development Button CSS and keyboard focus",
      "HMR size change",
      "production CSS asset and Button rendering",
    ],
    cssBytes: Buffer.byteLength(builtCSS),
    browserErrors: errors,
  };
  await writeFile(
    join(output, "result.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser?.close();
  await stop();
  await rm(app, { recursive: true, force: true });
}
