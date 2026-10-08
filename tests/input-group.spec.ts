import { deterministicStoryContextOptions } from "./story-pair";
import { test, expect } from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
for (const theme of ["light", "dark"])
  test(`Input Group addon focus and editing / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(1000, { colorScheme: "light" }),
    );
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      await Promise.all(
        [a, b].map(async (page, i) => {
          await page.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-input-group--align&viewMode=story&globals=theme:${theme}`,
          );
          await page.locator('[data-slot="input-group-addon"]').first().click();
          await expect(
            page.getByRole("textbox", { name: "inline-start", exact: true }),
          ).toBeFocused();
        }),
      );
      await compare(a, b, info, "addon-focus");
      await Promise.all(
        [a, b].map((page) =>
          page
            .getByRole("textbox", { name: "inline-start", exact: true })
            .fill("Search query"),
        ),
      );
      await compare(a, b, info, "edit");
      await Promise.all(
        [a, b].map(async (page, i) => {
          await page.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-input-group--buttons&viewMode=story&globals=theme:${theme}`,
          );
          await page
            .getByRole("button", { name: "Send", exact: true })
            .first()
            .click();
          await expect(
            page.getByRole("button", { name: "Send", exact: true }).first(),
          ).toBeFocused();
        }),
      );
      await compare(a, b, info, "button-focus");
      for (const story of ["textarea", "custom", "inline-style"]) {
        await Promise.all(
          [a, b].map(async (page, i) => {
            await page.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-input-group--${story}&viewMode=story&globals=theme:${theme}`,
            );
            await page
              .getByRole("textbox")
              .first()
              .fill("First line\nSecond line\nThird line");
          }),
        );
        await compare(a, b, info, `${story}-editing`);
      }
    } finally {
      await context.close();
    }
  });

test("Input Group native style overrides retain dynamic StyleX variables", async ({
  page,
}) => {
  await page.goto(
    `${stylexURL}/iframe.html?id=components-input-group--customized&viewMode=story`,
  );
  const group = page.locator('[data-slot="input-group"]');
  await expect(group).toHaveCSS("width", "240px");
  await expect(page.getByRole("textbox")).toHaveCSS("font-size", "18px");
  expect(await group.getAttribute("style")).toContain("--");
});
for (const theme of ["light", "dark"])
  test(`Input Group native keyboard focus-visible button ring / ${theme}`, async ({
    browser,
  }, info) => {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(() => browser.newPage()),
    );
    try {
      await Promise.all(
        pages.map((page, i) =>
          page.goto(
            `${i ? stylexURL : upstreamURL}/iframe.html?id=components-input-group--buttons&globals=theme:${theme}`,
          ),
        ),
      );
      for (const page of pages) {
        await expect(
          page.getByRole("button", { name: "Send", exact: true }).first(),
        ).toBeVisible();
        await page
          .getByRole("button", { name: "Send", exact: true })
          .first()
          .focus();
        await page.keyboard.press("ArrowRight");
        await expect(
          page.getByRole("button", { name: "Send", exact: true }).first(),
        ).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "native-keyboard-button-ring");
      for (const page of pages) await page.keyboard.press("Tab");
      await compare(pages[0], pages[1], info, "native-keyboard-button-blur");
    } finally {
      await Promise.all(pages.map((page) => page.close()));
    }
  });
