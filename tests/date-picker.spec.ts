import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
import {
  installOverlayAnimationControl,
  sampleOverlayAnimation,
  completeOverlayAnimation,
} from "./overlay-animation";
test("Every official Date Picker preview and Usage has a parity story", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/date-picker.mdx",
    "utf8",
  );
  const previews = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(previews).toHaveLength(8);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of [...previews, "date-picker-usage"])
    expect(
      index.entries[
        "components-" + name.replace("date-picker-", "date-picker--")
      ]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "basic",
    "range",
    "dob",
    "input",
    "time",
    "natural-language",
    "rtl",
    "usage",
  ])
    test(`Date Picker ${story} actual composition / ${theme}`, async ({
      browser,
    }, info) => {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(() => browser.newPage()),
      );
      try {
        for (const page of pages)
          await page.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
        await Promise.all(
          pages.map((page, i) =>
            page.goto(
              `${i ? stylexURL : upstreamURL}/iframe.html?id=components-date-picker--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const page of pages)
          await expect(
            page.locator("#parity-root button").first(),
          ).toBeVisible();
        await compare(pages[0], pages[1], info, `${story}-closed`);
        for (const page of pages) {
          await page.locator("#parity-root button").first().click();
          await expect(page.locator('[data-slot="calendar"]')).toBeVisible();
          await expect(
            page.locator('[data-slot="popover-content"]'),
          ).not.toHaveAttribute("data-entering");
          await page
            .locator('[data-slot="popover-content"]')
            .evaluate((node) => node.setAttribute("data-parity-portal", ""));
        }
        await compare(pages[0], pages[1], info, `${story}-open`);
        for (const page of pages) {
          await page
            .locator('[data-slot="calendar"] [role="button"]')
            .filter({ hasText: /^(15|١٥)$/ })
            .first()
            .click();
          if (story === "range")
            await page
              .locator('[data-slot="calendar"] [role="button"]')
              .filter({ hasText: /^20$/ })
              .first()
              .click();
          await page.mouse.move(0, 0);
        }
        if (["dob", "input", "time", "natural-language"].includes(story)) {
          for (const page of pages)
            await expect(
              page.locator('[data-slot="popover-content"]'),
            ).toHaveCount(0);
        }
        await compare(pages[0], pages[1], info, `${story}-selected`);
        for (const page of pages) {
          await page.keyboard.press("Escape");
          await expect(
            page.locator('[data-slot="popover-content"]'),
          ).toHaveCount(0);
          await expect(
            page.locator("#parity-root button").first(),
          ).toBeFocused();
        }
        await compare(pages[0], pages[1], info, `${story}-dismissed`);
      } finally {
        await Promise.all(pages.map((page) => page.close()));
      }
    });
for (const theme of ["light", "dark"])
  test(`Date Picker actual overlay frames and lifecycle / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const selector = '[data-slot="popover-content"]';
    await installOverlayAnimationControl(context, selector);
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(() => context.newPage()),
    );
    try {
      for (const page of pages)
        await page.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
      await Promise.all(
        pages.map((page, i) =>
          page.goto(
            `${i ? stylexURL : upstreamURL}/iframe.html?id=components-date-picker--demo&globals=theme:${theme}`,
          ),
        ),
      );
      for (const page of pages) {
        await page.locator("#parity-root button").first().click();
        await page
          .locator(selector)
          .evaluate((node) => node.setAttribute("data-parity-portal", ""));
      }
      for (const phase of ["enter", "exit"]) {
        if (phase === "exit")
          for (const page of pages) await page.keyboard.press("Escape");
        for (const page of pages)
          await expect
            .poll(() =>
              page
                .locator(selector)
                .evaluate(
                  (node, phase) =>
                    node.hasAttribute(`data-${phase}ing`) &&
                    node
                      .getAnimations()
                      .some((animation) => animation.playState === "paused"),
                  phase,
                ),
            )
            .toBe(true);
        for (const time of [0, 50, 100]) {
          for (const page of pages)
            await sampleOverlayAnimation(page, selector, time);
          await compare(pages[0], pages[1], info, `${phase}-${time}`);
        }
        for (const page of pages)
          await completeOverlayAnimation(page, selector);
        if (phase === "enter") {
          for (const page of pages)
            await expect(page.locator(selector)).not.toHaveAttribute(
              "data-entering",
            );
        } else
          for (const page of pages)
            await expect(page.locator(selector)).toHaveCount(0);
        await compare(pages[0], pages[1], info, `${phase}-complete`);
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Date Picker responsive actual range / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 900 },
    });
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(() => context.newPage()),
    );
    try {
      for (const page of pages)
        await page.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
      await Promise.all(
        pages.map((page, i) =>
          page.goto(
            `${i ? stylexURL : upstreamURL}/iframe.html?id=components-date-picker--range&globals=theme:${theme}`,
          ),
        ),
      );
      for (const page of pages) {
        await page.locator("#parity-root button").first().click();
        await expect(page.locator('[data-slot="calendar"]')).toBeVisible();
        await expect(
          page.locator('[data-slot="popover-content"]'),
        ).not.toHaveAttribute("data-entering");
        await page
          .locator('[data-slot="popover-content"]')
          .evaluate((node) => node.setAttribute("data-parity-portal", ""));
      }
      await compare(pages[0], pages[1], info, "range-390");
      for (const page of pages) {
        await page.keyboard.press("Escape");
        await expect(page.locator('[data-slot="popover-content"]')).toHaveCount(
          0,
        );
      }
      await compare(pages[0], pages[1], info, "range-390-dismissed");
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Date Picker input parsing and keyboard opening / ${theme}`, async ({
    browser,
  }, info) => {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(() => browser.newPage()),
    );
    try {
      for (const story of ["input", "natural-language"]) {
        for (const page of pages)
          await page.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
        await Promise.all(
          pages.map((page, i) =>
            page.goto(
              `${i ? stylexURL : upstreamURL}/iframe.html?id=components-date-picker--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const page of pages) {
          await page
            .locator("input")
            .fill(story === "input" ? "July 4, 2025" : "Tomorrow");
          await page.keyboard.press("ControlOrMeta+A");
        }
        await compare(pages[0], pages[1], info, `${story}-parsed`);
        for (const page of pages) {
          await page.keyboard.press("ArrowDown");
          await expect(
            page.locator('[data-slot="popover-content"]'),
          ).not.toHaveAttribute("data-entering");
          await expect(
            page.locator('[data-slot="calendar"] [data-selected="true"]'),
          ).toHaveText(story === "input" ? "4" : "13");
          await page
            .locator('[data-slot="popover-content"]')
            .evaluate((node) => node.setAttribute("data-parity-portal", ""));
        }
        await compare(pages[0], pages[1], info, `${story}-keyboard-open`);
        for (const page of pages) {
          await page.keyboard.press("Escape");
          await expect(
            page.locator('[data-slot="popover-content"]'),
          ).toHaveCount(0);
        }
        await compare(pages[0], pages[1], info, `${story}-keyboard-dismissed`);
      }
    } finally {
      await Promise.all(pages.map((page) => page.close()));
    }
  });
for (const theme of ["light", "dark"])
  test(`Date Picker actual nested month and year selectors / ${theme}`, async ({
    browser,
  }, info) => {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(() => browser.newPage()),
    );
    try {
      for (const page of pages)
        await page.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
      await Promise.all(
        pages.map((page, i) =>
          page.goto(
            `${i ? stylexURL : upstreamURL}/iframe.html?id=components-date-picker--dob&globals=theme:${theme}`,
          ),
        ),
      );
      for (const page of pages) {
        await page.locator("#parity-root button").first().click();
        await expect(
          page.locator('[data-slot="popover-content"]'),
        ).not.toHaveAttribute("data-entering");
        await page
          .locator('[data-slot="popover-content"]')
          .evaluate((node) => node.setAttribute("data-parity-portal", ""));
      }
      for (const index of [0, 1]) {
        for (const page of pages) {
          await page.locator('[data-slot="select-trigger"]').nth(index).click();
          await page
            .locator('[data-slot="select-content"]')
            .evaluate((node) => node.setAttribute("data-parity-portal", ""));
        }
        await compare(
          pages[0],
          pages[1],
          info,
          index ? "nested-year-open" : "nested-month-open",
        );
        for (const page of pages) {
          if (index)
            await page
              .getByRole("option", { name: "2027", exact: true })
              .click();
          else await page.getByRole("option").nth(2).click();
          await expect(
            page.locator('[data-slot="select-content"]'),
          ).toHaveCount(0);
          await page.mouse.move(0, 0);
        }
        await compare(
          pages[0],
          pages[1],
          info,
          index ? "nested-year-selected" : "nested-month-selected",
        );
        for (const page of pages)
          await expect(page.locator('[data-slot="calendar"]')).toBeVisible();
      }
      for (const page of pages) {
        await page.keyboard.press("Escape");
        await expect(page.locator('[data-slot="popover-content"]')).toHaveCount(
          0,
        );
      }
      await compare(pages[0], pages[1], info, "nested-outer-dismissed");
    } finally {
      await Promise.all(pages.map((page) => page.close()));
    }
  });
