import { navigateStory } from "./story-navigation";
import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";

// Force only the CSS pseudo state: touchscreen sticky hover is browser-specific,
// but the original selector/media contract must hold on either kind of device.
for (const hasTouch of [false, true])
  test(`hover selectors preserve device media conditions / touch=${hasTouch}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({ hasTouch });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    const cases = [
      ["sidebar--states", '[data-sidebar="menu-button"]'],
      ["sidebar--states", '[data-sidebar="group-action"]'],
      ["sidebar--states", '[data-sidebar="menu-action"]'],
      ["sidebar--states", '[data-sidebar="menu-item"]'],
      ["sidebar--states", '[data-sidebar="menu-sub-button"]'],
      ["sidebar--states", '[data-sidebar="rail"]'],
      ["accordion--descendants", '[data-slot="accordion-trigger"]'],
      ["accordion--descendants", "a"],
      ["field--rtl", "a"],
      ["empty--usage", '[data-slot="empty-description"]'],
      ["item--structure", '[data-slot="item-description"] > a'],
    ];
    try {
      for (const [story, selector] of cases) {
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          await navigateStory(
            page,
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-${story}`,
            true,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          let target = selector;
          if (story === "empty--usage") {
            await page.locator(selector).evaluate((el) => {
              const a = document.createElement("a");
              a.href = "#";
              a.textContent = "Learn more";
              el.append(a);
            });
            target = `${selector} > a`;
          }
          const session = await context.newCDPSession(page);
          await session.send("DOM.enable");
          await session.send("CSS.enable");
          const { root } = await session.send("DOM.getDocument");
          const { nodeId } = await session.send("DOM.querySelector", {
            nodeId: root.nodeId,
            selector: target,
          });
          expect(nodeId).toBeGreaterThan(0);
          await session.send("CSS.forcePseudoState", {
            nodeId,
            forcedPseudoClasses: ["hover"],
          });
        }
        await compare(pages[0], pages[1], info, story + "-" + selector);
      }
    } finally {
      await context.close();
    }
  });
