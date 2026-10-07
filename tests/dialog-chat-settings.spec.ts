import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    test(`Dialog ChatSettings real tabs, selects and controls / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const { context: ctx, pages } = await createStoryPair(browser, {
        viewport: { width, height: 900 },
      });
      try {
        await Promise.all(
          pages.map(async (p, i) => {
            await p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-dialog--chat-settings&viewMode=story&globals=theme:${theme}`,
            );
            await expect(p.locator("#parity-root")).toBeVisible();
            await p
              .getByRole("button", { name: "Chat Settings", exact: true })
              .click();
            await expect(p.getByRole("dialog")).toBeVisible();
          }),
        );
        await compare(pages[0], pages[1], info, "general-open");
        for (const id of [
          "theme",
          "accent-color",
          "spoken-language",
          "voice",
        ]) {
          await Promise.all(
            pages.map(async (p) => {
              await p.locator(`#${id}[data-slot="select-trigger"]`).click();
              await expect(
                p.locator('[data-slot="select-content"]'),
              ).toBeVisible();
              await p
                .locator('[data-slot="select-content"]')
                .evaluate((el) => el.setAttribute("data-parity-portal", ""));
            }),
          );
          await compare(pages[0], pages[1], info, `${id}-options`);
          await Promise.all(
            pages.map(async (p) => {
              await p.keyboard.press("ArrowDown");
              await p.keyboard.press("Enter");
              await expect(
                p.locator('[data-slot="select-content"]'),
              ).toBeHidden();
            }),
          );
          await compare(pages[0], pages[1], info, `${id}-changed`);
        }
        for (const tab of [
          "notifications",
          "personalization",
          "security",
          "general",
        ]) {
          await Promise.all(
            pages.map((p) =>
              width >= 768
                ? p
                    .getByRole("tab", {
                      name: tab[0].toUpperCase() + tab.slice(1),
                      exact: true,
                    })
                    .click()
                : p.locator('[data-slot="native-select"]').selectOption(tab),
            ),
          );
          await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
          await compare(pages[0], pages[1], info, `${tab}-selected`);
          if (tab === "notifications") {
            await Promise.all(
              pages.map(async (p) => {
                await expect(p.getByRole("checkbox").first()).toBeDisabled();
                await p.locator('[data-slot="checkbox"]').nth(1).click();
                await p.locator('[data-slot="checkbox"]').nth(2).click();
                await expect(p.getByRole("checkbox").nth(1)).toBeChecked();
                await expect(p.getByRole("checkbox").nth(2)).toBeChecked();
              }),
            );
            await compare(pages[0], pages[1], info, "notifications-changed");
          }
          if (tab === "personalization") {
            await Promise.all(
              pages.map(async (p) => {
                await p.locator("#nickname").fill("Nova");
                await p.locator("#about").fill("I build accessible apps.");
                await p.locator('[data-slot="switch"]').click();
              }),
            );
            await compare(pages[0], pages[1], info, "personalization-changed");
            await Promise.all(
              pages.map(async (p) => {
                await p.locator('[data-slot="input-group"] button').hover();
                await expect(
                  p.locator('[data-slot="tooltip-content"]'),
                ).toBeVisible();
                await p
                  .locator('[data-slot="tooltip-content"]')
                  .evaluate((el) => el.setAttribute("data-parity-portal", ""));
              }),
            );
            await compare(
              pages[0],
              pages[1],
              info,
              "personalization-tooltip-kbd",
            );
            await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
          }
          if (tab === "security") {
            await Promise.all(
              pages.map((p) => p.locator('[data-slot="switch"]').click()),
            );
            await compare(pages[0], pages[1], info, "security-enabled");
          }
        }
        await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
        await Promise.all(
          pages.map(async (p) => {
            await expect(p.getByRole("dialog")).toBeHidden();
            await expect(
              p.getByRole("button", { name: "Chat Settings", exact: true }),
            ).toBeFocused();
          }),
        );
        await compare(pages[0], pages[1], info, "closed");
      } finally {
        await ctx.close();
      }
    });
