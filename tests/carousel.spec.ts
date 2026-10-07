import { createStoryPair } from "./story-pair";
import {
  controlCarouselFrames,
  advanceCarousel,
  finishCarousel,
} from "./carousel-animation";
import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
import type {} from "../stories/carousel-examples/observe";
async function ready(page: Page) {
  await expect(page.locator('[data-slot="carousel"]')).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => !!window.parityCarousel))
    .toBe(true);
  await controlCarouselFrames(page);
}
async function stopped(page: Page) {
  await finishCarousel(page);
}
async function index(page: Page) {
  return page.evaluate(() => window.parityCarousel!.selectedScrollSnap());
}
test("Carousel official document and registry coverage", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/carousel.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*name="carousel-([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(7);
  const entries = (await (await request.get(stylexURL + "/index.json")).json())
    .entries;
  for (const name of [
    ...names,
    "registry-basic",
    "registry-multiple",
    "registry-gap",
    "usage",
  ])
    expect(entries["components-carousel--" + name]?.tags, name).toContain(
      "parity",
    );
  const registry = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/carousel-example.tsx",
    "utf8",
  );
  expect(
    [...registry.matchAll(/^function (Carousel\w+)\(/gm)]
      .map((m) => m[1])
      .sort(),
  ).toEqual(["CarouselBasic", "CarouselMultiple", "CarouselWithGap"]);
});
for (const theme of ["light", "dark"])
  test(`Carousel buttons, keyboard, endpoints, API and resize / ${theme}`, async ({
    browser,
  }, info) => {
    test.setTimeout(180_000);
    const { context, pages } = await createStoryPair(browser, {
      viewport: { width: 1000, height: 900 },
    });
    try {
      for (const story of [
        "demo",
        "size",
        "spacing",
        "orientation",
        "api",
        "rtl",
        "multiple",
        "registry-basic",
        "registry-multiple",
        "registry-gap",
        "usage",
        "customization",
        "loop",
      ]) {
        await Promise.all(
          pages.map((p, i) =>
            p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-carousel--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const p of pages) await ready(p);
        for (const p of pages) {
          await p
            .getByRole("button", { name: "Next slide", exact: true })
            .click();
          await expect.poll(() => index(p)).toBe(1);
          await stopped(p);
        }
        await compare(pages[0], pages[1], info, story + "-next");
        for (const p of pages) {
          await p
            .getByRole("button", { name: "Next slide", exact: true })
            .press("ArrowLeft");
          await expect.poll(() => index(p)).toBe(0);
          await stopped(p);
        }
        await compare(pages[0], pages[1], info, story + "-keyboard");
        if (story === "customization") {
          for (const p of pages) {
            await p
              .getByRole("button", { name: "Resize", exact: true })
              .click();
            await expect(p.locator('[data-slot="carousel"]')).toHaveCSS(
              "width",
              "240px",
            );
            await p
              .getByRole("button", { name: "Go to third", exact: true })
              .click();
            await expect.poll(() => index(p)).toBe(2);
            await stopped(p);
          }
          await compare(pages[0], pages[1], info, "dynamic-width-and-api");
        }
        for (const p of pages) {
          await p.evaluate(() => {
            const api = window.parityCarousel!;
            api.scrollTo(api.scrollSnapList().length - 1);
          });
          await stopped(p);
          if (story === "loop") {
            await p
              .getByRole("button", { name: "Next slide", exact: true })
              .click();
            await expect.poll(() => index(p)).toBe(0);
            await stopped(p);
          } else
            await expect(
              p.getByRole("button", { name: "Next slide", exact: true }),
            ).toBeDisabled();
        }
        await compare(pages[0], pages[1], info, story + "-endpoint");
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Carousel pointer drag in LTR, RTL and vertical / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, {
      viewport: { width: 390, height: 900 },
    });
    try {
      for (const story of ["demo", "rtl", "orientation", "registry-multiple"]) {
        await Promise.all(
          pages.map((p, i) =>
            p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-carousel--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const p of pages) {
          await ready(p);
          const box = (await p
            .locator('[data-slot="carousel-content"]')
            .boundingBox())!;
          const x = box.x + box.width / 2,
            y = box.y + box.height / 2;
          await p.mouse.move(x, y);
          await p.mouse.down();
          for (let step = 1; step <= 12; step++) {
            await p.mouse.move(
              x +
                ((story === "orientation" ? 0 : story === "rtl" ? 180 : -180) *
                  step) /
                  12,
              y + ((story === "orientation" ? -180 : 0) * step) / 12,
            );
            await advanceCarousel(p, 1);
          }
          // Hold past Embla's 170ms flick window: test a drag, independently of host input speed.
          await p.waitForTimeout(180);
          await p.mouse.up();
          await stopped(p);
          expect(await index(p)).toBeGreaterThan(0);
          await p.mouse.move(0, 0);
        }
        await compare(pages[0], pages[1], info, story + "-drag");
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Carousel autoplay, hover stop and explicit restart / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, {
      viewport: { width: 1000, height: 900 },
    });
    try {
      for (const [p, i] of pages.map((p, i) => [p, i] as const)) {
        await p.goto(
          `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-carousel--plugin&globals=theme:${theme}`,
        );
        await ready(p);
        await p.locator('[data-slot="carousel"]').hover();
      }
      for (const p of pages)
        expect(
          await p.evaluate(() =>
            window.parityCarousel!.plugins().autoplay.isPlaying(),
          ),
        ).toBe(false);
      await compare(pages[0], pages[1], info, "paused");
      for (const p of pages) {
        await p.mouse.move(0, 0);
        expect(
          await p.evaluate(() =>
            window.parityCarousel!.plugins().autoplay.isPlaying(),
          ),
        ).toBe(false);
        await p.evaluate(() =>
          window.parityCarousel!.plugins().autoplay.play(),
        );
        await expect.poll(() => index(p)).toBe(1);
        await p.locator('[data-slot="carousel"]').hover();
        await stopped(p);
      }
      await compare(pages[0], pages[1], info, "autoplay-first");
      for (const p of pages) {
        await p
          .getByRole("button", { name: "Next slide", exact: true })
          .click();
        await expect.poll(() => index(p)).toBe(2);
        await stopped(p);
        expect(
          await p.evaluate(() =>
            window.parityCarousel!.plugins().autoplay.isPlaying(),
          ),
        ).toBe(false);
      }
      await compare(pages[0], pages[1], info, "interaction-paused");
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Carousel actual motion at 0/250/500ms and settle / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, {
      viewport: { width: 1000, height: 900 },
    });
    try {
      for (const story of ["demo", "orientation", "rtl", "loop"]) {
        await Promise.all(
          pages.map((p, i) =>
            p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-carousel--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const p of pages) await ready(p);
        // Flush and compare initial overflow before either engine writes its first transform.
        await compare(pages[0], pages[1], info, story + "-before-motion");
        for (const p of pages) {
          await p.evaluate(() => window.parityCarousel!.scrollNext());
          await advanceCarousel(p, 1);
        }
        let previous: string | undefined;
        for (const [time, frames] of [
          [0, 0],
          [250, 15],
          [500, 15],
        ] as const) {
          for (const p of pages) await advanceCarousel(p, frames);
          const transform = await pages[0]
            .locator('[data-slot="carousel-content"] > div')
            .evaluate((n) => getComputedStyle(n).transform);
          if (previous)
            expect(
              transform,
              "The real engine must change position between samples",
            ).not.toBe(previous);
          previous = transform;
          await compare(pages[0], pages[1], info, story + "-" + time);
        }
        for (const p of pages) await finishCarousel(p);
        await compare(pages[0], pages[1], info, story + "-settle");
      }
    } finally {
      await context.close();
    }
  });
