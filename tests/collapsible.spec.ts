import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("all official Collapsible previews and snippets have parity stories", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/collapsible.mdx",
    "utf8",
  );
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of [...doc.matchAll(/name="collapsible-([^"]+)"/g)]
    .map((match) => match[1])
    .concat("usage", "controlled"))
    expect(index.entries["components-collapsible--" + name]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "basic",
    "settings",
    "file-tree",
    "rtl",
    "usage",
    "controlled",
  ])
    test(`Collapsible ${story} states / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext();
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-collapsible--${story}&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          return page;
        }),
      );
      try {
        await compare(pages[0], pages[1], info, "initial");
        await Promise.all(
          pages.map((page) => page.getByRole("button").first().hover()),
        );
        await compare(pages[0], pages[1], info, "hover");
        for (const page of pages) {
          await page.mouse.move(0, 0);
          await page.keyboard.press("Tab");
        }
        await compare(pages[0], pages[1], info, "focus");
        await Promise.all(
          pages.map((page) => page.getByRole("button").first().click()),
        );
        for (const page of pages)
          await expect(page.getByRole("button").first()).toHaveAttribute(
            "aria-expanded",
            "true",
          );
        await compare(pages[0], pages[1], info, "open");
        if (story === "file-tree") {
          await Promise.all(
            pages.map((page) =>
              page
                .getByRole("button", {
                  name: "ui",
                  exact: true,
                })
                .click(),
            ),
          );
          await compare(pages[0], pages[1], info, "nested-open");
          for (const page of pages)
            await expect(
              page.getByRole("button", {
                name: "button.tsx",
                exact: true,
              }),
            ).toBeVisible();
          await Promise.all(
            pages.map((page) =>
              page
                .getByRole("tab", {
                  name: "Outline",
                })
                .click(),
            ),
          );
          await compare(pages[0], pages[1], info, "actual-tabs-selection");
        }
        if (story === "settings") {
          for (const page of pages) {
            await page.getByRole("textbox").last().fill("16");
          }
          await compare(pages[0], pages[1], info, "actual-input-edited");
        }
        await Promise.all(
          pages.map((page) => page.getByRole("button").first().click()),
        );
        await compare(pages[0], pages[1], info, "closed");
        for (const page of pages) {
          await page.getByRole("button").first().focus();
          await page.keyboard.press("Space");
        }
        await compare(pages[0], pages[1], info, "keyboard-open");
        for (const page of pages)
          await expect(page.getByRole("button").first()).toHaveAttribute(
            "aria-expanded",
            "true",
          );
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Collapsible native style and disabled state / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-collapsible--native&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        return page;
      }),
    );
    try {
      await compare(pages[0], pages[1], info, "initial");
      for (const page of pages) {
        await expect(
          page.locator('[data-slot="collapsible"]').first(),
        ).toHaveCSS("width", "240px");
        await expect(
          page.getByRole("button", {
            name: "Disabled trigger",
          }),
        ).toBeDisabled();
        await page
          .getByRole("button", {
            name: "Native trigger",
          })
          .hover();
      }
      await compare(pages[0], pages[1], info, "hover");
      await Promise.all(
        pages.map((page) =>
          page
            .getByRole("button", {
              name: "Native trigger",
            })
            .click(),
        ),
      );
      await compare(pages[0], pages[1], info, "open");
      for (const page of pages) {
        await expect(page.locator("output")).toHaveText("true");
        await page.keyboard.press("Tab");
        await expect(
          page.getByRole("textbox", {
            name: "Panel input",
          }),
        ).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "focus-visible-within");
      await Promise.all(
        pages.map((page) =>
          page
            .getByRole("button", {
              name: "Native trigger",
            })
            .click(),
        ),
      );
      await compare(pages[0], pages[1], info, "closed");
      for (const page of pages)
        await expect(page.locator("output")).toHaveText("false");
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Collapsible original data-open conditions / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-collapsible--flags&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        return page;
      }),
    );
    try {
      await compare(pages[0], pages[1], info, "initial");
      for (const page of pages) {
        const roots = page.locator('[data-slot="collapsible"]');
        expect(
          await roots
            .nth(0)
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        ).not.toEqual(
          await roots
            .nth(1)
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        );
        expect(
          await roots
            .nth(0)
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        ).toEqual(
          await roots
            .nth(2)
            .evaluate((node) => getComputedStyle(node).backgroundColor),
        );
      }
    } finally {
      await context.close();
    }
  });
