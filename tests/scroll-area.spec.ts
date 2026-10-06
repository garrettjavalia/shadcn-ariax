import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("ScrollArea official document and registry examples are covered", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/scroll-area.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(names).toHaveLength(3);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of names)
    expect(
      index.entries["components-scroll-area--" + name.slice(12)]?.tags,
      name,
    ).toContain("parity");
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/scroll-area-example.tsx",
    "utf8",
  );
  const registry: Record<string, string> = {
    ScrollAreaVertical: "registry-vertical",
    ScrollAreaHorizontal: "registry-horizontal",
  };
  const functions = [...source.matchAll(/^function (ScrollArea\w+)\(/gm)].map(
    (match) => match[1],
  );
  expect(functions.sort()).toEqual(Object.keys(registry).sort());
  for (const name of functions)
    expect(
      index.entries["components-scroll-area--" + registry[name]]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  test(`ScrollArea native scrolling, focus and customization / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of [
        "demo",
        "rtl",
        "horizontal-demo",
        "both-axes",
        "customization",
      ]) {
        await Promise.all(
          (
            [
              [a, upstreamURL],
              [b, stylexURL],
            ] as const
          ).map(async ([page, url]) => {
            await page.goto(
              `${url}/iframe.html?id=components-scroll-area--${story}&globals=theme:${theme}`,
            );
            await expect(
              page.locator('[data-slot="scroll-area"]'),
            ).toBeVisible();
            await page
              .locator("img")
              .evaluateAll((images) =>
                Promise.all(
                  images.map((image) => (image as HTMLImageElement).decode()),
                ),
              );
          }),
        );
        if (story === "customization")
          for (const page of [a, b]) {
            await expect(page.locator('[data-slot="scroll-area"]')).toHaveCSS(
              "width",
              "244px",
            );
            await page.getByRole("button", { name: "Resize" }).click();
            await expect(page.locator('[data-slot="scroll-area"]')).toHaveCSS(
              "width",
              "324px",
            );
          }
        for (const page of [a, b])
          await page
            .locator('[data-slot="scroll-area"]')
            .evaluate((element) => {
              element.scrollTo({ top: 83, left: 117, behavior: "instant" });
            });
        await compare(a, b, info, story + "-scroll");
        if (story === "both-axes" || story === "customization") {
          for (const page of [a, b]) {
            await page.locator('[data-slot="scroll-area"]').focus();
            await page.keyboard.press("End");
            await expect
              .poll(() =>
                page
                  .locator('[data-slot="scroll-area"]')
                  .evaluate((element) => element.scrollTop),
              )
              .toBe(
                await page
                  .locator('[data-slot="scroll-area"]')
                  .evaluate(
                    (element) => element.scrollHeight - element.clientHeight,
                  ),
              );
          }
          await compare(a, b, info, story + "-keyboard-end");
        }
      }
    } finally {
      await context.close();
    }
  });
