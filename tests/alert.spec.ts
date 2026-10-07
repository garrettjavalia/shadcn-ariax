import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";

import { compare } from "./compare";
for (const theme of ["light", "dark"])
  test(`Alert links preserve hover and focus styles / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(
      browser,
      {
        viewport: { width: 1000, height: 900 },
      },
      async (page, url) => {
        await page.goto(
          `${url}/iframe.html?id=components-alert--content&viewMode=story&globals=theme:${theme}`,
        );
        await expect(page.locator("#content-alert")).toHaveAttribute(
          "role",
          "alert",
        );
      },
    );
    try {
      for (const index of [0, 1]) {
        await Promise.all(
          pages.map((page) =>
            page.locator("#content-alert a").nth(index).hover(),
          ),
        );
        await compare(pages[0], pages[1], info, `alert-link-${index}-hover`);
        await Promise.all(
          pages.map(async (page) => {
            await page.mouse.move(0, 0);
            await page.locator("#content-alert a").nth(index).focus();
          }),
        );
        await compare(pages[0], pages[1], info, `alert-link-${index}-focus`);
      }
      await Promise.all(
        pages.map(async (page) => {
          await page.mouse.move(0, 0);
          await page.evaluate(() => {
            document.documentElement.style.fontSize = "20px";
          });
        }),
      );
      await compare(pages[0], pages[1], info, "alert-rem-scaling");
    } finally {
      await context.close();
    }
  });

test("Alert links preserve the upstream hover capability condition on touch devices", async ({
  browser,
}, info) => {
  const { context, pages } = await createStoryPair(
    browser,
    {
      viewport: { width: 390, height: 900 },
      hasTouch: true,
      isMobile: true,
    },
    async (page, url) => {
      await page.goto(
        `${url}/iframe.html?id=components-alert--content&viewMode=story`,
      );
      await expect(page.locator("#content-alert")).toBeVisible();
      expect(
        await page.evaluate(() => matchMedia("(hover: hover)").matches),
      ).toBe(false);
      await page.locator("#content-alert a").nth(1).tap();
    },
  );
  try {
    await compare(pages[0], pages[1], info, "alert-touch-link");
  } finally {
    await context.close();
  }
});

for (const theme of ["light", "dark"])
  test(`Alert official RTL alignment and action direction / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(
      browser,
      {
        viewport: { width: 1000, height: 900 },
      },
      async (page, url) => {
        await page.goto(
          `${url}/iframe.html?id=components-alert--rtl-action&viewMode=story&globals=theme:${theme}`,
        );
        await expect(page.locator('[data-slot="alert"]')).toBeVisible();
      },
    );
    try {
      for (const page of pages) {
        const alert = page.locator('[data-slot="alert"]');
        await expect(alert).toHaveCSS("text-align", "start");
        await expect(alert).toHaveCSS("padding-left", "72px");
        await expect(alert).toHaveCSS("padding-right", "10px");
        await expect(page.locator('[data-slot="alert-action"]')).toHaveCSS(
          "left",
          "8px",
        );
      }
      await compare(pages[0], pages[1], info, "alert-rtl-action");
    } finally {
      await context.close();
    }
  });
