import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { stylexURL } from "./servers";
import { compare } from "./compare";
test("Badge official documentation coverage", async ({ request }) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/badge.mdx",
    "utf8",
  );
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  const examples = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="badge-([^"]+)"/g),
  ];
  expect(examples.length).toBeGreaterThan(0);
  for (const match of examples)
    expect(index.entries[`components-badge--${match[1]}`]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of ["states", "interaction"])
    test(`Badge hover and keyboard focus / ${story} / ${theme}`, async ({
      browser,
    }, info) => {
      const { context, pages } = await createStoryPair(
        browser,
        {
          viewport: { width: 1000, height: 900 },
        },
        async (page, url) => {
          await page.goto(
            `${url}/iframe.html?id=components-badge--${story}&viewMode=story&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
        },
      );
      try {
        for (let i = 0; i < 6; i++) {
          await Promise.all(
            pages.map((p) => p.locator('[data-slot="badge"]').nth(i).hover()),
          );
          await compare(pages[0], pages[1], info, `hover-${i}`);
          await Promise.all(
            pages.map(async (p) => {
              await p.mouse.move(0, 0);
              await p.keyboard.press("Tab");
              await p.locator('[data-slot="badge"]').nth(i).focus();
              await expect(
                p.locator('[data-slot="badge"]').nth(i),
              ).toBeFocused();
              expect(
                await p
                  .locator('[data-slot="badge"]')
                  .nth(i)
                  .evaluate((e) => e.matches(":focus-visible")),
              ).toBe(true);
            }),
          );
          await compare(pages[0], pages[1], info, `focus-${i}`);
        }
      } finally {
        await context.close();
      }
    });
