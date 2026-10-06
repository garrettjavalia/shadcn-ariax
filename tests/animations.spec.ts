import { test, expect } from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";
import {
  compare,
  snapshot,
  differences,
  normalizeAnimationSnapshots,
} from "./compare";

for (const theme of ["light", "dark"])
  test(`Skeleton effect and repeat frames / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-skeleton--usage&globals=theme:${theme}`,
        );
        await expect(page.locator('[data-slot="skeleton"]')).toBeVisible();
        return page;
      }),
    );
    try {
      for (const time of [0, 1000, 2000]) {
        for (const page of pages)
          await page
            .locator('[data-slot="skeleton"]')
            .evaluate(async (element, time) => {
              const animation = element.getAnimations()[0];
              animation.pause();
              await animation.ready;
              animation.currentTime = time;
            }, time);
        await compare(pages[0], pages[1], info, `pulse-${time}`, true, false);
      }
    } finally {
      await context.close();
    }
  });

test("effect comparison rejects keyframe and timing mutations even at an unchanged start frame", async ({
  browser,
}, info) => {
  const pages = await Promise.all(
    [upstreamURL, stylexURL].map(async (url) => {
      const page = await browser.newPage();
      await page.goto(`${url}/iframe.html?id=components-skeleton--usage`);
      await expect(page.locator('[data-slot="skeleton"]')).toBeVisible();
      await page.locator('[data-slot="skeleton"]').evaluate((element) => {
        const animation = element.getAnimations()[0];
        animation.pause();
        animation.currentTime = 0;
      });
      return page;
    }),
  );
  try {
    await compare(
      pages[0],
      pages[1],
      info,
      "equivalent-generated-name",
      false,
      false,
    );
    await pages[1].locator('[data-slot="skeleton"]').evaluate((element) => {
      const effect = element.getAnimations()[0].effect as KeyframeEffect;
      effect.setKeyframes(
        effect
          .getKeyframes()
          .map((frame) =>
            frame.offset === 0.5 ? { ...frame, opacity: ".25" } : frame,
          ),
      );
    });
    const keyframeSnapshots = await Promise.all(
      pages.map((page) => snapshot(page)),
    );
    expect(
      differences(
        ...normalizeAnimationSnapshots(
          keyframeSnapshots[0],
          keyframeSnapshots[1],
        ),
      ).some((diff) => diff.path.includes("/frames/")),
    ).toBe(true);
    await expect(
      compare(pages[0], pages[1], info, "keyframe-mutation", false, false),
    ).rejects.toThrow(/keyframe-mutation/);
    await pages[1].reload();
    await expect(pages[1].locator('[data-slot="skeleton"]')).toBeVisible();
    await pages[1].locator('[data-slot="skeleton"]').evaluate((element) => {
      const animation = element.getAnimations()[0];
      animation.pause();
      animation.currentTime = 0;
      animation.effect!.updateTiming({ duration: 4000 });
    });
    const timingSnapshots = await Promise.all(
      pages.map((page) => snapshot(page)),
    );
    expect(
      differences(
        ...normalizeAnimationSnapshots(timingSnapshots[0], timingSnapshots[1]),
      ).some((diff) => diff.path.endsWith("/timing/duration")),
    ).toBe(true);
    await expect(
      compare(pages[0], pages[1], info, "timing-mutation", false, false),
    ).rejects.toThrow(/timing-mutation/);
  } finally {
    await Promise.all(pages.map((page) => page.close()));
  }
});

test("observed animation handles clear when names change or elements leave the DOM", async ({
  page,
}) => {
  await page.goto(stylexURL + "/iframe.html?id=components-skeleton--usage");
  const skeleton = page.locator('[data-slot="skeleton"]');
  await expect(skeleton).toBeVisible();
  const effects = (value: unknown): unknown[] =>
    Array.isArray(value)
      ? value.flatMap(effects)
      : value && typeof value === "object"
        ? [
            ...((value as { animations?: unknown[] }).animations ?? []),
            ...effects((value as { children?: unknown }).children),
          ]
        : [];
  expect(effects(await snapshot(page))).toHaveLength(1);
  await skeleton.evaluate((element) => {
    (element as HTMLElement).style.animationName = "none";
  });
  expect(effects(await snapshot(page))).toHaveLength(0);
  await skeleton.evaluate((element) => element.remove());
  expect(effects(await snapshot(page))).toHaveLength(0);
});
