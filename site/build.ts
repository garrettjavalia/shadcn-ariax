import { buildComparison } from "./compare/build";
import { writePreviewLayouts } from "./preview-layouts";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { build, type Manifest } from "vite";
import type { SiteProps } from "./app";
import { locales, defaultLocale, localePrefix } from "./i18n/locales";
import english from "./i18n/en-US";
import { loadCatalog } from "./catalog";
import { loadExampleRequirements } from "./example-requirements";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist/site");
const ssr = resolve(root, "dist/site-ssr");
const tagManagerId = process.env.ARIAX_GTM_ID;
if (tagManagerId) assert.match(tagManagerId, /^GTM-[A-Z0-9]+$/);
const base = process.env.ARIAX_SITE_BASE ?? "/shadcn-ariax/";
assert.match(
  base,
  /^\/(?:[A-Za-z0-9_-]+\/)*$/,
  "ARIAX_SITE_BASE must be an absolute path ending in /",
);

function run(command: string, args: string[]) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32" && command === "pnpm",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed (${result.status ?? result.signal})`,
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeJson(value: unknown) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

async function write(relativePath: string, contents: string) {
  const file = resolve(output, relativePath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

async function main() {
  run("pnpm", ["upstream:prepare"]);
  run("pnpm", ["registry:build"]);
  run("pnpm", ["originals:generate"]);

  const [result, prepareExample] = await Promise.all([
    loadCatalog(root),
    loadExampleRequirements(root),
  ]);
  for (const page of result.pages) {
    for (const block of page.blocks) {
      if (block.kind !== "preview" || !block.source) continue;
      const portable = prepareExample(
        block.source.code,
        block.source.stylesheet,
        page.installTargets,
      );
      block.source = { ...block.source, ...portable };
    }
  }
  const catalog = result.pages;

  const previews = resolve(root, "generated/site-previews");
  await rm(previews, { recursive: true, force: true });
  const published = new Set<string>();
  for (const page of catalog) {
    for (const block of page.blocks) {
      if (block.kind !== "preview") continue;
      const { storyId, source } = block;
      assert.ok(storyId && source, "Missing live example: " + block.name);
      assert.match(storyId, /^[a-z0-9-]+$/);
      if (published.has(storyId)) continue;
      published.add(storyId);
      const dir = resolve(previews, storyId);
      await mkdir(dir, { recursive: true });
      await writeFile(resolve(dir, "example.tsx"), source.code);
      if (source.stylesheet)
        await writeFile(resolve(dir, "example.css"), source.stylesheet);
    }
  }

  const configFile = resolve(root, "site/vite.config.ts");
  await build({
    configFile,
    base,
    build: {
      outDir: output,
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: resolve(root, "site/client.tsx"),
      },
    },
  });
  await build({
    configFile,
    base,
    build: {
      ssr: resolve(root, "site/app.tsx"),
      outDir: ssr,
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: "render.js" } },
    },
  });

  await cp(resolve(root, "registry"), resolve(output, "registry"), {
    recursive: true,
  });
  await cp(resolve(root, "licenses"), resolve(output, "licenses"), {
    recursive: true,
  });
  await cp(resolve(root, "registry.json"), resolve(output, "registry.json"));

  // Keep the upstream unicode ranges and relative URLs so all pages and frames
  // share the same cached font subsets under the Pages deployment base.
  for (const [pkg, stylesheet] of [
    ["pretendard", "pretendardvariable-dynamic-subset.css"],
    ["pretendard-jp", "pretendardvariable-jp-dynamic-subset.css"],
  ]) {
    const dist = resolve(root, "node_modules", pkg, "dist");
    const variable = resolve(dist, "web/variable");
    const target = resolve(output, "fonts", pkg);
    await mkdir(target, { recursive: true });
    await Promise.all([
      cp(resolve(variable, stylesheet), resolve(target, "font.css")),
      cp(resolve(variable, "woff2-dynamic-subset"), resolve(target, "woff2-dynamic-subset"), { recursive: true }),
      cp(resolve(dist, "LICENSE.txt"), resolve(target, "LICENSE.txt")),
    ]);
  }

  await write(".nojekyll", "");
  await cp(resolve(root, "assets/ariax.svg"), resolve(output, "favicon.svg"));

  const { Site }: typeof import("./app") = await import(
    pathToFileURL(resolve(ssr, "render.js")).href
  );
  const manifest: Manifest = JSON.parse(
    await readFile(resolve(output, ".vite/manifest.json"), "utf8"),
  );
  await buildComparison(root, output, base);
  const previewLayouts = await writePreviewLayouts(root, output);
  for (const id of published) {
    assert.ok(
      manifest[`generated/site-previews/${id}/example.tsx`]?.file,
      `Missing production preview module: ${id}`,
    );
  }
  const entry = manifest["site/client.tsx"];
  assert.ok(entry?.isEntry, "Vite client manifest entry is missing");
  assert.ok(entry.css?.length, "Vite client stylesheet is missing");
  const styles = entry.css
    .map((file) => `<link rel="stylesheet" href="${base}${file}">`)
    .join("\n");
  const script = `<script type="module" src="${base}${entry.file}"></script>`;
  const homeExamples = catalog.map(({ slug, title, blocks }) => {
    const first = blocks.find(block => block.kind === "preview" && block.storyId);
    assert.ok(first?.kind === "preview" && first.storyId, "Missing first preview: " + slug);
    return { slug, title, name: first.name, story: first.storyId,
      layout: previewLayouts.layouts[previewLayouts.examples[first.name] ?? 0],
      documented: Object.hasOwn(previewLayouts.examples, first.name),
      toaster: Boolean(first.source?.requirements?.toaster) };
  });
  const nav = catalog.map(({ slug, title, description, blocks }) => ({
    slug,
    title,
    description,
    examples: [
      ...new Set(
        blocks.flatMap((block) =>
          block.kind === "preview" ? [block.name] : [],
        ),
      ),
    ],
  }));
  // Resolve bookmarked manager and iframe links to the corresponding live example.
  const legacyExamples: Record<string, string> = {};
  const legacyGroups: Record<string, string> = {};
  for (const page of catalog) {
    assert.match(page.slug, /^[a-z][a-z0-9-]*$/);
    // Legacy Storybook titles include both "AlertDialog" and "Alert Dialog" forms.
    legacyGroups["components-" + page.slug] = page.slug + "/";
    legacyGroups["components-" + page.slug.replaceAll("-", "")] = page.slug + "/";
    for (const block of page.blocks) {
      if (block.kind !== "preview" || !block.storyId) continue;
      const path = page.slug + "/";
      legacyExamples[block.storyId] ??= path + "#example-" + block.name;
      const group = block.storyId.split("--")[0];
      if (group.startsWith("components-")) legacyGroups[group] ??= path;
    }
  }
  const componentBase = base + "docs/components/";
  await write(
    "legacy-links.js",
    `(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("id") || /^\\/(?:story|docs)\\/([a-z0-9-]+)$/.exec(query.get("path") || "")?.[1] || "";
    const examples = new Map(Object.entries(${safeJson(legacyExamples)}));
    const groups = new Map(Object.entries(${safeJson(legacyGroups)}));
    location.replace(${safeJson(componentBase)} + (examples.get(id) || groups.get(id.split("--")[0]) || ""));
  })();`,
  );
  const legacyPage = `<!doctype html><html lang="en"><meta charset="utf-8"><title>AriaX components</title><script src="${base}legacy-links.js"></script><a href="${componentBase}">Browse components</a></html>`;
  for (const path of [
    "iframe.html",
    "storybook/index.html",
    "storybook/iframe.html",
  ]) {
    await write(path, legacyPage);
  }

  async function installation(file: string, heading: string) {
    const text = await readFile(resolve(root, file), "utf8");
    const section = text
      .split("## " + heading + "\n\n")[1]
      ?.split("\n## ")[0]
      ?.trim();
    assert.ok(section, file + " installation section is missing");
    return section;
  }
  const languages = await Promise.all(
    locales.map(async (locale) => {
      const resource: {
        ui: Record<string, string>;
        descriptions: Record<string, string>;
      } = (await import(`./i18n/${locale}.ts`)).default;
      for (const key of Object.keys(english.ui))
        assert.ok(resource.ui[key], locale + ": missing " + key);
      for (const page of catalog)
        assert.ok(
          resource.descriptions[page.slug],
          locale + ": missing " + page.slug,
        );
      const guideText =
        locale === "ko-KR"
          ? await installation("docs/i18n/readme/ko.md", "설치")
          : locale === defaultLocale
            ? await installation("README.md", "Installation")
            : await readFile(
                resolve(
                  root,
                  `docs/i18n/installation/${locale.split("-")[0]}.md`,
                ),
                "utf8",
              );
      const [shared, frameworks] = guideText.split("### Vite 7\n");
      const [vite, next] = (frameworks ?? "").split(
        "### Next.js 16 · App Router\n",
      );
      assert.ok(
        shared?.trim() && vite?.trim() && next?.trim(),
        locale + ": incomplete installation guide",
      );
      return { locale, ...resource, guide: { shared, vite, next } };
    }),
  );
  async function route(
    file: string,
    page: SiteProps["page"],
    info: {
      title: string;
      description: string;
      data?: SiteProps["data"];
    },
  ) {
    for (const { locale, ui, guide, descriptions } of languages) {
      const prefix = localePrefix(locale);
      const localTitle = {
        home: "AriaX — " + ui.heroTitle.replaceAll("\n", " "),
        installation: ui.Installation + " · AriaX",
        components: ui.Components + " · AriaX",
        component: info.title,
        "not-found": ui["Page not found"] + " · AriaX",
      }[page];
      const localSummary = info.data
        ? descriptions[info.data.slug]
        : page === "home"
          ? ui[
              "The look of shadcn/ui, built with React Aria and StyleX. Install each component as editable source."
            ]
          : page === "installation"
            ? ui["Installation guide"]
            : ui["Component examples and source"];
      const props: SiteProps = {
        assetBase: base,
        base: base + prefix,
        locale,
        messages: ui,
        ...(page === "home" ? { homeExamples } : {}),
        page,
        nav: nav.map((item) => ({
          ...item,
          description: descriptions[item.slug],
        })),
        ...(info.data
          ? {
              data: { ...info.data, description: descriptions[info.data.slug] },
              previewLayouts: Object.fromEntries(
                info.data.blocks.flatMap((block) =>
                  block.kind === "preview"
                    ? [
                        [
                          block.name,
                          {
                            layout:
                              previewLayouts.layouts[
                                previewLayouts.examples[block.name] ?? 0
                              ],
                            documented: Object.hasOwn(
                              previewLayouts.examples,
                              block.name,
                            ),
                          },
                        ],
                      ]
                    : [],
                ),
              ),
            }
          : {}),
        ...(page === "installation" ? { guide } : {}),
      };
      const markup = renderToString(createElement(Site, props));
      const theme =
        'try{const mode=localStorage.getItem("ariax-theme");document.documentElement.classList.toggle("dark",mode==="dark"||((mode===null||mode==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))}catch{}';
      const forwardOldManager =
        page === "home"
          ? `<script>if(new URLSearchParams(location.search).has("path"))location.replace(${safeJson(base + "iframe.html")}+location.search)</script>`
          : "";
      await write(
        prefix + file,
        `<!doctype html>
<html lang="${locale}" data-ariax-themed>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${base}fonts/${locale === "ja-JP" ? "pretendard-jp" : "pretendard"}/font.css">
<meta name="description" content="${escapeHtml(localSummary)}">
<title>${escapeHtml(localTitle)}</title>
<script>${theme}</script>
${forwardOldManager}
<script>
(() => {
  const url = new URL(location.href);
  if (${page === "home"} && url.searchParams.has("path")) return;
  const requested = url.searchParams.get("lang");
  let preferred;
  try { preferred = localStorage.getItem("ariax-language"); } catch {}
  const locales = ${safeJson(locales)};
  if (locales.includes(requested)) {
    preferred = requested;
    try { localStorage.setItem("ariax-language", requested); } catch {}
    url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }
  const choices = [navigator.language, ...(navigator.languages || [])];
  const detected = choices.map(tag => locales.find(locale => locale.split("-")[0] === tag.toLowerCase().split("-")[0])).find(Boolean);
  const target = locales.includes(preferred) ? preferred : detected;
  if (${locale === defaultLocale && page !== "not-found"} && target && target !== ${safeJson(defaultLocale)}) {
    url.pathname = ${safeJson(base)} + target.split("-")[0] + "/" + url.pathname.slice(${base.length});
    location.replace(url);
    return;
  }
  ${tagManagerId ? `
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = ${safeJson("https://www.googletagmanager.com/gtm.js?id=" + tagManagerId)};
  document.head.appendChild(tag);` : ""}
})();
</script>
${styles}
${(page === "component" || page === "home") ? `<link rel="stylesheet" href="${base}preview-layout.css">` : ""}
${script}
</head>
<body>
<div id="app">${markup}</div>
<script id="site-props" type="application/json">${safeJson(props)}</script>
</body>
</html>
`,
      );
    }
  }

  await route("index.html", "home", {
    title: "AriaX — shadcn/ui components styled with StyleX",
    description:
      "Editable React Aria components with StyleX. Build accessible interfaces without Tailwind.",
  });
  await route("docs/installation/index.html", "installation", {
    title: "Installation · AriaX",
    description: "Install AriaX in a Vite React and TypeScript project.",
  });
  await route("docs/components/index.html", "components", {
    title: "Components · AriaX",
    description:
      "Browse and search the AriaX component catalog and interactive examples.",
  });
  await route("404.html", "not-found", {
    title: "Page not found · AriaX",
    description: "The requested AriaX page was not found.",
  });
  for (const data of catalog) {
    await route(`docs/components/${data.slug}/index.html`, "component", {
      title: `${data.title} · AriaX`,
      description: data.description,
      data,
    });
  }
  // The pinned Toast page directs readers to its replacement, Sonner.
  for (const locale of locales) {
    const prefix = localePrefix(locale);
    const target = base + prefix + "docs/components/sonner/";
    await write(
      prefix + "docs/components/toast/index.html",
      `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>Sonner · AriaX</title><a href="${target}">Sonner</a></html>`,
    );
  }
  console.log(
    `Generated ${locales.length * (catalog.length + 4)} static pages in ${output}`,
  );
}

await main();
