import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("Typography official intrinsic examples all have parity stories and no fake upstream UI", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/typography.mdx",
    "utf8",
  );
  const examples = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(examples).toHaveLength(15);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of examples)
    expect(
      index.entries[
        `components-typography--${name.replace("typography-", "").replace(/^h([1-4])$/, "h-$1")}`
      ]?.tags,
      name,
    ).toContain("parity");
  const registry = await (
    await request.get(stylexURL + "/r/typography.json")
  ).json();
  expect(registry.type).toBe("registry:file");
  expect(
    registry.files.some(
      (file: { target: string }) =>
        file.target === "@ui/typography.recipe.stylex.ts",
    ),
  ).toBe(true);
  expect(
    registry.files.some(
      (file: { type: string }) => file.type === "registry:ui",
    ),
  ).toBe(false);
  const marker = JSON.parse(
    await readFile(
      "generated/reference/aria-nova/.install-complete.json",
      "utf8",
    ),
  );
  expect(marker.inputs.components).not.toContain("typography");
});
for (const theme of ["light", "dark"])
  test(`Typography intrinsic selector conditions / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      await Promise.all(
        pages.map((page, i) =>
          page.goto(
            `${i ? stylexURL : upstreamURL}/iframe.html?id=components-typography--conditions&globals=theme:${theme}`,
          ),
        ),
      );
      for (const page of pages) {
        await expect(page.locator("article")).toHaveCount(2);
        for (const article of await page.locator("article").all()) {
          expect(
            await article
              .locator("[data-case=paragraphs] p")
              .evaluateAll((nodes) =>
                nodes.map((node) => getComputedStyle(node).marginTop),
              ),
          ).toEqual(["0px", "24px"]);
          expect(
            await article
              .locator("[data-case=first-heading] h2")
              .evaluate((node) => getComputedStyle(node).marginTop),
          ).toBe("0px");
          expect(
            await article
              .locator("[data-case=following-heading] h2")
              .evaluate((node) => getComputedStyle(node).marginTop),
          ).toBe("40px");
          expect(
            await article
              .locator("th")
              .evaluateAll((nodes) =>
                nodes.map((node) => getComputedStyle(node).textAlign),
              ),
          ).toEqual(["start", "center", "end"]);
          expect(
            await article
              .locator("li")
              .evaluateAll((nodes) =>
                nodes.map((node) => getComputedStyle(node).marginTop),
              ),
          ).toEqual(["8px", "8px"]);
        }
      }
      await compare(pages[0], pages[1], info, "conditions");
    } finally {
      await context.close();
    }
  });
test("Typography dynamic xstyle variables survive and native style takes precedence", async ({
  browser,
}, info) => {
  const context = await browser.newContext();
  const pages = await Promise.all([context.newPage(), context.newPage()]);
  try {
    await Promise.all(
      pages.map((page, i) =>
        page.goto(
          `${i ? stylexURL : upstreamURL}/iframe.html?id=components-typography--native-overrides`,
        ),
      ),
    );
    for (const page of pages) {
      await expect(page.locator("#parity-root h1")).toBeVisible();
      expect(
        await page.locator("#parity-root h1").evaluate((node) => {
          const css = getComputedStyle(node);
          return [css.fontSize, css.fontWeight, css.lineHeight, css.color];
        }),
      ).toEqual(["16px", "400", "28px", "rgb(123, 45, 67)"]);
    }
    await compare(pages[0], pages[1], info, "native-overrides");
  } finally {
    await context.close();
  }
});
