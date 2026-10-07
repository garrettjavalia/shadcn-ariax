import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("all official Accordion previews and usage have shared parity stories", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/accordion.mdx",
    "utf8",
  );
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of [...doc.matchAll(/name="accordion-([^"]+)"/g)]
    .map((m) => m[1])
    .concat("usage"))
    expect(index.entries["components-accordion--" + name]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "basic",
    "multiple",
    "disabled",
    "borders",
    "card",
    "rtl",
    "usage",
    "descendants",
  ])
    test(`Accordion ${story} states / ${theme}`, async ({ browser }, info) => {
      const { context, pages } = await createStoryPair(
        browser,
        undefined,
        async (page, url) => {
          await page.goto(
            `${url}/iframe.html?id=components-accordion--${story}&viewMode=story&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
        },
      );
      const [a, b] = pages;
      try {
        await compare(a, b, info, "initial");
        await Promise.all(
          pages.map((page) => page.getByRole("button").first().hover()),
        );
        await compare(a, b, info, "hover");
        await Promise.all(
          pages.map(async (page) => {
            await page.mouse.move(0, 0);
            await page.keyboard.press("Tab");
          }),
        );
        await compare(a, b, info, "focus");
        await Promise.all(pages.map((page) => page.keyboard.press("Enter")));
        await compare(a, b, info, "keyboard-toggle");
        await Promise.all(
          pages.map((page) => page.getByRole("button").last().click()),
        );
        await compare(a, b, info, "pointer-toggle");
        if (story === "multiple") {
          await Promise.all(
            pages.map((page) => page.getByRole("button").nth(1).click()),
          );
          await compare(a, b, info, "multiple-open");
          for (const page of pages)
            expect(
              await page.locator('[aria-expanded="true"]').count(),
            ).toBeGreaterThan(1);
        }
        if (story === "disabled")
          for (const page of pages)
            await expect(page.getByRole("button").nth(1)).toBeDisabled();
        if (story === "descendants") {
          await Promise.all(
            pages.map(async (page) => {
              if (
                (await page
                  .getByRole("button")
                  .first()
                  .getAttribute("aria-expanded")) === "false"
              )
                await page.getByRole("button").first().click();
              await page.getByRole("link").hover();
            }),
          );
          await compare(a, b, info, "link-hover");
          await Promise.all(pages.map((page) => page.keyboard.press("Tab")));
          await compare(a, b, info, "panel-native-focus-callback");
        }
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Accordion controlled callbacks and dynamic overrides / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(
      browser,
      undefined,
      async (page, url) => {
        await page.goto(
          `${url}/iframe.html?id=components-accordion--controlled&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
      },
    );
    try {
      await compare(pages[0], pages[1], info, "controlled-initial");
      await Promise.all(
        pages.map((page) =>
          page.getByRole("button", { name: "Controlled" }).hover(),
        ),
      );
      await compare(pages[0], pages[1], info, "native-hover-font");
      await Promise.all(
        pages.map((page) =>
          page.getByRole("button", { name: "Controlled" }).click(),
        ),
      );
      await compare(pages[0], pages[1], info, "controlled-open");
      for (const page of pages) {
        await expect(page.locator("output")).toHaveText("one");
        await expect(page.locator('[data-slot="accordion-content"]')).toHaveCSS(
          "color",
          "rgb(255, 0, 0)",
        );
      }
      await Promise.all(
        pages.map((page) =>
          page.getByRole("button", { name: "Resize" }).click(),
        ),
      );
      await compare(pages[0], pages[1], info, "dynamic-resize");
      for (const page of pages) {
        await expect(page.locator('[data-slot="accordion"]')).toHaveCSS(
          "width",
          "370px",
        );
        expect(
          await page.locator('[data-slot="accordion"]').getAttribute("style"),
        ).toContain("width");
      }
      expect(
        await pages[1].locator('[data-slot="accordion"]').getAttribute("style"),
      ).toContain("--");
      await Promise.all(
        pages.map((page) =>
          page.getByRole("button", { name: "Disable", exact: true }).click(),
        ),
      );
      await compare(pages[0], pages[1], info, "group-disabled-native-callback");
      for (const page of pages) {
        await expect(
          page.getByRole("button", { name: "Controlled" }),
        ).toBeDisabled();
        await expect(page.locator('[data-slot="accordion"]')).toHaveCSS(
          "opacity",
          "0.5",
        );
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Accordion actual opening and closing animation frames / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      const seen = new WeakSet<Animation>();
      const handles: Animation[] = [];
      (
        window as Window & { accordionAnimations?: Animation[] }
      ).accordionAnimations = handles;
      new MutationObserver(() => {
        for (const animation of document.getAnimations()) {
          const target = (animation.effect as KeyframeEffect | null)?.target;
          if (
            target instanceof HTMLElement &&
            target.dataset.slot === "accordion-content" &&
            !seen.has(animation)
          ) {
            seen.add(animation);
            handles.push(animation);
            animation.pause();
            animation.currentTime = 0;
          }
        }
      }).observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    });
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-accordion--motion&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        return page;
      }),
    );
    try {
      for (const state of ["open", "close"]) {
        await Promise.all(
          pages.map((page) => page.getByRole("button").click()),
        );
        for (const page of pages)
          await expect(
            page.locator('[data-slot="accordion-content"]'),
          ).toHaveAttribute(state === "open" ? "data-open" : "data-closed", "");
        for (const page of pages)
          expect(
            await page.evaluate(
              () =>
                (window as Window & { accordionAnimations?: Animation[] })
                  .accordionAnimations!.length,
            ),
          ).toBeGreaterThan(0);
        for (const time of [0, 75, 150, 200]) {
          await Promise.all(
            pages.map((page) =>
              page.evaluate((time) => {
                for (const a of (
                  window as Window & { accordionAnimations?: Animation[] }
                ).accordionAnimations!)
                  if (a.playState === "paused") a.currentTime = time;
              }, time),
            ),
          );
          await compare(pages[0], pages[1], info, `${state}-${time}ms`);
        }
        await Promise.all(
          pages.map((page) =>
            page.evaluate(() => {
              for (const a of (
                window as Window & { accordionAnimations?: Animation[] }
              ).accordionAnimations!)
                try {
                  a.finish();
                } catch {}
            }),
          ),
        );
      }
    } finally {
      await context.close();
    }
  });

for (const theme of ["light", "dark"])
  test(`Accordion canonical height token and data-state animation frames / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      const seen = new WeakSet<Animation>();
      const handles: Animation[] = [];
      (
        window as Window & { accordionAnimations?: Animation[] }
      ).accordionAnimations = handles;
      new MutationObserver(() => {
        for (const animation of document.getAnimations()) {
          const target = (animation.effect as KeyframeEffect | null)?.target;
          if (
            target instanceof HTMLElement &&
            target.dataset.slot === "accordion-content" &&
            !seen.has(animation)
          ) {
            seen.add(animation);
            handles.push(animation);
            animation.pause();
            animation.currentTime = 0;
          }
        }
      }).observe(document, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    });
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-accordion--token-motion&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        return page;
      }),
    );
    try {
      for (const state of ["open", "close"]) {
        await Promise.all(
          pages.map((page) => page.getByRole("button").click()),
        );
        for (const page of pages)
          await expect(
            page.locator('[data-slot="accordion-content"]'),
          ).toHaveAttribute("data-state", state === "open" ? "open" : "closed");
        for (const page of pages)
          expect(
            await page.evaluate(
              () =>
                (window as Window & { accordionAnimations?: Animation[] })
                  .accordionAnimations!.length,
            ),
          ).toBeGreaterThan(0);
        for (const time of [0, 75, 150, 200]) {
          await Promise.all(
            pages.map((page) =>
              page.evaluate((time) => {
                for (const a of (
                  window as Window & { accordionAnimations?: Animation[] }
                ).accordionAnimations!)
                  if (a.playState === "paused") a.currentTime = time;
              }, time),
            ),
          );
          await compare(pages[0], pages[1], info, `${state}-${time}ms`);
        }
        await Promise.all(
          pages.map((page) =>
            page.evaluate(() => {
              for (const a of (
                window as Window & { accordionAnimations?: Animation[] }
              ).accordionAnimations!)
                try {
                  a.finish();
                } catch {}
            }),
          ),
        );
      }
    } finally {
      await context.close();
    }
  });

test("Accordion false animation flags preserve inactive styles", async ({
  browser,
}, info) => {
  const pages = await Promise.all(
    [upstreamURL, stylexURL].map(async (url) => {
      const page = await browser.newPage();
      await page.goto(
        url + "/iframe.html?id=components-accordion--false-flags",
      );
      await expect(page.locator("#parity-root")).toBeVisible();
      return page;
    }),
  );
  try {
    await compare(pages[0], pages[1], info, "false-motion-flags");
    for (const page of pages)
      await expect(page.locator('[data-slot="accordion-content"]')).toHaveCSS(
        "animation-name",
        "none",
      );
  } finally {
    await Promise.all(pages.map((page) => page.close()));
  }
});
