import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/site/", import.meta.url));
const base = process.env.ARIAX_SITE_BASE ?? "/shadcn-ariax/";
assert.match(
  base,
  /^\/(?:[A-Za-z0-9_-]+\/)*$/,
  "ARIAX_SITE_BASE must be an absolute path ending in /",
);
const prefix = base.slice(0, -1);
const port = Number(process.env.ARIAX_SITE_TEST_PORT ?? 4187);
const index = await stat(resolve(root, "index.html")).catch(() => null);
if (!index?.isFile()) {
  throw new Error("dist/site/index.html is missing; run build:site first.");
}

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  const end = (status: number, message: string) => {
    response.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
    response.end(message);
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    end(405, "Method not allowed");
    return;
  }

  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname === prefix) {
      response.writeHead(308, { location: prefix + "/" + url.search });
      response.end();
      return;
    }
    if (!url.pathname.startsWith(prefix + "/")) {
      end(404, "Not found");
      return;
    }

    const path = decodeURIComponent(url.pathname.slice(prefix.length));
    let file = resolve(root, "." + path);
    const subpath = relative(root, file);
    if (subpath === ".." || subpath.startsWith(".." + sep)) {
      end(404, "Not found");
      return;
    }

    let fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(308, { location: url.pathname + "/" + url.search });
        response.end();
        return;
      }
      file = resolve(file, "index.html");
      fileStat = await stat(file);
    }
    if (!fileStat.isFile()) {
      end(404, "Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": contentTypes[extname(file)] ?? "application/octet-stream",
      "content-length": fileStat.size,
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(file)
      .on("error", () => response.destroy())
      .pipe(response);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (error instanceof URIError) end(400, "Invalid path");
    else if (code === "ENOENT" || code === "ENOTDIR") {
      response.writeHead(404, { "content-type": contentTypes[".html"] });
      if (request.method === "HEAD") response.end();
      else createReadStream(resolve(root, "404.html"))
        .on("error", () => response.destroy())
        .pipe(response);
    } else end(500, "Could not read build output");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`AriaX preview: http://127.0.0.1:${port}${base}`);
});
