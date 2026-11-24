import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { bundleExample } from "./bundle-example";
import { loadCatalog } from "./catalog";

test("publishes each supported variation with its own code and local dependencies", async () => {
  const root = await mkdtemp(join(tmpdir(), "ariax-catalog-"));
  const docs = "generated/upstream/shadcn/apps/v4/content/docs/components/aria";
  const save = async (file: string, data: string | object) => {
    const path = join(root, file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(
      path,
      typeof data === "string" ? data : JSON.stringify(data),
    );
  };
  const preview = (name: string, exportName: string, line: number) => ({
    component: "button",
    name,
    line,
    status: "mapped",
    storyId: "button--" + name,
    counterparts: [
      {
        stylexStoryId: "button--" + name,
        exportName,
        metaSource: "stories/button.stories.tsx",
      },
    ],
  });
  try {
    await Promise.all([
      save(
        "generated/upstream/shadcn/apps/v4/examples/aria/button-extra.tsx",
        "export default function Extra() {}",
      ),
      save(
        "stories/button-extra.tsx",
        "export function ExtraButton() { return <button>Extra</button>; }",
      ),
      save("registry.json", { items: [{ name: "button" }] }),
      save("upstream/source.json", { commit: "pinned" }),
      save("LICENSE", "AriaX license"),
      save("licenses/SHADCN-LICENSE.md", "shadcn/ui license"),
      save(docs + "/meta.json", { pages: ["toast", "button"] }),
      save(docs + "/toast.mdx", "---\ntitle: Toast\n---\nDeprecated upstream"),
      save(
        docs + "/button.mdx",
        "---\ntitle: Button\ndescription: Try a button.\n---\nUpstream-only settings",
      ),
      save("generated/original-stories/public/manifest.json", {
        version: 1,
        previews: [
          preview("demo", "Demo", 10),
          preview("demo", "Demo", 22),
          preview("solid", "Solid", 27),
        ],
      }),
      save(
        "stories/button.stories.tsx",
        [
          'import { Button } from "@button";',
          'import { ButtonDemo } from "./button-demo";',
          'import { ExtraButton } from "./button-extra";',
          'export default {title: "Components/Button"};',
          "export const Extra = {render: () => <ExtraButton />};",
          "export const Demo = {render: () => <ButtonDemo />};",
          'const variant = "default" as const;',
          "export const Solid = {render: () => <Button variant={variant}>Solid</Button>};",
          "export const Unrelated = {render: () => <span>Other story</span>};",
        ].join("\n"),
      ),
      save(
        "stories/button-demo.tsx",
        [
          'import { Button } from "@button";',
          'import { label } from "./labels";',
          "export function ButtonDemo() {return <Button>{label}</Button>;}",
          "export function Unused() {return <p>Another demo</p>;}",
        ].join("\n"),
      ),
      save("stories/labels.ts", 'export { label } from "./text";'),
      save("stories/text.ts", 'export const label = "Try it";'),
    ]);
    const catalog = await loadCatalog(root);
    assert.deepEqual(
      catalog.pages.map((page) => page.slug),
      ["button"],
    );
    const [page] = catalog.pages;
    assert.equal(page.description, "Try a button.");
    assert.equal(
      page.installCommand,
      "pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button",
    );
    const previews = page.blocks.filter((block) => block.kind === "preview");
    assert.equal(previews.length, page.blocks.length);
    assert.deepEqual(
      previews.map((block) => block.name),
      ["demo", "solid", "button-extra"],
    );
    const [demo, solid] = previews.map((block) => block.source!);
    assert.match(demo.code, /function ButtonDemo/);
    assert.match(demo.code, /@\/components\/ui\/button/);
    assert.match(demo.code, /const label = "Try it"/);
    assert.doesNotMatch(demo.code, /from ".*helpers/);
    assert.doesNotMatch(demo.code, /Unused|Another demo/);
    assert.match(solid.code, /const variant = "default" as const/);
    assert.doesNotMatch(solid.code, /ButtonDemo|Unrelated|Other story/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("links only the selected style and preserves an assigned resource", async () => {
  const code = await bundleExample([
    {
      path: "example.tsx",
      contents: `
      import { props } from "./styles";
      let resource: number | undefined;
      export default function Accordion() {
        return <div {...props("max")} data-parity-portal>{resource ??= 1}</div>;
      }`,
    },
    {
      path: "styles.ts",
      contents: `
      import * as stylex from "@stylexjs/stylex";
      const styles = stylex.create({ panel: { maxWidth: "32rem" }, other: { display: "grid" } });
      const lookup = { max: styles.panel, "": styles.other };
      export const props = (key: keyof typeof lookup) => ({ xstyle: lookup[key] });`,
    },
  ]);
  assert.match(code, /maxWidth: "32rem"/);
  assert.match(code, /xstyle=\{styles\.panel\}/);
  assert.match(code, /let resource: number/);
  assert.doesNotMatch(
    code,
    /data-parity|from "\.\/styles"|lookup|display: "grid"/,
  );
});
