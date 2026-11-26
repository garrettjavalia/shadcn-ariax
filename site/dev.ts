import { spawnSync } from "node:child_process";
import { access, readFile, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import tailwind from "@tailwindcss/vite";
import { createServer, mergeConfig, normalizePath, type Plugin } from "vite";
import type { Plugin as PostcssPlugin } from "postcss";
import { addFixtureStates } from "./compare/states";
import siteConfig from "./vite.config";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = resolve(root, "dist/site");
const compare = resolve(root, "generated/site-compare");
const base = process.env.ARIAX_SITE_BASE ?? "/shadcn-ariax/";
const port = Number(process.env.ARIAX_SITE_DEV_PORT ?? 4198);
if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base))
  throw new Error("Invalid ARIAX_SITE_BASE");

// The build supplies the route data, examples, fonts and pinned comparison sources.
// Reuse them on subsequent runs and let Vite compile the current source modules.
const prepared = await Promise.all([
  access(resolve(compare, "upstream/entry.ts")),
  access(resolve(root, "generated/site-previews")),
  readFile(resolve(dist, "index.html"), "utf8").then(
    (html) =>
      html.includes('"homeExamples":') &&
      html.includes(`"assetBase":"${base}"`),
  ),
]).then(
  ([, , matches]) => matches,
  () => false,
);
if (!prepared) {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", "site/build.ts"],
    {
      cwd: root,
      stdio: "inherit",
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Could not prepare the AriaX site");
}

const devStyles: PostcssPlugin = {
  postcssPlugin: "ariax-dev-comparison-states",
  OnceExit(css) {
    const file = normalizePath(css.source?.input.file ?? "");
    if (
      file === normalizePath(resolve(compare, "reference.css")) ||
      file === normalizePath(resolve(root, "site/compare/dev-entry.css"))
    ) {
      addFixtureStates(css);
    }
  },
};

const liveRoutes: Plugin = {
  name: "ariax-dev-routes",
  enforce: "pre",
  transform(code, id) {
    if (normalizePath(id) !== normalizePath(resolve(compare, "ariax/entry.ts")))
      return;
    return code
      .replace(
        "../components/ui/ariax/styles/entry.css",
        "/site/compare/dev-entry.css",
      )
      .replaceAll("../components/ui/", "/src/ariax/ui/");
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      try {
        const url = new URL(req.url ?? "/", "http://localhost");
        if (
          base !== "/" &&
          (url.pathname === "/" || url.pathname === base.slice(0, -1))
        ) {
          res.writeHead(308, { location: base + url.search }).end();
          return;
        }
        if (!url.pathname.startsWith(base)) return next();
        const path = decodeURIComponent(url.pathname.slice(base.length));
        const file = resolve(dist, path);
        const inside = relative(dist, file);
        if (
          isAbsolute(inside) ||
          inside === ".." ||
          inside.startsWith(".." + sep)
        ) {
          res.writeHead(404).end();
          return;
        }
        const info = await stat(file).catch(() => null);
        if (!info) return next();
        const frame = /^compare\/(ariax|upstream)\/(?:index\.html)?$/.exec(
          path,
        )?.[1];
        if (info.isFile() && !path.endsWith(".html")) {
          // Let Vite's public-file middleware handle MIME types and caching.
          req.url = "/" + path + url.search;
          return next();
        }
        if (info.isDirectory() && !url.pathname.endsWith("/")) {
          res
            .writeHead(308, { location: url.pathname + "/" + url.search })
            .end();
          return;
        }
        let html: string;
        if (frame) {
          html = (
            await readFile(resolve(compare, frame, "index.html"), "utf8")
          ).replace("./entry.ts", `/generated/site-compare/${frame}/entry.ts`);
        } else {
          html = await readFile(
            info.isDirectory() ? resolve(file, "index.html") : file,
            "utf8",
          );
          if (html.includes('id="site-props"')) {
            html = html
              .replace(
                /<link rel="stylesheet" href="[^"]*\/assets\/[^"]+">/g,
                "",
              )
              .replace(
                /<script type="module" src="[^"]*\/assets\/[^"]+"><\/script>/,
                '<script type="module" src="/site/dev-client.ts"></script>',
              )
              .replace(
                /<div id="app">[\s\S]*<\/div>\s*(?=<script id="site-props")/,
                '<div id="app"></div>\n',
              );
          }
        }
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(await server.transformIndexHtml(url.pathname, html));
      } catch (error) {
        if (error instanceof URIError) res.writeHead(400).end();
        else if ((error as NodeJS.ErrnoException).code === "ENOENT")
          res.writeHead(404).end();
        else next(error);
      }
    });
  },
};

const server = await createServer(
  mergeConfig(siteConfig, {
    configFile: false,
    cacheDir: "node_modules/.vite-ariax-site",
    appType: "custom",
    publicDir: dist,
    plugins: [tailwind(), liveRoutes],
    resolve: {
      alias: { "@reference": resolve(root, "generated/reference/aria-nova") },
    },
    css: { postcss: { plugins: [devStyles] } },
    optimizeDeps: {
      entries: [
        "site/dev-client.ts",
        "generated/site-previews/*/example.tsx",
        "generated/site-compare/{ariax,upstream}/entry.ts",
      ],
    },
    server: {
      host: "127.0.0.1",
      port,
      strictPort: true,
      watch: { ignored: ["**/dist/**"] },
    },
  }),
);
await server.listen();
console.log(`AriaX development: http://127.0.0.1:${port}${base}`);
