import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
import { controlAvatarAssets, waitAvatarAssets } from "./avatar-assets";
test("Item official document and registry examples map to real compositions", async ({
  request,
}) => {
  const document = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/item.mdx",
    "utf8",
  );
  const examples = [
    ...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(examples).toHaveLength(11);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of examples)
    expect(
      index.entries["components-item--" + name.slice(5)]?.tags,
      name,
    ).toContain("parity");
  const registry = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/item-example.tsx",
    "utf8",
  );
  const names = [...registry.matchAll(/^function (\w+)\(/gm)].map(
    (match) => match[1],
  );
  expect(names).toHaveLength(24);
  for (const name of names)
    expect(
      index.entries[
        "components-item--registry-" +
          name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
      ]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  test(`Item link states, real dropdown and style precedence / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    await controlAvatarAssets(context);
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of ["link", "dropdown", "customization"]) {
        await Promise.all(
          (
            [
              [a, upstreamURL],
              [b, stylexURL],
            ] as const
          ).map(async ([page, url]) => {
            await page.goto(
              `${url}/iframe.html?id=components-item--${story}&globals=theme:${theme}`,
            );
            await expect(page.locator("#parity-root")).toBeVisible();
            await waitAvatarAssets(page);
          }),
        );
        if (story === "link") {
          for (const page of [a, b])
            await page.getByRole("link").first().hover();
          await compare(a, b, info, "link-hover");
          for (const page of [a, b]) {
            await page.getByRole("link").first().focus();
            await page.keyboard.press("Shift+Tab");
            await page.keyboard.press("Tab");
          }
          await compare(a, b, info, "link-keyboard-focus");
        } else if (story === "dropdown") {
          for (const page of [a, b]) {
            await page.getByRole("button", { name: "Select" }).click();
            await expect(page.getByRole("menu")).toBeVisible();
            await waitAvatarAssets(page);
          }
          await compare(a, b, info, "dropdown-open");
          for (const page of [a, b])
            await page.getByRole("menuitem").first().hover();
          await compare(a, b, info, "dropdown-hover");
          for (const page of [a, b]) await page.keyboard.press("Escape");
          await compare(a, b, info, "dropdown-closed");
        } else {
          for (const page of [a, b]) {
            await expect(page.getByTestId("custom-item")).toHaveCSS(
              "width",
              "340px",
            );
            await page.getByTestId("custom-item").click();
            await expect(page.getByTestId("custom-item")).toHaveCSS(
              "width",
              "380px",
            );
          }
          await compare(a, b, info, "custom-native-priority");
        }
      }
    } finally {
      await context.close();
    }
  });
