import {
  deterministicStoryContextOptions,
  createStoryPair,
} from "./story-pair";
import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  test(`Table pointer selection, hover, keyboard and horizontal scroll / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(),
    );
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      await Promise.all(
        [
          [a, upstreamURL],
          [b, stylexURL],
        ].map(async ([page, url]) => {
          if (typeof page === "string") return;
          await page.goto(
            `${url}/iframe.html?id=components-table--selection&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          await page.getByRole("row").filter({ hasText: "INV001" }).click();
        }),
      );
      await compare(a, b, info, "table-selected");
      for (const page of [a, b]) {
        await page.getByRole("row").filter({ hasText: "INV002" }).hover();
      }
      await compare(a, b, info, "table-hover");
      for (const page of [a, b]) {
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Space");
      }
      await compare(a, b, info, "table-keyboard");
      await Promise.all(
        [
          [a, upstreamURL],
          [b, stylexURL],
        ].map(async ([page, url]) => {
          if (typeof page === "string") return;
          await page.goto(
            `${url}/iframe.html?id=components-table--scroll&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          await page
            .locator('[data-slot="table-container"]')
            .evaluate((e) => (e.scrollLeft = 150));
        }),
      );
      await compare(a, b, info, "table-scrolled");
    } finally {
      await context.close();
    }
  });

test("Table dynamic xstyle updates and user style precedence match upstream", async ({
  browser,
}, info) => {
  const context = await browser.newContext(deterministicStoryContextOptions());
  const a = await context.newPage();
  const b = await context.newPage();
  try {
    await Promise.all(
      (
        [
          [a, upstreamURL],
          [b, stylexURL],
        ] as const
      ).map(async ([page, url]) => {
        await page.goto(`${url}/iframe.html?id=components-table--customized`);
        await expect(page.locator("#parity-root")).toBeVisible();
        await page.getByRole("button", { name: "Resize" }).click();
      }),
    );
    await compare(a, b, info, "table-dynamic");
  } finally {
    await context.close();
  }
});

for (const theme of ["light", "dark"])
  for (const labels of [false, true])
    test(`official Checkbox/Table composition / ${theme} / labels=${labels}`, async ({
      browser,
    }, info) => {
      const { context, pages } = await createStoryPair(
        browser,
        deterministicStoryContextOptions(),
        async (page, url) => {
          await page.goto(
            `${url}/iframe.html?id=components-table--${labels ? "checkbox-labels" : "checkbox-selection"}&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
        },
      );
      const [a, b] = pages;
      try {
        for (const page of pages) {
          await page
            .locator('[data-slot="checkbox"]')
            .filter({ has: page.locator("#select-all-checkbox") })
            .click();
          await expect(page.getByRole("checkbox")).toHaveCount(5);
          for (const input of await page.getByRole("checkbox").all())
            await expect(input).toBeChecked();
        }
        await compare(a, b, info, "table-checkbox-select-all");
        for (const page of pages) {
          if (labels)
            await page.getByText("Select Sarah Chen", { exact: true }).click();
          else
            await page
              .locator('[data-slot="checkbox"]')
              .filter({ has: page.locator("#row-1-checkbox") })
              .click();
          await expect(page.locator("#row-1-checkbox")).not.toBeChecked();
          await expect(page.locator("#select-all-checkbox")).toHaveJSProperty(
            "indeterminate",
            true,
          );
        }
        await compare(a, b, info, "table-checkbox-individual");
        for (const page of pages) {
          await page.locator("#row-1-checkbox").focus();
          await page.keyboard.press("Space");
          await expect(page.locator("#row-1-checkbox")).toBeChecked();
        }
        await compare(a, b, info, "table-checkbox-keyboard");
      } finally {
        await context.close();
      }
    });
