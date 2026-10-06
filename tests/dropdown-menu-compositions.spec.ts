import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  test(`DropdownMenu official Dialog composition / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-dropdown-menu--registry-dialog&globals=theme:${theme}`,
          );
          await page.getByRole("button", { name: "Open Dialog" }).click();
          await expect(page.getByRole("dialog")).toBeVisible();
          await page
            .locator('[data-slot="dialog-overlay"]')
            .evaluate((node) => node.setAttribute("data-parity-portal", ""));
          return page;
        }),
      );
      await compare(pages[0], pages[1], info, "dialog-open");
      for (const page of pages) {
        await page.getByRole("button", { name: "Open Menu" }).click();
        await expect(page.getByRole("menu")).toBeVisible();
        await page
          .getByRole("menu")
          .evaluate((node) => node.setAttribute("data-parity-portal", ""));
      }
      await compare(pages[0], pages[1], info, "nested-menu-open");
      for (const page of pages) {
        await page.keyboard.press("Escape");
        await expect(page.getByRole("menu")).toHaveCount(0);
        await expect(
          page.getByRole("button", { name: "Open Menu" }),
        ).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "menu-closed-dialog-open");
      for (const page of pages) {
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        await expect(
          page.getByRole("button", { name: "Open Dialog" }),
        ).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "dialog-closed");
    } finally {
      await context.close();
    }
  });
