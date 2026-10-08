import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Vite handles imported assets. The upstream examples also use literal public URLs.
const base = process.env.ARIAX_STORYBOOK_BASE;
if (
  !base ||
  !base.startsWith("/") ||
  !base.endsWith("/") ||
  base.startsWith("//")
) {
  throw new Error("ARIAX_STORYBOOK_BASE must be an absolute path ending in /");
}
const root = resolve("dist/stylex");
const files = await readdir(root, { recursive: true, withFileTypes: true });
for (const file of files) {
  if (!file.isFile() || !/\.(js|css|html)$/.test(file.name)) continue;
  const path = resolve(file.parentPath, file.name);
  const source = await readFile(path, "utf8");
  const updated = source.replace(
    /(["'`(])\/(avatars\/|fonts\/|avatar-(?:controlled|delayed|failure)\.svg)/g,
    (_, delimiter: string, asset: string) => `${delimiter}${base}${asset}`,
  );
  if (updated !== source) await writeFile(path, updated);
}
