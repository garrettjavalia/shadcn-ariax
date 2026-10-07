import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  test(`HoverCard exact100/200ms trigger delays / ${theme}`, async ({
    browser,
  }, info) => {
    const contexts = await Promise.all([0, 1].map(() => browser.newContext()));
    const pages = await Promise.all(contexts.map((c) => c.newPage()));
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--timed&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          const box = await p.getByRole("button").boundingBox();
          if (!box) throw Error("Missing trigger");
          await p.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
          await p.clock.pauseAt(
            new Date(await p.evaluate(() => Date.now() + 1000)),
          );
          await p.mouse.move(0, 800);
          await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await p.clock.runFor(99);
          await expect(p.locator("output")).toHaveAttribute(
            "data-open",
            "false",
          );
          await p.clock.runFor(1);
          await expect(p.locator("output")).toHaveAttribute(
            "data-open",
            "true",
          );
          await p.clock.resume();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
        }),
      );
      await compare(pages[0], pages[1], info, "delay100-open");
      await Promise.all(
        pages.map(async (p) => {
          await p.clock.pauseAt(
            new Date(await p.evaluate(() => Date.now() + 1000)),
          );
          await p.mouse.move(0, 800);
          await p.clock.runFor(199);
          await expect(p.locator("output")).toHaveAttribute(
            "data-open",
            "true",
          );
          await p.clock.runFor(1);
          await expect(p.locator("output")).toHaveAttribute(
            "data-open",
            "false",
          );
          await p.clock.resume();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeHidden();
        }),
      );
      await compare(pages[0], pages[1], info, "delay200-close");
    } finally {
      await Promise.all(contexts.map((c) => c.close()));
    }
  });
for (const theme of ["light", "dark"])
  test(`HoverCard RTL enter and exit effects0/50/100ms / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      for (const n of [0, 1, 2, 3, 4, 5])
        for (const phase of ["enter", "exit"]) {
          for (let i = 0; i < 2; i++) {
            const p = pages[i];
            await p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--rtl&viewMode=story&globals=theme:${theme}`,
            );
            await expect(p.locator("#parity-root")).toBeVisible();
            await p.mouse.move(0, 800);
            if (phase === "exit") {
              await p.locator("#parity-root button").nth(n).hover();
              await expect(
                p.locator('[data-slot="hover-card-content"]'),
              ).not.toHaveAttribute("data-entering");
            }
            await p.evaluate(() =>
              new MutationObserver(() => {
                for (const a of document.getAnimations())
                  if (a instanceof CSSAnimation && a.playState === "running")
                    a.pause();
              }).observe(document.body, {
                subtree: true,
                attributes: true,
                childList: true,
              }),
            );
          }
          await Promise.all(
            pages.map((p) =>
              phase === "enter"
                ? p.locator("#parity-root button").nth(n).hover()
                : p.mouse.move(0, 800),
            ),
          );
          await Promise.all(
            pages.map((p) =>
              expect(
                p.locator('[data-slot="hover-card-content"]'),
              ).toHaveAttribute(
                phase === "enter" ? "data-entering" : "data-exiting",
              ),
            ),
          );
          for (const time of [0, 50, 100]) {
            await Promise.all(
              pages.map((p) =>
                p
                  .locator('[data-slot="hover-card-content"]')
                  .evaluate(async (el, time) => {
                    const frames = () =>
                      new Promise<void>((resolve) =>
                        requestAnimationFrame(() =>
                          requestAnimationFrame(() => resolve()),
                        ),
                      );
                    await frames();
                    while (
                      document
                        .getAnimations()
                        .some(
                          (a) =>
                            a instanceof CSSTransition &&
                            (a.playState === "running" || a.pending),
                        )
                    )
                      await frames();
                    const animations = el
                      .getAnimations()
                      .filter((a) => a instanceof CSSAnimation);
                    if (animations.length !== 1)
                      throw Error(`Expected1animation,got${animations.length}`);
                    for (const a of animations) {
                      a.pause();
                      await a.ready;
                      a.currentTime = time;
                    }
                  }, time),
              ),
            );
            await compare(
              pages[0],
              pages[1],
              info,
              `rtl-${n}-${phase}-${time}`,
              true,
              false,
            );
          }
        }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`HoverCard interactive safe area, focus and disabled state / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--interactive&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          await p.keyboard.press("Tab");
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
          await p.keyboard.press("Tab");
          await expect(
            p.getByRole("button", { name: "Inside action", exact: true }),
          ).toBeFocused();
        }),
      );
      await compare(pages[0], pages[1], info, "interactive-keyboard");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await Promise.all(
        pages.map(async (p) => {
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeHidden();
          await expect(
            p.getByRole("button", { name: "Preview actions", exact: true }),
          ).toBeFocused();
          await p.mouse.move(0, 800);
          await p
            .getByRole("button", { name: "Preview actions", exact: true })
            .hover();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
          await p
            .getByRole("button", { name: "Inside action", exact: true })
            .hover();
        }),
      );
      await compare(pages[0], pages[1], info, "interactive-safe-area");
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--disabled&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          await p.mouse.move(0, 800);
          await p.getByRole("button").hover();
          await p.keyboard.press("Tab");
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toHaveCount(0);
        }),
      );
      await compare(pages[0], pages[1], info, "disabled-preview");
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`HoverCard native touch long press and focus restoration / ${theme}`, async ({
    browser,
  }, info) => {
    const contexts = await Promise.all(
      [0, 1].map(() =>
        browser.newContext({
          hasTouch: true,
          viewport: { width: 390, height: 900 },
        }),
      ),
    );
    const pages = await Promise.all(contexts.map((c) => c.newPage()));
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-hovercard--usage&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          const box = await p.getByRole("button").boundingBox();
          if (!box) throw Error("Missing trigger");
          const session = await contexts[i].newCDPSession(p);
          await p.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
          await p.clock.pauseAt(
            new Date(await p.evaluate(() => Date.now() + 1000)),
          );
          await session.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: [
              { x: box.x + box.width / 2, y: box.y + box.height / 2 },
            ],
          });
          await p.clock.runFor(499);
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toHaveCount(0);
          await p.clock.runFor(1);
          await p.clock.resume();
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeVisible();
          await session.send("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
          });
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeFocused();
          await session.detach();
        }),
      );
      await compare(pages[0], pages[1], info, "touch-long-press");
      await Promise.all(
        pages.map(async (p) => {
          await p.keyboard.press("Escape");
          await expect(
            p.locator('[data-slot="hover-card-content"]'),
          ).toBeHidden();
          await expect(p.getByRole("button")).toBeFocused();
        }),
      );
      await compare(pages[0], pages[1], info, "touch-escape");
    } finally {
      await Promise.all(contexts.map((c) => c.close()));
    }
  });
