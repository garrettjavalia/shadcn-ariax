import { test, expect } from "@playwright/test";
import { stylexURL } from "./servers";
// Appearance/attributes against upstream are covered by shared parity stories.
test("Separator retains native semantics and forwards public DOM props", async ({
  page,
}) => {
  await page.goto(
    `${stylexURL}/iframe.html?id=components-separator--semantics&viewMode=story`,
  );
  const separators = page.locator('[data-slot="separator"]');
  await expect(separators).toHaveCount(5);
  await expect(page.locator("hr#default-separator")).toHaveAttribute(
    "aria-label",
    "Sections",
  );
  await expect(
    page.getByRole("separator", { name: "Horizontal sections" }),
  ).not.toHaveAttribute("aria-orientation");
  await expect(
    page.getByRole("separator", { name: "Columns" }),
  ).toHaveAttribute("aria-orientation", "vertical");
  await expect(separators.nth(3)).toHaveJSProperty("tagName", "DIV");
  await expect(separators.nth(4)).toHaveAttribute("slot", "divider");
});
