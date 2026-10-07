import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

// Standalone consumer document: no Storybook font override or Tailwind processor.
test("distributed reset applies font defaults and CSS variable overrides without Tailwind", async ({
  page,
}) => {
  await page.setContent(
    "<!doctype html><html><body><button>Button</button><code>Code</code></body></html>",
  );
  await page.addStyleTag({
    content: await readFile("src/ariax/styles/reset.css", "utf8"),
  });
  const fonts = () =>
    page.evaluate(() =>
      ["html", "button", "code"].map((selector) => {
        const css = getComputedStyle(document.querySelector(selector)!);
        return {
          family: css.fontFamily,
          features: css.fontFeatureSettings,
          variations: css.fontVariationSettings,
        };
      }),
    );
  const defaults = await fonts();
  expect(defaults[0].family).toContain("ui-sans-serif");
  expect(defaults[1]).toEqual(defaults[0]);
  expect(defaults[2].family).toContain("ui-monospace");
  for (const font of defaults) {
    expect(font.features).toBe("normal");
    expect(font.variations).toBe("normal");
  }
  await page.addStyleTag({
    content: ":root { --font-sans: Arial; --font-mono: monospace; }",
  });
  const overrides = await fonts();
  expect(overrides[0]).toEqual({
    family: "Arial",
    features: "normal",
    variations: "normal",
  });
  expect(overrides[1]).toEqual(overrides[0]);
  expect(overrides[2]).toEqual({
    family: "monospace",
    features: "normal",
    variations: "normal",
  });
});
