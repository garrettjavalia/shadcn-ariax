import { deterministicStoryContextOptions } from "./story-pair";
import { test, expect } from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
for (const theme of ["light", "dark"])
  test(`Kbd official button and input composition interactions / ${theme}`, async ({
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
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-kbd--in-button&viewMode=story&globals=theme:${theme}`,
          );
          await page.getByRole("button").click();
          await expect(page.getByRole("button")).toBeFocused();
        }),
      );
      await compare(a, b, info, "kbd-button-focused");
      await Promise.all(
        [a, b].map(async (page, i) => {
          await page.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-kbd--in-input-group&viewMode=story&globals=theme:${theme}`,
          );
          await page.locator('[data-slot="input-group-addon"]').last().click();
          await expect(page.getByRole("textbox")).toBeFocused();
          await page.getByRole("textbox").fill("Keyboard shortcut");
        }),
      );
      await compare(a, b, info, "kbd-input-group-edited");
    } finally {
      await context.close();
    }
  });
test("Kbd style retains dynamic variables and renders both primitives as kbd", async ({
  page,
}) => {
  await page.goto(
    `${stylexURL}/iframe.html?id=components-kbd--overrides&viewMode=story`,
  );
  const key = page.locator('[data-slot="kbd"]').first();
  await expect(key).toHaveCSS("width", "72px");
  await expect(key).toHaveCSS("height", "28px");
  await expect(key).toHaveCSS("border-radius", "10px");
  expect(await key.getAttribute("style")).toContain("--");
  expect(
    await page.locator('[data-slot="kbd-group"]').evaluate((el) => el.tagName),
  ).toBe("KBD");
  expect(await key.evaluate((el) => el.tagName)).toBe("KBD");
});

test("Kbd sans and Input Group mono preserve missing-token inheritance and defined tokens", async ({
  browser,
}, info) => {
  const context = await browser.newContext(
    deterministicStoryContextOptions(1000, { colorScheme: "light" }),
  );
  const a = await context.newPage(),
    b = await context.newPage();
  try {
    for (const [page, url] of [
      [a, upstreamURL],
      [b, stylexURL],
    ] as const) {
      await page.goto(
        `${url}/iframe.html?id=components-kbd--font-tokens&viewMode=story`,
      );
      await expect(page.getByTestId("sans-missing")).toHaveCSS(
        "font-family",
        "serif",
      );
      await expect(page.getByTestId("mono-missing")).toHaveCSS(
        "font-family",
        "serif",
      );
      await expect(page.getByTestId("sans-defined")).toHaveCSS(
        "font-family",
        '"Courier New", monospace',
      );
      await expect(page.getByTestId("mono-defined")).toHaveCSS(
        "font-family",
        '"Times New Roman", serif',
      );
    }
    await compare(a, b, info, "font-token-inheritance");
  } finally {
    await context.close();
  }
});
