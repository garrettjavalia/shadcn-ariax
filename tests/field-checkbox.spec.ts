import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";

for (const theme of ["light", "dark"])
  test(`real Field and Checkbox composition / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      await Promise.all(
        [
          [a, upstreamURL],
          [b, stylexURL],
        ].map(async ([page, url]) => {
          await (page as typeof a).goto(
            `${url}/iframe.html?id=components-checkbox--demo&viewMode=story&globals=theme:${theme}`,
          );
          await expect(
            (page as typeof a).locator("#parity-root"),
          ).toBeVisible();
        }),
      );
      await compare(a, b, info, "initial");
      for (const page of [a, b])
        await page
          .getByText("Accept terms and conditions", { exact: true })
          .first()
          .click();
      for (const page of [a, b])
        await expect(page.getByRole("checkbox").nth(0)).toBeChecked();
      await compare(a, b, info, "label-selected");
      for (const page of [a, b])
        await page.getByRole("checkbox").nth(3).focus();
      await compare(a, b, info, "choice-focused");
      for (const page of [a, b]) await page.keyboard.press("Space");
      for (const page of [a, b])
        await expect(page.getByRole("checkbox").nth(3)).toBeChecked();
      await compare(a, b, info, "choice-selected-focus");
      for (const page of [a, b])
        await expect(page.getByRole("checkbox").nth(2)).toBeDisabled();
    } finally {
      await context.close();
    }
  });
