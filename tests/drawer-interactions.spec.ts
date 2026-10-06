import { test, expect, type Page } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
async function mark(pages: Page[]) {
  await Promise.all(
    pages.map((p) =>
      p.evaluate(() => {
        for (const portal of document.querySelectorAll(
          '[data-slot="drawer-portal"],[data-slot="dialog-overlay"]',
        ))
          portal.setAttribute("data-parity-portal", "");
      }),
    ),
  );
}
async function load(pages: Page[], name: string, theme: string) {
  await Promise.all(
    pages.map(async (p, i) => {
      await p.goto(
        `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-drawer--${name}&viewMode=story&globals=theme:${theme}`,
      );
      await expect(p.locator("#parity-root")).toBeVisible();
    }),
  );
}
for (const theme of ["light", "dark"])
  for (const name of ["demo-example", "rtl", "dialog", "snap-points"])
    test(`Drawer representative mobile ${name} / ${theme}`, async ({
      browser,
    }, info) => {
      const ctx = await browser.newContext({
        viewport: { width: 390, height: 900 },
      });
      const pages = await Promise.all([0, 1].map(() => ctx.newPage()));
      try {
        await load(pages, name, theme);
        await Promise.all(
          pages.map((p) => p.locator("#parity-root button").first().click()),
        );
        await Promise.all(
          pages.map((p) => expect(p.getByRole("dialog")).toBeVisible()),
        );
        await mark(pages);
        await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
        await compare(pages[0], pages[1], info, "mobile-open");
        if (name === "demo-example" || name === "rtl") {
          await Promise.all(
            pages.map((p) =>
              p
                .locator(
                  'label[for="' +
                    (name === "rtl" ? "delivery-6-30-rtl" : "delivery-6-30") +
                    '"]',
                )
                .click(),
            ),
          );
          await compare(pages[0], pages[1], info, "last-delivery-selected");
        }
        await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
        await Promise.all(
          pages.map((p) => expect(p.getByRole("dialog")).toBeHidden()),
        );
        await compare(pages[0], pages[1], info, "mobile-closed");
      } finally {
        await ctx.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Drawer four real nested levels and focus restoration / ${theme}`, async ({
    browser,
  }, info) => {
    const ctx = await browser.newContext();
    const pages = await Promise.all([0, 1].map(() => ctx.newPage()));
    try {
      await load(pages, "nested", theme);
      for (const [index, label] of [
        "Open Drawer",
        "Open Nested Drawer",
        "Open Third Drawer",
        "Open Fourth Drawer",
      ].entries()) {
        await Promise.all(
          pages.map((p) =>
            p.getByRole("button", { name: label, exact: true }).click(),
          ),
        );
        await Promise.all(
          pages.map((p) =>
            expect(p.locator('[data-slot="drawer-popup"]')).toHaveCount(
              index + 1,
            ),
          ),
        );
        await mark(pages);
        await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
        await compare(pages[0], pages[1], info, "nested-" + (index + 1));
      }
      for (let level = 4; level > 0; level--) {
        for (const p of pages) {
          await p.bringToFront();
          await p.keyboard.press(level === 4 ? "Escape" : "Enter");
        }
        await Promise.all(
          pages.map((p) =>
            expect(p.locator('[data-slot="drawer-popup"]')).toHaveCount(
              level - 1,
            ),
          ),
        );
        await compare(pages[0], pages[1], info, "closed-level-" + level);
        if (level > 1) {
          for (const p of pages) {
            await p.bringToFront();
            await p.keyboard.press("Tab");
            await expect(
              p.getByRole("button", { name: "Close", exact: true }),
            ).toBeFocused();
          }
        }
      }
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Drawer scroll fade positions preserve actual mask animation / ${theme}`, async ({
    browser,
  }, info) => {
    const ctx = await browser.newContext();
    const pages = await Promise.all([0, 1].map(() => ctx.newPage()));
    try {
      await load(pages, "registry-scrollable", theme);
      await Promise.all(
        pages.map((p) => p.locator("#parity-root button").first().click()),
      );
      await mark(pages);
      await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
      for (const progress of [0, 0.5, 1]) {
        await Promise.all(
          pages.map((p) =>
            p
              .locator(
                '[data-slot="drawer-content"] > div:not([data-slot]):has(> p)',
              )
              .evaluate((el, progress) => {
                el.scrollTop = (el.scrollHeight - el.clientHeight) * progress;
              }, progress),
          ),
        );
        await compare(pages[0], pages[1], info, "scroll-" + progress);
      }
    } finally {
      await ctx.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Drawer nonmodal outside pointer and keyboard close / ${theme}`, async ({
    browser,
  }, info) => {
    const ctx = await browser.newContext();
    const pages = await Promise.all([0, 1].map(() => ctx.newPage()));
    try {
      await load(pages, "non-modal", theme);
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Non Modal", exact: true }).click(),
        ),
      );
      await mark(pages);
      await Promise.all(pages.map((p) => p.mouse.click(0, 0)));
      await Promise.all(
        pages.map((p) => expect(p.getByRole("dialog")).toBeVisible()),
      );
      await compare(pages[0], pages[1], info, "nonmodal-outside");
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Close", exact: true }).focus(),
        ),
      );
      await Promise.all(pages.map((p) => p.keyboard.press("Enter")));
      await Promise.all(
        pages.map((p) => expect(p.getByRole("dialog")).toBeHidden()),
      );
      await compare(pages[0], pages[1], info, "keyboard-close");
    } finally {
      await ctx.close();
    }
  });
