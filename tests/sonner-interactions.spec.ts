import { createStoryPair, loadStoryPair } from "./story-pair";
import { test, expect, type Page } from "@playwright/test";
import { compare, settle } from "./compare";

async function load(pages: [Page, Page], name: string, theme: string) {
  await loadStoryPair(pages, `components-sonner--${name}`, theme);
}
async function mark(pages: Page[]) {
  await Promise.all(
    pages.map((p) =>
      p
        .locator("[data-sonner-toaster]")
        .evaluateAll((els) =>
          els.forEach((el) => el.setAttribute("data-parity-portal", "")),
        ),
    ),
  );
  await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
}
for (const theme of ["light", "dark"])
  test(`Sonner update action cancel dismiss and theme context / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, undefined);
    try {
      await load(pages, "controls", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Start", exact: true }).click(),
        ),
      );
      await mark(pages);
      await compare(pages[0], pages[1], info, "loading");
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Update", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-title]")).toHaveText("Updated"),
        ),
      );
      await compare(pages[0], pages[1], info, "updated");
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Dismiss", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toHaveCount(0),
        ),
      );
      await compare(pages[0], pages[1], info, "dismissed");
      for (const label of ["Retry", "Cancel"]) {
        await Promise.all(
          pages.map((p) =>
            p.getByRole("button", { name: "Actions", exact: true }).click(),
          ),
        );
        await Promise.all(
          pages.map((p) =>
            expect(p.locator("[data-sonner-toast]")).toBeVisible(),
          ),
        );
        await mark(pages);
        await compare(pages[0], pages[1], info, "actions-" + label);
        await Promise.all(
          pages.map((p) =>
            p.getByRole("button", { name: label, exact: true }).click(),
          ),
        );
        await Promise.all(
          pages.map((p) =>
            expect(p.locator("output")).toHaveText(
              label === "Retry" ? "Retried" : "Canceled",
            ),
          ),
        );
        await Promise.all(
          pages.map((p) =>
            expect(p.locator("[data-sonner-toast]")).toHaveCount(0),
          ),
        );
        await compare(pages[0], pages[1], info, "action-result-" + label);
      }
      await load(pages, "theme", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Show", exact: true }).click(),
        ),
      );
      await mark(pages);
      await compare(pages[0], pages[1], info, "explicit-light");
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Switch Theme", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toaster]")).toHaveAttribute(
            "data-sonner-theme",
            "dark",
          ),
        ),
      );
      await compare(pages[0], pages[1], info, "explicit-dark");
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Sonner actual auto-close deadline and callback / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, undefined);
    try {
      await load(pages, "lifecycle", theme);
      for (const p of pages) {
        await p.bringToFront();
        await p.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
        await p.clock.pauseAt(
          new Date(await p.evaluate(() => Date.now() + 1000)),
        );
        await p.getByRole("button", { name: "Timed", exact: true }).click();
        await p.clock.runFor(999);
        await expect(p.locator("output")).toHaveText("Open");
        await p.clock.runFor(1);
        await expect(p.locator("output")).toHaveText("Auto closed");
        await p.clock.runFor(200);
        await p.clock.resume();
      }
      await mark(pages);
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toHaveCount(0),
        ),
      );
      await compare(pages[0], pages[1], info, "auto-closed");
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Sonner entrance transition time samples / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, undefined);
    try {
      await ctx.addInitScript(() =>
        document.addEventListener(
          "transitionrun",
          (event) => {
            if (
              !(event.target instanceof Element) ||
              !event.target.matches("[data-sonner-toast]")
            )
              return;
            for (const a of event.target.getAnimations())
              if (a instanceof CSSTransition) {
                a.pause();
                a.currentTime = 0;
              }
          },
          true,
        ),
      );
      await load(pages, "demo", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Show Toast", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toHaveAttribute(
            "data-mounted",
            "true",
          ),
        ),
      );
      await mark(pages);
      await Promise.all(pages.map(settle));
      for (const time of [0, 200, 400]) {
        const effects = await Promise.all(
          pages.map((p) =>
            p.evaluate(async (time) => {
              const list = document
                .getAnimations()
                .filter(
                  (a): a is CSSTransition =>
                    a instanceof CSSTransition &&
                    (a.effect as KeyframeEffect).target instanceof Element &&
                    ((a.effect as KeyframeEffect).target as Element).matches(
                      "[data-sonner-toast]",
                    ),
                );
              for (const a of list) {
                a.pause();
                await a.ready;
                a.currentTime = time;
              }
              return list
                .map((a) => ({
                  property: a.transitionProperty,
                  timing: a.effect?.getTiming(),
                  frames: (a.effect as KeyframeEffect).getKeyframes(),
                }))
                .sort((a, b) => a.property.localeCompare(b.property));
            }, time),
          ),
        );
        expect(effects[0].length).toBeGreaterThanOrEqual(2);
        expect(effects[1]).toEqual(effects[0]);
        await compare(pages[0], pages[1], info, "enter-" + time, true, false);
      }
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Sonner StyleX loading rotation time samples / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, undefined);
    try {
      await load(pages, "loading", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Load", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toBeVisible(),
        ),
      );
      await mark(pages);
      await compare(pages[0], pages[1], info, "loading-settled");
      for (const time of [0, 250, 750, 1000]) {
        const effects = await Promise.all(
          pages.map((p) =>
            p.evaluate(async (time) => {
              const list = document
                .getAnimations()
                .filter(
                  (a) =>
                    a.effect?.getTiming().iterations === Infinity &&
                    (a.effect as KeyframeEffect).target instanceof SVGElement,
                );
              for (const a of list) {
                a.pause();
                await a.ready;
                a.currentTime = time;
              }
              return list.map((a) => ({
                timing: a.effect?.getTiming(),
                frames: (a.effect as KeyframeEffect).getKeyframes(),
              }));
            }, time),
          ),
        );
        expect(effects[0]).toHaveLength(1);
        expect(effects[1]).toEqual(effects[0]);
        await compare(pages[0], pages[1], info, "loading-" + time, true, false);
      }
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Sonner actual hotkey keyboard close and mobile pointer swipe / ${theme}`, async ({
    browser,
  }, info) => {
    const { context: ctx, pages } = await createStoryPair(browser, {
      viewport: { width: 390, height: 900 },
    });
    try {
      await load(pages, "rtl", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "RTL Toast", exact: true }).click(),
        ),
      );
      await mark(pages);
      for (const p of pages) {
        await p.bringToFront();
        await p.keyboard.press("Alt+t");
        await expect(p.locator("[data-sonner-toaster]")).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "hotkey-focused");
      for (const p of pages) {
        await p.bringToFront();
        await p.keyboard.press("Tab");
        await expect(p.locator("[data-sonner-toast]")).toBeFocused();
        await p.keyboard.press("Tab");
        await expect(
          p.getByRole("button", { name: "Close toast", exact: true }),
        ).toBeFocused();
      }
      await compare(pages[0], pages[1], info, "keyboard-close-focused");
      for (const p of pages) {
        await p.bringToFront();
        await p.keyboard.press("Space");
        await expect(p.locator("[data-sonner-toast]")).toHaveCount(0);
      }
      await compare(pages[0], pages[1], info, "keyboard-closed");
      await load(pages, "demo", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Show Toast", exact: true }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toBeVisible(),
        ),
      );
      await mark(pages);
      await compare(pages[0], pages[1], info, "before-swipe");
      const box = await pages[0].locator("[data-sonner-toast]").boundingBox();
      if (!box) throw Error("Missing toast");
      const x = box.x + 8,
        y = box.y + box.height / 2;
      const sessions = await Promise.all(
        pages.map((p) => ctx.newCDPSession(p)),
      );
      await Promise.all(
        sessions.map(async (s) => {
          await s.send("Input.dispatchMouseEvent", {
            type: "mouseMoved",
            x,
            y,
          });
          await s.send("Input.dispatchMouseEvent", {
            type: "mousePressed",
            x,
            y,
            button: "left",
            buttons: 1,
            clickCount: 1,
          });
          await s.send("Input.dispatchMouseEvent", {
            type: "mouseMoved",
            x: x + 8,
            y,
            button: "left",
            buttons: 1,
          });
          await s.send("Input.dispatchMouseEvent", {
            type: "mouseMoved",
            x: x + 120,
            y,
            button: "left",
            buttons: 1,
          });
        }),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toHaveAttribute(
            "data-swiping",
            "true",
          ),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect
            .poll(() =>
              p
                .locator("[data-sonner-toast]")
                .evaluate(
                  (e) =>
                    new DOMMatrixReadOnly(getComputedStyle(e).transform).m41,
                ),
            )
            .toBeGreaterThan(0),
        ),
      );
      await compare(pages[0], pages[1], info, "held-real-swipe");
      await Promise.all(
        sessions.map((s) =>
          s.send("Input.dispatchMouseEvent", {
            type: "mouseReleased",
            x: x + 120,
            y,
            button: "left",
            buttons: 0,
            clickCount: 1,
          }),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(p.locator("[data-sonner-toast]")).toHaveCount(0),
        ),
      );
      await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
      await compare(pages[0], pages[1], info, "swipe-dismissed");
    } finally {
      await ctx.close();
    }
  });
