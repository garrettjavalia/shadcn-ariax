import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { cn } from "cn";
import { compile } from "tailwindcss";
import postcss from "postcss";

const require = createRequire(import.meta.url);
export type PreviewLayout = {
  preview: string;
  outer: string;
  align: string;
  chromeless: boolean;
  block: boolean;
  direction: string;
};

// PreviewWrapper in the pinned upstream component-preview-tabs.tsx.
const wrapper =
  "preview relative flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-start data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0 sm:data-[align=end]:items-end";
const defaultLayout: PreviewLayout = {
  preview: wrapper,
  outer: "",
  align: "center",
  chromeless: false,
  block: false,
  direction: "ltr",
};

export async function writePreviewLayouts(root: string, output: string) {
  const docs = join(
    root,
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria",
  );
  const layouts: PreviewLayout[] = [defaultLayout];
  const examples: Record<string, number> = {};
  const layoutIds = new Map([[JSON.stringify(defaultLayout), 0]]);
  const candidates = new Set(wrapper.split(/\s+/));
  for (const file of await readdir(docs)) {
    if (!file.endsWith(".mdx")) continue;
    const source = await readFile(join(docs, file), "utf8");
    for (const [tag] of source.matchAll(/<ComponentPreview\b[\s\S]*?\/>/g)) {
      const attrs = Object.fromEntries(
        Array.from(
          tag.matchAll(/\s([\w]+)\s*=\s*(["'])([\s\S]*?)\2/g),
          ([, key, , value]) => [key, value],
        ),
      );
      if (!attrs.name || Object.hasOwn(examples, attrs.name)) continue;
      const layout = {
        preview: cn(wrapper, attrs.previewClassName),
        outer: attrs.className ?? "",
        align: attrs.align ?? "center",
        block: attrs.type === "block",
        chromeless: /\schromeLessOnMobile(?:\s|\/|=\{true\})/.test(tag),
        direction: attrs.direction ?? "ltr",
      };
      for (const token of (layout.outer + " " + layout.preview).split(/\s+/))
        if (token) candidates.add(token);
      const key = JSON.stringify(layout);
      let id = layoutIds.get(key);
      if (id === undefined) {
        id = layouts.push(layout) - 1;
        layoutIds.set(key, id);
      }
      examples[attrs.name] = id;
    }
  }
  // The utilities below style only the surrounding documentation preview.
  // No Tailwind reset or runtime is loaded into the component registry.
  const theme = await readFile(
    require.resolve("tailwindcss/theme.css"),
    "utf8",
  );
  const compiler = await compile(
    theme +
      "\n@theme inline { --color-surface: var(--site-preview-surface); --color-background: var(--background); }\n@custom-variant dark (&:is(.dark *));\n@tailwind utilities;",
  );
  const tokens = await import(
    pathToFileURL(
      join(root, "generated/upstream/shadcn/apps/v4/registry/themes.ts"),
    ).href
  );
  type Theme = {
    name: string;
    cssVars: Record<"light" | "dark", Record<string, string>>;
  };
  const themes = (tokens.THEMES as Theme[]).filter((t) =>
    candidates.has("theme-" + t.name),
  );
  const colors = themes
    .flatMap((theme) =>
      (["light", "dark"] as const).map((mode) => {
        const declarations = Object.entries(theme.cssVars[mode])
          .map(([key, value]) => "--" + key + ":" + value)
          .join(";");
        return (
          (mode === "dark" ? "html.dark " : "") +
          ":where(.ariax-preview-surface) .theme-" +
          theme.name +
          "{" +
          declarations +
          "}"
        );
      }),
    )
    .join("\n");
  const frameStyles = await readFile(
    join(root, "site/preview-layout.css"),
    "utf8",
  );
  // Tailwind emits nested selectors for responsive and data variants. Scope
  // their top-level rule once, preserving the nested selectors as compiled.
  const utilitySheet = postcss.parse(compiler.build([...candidates]));
  utilitySheet.walkRules((rule) => {
    for (
      let parent: import("postcss").Node | undefined = rule.parent;
      parent && parent.type !== "root";
      parent = parent.parent
    ) {
      if (
        parent.type === "rule" ||
        (parent.type === "atrule" &&
          "name" in parent &&
          String(parent.name).endsWith("keyframes"))
      )
        return;
    }
    rule.selectors = rule.selectors.map((selector) =>
      selector === ":root" || selector === ":host"
        ? ":where(.ariax-preview-surface)"
        : ":where(.ariax-preview-surface) " + selector,
    );
  });
  const css = frameStyles + "\n" + utilitySheet.toString() + colors;
  await writeFile(join(output, "preview-layout.css"), css);
  return { layouts, examples };
}
