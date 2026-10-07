import { deterministicStoryContextOptions } from "./story-pair";
import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  for (const kind of ["actions", "select", "input"])
    test(`Table official ${kind} composition / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext(
        deterministicStoryContextOptions(),
      );
      try {
        const pages = await Promise.all(
          [upstreamURL, stylexURL].map(async (url) => {
            const page = await context.newPage();
            await page.goto(
              `${url}/iframe.html?id=components-table--registry-${kind}&globals=theme:${theme}`,
            );
            await expect(page.locator("#parity-root")).toBeVisible();
            return page;
          }),
        );
        await compare(pages[0], pages[1], info, "initial");
        for (const page of pages) {
          if (kind === "actions") {
            await page
              .getByRole("button", { name: "Open menu" })
              .first()
              .click();
            await expect(page.getByRole("menu")).toBeVisible();
            await page
              .getByRole("menu")
              .evaluate((element) =>
                element.parentElement?.setAttribute("data-parity-portal", ""),
              );
          }
          if (kind === "select") {
            await page.locator('[data-slot="select-trigger"]').first().click();
            await expect(
              page.locator('[data-slot="select-content"]'),
            ).toBeVisible();
            await page
              .locator('[data-slot="select-content"]')
              .evaluate((element) =>
                element.setAttribute("data-parity-portal", ""),
              );
          }
          if (kind === "input") {
            await page.getByRole("spinbutton").first().fill("4");
            await expect(page.getByRole("spinbutton").first()).toHaveValue("4");
          }
        }
        await compare(pages[0], pages[1], info, "active");
        if (kind !== "input") {
          for (const page of pages) {
            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("Enter");
            if (kind === "actions") {
              await expect(page.getByRole("menu")).toHaveCount(0);
              await expect(
                page.getByRole("button", { name: "Open menu" }).first(),
              ).toBeFocused();
            } else {
              await expect(
                page.locator('[data-slot="select-content"]'),
              ).toHaveCount(0);
              await expect(
                page.locator('[data-slot="select-trigger"]').first(),
              ).toBeFocused();
            }
          }
          await compare(pages[0], pages[1], info, "keyboard");
        }
      } finally {
        await context.close();
      }
    });
