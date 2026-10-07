import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    test(`Sheet official cases, sides, dismissal and focus / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const { context: ctx, pages } = await createStoryPair(browser, {
        viewport: { width, height: 900 },
      });
      try {
        for (const name of [
          "demo-example",
          "side",
          "no-close-button",
          "rtl",
          "registry-form",
          "registry-no-close",
          "registry-sides",
          "usage",
          "customized",
        ]) {
          for (const index of name === "side" || name === "registry-sides"
            ? [0, 1, 2, 3]
            : [0]) {
            await Promise.all(
              pages.map((p, i) =>
                p.goto(
                  `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-sheet--${name}&viewMode=story&globals=theme:${theme}`,
                ),
              ),
            );
            await Promise.all(
              pages.map(async (p) => {
                await expect(p.locator("#parity-root")).toBeVisible();
                await p.locator("#parity-root button").nth(index).click();
                await expect(p.getByRole("dialog")).toBeVisible();
              }),
            );
            await compare(pages[0], pages[1], info, `${name}-${index}-open`);
            if (name === "side" || name === "registry-sides") {
              await Promise.all(
                pages.map((p) =>
                  p
                    .getByRole("dialog")
                    .locator('[style*="overflow"],[class]')
                    .filter({ has: p.locator("p") })
                    .last()
                    .evaluate((el) => (el.scrollTop = 200)),
                ),
              );
              await compare(
                pages[0],
                pages[1],
                info,
                `${name}-${index}-scroll`,
              );
            }
            await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
            await Promise.all(
              pages.map(async (p) => {
                await expect(p.getByRole("dialog")).toBeHidden();
                await expect(
                  p.locator("#parity-root button").nth(index),
                ).toBeFocused();
              }),
            );
            await compare(pages[0], pages[1], info, `${name}-${index}-closed`);
          }
        }
      } finally {
        await ctx.close();
      }
    });
test("Sheet official MDX and registry example inventory", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/sheet.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(4);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of names)
    expect(
      index.entries[
        `components-sheet--${name === "sheet-demo" ? "demo-example" : name.slice(6)}`
      ]?.tags,
    ).toContain("parity");
  const registry = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/sheet-example.tsx",
    "utf8",
  );
  expect(
    [...registry.matchAll(/function (Sheet\w+)\(/g)]
      .map((m) => m[1])
      .filter((n) => n !== "SheetExample")
      .sort(),
  ).toEqual(["SheetWithForm", "SheetNoCloseButton", "SheetWithSides"].sort());
});
for (const theme of ["light", "dark"])
  test(`Sheet opacity/translate transition at 25/75/125ms / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, undefined);
    try {
      for (const phase of ["enter", "exit"]) {
        for (let i = 0; i < 2; i++) {
          const p = pages[i];
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-sheet--usage&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          if (phase === "exit") {
            await p.getByRole("button", { name: "Open", exact: true }).click();
            await expect(
              p.locator('[data-slot="sheet-overlay"]'),
            ).not.toHaveAttribute("data-entering");
            await p.evaluate(() =>
              Promise.all(
                document.getAnimations().map((a) => a.finished.catch(() => {})),
              ),
            );
          }
          await p.evaluate(() =>
            document.addEventListener(
              "transitionrun",
              () => {
                for (const a of document.getAnimations())
                  if (a instanceof CSSTransition) a.pause();
              },
              { capture: true },
            ),
          );
        }
        await Promise.all(
          pages.map((p) =>
            phase === "enter"
              ? p.getByRole("button", { name: "Open", exact: true }).click()
              : p.keyboard.press("Escape"),
          ),
        );
        await Promise.all(
          pages.map((p) =>
            expect
              .poll(() =>
                p.evaluate(
                  () =>
                    document
                      .getAnimations()
                      .filter((a) => a instanceof CSSTransition).length,
                ),
              )
              .toBeGreaterThanOrEqual(3),
          ),
        );
        for (const time of [25, 75, 125]) {
          const effects = await Promise.all(
            pages.map((p) =>
              p.evaluate(async (time) => {
                const animations = document
                  .getAnimations()
                  .filter(
                    (a): a is CSSTransition => a instanceof CSSTransition,
                  );
                for (const a of animations) {
                  a.pause();
                  await a.ready;
                  a.currentTime = time;
                }
                return animations
                  .map((a) => ({
                    slot:
                      (a.effect as KeyframeEffect).target instanceof Element
                        ? (
                            (a.effect as KeyframeEffect).target as Element
                          ).getAttribute("data-slot")
                        : null,
                    property: a.transitionProperty,
                    timing: a.effect?.getTiming(),
                    frames: (a.effect as KeyframeEffect).getKeyframes(),
                  }))
                  .sort((a, b) =>
                    `${a.slot}/${a.property}`.localeCompare(
                      `${b.slot}/${b.property}`,
                    ),
                  );
              }, time),
            ),
          );
          expect(effects[1]).toEqual(effects[0]);
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
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Sheet no-close outside dismissal / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, {
      viewport: { width: 390, height: 900 },
    });
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-sheet--no-close-button&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          await p.getByRole("button").click();
          await expect(p.getByRole("dialog")).toBeVisible();
        }),
      );
      await compare(pages[0], pages[1], info, "outside-open");
      await Promise.all(pages.map((p) => p.mouse.click(2, 2)));
      await Promise.all(
        pages.map(async (p) => {
          await expect(p.getByRole("dialog")).toBeHidden();
          await expect(p.getByRole("button")).toBeFocused();
        }),
      );
      await compare(pages[0], pages[1], info, "outside-closed");
    } finally {
      await ctx.close();
    }
  });
