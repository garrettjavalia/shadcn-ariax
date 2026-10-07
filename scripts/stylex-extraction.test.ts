import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { chromium, expect } from "@playwright/test";
import { createServer, build, preview } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import { transformAsync, type TransformOptions } from "@babel/core";
import postcss from "postcss";
const require = createRequire(import.meta.url);
const stylexPostcss = require("@stylexjs/postcss-plugin");
const babel: TransformOptions = {
  babelrc: false,
  configFile: false,
  parserOpts: { plugins: ["typescript", "jsx"] },
  plugins: [
    [
      "@stylexjs/babel-plugin",
      { dev: false, runtimeInjection: false, treeshakeCompensation: true },
    ],
  ],
};
const settings = (root: string) => ({
  plugins: [react({ babel })],
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          cwd: root,
          include: ["*.ts"],
          babelConfig: babel,
          useCSSLayers: false,
        }),
      ],
    },
  },
});

test("StyleX extraction preserves conditions, calculations, lazy CSS and HMR through official Babel and PostCSS plugins", async () => {
  const root = await mkdtemp(resolve(".consumer-test-stylex-"));
  const source = (
    height: number,
  ) => `import * as stylex from '@stylexjs/stylex';
import './index.css';
const styles = stylex.create({a:{width:{default:0,'@supports (animation-timeline: scroll())':'111px'},height:{default:0,'@supports (animation-timeline: scroll())':'${height}px'},marginTop:{default:0,'@container field (min-width: 1px)':'15px'},marginBottom:{default:0,'@container field (min-width: 1px)':'16px'}},text:{fontSize:'12px',lineHeight:'calc(1 / .75)'}});
for (const [id,s] of [['target',styles.a],['text',styles.text]]) { const p=stylex.props(s);const e=document.getElementById(id);e.className=p.className;Object.assign(e.style,p.style); }
document.getElementById('load').onclick=()=>import('./lazy');if(import.meta.hot)import.meta.hot.accept();`;
  let server: Awaited<ReturnType<typeof createServer>> | undefined;
  let previewServer: Awaited<ReturnType<typeof preview>> | undefined;
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    await writeFile(
      join(root, "index.html"),
      '<html><head></head><body><div style="container-type:inline-size;container-name:field;width:300px"><div id="target"></div><div id="text">test</div><div id="lazy"></div><button id="load">Load</button></div><script type="module" src="/main.ts"></script></body></html>',
    );
    await writeFile(join(root, "index.css"), "@stylex;");
    await writeFile(join(root, "main.ts"), source(222));
    await writeFile(
      join(root, "lazy.ts"),
      "import * as stylex from '@stylexjs/stylex';const s=stylex.create({a:{width:'123px'}});document.getElementById('lazy')!.className=stylex.props(s.a).className!;",
    );
    server = await createServer({
      root,
      configFile: false,
      ...settings(root),
      base: "/fixture/",
      server: { host: "127.0.0.1", port: 0 },
    });
    await server.listen();
    browser = await chromium.launch();
    const page = await browser.newPage();
    const check = async (height: number) => {
      await expect(page.locator("#target")).toHaveCSS("height", `${height}px`);
      await expect(page.locator("#target")).toHaveCSS("width", "111px");
      await expect(page.locator("#target")).toHaveCSS("margin-top", "15px");
      await expect(page.locator("#target")).toHaveCSS("margin-bottom", "16px");
      assert.equal(
        await page
          .locator("#text")
          .evaluate((e) => e.getBoundingClientRect().height),
        16,
      );
      await page.locator("#load").click();
      await expect(page.locator("#lazy")).toHaveCSS("width", "123px");
    };
    await page.goto(server.resolvedUrls!.local[0]);
    await check(222);
    await writeFile(join(root, "main.ts"), source(223));
    await check(223);
    await server.close();
    server = undefined;
    await build({
      root,
      configFile: false,
      ...settings(root),
      base: "./",
      logLevel: "error",
    });
    const html = await readFile(join(root, "dist/index.html"), "utf8");
    assert.match(html, /stylesheet/);
    previewServer = await preview({
      root,
      configFile: false,
      base: "./",
      preview: { host: "127.0.0.1", port: 0 },
    });
    await page.goto(previewServer.resolvedUrls!.local[0]);
    await check(223);
  } finally {
    await browser?.close();
    await server?.close();
    if (previewServer)
      await new Promise<void>((done, reject) =>
        previewServer!.httpServer.close((error) =>
          error ? reject(error) : done(),
        ),
      );
    await rm(root, { recursive: true, force: true });
  }
});

test("official Babel and PostCSS extract usable CSS without Vite", async () => {
  const root = await mkdtemp(resolve(".consumer-test-postcss-"));
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    const source = `import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({box:{width:{default:0,'@supports (animation-timeline: scroll())':'111px'},height:{default:0,'@supports (animation-timeline: scroll())':'222px'},marginBottom:{default:0,'@container field (min-width: 1px)':'16px'},fontSize:'12px',lineHeight:'calc(1 / .75)'}});
export const props = stylex.props(styles.box);`;
    const filename = join(root, "styles.js");
    await writeFile(filename, source);
    const compiled = await transformAsync(source, { ...babel, filename });
    const props = new Function(
      "stylex",
      compiled!
        .code!.replace(/import[^;]+;/, "")
        .replace("export const props", "const props") + ";return props;",
    )(require("@stylexjs/stylex"));
    const css = await postcss([
      stylexPostcss({
        cwd: root,
        include: ["*.js"],
        babelConfig: babel,
        useCSSLayers: false,
      }),
    ]).process("@stylex;", { from: join(root, "index.css") });
    assert.doesNotMatch(css.css, /@stylex;/);
    assert.match(css.css, /calc\(1 \/ .75\)/);
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(
      `<style>${css.css}</style><div style="container-type:inline-size;container-name:field;width:300px"><div id="target" class="${props.className}">text</div></div>`,
    );
    await expect(page.locator("#target")).toHaveCSS("width", "111px");
    await expect(page.locator("#target")).toHaveCSS("height", "222px");
    await expect(page.locator("#target")).toHaveCSS("margin-bottom", "16px");
    await expect(page.locator("#target")).toHaveCSS("line-height", "16px");
  } finally {
    await browser?.close();
    await rm(root, { recursive: true, force: true });
  }
});
