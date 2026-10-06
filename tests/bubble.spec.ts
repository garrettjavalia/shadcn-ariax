import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("Bubble official examples are registered", async ({ request }) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/bubble.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*name="bubble-([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(9);
  const entries = (await (await request.get(stylexURL + "/index.json")).json())
    .entries;
  for (const name of names)
    expect(entries["components-bubble--" + name]?.tags, name).toContain(
      "parity",
    );
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/bubble-example.tsx",
    "utf8",
  );
  for (const [, name] of source.matchAll(/^function Bubble(\w+)\(/gm)) {
    const id = name.replace(
      /[A-Z]/g,
      (letter, index) => (index ? "-" : "") + letter.toLowerCase(),
    );
    expect(entries["components-bubble--registry-" + id]?.tags, id).toContain(
      "parity",
    );
  }
});
for (const theme of ["light", "dark"])
  test(`Bubble variants hover/focus and consumer overrides / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      for (const story of ["interactive-variants", "customization"]) {
        await Promise.all(
          pages.map((p, i) =>
            p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-bubble--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const p of pages)
          await expect(p.locator("#parity-root")).toBeVisible();
        if (story === "interactive-variants") {
          for (const variant of [
            "default",
            "secondary",
            "muted",
            "tinted",
            "outline",
            "ghost",
            "destructive",
          ]) {
            for (const p of pages) {
              await p
                .getByRole("button", { name: variant, exact: true })
                .hover();
            }
            await compare(pages[0], pages[1], info, "hover-" + variant);
            for (const p of pages) {
              await p.mouse.move(0, 0);
              await p
                .getByRole("button", { name: variant, exact: true })
                .focus();
            }
            await compare(pages[0], pages[1], info, "focus-" + variant);
            for (const p of pages)
              await p
                .getByRole("button", { name: variant, exact: true })
                .evaluate((n) => (n as HTMLElement).blur());
          }
        } else {
          for (const p of pages) {
            await p.getByRole("button", { name: "Change gap" }).click();
            await expect(p.locator('[data-slot="bubble-content"]')).toHaveCSS(
              "gap",
              "16px",
            );
            await expect(p.locator('[data-slot="bubble-content"]')).toHaveCSS(
              "padding",
              "12px",
            );
          }
          await compare(pages[0], pages[1], info, "dynamic-native");
        }
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Bubble actual collapsible, popover and tooltip / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      for (const story of ["collapsible", "popover", "tooltip"]) {
        await Promise.all(
          pages.map((p, i) =>
            p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-bubble--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const p of pages)
          await expect(p.locator("#parity-root")).toBeVisible();
        if (story === "collapsible") {
          for (const p of pages)
            await p.getByRole("button", { name: "Show more" }).click();
          await compare(pages[0], pages[1], info, "expanded");
          for (const p of pages)
            await p.getByRole("button", { name: "Show less" }).press("Space");
          await compare(pages[0], pages[1], info, "collapsed");
        }
        if (story === "popover") {
          for (const p of pages) {
            await p.getByRole("button", { name: "Show error details" }).click();
            await expect(
              p.getByText("Command failed with exit code 1"),
            ).toBeVisible();
          }
          await compare(pages[0], pages[1], info, "popover");
          for (const p of pages) await p.keyboard.press("Escape");
          await compare(pages[0], pages[1], info, "popover-closed");
        }
        if (story === "tooltip") {
          for (const p of pages) {
            await p.mouse.move(0, 0);
            await p.getByRole("button").hover();
            await expect(p.getByRole("button")).toHaveAttribute(
              "data-hovered",
              "true",
            );
            await expect(p.getByRole("tooltip")).toBeVisible();
            await p
              .getByRole("tooltip")
              .evaluate((n) => n.setAttribute("data-parity-portal", ""));
          }
          await compare(pages[0], pages[1], info, "tooltip");
        }
      }
    } finally {
      await context.close();
    }
  });
