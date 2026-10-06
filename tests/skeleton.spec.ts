import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { stylexPort } from "./servers";
const examples: Record<string, string> = {
  "skeleton-demo": "demo",
  "skeleton-avatar": "avatar",
  "skeleton-card": "card",
  "skeleton-text": "text",
  "skeleton-form": "form",
  "skeleton-table": "table",
  "skeleton-rtl": "rtl",
};
test("every official Skeleton documentation example has a parity story", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/skeleton.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  const index = await (
    await request.get(`http://127.0.0.1:${stylexPort}/index.json`)
  ).json();
  expect(names.length).toBeGreaterThan(0);
  for (const name of names)
    expect(
      index.entries[`components-skeleton--${examples[name]}`]?.tags,
      name,
    ).toContain("parity");
});

test("Skeleton pulse preserves opacity at start, midpoint and cycle end", async ({
  browser,
}) => {
  const { upstreamPort } = await import("./servers");
  const samples = await Promise.all(
    [upstreamPort, stylexPort].map(async (port) => {
      const page = await browser.newPage();
      try {
        await page.goto(
          `http://127.0.0.1:${port}/iframe.html?id=components-skeleton--usage&viewMode=story`,
        );
        await expect(page.locator('[data-slot="skeleton"]')).toBeVisible();
        return await page
          .locator('[data-slot="skeleton"]')
          .evaluate((element) => {
            const animation = element.getAnimations()[0];
            if (!animation) throw new Error("Skeleton must animate");
            animation.pause();
            return [0, 1000, 2000].map((time) => {
              animation.currentTime = time;
              return Number(getComputedStyle(element).opacity);
            });
          });
      } finally {
        await page.close();
      }
    }),
  );
  expect(samples).toEqual([
    [1, 0.5, 1],
    [1, 0.5, 1],
  ]);
});
