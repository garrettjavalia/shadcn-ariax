import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare, settle } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("Slider official document previews and usage mapped", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/slider.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*name="slider-([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(7);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of [...names, "usage"])
    expect(index.entries["components-slider--" + name]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "range",
    "multiple",
    "vertical",
    "controlled",
    "disabled",
    "rtl",
    "usage",
    "customization",
    "empty",
  ])
    test(`Slider ${story} actual states / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext();
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-slider--${story}&globals=theme:${theme}`,
          );
          await expect(
            page.locator('[data-slot="slider"]').first(),
          ).toBeVisible();
          return page;
        }),
      );
      try {
        await compare(pages[0], pages[1], info, "initial");
        const count = await pages[0].locator('[data-slot="slider"]').count();
        expect(count).toBeGreaterThan(0);
        if (story === "empty") {
          for (const page of pages)
            await expect(page.getByRole("slider")).toHaveCount(0);
          return;
        }
        if (story === "customization") {
          for (const page of pages) {
            await expect(page.locator('[data-slot="slider"]')).toHaveCSS(
              "width",
              "244px",
            );
            await page
              .getByRole("button", {
                name: "Resize",
              })
              .click();
            await expect(page.locator('[data-slot="slider"]')).toHaveCSS(
              "width",
              "304px",
            );
          }
          await compare(pages[0], pages[1], info, "dynamic-width");
        }
        for (let group = 0; group < count; group++) {
          const thumbCount = await pages[0]
            .locator('[data-slot="slider"]')
            .nth(group)
            .getByRole("slider")
            .count();
          expect(thumbCount).toBeGreaterThan(0);
          for (const page of pages)
            await page
              .locator('[data-slot="slider"]')
              .nth(group)
              .locator('[data-slot="slider-thumb"]')
              .first()
              .hover();
          await compare(pages[0], pages[1], info, `hover-${group}`);
          if (story === "disabled") {
            for (const page of pages)
              await expect(page.getByRole("slider").first()).toBeDisabled();
            continue;
          }
          for (let thumb = 0; thumb < thumbCount; thumb++) {
            for (const page of pages) {
              await page.mouse.move(0, 0);
              await page.keyboard.press("Tab");
              await page
                .locator('[data-slot="slider"]')
                .nth(group)
                .getByRole("slider")
                .nth(thumb)
                .focus();
            }
            await compare(pages[0], pages[1], info, `focus-${group}-${thumb}`);
            for (const page of pages)
              await page.keyboard.press(
                story === "vertical"
                  ? "ArrowUp"
                  : story === "rtl"
                    ? "ArrowLeft"
                    : "ArrowRight",
              );
            await compare(pages[0], pages[1], info, `arrow-${group}-${thumb}`);
            for (const page of pages) await page.keyboard.press("End");
            await compare(
              pages[0],
              pages[1],
              info,
              `max-boundary-${group}-${thumb}`,
            );
            for (const page of pages) await page.keyboard.press("Home");
            await compare(
              pages[0],
              pages[1],
              info,
              `min-boundary-${group}-${thumb}`,
            );
          }
          for (const page of pages) {
            const box = await page
              .locator('[data-slot="slider"]')
              .nth(group)
              .locator('[data-slot="slider-thumb"]')
              .first()
              .boundingBox();
            expect(box).not.toBeNull();
            await page.mouse.move(
              box!.x + box!.width / 2,
              box!.y + box!.height / 2,
            );
            await page.mouse.down();
          }
          await compare(pages[0], pages[1], info, `active-${group}`);
          for (const page of pages) {
            const track = await page
              .locator('[data-slot="slider"]')
              .nth(group)
              .locator('[data-slot="slider-track"]')
              .boundingBox();
            expect(track).not.toBeNull();
            await page.mouse.move(
              track!.x + track!.width * (story === "vertical" ? 0.5 : 0.35),
              track!.y + track!.height * (story === "vertical" ? 0.65 : 0.5),
              {
                steps: 5,
              },
            );
          }
          await compare(pages[0], pages[1], info, `drag-${group}`);
          for (const page of pages) await page.mouse.up();
          await compare(pages[0], pages[1], info, `released-${group}`);
        }
        if (story === "customization") {
          for (const page of pages) {
            await page
              .getByRole("button", {
                name: "Disable",
              })
              .click();
            await expect(page.getByRole("slider")).toBeDisabled();
            await expect(page.locator('[data-slot="slider"]')).toHaveCSS(
              "opacity",
              "0.6",
            );
          }
          await compare(pages[0], pages[1], info, "disabled-state-callback");
        }
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Slider hover transition intermediate samples / ${theme}`, async ({
    browser,
  }, info) => {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await browser.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-slider--demo&globals=theme:${theme}`,
        );
        await expect(page.locator('[data-slot="slider-thumb"]')).toBeVisible();
        await settle(page);
        await page.locator('[data-slot="slider-thumb"]').hover();
        await page
          .locator('[data-slot="slider-thumb"]')
          .evaluate(async (element) => {
            await new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            );
            const effects = element.getAnimations();
            if (
              !effects.some(
                (animation) =>
                  animation instanceof CSSTransition &&
                  animation.transitionProperty === "box-shadow",
              )
            )
              throw new Error("Expected real box-shadow transition");
            for (const animation of effects) {
              animation.pause();
              animation.currentTime = 0;
            }
          });
        return page;
      }),
    );
    try {
      for (const time of [0, 75, 150]) {
        for (const page of pages)
          await page
            .locator('[data-slot="slider-thumb"]')
            .evaluate((element, time) => {
              for (const animation of element.getAnimations()) {
                animation.pause();
                animation.currentTime = time;
              }
            }, time);
        await compare(pages[0], pages[1], info, `hover-${time}ms`, true, false);
      }
    } finally {
      await Promise.all(pages.map((page) => page.close()));
    }
  });
