import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";

test("Breadcrumb official document and registry examples are covered", async ({
  request,
}) => {
  const document = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/breadcrumb.mdx",
    "utf8",
  );
  const names = [
    ...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(names).toHaveLength(7);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of names)
    expect(
      index.entries["components-breadcrumb--" + name.slice(11)]?.tags,
      name,
    ).toContain("parity");
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/breadcrumb-example.tsx",
    "utf8",
  );
  const registry: Record<string, string> = {
    BreadcrumbBasic: "registry-basic",
    BreadcrumbWithDropdown: "registry-dropdown",
    BreadcrumbWithLink: "registry-link",
  };
  const functions = [...source.matchAll(/^function (Breadcrumb\w+)\(/gm)].map(
    (match) => match[1],
  );
  expect(functions.sort()).toEqual(Object.keys(registry).sort());
  for (const name of functions)
    expect(
      index.entries["components-breadcrumb--" + registry[name]]?.tags,
      name,
    ).toContain("parity");
});

for (const theme of ["light", "dark"]) {
  test(`Breadcrumb real dropdown, link interaction and RTL / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of ["demo", "dropdown", "rtl", "registry-dropdown"]) {
        await Promise.all(
          (
            [
              [a, upstreamURL],
              [b, stylexURL],
            ] as const
          ).map(async ([page, url]) => {
            await page.goto(
              `${url}/iframe.html?id=components-breadcrumb--${story}&globals=theme:${theme}`,
            );
            await expect(page.locator("#parity-root")).toBeVisible();
          }),
        );
        for (const page of [a, b])
          await page.locator('[data-slot="breadcrumb-link"]').first().hover();
        await compare(a, b, info, story + "-link-hover");
        for (const page of [a, b]) {
          await page.getByRole("button").click();
          await expect(page.getByRole("menu")).toBeVisible();
          await page.getByRole("menuitem").nth(1).hover();
        }
        await compare(a, b, info, story + "-menu-hover");
        for (const page of [a, b]) {
          await page.keyboard.press("Escape");
          await expect(page.getByRole("menu")).toBeHidden();
        }
        await compare(a, b, info, story + "-close");
      }
    } finally {
      await context.close();
    }
  });
  test(`Breadcrumb collection current item and customization / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of ["collection", "customization", "link"]) {
        await Promise.all(
          (
            [
              [a, upstreamURL],
              [b, stylexURL],
            ] as const
          ).map(async ([page, url]) => {
            await page.goto(
              `${url}/iframe.html?id=components-breadcrumb--${story}&globals=theme:${theme}`,
            );
            await expect(page.locator("#parity-root")).toBeVisible();
          }),
        );
        if (story === "collection")
          for (const page of [a, b]) {
            await expect(
              page.locator('[data-slot="breadcrumb-separator"]'),
            ).toHaveCount(1);
            await page.getByRole("button", { name: "Append" }).click();
            await expect(
              page.locator('[data-slot="breadcrumb-separator"]'),
            ).toHaveCount(2);
            await expect(page.locator('[aria-current="page"]')).toHaveText(
              "Current",
            );
          }
        if (story === "customization")
          for (const page of [a, b]) {
            await expect(
              page.locator('[data-slot="breadcrumb-item"]').last(),
            ).toHaveCSS("font-size", "22px");
            await page.getByRole("button", { name: "Resize" }).click();
            await expect(
              page.locator('[data-slot="breadcrumb-item"]').last(),
            ).toHaveCSS("font-size", "26px");
          }
        for (const page of [a, b])
          await page.locator('[data-slot="breadcrumb-link"]').first().focus();
        await compare(a, b, info, story + "-focus");
        if (story === "link") {
          for (const page of [a, b]) await page.keyboard.press("Enter");
          await compare(a, b, info, "custom-link-navigation");
        }
      }
    } finally {
      await context.close();
    }
  });
}
