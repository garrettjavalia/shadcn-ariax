import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    test(`HoverCard official hover, placements and callbacks / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const { context, pages } = await createStoryPair(browser, {
        viewport: { width, height: 900 },
      });
      try {
        for (const name of [
          "demo-example",
          "sides",
          "rtl",
          "registry-sides",
          "usage",
          "delays",
          "positioning",
          "customized",
          "callback",
        ]) {
          const count =
            name === "rtl" || name === "registry-sides"
              ? 6
              : name === "sides"
                ? 4
                : 1;
          for (let n = 0; n < count; n++) {
            await Promise.all(
              pages.map((p, i) =>
                p.goto(
                  `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--${name}&viewMode=story&globals=theme:${theme}`,
                ),
              ),
            );
            await Promise.all(
              pages.map(async (p) => {
                await expect(p.locator("#parity-root")).toBeVisible();
                await p.mouse.move(0, 800);
                await p.locator("#parity-root button").nth(n).hover();
                await expect(
                  p.locator('[data-slot="hover-card-content"]'),
                ).toBeVisible();
              }),
            );
            await compare(pages[0], pages[1], info, `${name}-${n}-hover`);
            await Promise.all(pages.map((p) => p.mouse.move(0, 800)));
            await Promise.all(
              pages.map((p) =>
                expect(
                  p.locator('[data-slot="hover-card-content"]'),
                ).toBeHidden(),
              ),
            );
            await compare(pages[0], pages[1], info, `${name}-${n}-leave`);
          }
        }
      } finally {
        await context.close();
      }
    });
test("HoverCard official documentation and registry inventory", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/hover-card.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(4);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of new Set(names))
    expect(
      index.entries[
        `components-hovercard--${name === "hover-card-demo" ? "demo-example" : name.slice(11)}`
      ]?.tags,
    ).toContain("parity");
  for (const name of ["usage", "delays", "positioning", "in-dialog"])
    expect(index.entries[`components-hovercard--${name}`]?.tags).toContain(
      "parity",
    );
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/hover-card-example.tsx",
    "utf8",
  );
  expect(
    [...source.matchAll(/function (HoverCard\w+)\(/g)]
      .map((m) => m[1])
      .filter((n) => n !== "HoverCardExample"),
  ).toEqual(["HoverCardSides", "HoverCardInDialog"]);
});
for (const theme of ["light", "dark"])
  test(`HoverCard keyboard focus, nested Dialog and default context / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--usage&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          await p.keyboard.press("Tab");
          await expect(
            p.getByRole("button", { name: "Hover", exact: true }),
          ).toBeFocused();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
        }),
      );
      await compare(pages[0], pages[1], info, "keyboard-preview");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await Promise.all(
        pages.map(async (p) => {
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeHidden();
          await expect(
            p.getByRole("button", { name: "Hover", exact: true }),
          ).toBeFocused();
        }),
      );
      await compare(pages[0], pages[1], info, "keyboard-escape");
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--in-dialog&viewMode=story&globals=theme:${theme}`,
          );
          await p
            .getByRole("button", { name: "Open Dialog", exact: true })
            .click();
          await p
            .getByRole("button", { name: "Hover me", exact: true })
            .hover();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
        }),
      );
      await compare(pages[0], pages[1], info, "dialog-preview");
      await Promise.all(pages.map((p) => p.mouse.move(0, 800)));
      await Promise.all(
        pages.map((p) =>
          expect(p.locator('[data-slot="hover-card-content"]')).toBeHidden(),
        ),
      );
      await compare(pages[0], pages[1], info, "dialog-preview-closed");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("button", { name: "Open Dialog", exact: true }),
          ).toBeFocused(),
        ),
      );
      await compare(pages[0], pages[1], info, "dialog-closed");
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--default-open&viewMode=story&globals=theme:${theme}`,
          );
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
        }),
      );
      await compare(pages[0], pages[1], info, "default-context");
    } finally {
      await context.close();
    }
  });
