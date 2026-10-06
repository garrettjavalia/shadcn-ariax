import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";

test("AspectRatio official previews all have parity stories", async ({
  request,
}) => {
  const document = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/aspect-ratio.mdx",
    "utf8",
  );
  const names = [
    ...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  expect(names.length).toBeGreaterThan(0);
  for (const name of names)
    expect(
      index.entries[
        `components-aspectratio--${name.replace("aspect-ratio-", "")}`
      ]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  test(`AspectRatio updates ratio and preserves dynamic width with inline style / ${theme}`, async ({
    context,
  }, info) => {
    const a = await context.newPage();
    const b = await context.newPage();
    await Promise.all(
      [
        [a, upstreamURL],
        [b, stylexURL],
      ].map(async ([page, url]) => {
        const p = page as typeof a;
        await p.goto(
          `${url}/iframe.html?id=components-aspectratio--customized&viewMode=story&globals=theme:${theme}`,
        );
        await p.getByRole("button", { name: "Change ratio" }).click();
        const ratio = p.locator("#custom-ratio");
        await expect(ratio).toHaveCSS("width", "240px");
        await expect(ratio).toHaveCSS("height", "240px");
        await expect(ratio).toHaveAttribute("aria-label", "Preview");
        await expect(ratio).toHaveAttribute("data-example", "dynamic");
      }),
    );
    await compare(a, b, info, `aspect-ratio-updated-${theme}`);
  });
