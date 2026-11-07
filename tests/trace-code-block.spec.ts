import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { compare } from "./compare";
import { createStoryPair, loadStoryPair } from "./story-pair";
import { waitForStoryReadiness } from "./story-readiness";

for (const theme of ["light", "dark"]) {
  test(`Trace controlled states, keyboard, RTL and customization / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      await loadStoryPair(pages, "components-trace--contracts", theme);
      await compare(...pages, info, "initial");
      for (const page of pages) {
        await expect(
          page.getByRole("button", { name: "Disabled step" }),
        ).toBeDisabled();
        await expect(page.getByText("Nested title does not shimmer")).toHaveCSS(
          "animation-name",
          "none",
        );
        await expect(page.locator('[data-slot="trace"]')).toHaveCSS(
          "gap",
          "16px",
        );
        await page.getByRole("button", { name: "Controlled step 2s" }).focus();
      }
      await compare(...pages, info, "keyboard-focus");
      for (const page of pages) await page.keyboard.press("Space");
      for (const page of pages) {
        await expect(page.locator("output")).toHaveText("true");
        await expect(
          page.getByRole("textbox", { name: "Result" }),
        ).toBeVisible();
      }
      await compare(...pages, info, "expanded");
      for (const page of pages) await page.keyboard.press("Tab");
      for (const page of pages)
        await expect(
          page.getByRole("textbox", { name: "Result" }),
        ).toBeFocused();
      await compare(...pages, info, "content-focus");
      for (const status of ["error", "pending", "running"]) {
        for (const page of pages)
          await page.getByRole("button", { name: "Change status" }).click();
        for (const page of pages)
          await expect(
            page.locator('[data-slot="trace-line"]').first(),
          ).toHaveAttribute("data-status", status);
        await compare(...pages, info, status);
      }
      for (const page of pages) {
        await page.getByRole("button", { name: "Controlled step 2s" }).focus();
        await page.keyboard.press("Enter");
      }
      await compare(...pages, info, "collapsed");
      for (const page of pages)
        await expect(page.locator("output")).toHaveText("false");
    } finally {
      await context.close();
    }
  });

  test(`Trace nested expansion, links and dialogs / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      for (const name of ["collapsible", "turn", "dialog", "sheet", "link"]) {
        await loadStoryPair(pages, `components-trace--${name}`, theme);
        const target = (page: (typeof pages)[0]) =>
          name === "turn"
            ? page.getByRole("button", { name: "Thought 12s" })
            : name === "link"
              ? page.getByRole("link").first()
              : page.getByRole("button").first();
        for (const page of pages) await target(page).hover();
        await compare(...pages, info, `${name}-hover`);
        for (const page of pages) {
          await page.mouse.move(0, 0);
          await target(page).focus();
        }
        await compare(...pages, info, `${name}-focus`);
        if (name === "link") continue;
        for (const page of pages) await page.keyboard.press("Enter");
        if (name === "dialog" || name === "sheet")
          for (const page of pages) {
            await expect(page.getByRole("dialog")).toBeVisible();
            await page
              .locator(`[data-slot="${name}-overlay"]`)
              .evaluate((el) => el.setAttribute("data-parity-portal", ""));
          }
        await compare(...pages, info, `${name}-open`);
        if (name === "turn") {
          for (const page of pages) {
            const nested = page.getByRole("button", {
              name: "Failed to run pnpm --version",
            });
            await nested.click();
          }
          await compare(...pages, info, "nested-open");
        }
        if (name === "dialog" || name === "sheet") {
          for (const page of pages) {
            await expect(page.getByRole("dialog")).toBeVisible();
            await page.keyboard.press("Escape");
          }
          for (const page of pages)
            await expect(page.getByRole("dialog")).toHaveCount(0);
          await compare(...pages, info, `${name}-closed`);
        }
      }
    } finally {
      await context.close();
    }
  });

  test(`Code Block clipboard, blank lines, numbering and scroll / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, {
      permissions: ["clipboard-read", "clipboard-write"],
    });
    try {
      await loadStoryPair(pages, "components-code-block--contracts", theme);
      await compare(...pages, info, "initial");
      for (const page of pages) {
        const content = page
          .locator('[data-slot="code-block-content"]')
          .first();
        await expect(content).toHaveAttribute("dir", "ltr");
        await expect(content).toHaveCSS("padding", "12px");
        await expect(content).toHaveCSS("counter-reset", "line 4");
        await expect(
          content.locator('[data-slot="code-block-line"]'),
        ).toHaveCount(3);
        expect(
          await content
            .locator('[data-slot="code-block-line-content"]')
            .nth(1)
            .textContent(),
        ).toBe("\n");
        await page
          .getByRole("button", { name: "Copy", exact: true })
          .first()
          .focus();
      }
      await compare(...pages, info, "copy-focus");
      for (const page of pages) {
        await page.keyboard.press("Enter");
        await expect(
          page.getByRole("button", { name: "Copied", exact: true }),
        ).toBeVisible();
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
          "first\n\nthird\n",
        );
        await expect(page.locator("output")).toHaveText("1");
      }
      await compare(...pages, info, "copied");
      for (const page of pages)
        await expect(
          page.getByRole("button", { name: "Copied", exact: true }),
        ).toHaveCount(0);
      for (const page of pages) {
        await expect(
          page.getByRole("button", { name: "Copy", exact: true }).last(),
        ).toBeDisabled();
        await page
          .locator('[data-slot="code-block-content"][data-numbered]')
          .last()
          .evaluate((el) => {
            el.scrollTop = 120;
            el.scrollLeft = 90;
          });
      }
      await compare(...pages, info, "scrolled");
      for (const page of pages) {
        const content = page
          .locator('[data-slot="code-block-content"][data-numbered]')
          .last();
        await content.focus();
        const scrolling = content.evaluate(
          (element) =>
            new Promise<void>((resolve, reject) => {
              const done = () => {
                clearTimeout(timeout);
                resolve();
              };
              const timeout = setTimeout(() => {
                element.removeEventListener("scrollend", done);
                reject(new Error("Keyboard scrolling did not finish"));
              }, 5000);
              element.addEventListener("scrollend", done, { once: true });
            }),
        );
        await page.keyboard.press("ArrowDown");
        await scrolling;
        expect(
          await content.evaluate((element) => element.scrollTop),
        ).toBeGreaterThan(120);
      }
      await compare(...pages, info, "keyboard-scroll");
    } finally {
      await context.close();
    }
  });

  test(`Code Block expansion, wrap and code tabs / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      for (const name of ["show-more", "show-more-scroll", "demo", "tabs"]) {
        await loadStoryPair(
          pages,
          `components-code-block--${name}`,
          theme,
          waitForStoryReadiness,
        );
        const target = (page: (typeof pages)[0]) =>
          name === "demo"
            ? page.getByRole("button", { name: /wrap/i })
            : name === "tabs"
              ? page.getByRole("tab").last()
              : page.getByRole("button", { name: "Show more" });
        for (const page of pages) await target(page).click();
        await compare(...pages, info, `${name}-changed`);
        if (name.startsWith("show-more")) {
          for (const page of pages) {
            await expect(
              page.getByRole("button", { name: "Show less" }),
            ).toHaveAttribute("aria-expanded", "true");
            await page.getByRole("button", { name: "Show less" }).click();
          }
          await compare(...pages, info, `${name}-collapsed`);
        }
      }
    } finally {
      await context.close();
    }
  });
}

test("Code Block clipboard failure keeps copy available", async ({
  browser,
}, info) => {
  const { context, pages } = await createStoryPair(browser, undefined);
  try {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await loadStoryPair(pages, "components-code-block--contracts", "light");
    for (const page of pages) {
      await page
        .getByRole("button", { name: "Copy", exact: true })
        .first()
        .click();
      await expect(page.locator("[data-copied]")).toHaveCount(0);
      await expect(page.locator("output")).toHaveText("1");
    }
    await compare(...pages, info, "clipboard-denied");
  } finally {
    await context.close();
  }
});

test("Trace reduced motion and upstream accessibility parity", async ({
  browser,
}, info) => {
  const { context, pages } = await createStoryPair(browser, {
    reducedMotion: "reduce",
  });
  try {
    for (const theme of ["light", "dark"])
      for (const id of [
        "components-trace--contracts",
        "components-code-block--contracts",
      ]) {
        await loadStoryPair(pages, id, theme);
        await compare(...pages, info, `${id}-${theme}-reduced-motion`);
        const findings = [];
        for (const page of pages) {
          if (id.includes("trace"))
            await expect(
              page.locator('[data-slot="trace-title"]').first(),
            ).toHaveCSS("animation-name", "none");
          const result = await new AxeBuilder({ page })
            .include("#parity-root")
            .analyze();
          findings.push(
            await Promise.all(
              result.violations
                .filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
                .map(async (v) => ({
                  id: v.id,
                  impact: v.impact,
                  slots: await Promise.all(
                    v.nodes.map((node) =>
                      page
                        .locator(node.target.join(" "))
                        .getAttribute("data-slot"),
                    ),
                  ),
                })),
            ),
          );
        }
        // The pinned source uses muted-foreground/70 for descriptions, below
        // AA contrast in both themes. Preserve and explicitly track this limitation.
        expect(findings[0]).toEqual(
          id.includes("trace")
            ? [
                {
                  id: "color-contrast",
                  impact: "serious",
                  slots: ["trace-description"],
                },
              ]
            : [],
        );
        expect(findings[1]).toEqual(findings[0]);
      }
  } finally {
    await context.close();
  }
});

for (const theme of ["light", "dark"]) {
  test(`Trace shimmer and disclosure transition frames / ${theme}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, undefined);
    try {
      await loadStoryPair(pages, "components-trace--contracts", theme);
      for (const time of [0, 750, 1500]) {
        for (const page of pages)
          await page
            .locator('[data-slot="trace-title"]')
            .first()
            .evaluate(async (element, time) => {
              const animation = element.getAnimations()[0];
              if (!animation) throw new Error("Missing running Trace shimmer");
              animation.pause();
              await animation.ready;
              animation.currentTime = time;
            }, time);
        await compare(...pages, info, `shimmer-${time}`, true, false);
      }
      for (const page of pages) {
        await page.evaluate(() => {
          document.addEventListener("transitionrun", (event) => {
            if (
              !(event.target instanceof Element) ||
              !event.target.closest("#parity-root")
            )
              return;
            for (const animation of event.target.getAnimations()) {
              if (!(animation instanceof CSSTransition)) continue;
              animation.pause();
              animation.currentTime = 0;
            }
          });
        });
        await page.getByRole("button", { name: "Controlled step 2s" }).click();
        await expect
          .poll(() =>
            page
              .locator('[data-slot="trace-collapsible-content"]')
              .first()
              .evaluate(
                (el) =>
                  el.getAnimations().filter((a) => a instanceof CSSTransition)
                    .length,
              ),
          )
          .toBeGreaterThan(0);
      }
      for (const time of [75, 150, 200]) {
        for (const page of pages)
          await page.evaluate(async (time) => {
            for (const animation of document.getAnimations()) {
              if (!(animation instanceof CSSTransition)) continue;
              await animation.ready;
              animation.currentTime = time;
            }
          }, time);
        await compare(...pages, info, `disclosure-${time}`, true, false);
      }
    } finally {
      await context.close();
    }
  });
}

test("Code Block streaming updates highlighting and copy availability", async ({
  browser,
}, info) => {
  const { context, pages } = await createStoryPair(browser, undefined);
  try {
    await loadStoryPair(
      pages,
      "components-code-block--streaming",
      "dark",
      waitForStoryReadiness,
    );
    for (const page of pages) {
      await page.getByRole("button", { name: "Replay" }).click();
      await expect(page.locator('[data-slot="code-block"]')).toHaveCount(1);
      await expect(
        page.getByRole("button", { name: "Copy", exact: true }).first(),
      ).toBeDisabled();
      await expect(
        page.locator('[data-slot="code-block-content"]').first(),
      ).not.toHaveText("");
    }
    for (const page of pages) {
      await expect(page.getByRole("button", { name: "Replay" })).toBeEnabled({
        timeout: 20_000,
      });
      await expect(page.locator('[data-slot="code-block"]')).toHaveCount(5);
      await expect(
        page.getByRole("button", { name: "Copy", exact: true }).first(),
      ).toBeEnabled();
      await expect(
        page.locator('[data-slot="code-block-content"]').first(),
      ).toContainText("return debounced");
      await page.mouse.move(0, 0);
    }
    await compare(...pages, info, "stream-complete");
  } finally {
    await context.close();
  }
});

for (const touch of [false, true])
  test(`Code Block floating actions / ${touch ? "touch" : "mouse"}`, async ({
    browser,
  }, info) => {
    const { context, pages } = await createStoryPair(browser, {
      hasTouch: touch,
      viewport: { width: touch ? 390 : 1000, height: 900 },
    });
    try {
      await loadStoryPair(
        pages,
        "components-code-block--floating-actions",
        "light",
      );
      for (const page of pages)
        await expect(
          page.locator('[data-slot="code-block-actions"]'),
        ).toHaveCSS("opacity", touch ? "1" : "0");
      await compare(...pages, info, "initial-actions");
      if (!touch) {
        for (const page of pages)
          await page.locator('[data-slot="code-block"]').hover();
        for (const page of pages)
          await expect(
            page.locator('[data-slot="code-block-actions"]'),
          ).toHaveCSS("opacity", "1");
        await compare(...pages, info, "hover-actions");
        for (const page of pages) {
          await page.mouse.move(0, 0);
          await page.getByRole("button", { name: "Copy", exact: true }).focus();
        }
        await compare(...pages, info, "focus-actions");
        for (const page of pages)
          await expect(
            page.locator('[data-slot="code-block-actions"]'),
          ).toHaveCSS("opacity", "1");
      }
    } finally {
      await context.close();
    }
  });
