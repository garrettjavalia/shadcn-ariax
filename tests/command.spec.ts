import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("Command official document and registry examples are covered", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/command.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(names).toHaveLength(6);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of names)
    expect(
      index.entries["components-command--" + name.slice(8)]?.tags,
      name,
    ).toContain("parity");
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/command-example.tsx",
    "utf8",
  );
  const registry: Record<string, string> = {
    CommandInline: "registry-inline",
    CommandBasic: "registry-basic",
    CommandWithShortcuts: "registry-shortcuts",
    CommandWithGroups: "registry-groups",
    CommandManyItems: "registry-scrollable",
  };
  const functions = [...source.matchAll(/^function (Command\w+)\(/gm)].map(
    (match) => match[1],
  );
  expect(functions.sort()).toEqual(Object.keys(registry).sort());
  for (const name of functions)
    expect(
      index.entries["components-command--" + registry[name]]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"]) {
  for (const width of [1000, 390])
    test(`Command real dialogs, search and keyboard close / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
      });
      const a = await context.newPage(),
        b = await context.newPage();
      const stories =
        width === 390
          ? ["basic"]
          : [
              "basic",
              "shortcuts",
              "groups",
              "scrollable",
              "registry-basic",
              "registry-shortcuts",
              "registry-groups",
              "registry-scrollable",
              "keyboard-dialog",
            ];
      try {
        for (const story of stories) {
          await Promise.all(
            (
              [
                [a, upstreamURL],
                [b, stylexURL],
              ] as const
            ).map(async ([page, url]) => {
              await page.goto(
                `${url}/iframe.html?id=components-command--${story}&globals=theme:${theme}`,
              );
              await expect(page.locator("#parity-root")).toBeVisible();
              if (story === "keyboard-dialog")
                await page.keyboard.press("Control+j");
              else await page.getByRole("button").click();
              await expect(page.getByRole("dialog")).toBeVisible();
              await expect(page.getByRole("searchbox")).toBeFocused();
            }),
          );
          await compare(a, b, info, story + "-open");
          // The upstream keyboard-only example omits Command/Autocomplete, so its menu remains unfiltered.
          for (const page of [a, b]) {
            await page.getByRole("searchbox").fill("no-match-xyz");
            if (story === "keyboard-dialog")
              await expect(page.getByRole("menuitem")).toHaveCount(6);
            else
              await expect(
                page.locator('[data-slot="command-empty"]'),
              ).toBeVisible();
          }
          await compare(a, b, info, story + "-search");
          for (const page of [a, b]) {
            await page.getByRole("searchbox").fill("");
            await page.keyboard.press("ArrowDown");
          }
          await compare(a, b, info, story + "-keyboard");
          for (const page of [a, b]) {
            await page.keyboard.press("Escape");
            await expect(page.locator("[data-parity-portal]")).toHaveCount(0);
          }
          await compare(a, b, info, story + "-closed");
        }
      } finally {
        await context.close();
      }
    });
  test(`Command inline selection, disabled skip, custom filter and forced colors / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of [
        "demo",
        "rtl",
        "registry-inline",
        "usage",
        "selection",
        "customization",
        "custom-filter",
        "disabled-input",
        "invalid-input",
      ]) {
        await Promise.all(
          (
            [
              [a, upstreamURL],
              [b, stylexURL],
            ] as const
          ).map(async ([page, url]) => {
            await page.goto(
              `${url}/iframe.html?id=components-command--${story}&globals=theme:${theme}`,
            );
            await expect(page.locator('[data-slot="command"]')).toBeVisible();
          }),
        );
        if (story === "disabled-input") {
          for (const page of [a, b])
            await expect(page.getByRole("searchbox")).toBeDisabled();
          await compare(a, b, info, "disabled-input");
          continue;
        }
        for (const page of [a, b]) {
          await page.getByRole("searchbox").focus();
          await page.keyboard.press("ArrowDown");
        }
        await compare(a, b, info, story + "-focused-item");
        if (story === "selection" || story === "customization") {
          for (const page of [a, b]) {
            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("Enter");
            await expect(
              page.getByRole("status", { name: "Action" }),
            ).toHaveText("orange");
          }
          await compare(a, b, info, story + "-selected");
        } else if (story === "custom-filter") {
          for (const page of [a, b]) {
            await page.getByRole("searchbox").fill("ph");
            await expect(
              page.locator('[data-slot="command-empty"]'),
            ).toBeVisible();
            await page.getByRole("searchbox").fill("Al");
            await expect(page.getByRole("menuitem")).toHaveCount(1);
          }
          await compare(a, b, info, "prefix-filter");
        }
        // Compare the forced-color palette without a blinking native input caret.
        for (const page of [a, b]) {
          await page.getByRole("searchbox").blur();
          await page.emulateMedia({ forcedColors: "active" });
        }
        await compare(a, b, info, story + "-forced-colors");
        for (const page of [a, b])
          await page.emulateMedia({ forcedColors: "none" });
      }
    } finally {
      await context.close();
    }
  });
}
for (const theme of ["light", "dark"])
  test(`Command dialog animation at 0/50/100ms / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      for (const phase of ["enter", "exit"]) {
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          await page.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-command--basic&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          if (phase === "exit") {
            await page.getByRole("button").click();
            await expect(
              page.locator('[data-slot="dialog-overlay"]'),
            ).not.toHaveAttribute("data-entering");
          }
          await page.evaluate(() => {
            new MutationObserver(() => {
              for (const animation of document.getAnimations())
                if (
                  animation instanceof CSSAnimation &&
                  animation.playState === "running"
                )
                  animation.pause();
            }).observe(document.body, {
              subtree: true,
              childList: true,
              attributes: true,
            });
          });
        }
        await Promise.all(
          pages.map((page) =>
            phase === "enter"
              ? page.getByRole("button").click()
              : page.keyboard.press("Escape"),
          ),
        );
        for (const time of [0, 50, 100]) {
          await Promise.all(
            pages.map((page) =>
              page
                .locator('[data-slot="dialog-overlay"]')
                .evaluate(async (element, time) => {
                  const animations = element
                    .getAnimations({ subtree: true })
                    .filter((animation) => animation instanceof CSSAnimation);
                  if (animations.length !== 2)
                    throw Error(
                      `Expected 2 dialog animations, got ${animations.length}`,
                    );
                  for (const animation of animations) {
                    animation.pause();
                    await animation.ready;
                    animation.currentTime = time;
                  }
                }, time),
            ),
          );
          await compare(
            pages[0],
            pages[1],
            info,
            `${phase}-${time}`,
            true,
            false,
          );
        }
      }
    } finally {
      await context.close();
    }
  });
