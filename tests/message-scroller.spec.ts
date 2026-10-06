import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  for (const story of [
    "primitive-state",
    "opening-start",
    "last-anchor",
    "rtl",
  ])
    test(`MessageScroller ${story} commands and anchoring / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: {
          width: 1000,
          height: 900,
        },
      });
      try {
        const pages = await Promise.all(
          [upstreamURL, stylexURL].map(async (url) => {
            const page = await context.newPage();
            await page.goto(
              `${url}/iframe.html?id=components-messagescroller--${story}&globals=theme:${theme}`,
            );
            await expect(
              page.locator('[data-slot="message-scroller-viewport"]'),
            ).toBeVisible();
            return page;
          }),
        );
        await compare(pages[0], pages[1], info, "initial");
        for (const command of ["Start", "Middle", "End"]) {
          for (const page of pages)
            await page
              .getByRole("button", {
                name: command,
                exact: true,
              })
              .click();
          await compare(pages[0], pages[1], info, command.toLowerCase());
        }
        for (const page of pages) {
          await page
            .getByRole("button", {
              name: "Append",
              exact: true,
            })
            .click();
          await expect(
            page.locator('[data-slot="message-scroller-item"]'),
          ).toHaveCount(6);
        }
        await compare(pages[0], pages[1], info, "append");
        for (const page of pages) {
          const viewport = page.locator(
            '[data-slot="message-scroller-viewport"]',
          );
          await viewport.press("Home");
          await expect
            .poll(() => viewport.evaluate((node) => node.scrollTop))
            .toBe(0);
        }
        await compare(pages[0], pages[1], info, "keyboard-home");
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`MessageScroller dynamic styles native priority ref and render / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 1000,
        height: 900,
      },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-messagescroller--customization&globals=theme:${theme}`,
          );
          await expect(
            page.locator('[data-slot="message-scroller"]'),
          ).toBeVisible();
          return page;
        }),
      );
      for (const page of pages) {
        await expect(page.locator('[data-slot="message-scroller"]')).toHaveCSS(
          "width",
          "324px",
        );
        await expect(page.locator('[data-slot="message-scroller"]')).toHaveCSS(
          "font-size",
          "20px",
        );
        await page
          .getByRole("button", {
            name: "Read ref",
          })
          .click();
        await expect(page.locator("output")).toHaveText("message-scroller");
      }
      await compare(pages[0], pages[1], info, "native-priority");
      for (const page of pages) {
        await page
          .getByRole("button", {
            name: "Resize",
            exact: true,
          })
          .click();
        await expect(page.locator('[data-slot="message-scroller"]')).toHaveCSS(
          "width",
          "364px",
        );
      }
      await compare(pages[0], pages[1], info, "dynamic-native");
      for (const page of pages) {
        await page
          .getByRole("button", {
            name: "Clear native width",
          })
          .click();
        await expect(page.locator('[data-slot="message-scroller"]')).toHaveCSS(
          "width",
          "360px",
        );
        await expect(
          page.getByRole("button", {
            name: "Custom start",
          }),
        ).toHaveAttribute("data-render-direction", "start");
      }
      await compare(pages[0], pages[1], info, "dynamic-xstyle");
    } finally {
      await context.close();
    }
  });
test("MessageScroller actual active/inactive button transitions", async ({
  browser,
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 900,
    },
  });
  try {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-messagescroller--opening-start`,
        );
        await expect(
          page.locator('[data-slot="message-scroller-viewport"]'),
        ).toBeVisible();
        return page;
      }),
    );
    await compare(pages[0], pages[1], info, "before-motion");
    for (const command of ["End", "Start"]) {
      for (const page of pages)
        await page.evaluate(async (command) => {
          const button = [...document.querySelectorAll("button")].find(
            (button) => button.textContent === command,
          );
          if (!button) throw new Error("Missing command");
          button.click();
          await new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          );
          const animations = document
            .getAnimations()
            .filter(
              (animation) =>
                animation instanceof CSSTransition &&
                (animation.effect as KeyframeEffect)?.target instanceof
                  Element &&
                (
                  (animation.effect as KeyframeEffect).target as Element
                ).matches('[data-slot="message-scroller-button"]'),
            );
          if (!animations.length)
            throw new Error("Missing actual scroll-button transitions");
          (
            window as Window & {
              scrollerEffects?: Animation[];
            }
          ).scrollerEffects = animations;
          for (const animation of animations) {
            animation.pause();
            animation.currentTime = 0;
          }
        }, command);
      const descriptions = await Promise.all(
        pages.map((page) =>
          page.evaluate(() =>
            (
              (
                window as Window & {
                  scrollerEffects?: Animation[];
                }
              ).scrollerEffects ?? []
            ).map((animation) => ({
              property: (animation as CSSTransition).transitionProperty,
              duration: animation.effect?.getTiming().duration,
              easing: animation.effect?.getTiming().easing,
              keyframes: (animation.effect as KeyframeEffect).getKeyframes(),
            })),
          ),
        ),
      );
      expect(descriptions[1]).toEqual(descriptions[0]);
      expect(
        descriptions[0].some((animation) => animation.duration === 200),
      ).toBe(true);
      expect(
        descriptions[0].some((animation) => animation.duration === 400),
      ).toBe(true);
      for (const time of [0, 100, 200, 300, 400]) {
        for (const page of pages)
          await page.evaluate((time) => {
            for (const animation of (
              window as Window & {
                scrollerEffects?: Animation[];
              }
            ).scrollerEffects ?? [])
              animation.currentTime = time;
          }, time);
        await compare(
          pages[0],
          pages[1],
          info,
          `${command}-${time}ms`,
          true,
          false,
        );
      }
    }
  } finally {
    await context.close();
  }
});
