import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { stylexURL } from "./servers";
test("Toggle official previews and usage are mapped", async ({ request }) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/toggle.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*name="toggle-([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(6);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of [...names, "usage"])
    expect(index.entries["components-toggle--" + name]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "outline",
    "text",
    "sizes",
    "disabled",
    "rtl",
    "usage",
    "customization",
    "conditions",
  ])
    test(`Toggle ${story} interaction / ${theme}`, async ({
      browser,
    }, info) => {
      const { context, pages } = await createStoryPair(
        browser,
        undefined,
        async (page, url) => {
          await page.goto(
            `${url}/iframe.html?id=components-toggle--${story}&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
        },
      );
      try {
        await compare(pages[0], pages[1], info, "initial");
        if (story === "disabled") {
          for (const page of pages)
            await expect(page.getByRole("button").first()).toBeDisabled();
          return;
        }
        const count = await pages[0].getByRole("button").count();
        for (let i = 0; i < count; i++) {
          for (const page of pages) {
            await page.getByRole("button").nth(i).hover();
          }
          await compare(pages[0], pages[1], info, `hover-${i}`);
          for (const page of pages) {
            await page.mouse.move(0, 0);
            await page.keyboard.press("Tab");
            await page.getByRole("button").nth(i).focus();
          }
          await compare(pages[0], pages[1], info, `focus-${i}`);
          for (const page of pages) {
            await page.getByRole("button").nth(i).click();
            await expect(page.getByRole("button").nth(i)).toHaveAttribute(
              "aria-pressed",
              "true",
            );
          }
          await compare(pages[0], pages[1], info, `selected-${i}`);
          for (const page of pages) {
            await page.keyboard.press("Space");
            await expect(page.getByRole("button").nth(i)).toHaveAttribute(
              "aria-pressed",
              "false",
            );
          }
          await compare(pages[0], pages[1], info, `keyboard-off-${i}`);
        }
      } finally {
        await context.close();
      }
    });
