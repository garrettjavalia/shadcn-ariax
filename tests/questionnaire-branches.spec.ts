import { test, expect, type Page } from "@playwright/test";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
const active = (page: Page) =>
  page.locator('[data-slot="questionnaire-item"][data-active]');
const title = (page: Page) =>
  active(page).locator('[data-slot="questionnaire-title"]');
const next = (page: Page) =>
  page.locator('[data-slot="questionnaire-next"]:visible');
const previous = (page: Page) =>
  page.locator('[data-slot="questionnaire-previous"]:visible');
for (const theme of ["light", "dark"])
  for (const story of [
    "skip",
    "validation",
    "conditional",
    "resume",
    "navigation-state",
    "registry-disabled",
  ]) {
    test(`Questionnaire branch contract / ${story} / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 900 },
      });
      try {
        const pages = await Promise.all(
          [upstreamURL, stylexURL].map(async (url) => {
            const page = await context.newPage();
            await page.goto(
              `${url}/iframe.html?id=components-questionnaire--${story}&globals=theme:${theme}`,
            );
            await expect(active(page)).toBeVisible();
            return page;
          }),
        );
        const check = (state: string) =>
          compare(pages[0], pages[1], info, state);
        if (story === "skip") {
          for (const p of pages) {
            await p
              .getByRole("radio", { name: "New feature", exact: true })
              .check();
            await next(p).click();
          }
          await check("optional-question");
          for (const p of pages) {
            await p.locator('[data-slot="questionnaire-skip"]:visible').click();
            await expect(title(p)).toHaveText(
              "How should the work be reviewed?",
            );
          }
          await check("skipped");
          for (const p of pages) {
            await previous(p).click();
            await expect(active(p)).toHaveAttribute("data-status", "skipped");
          }
          await check("revisit-skipped");
        } else if (story === "validation") {
          for (const p of pages) {
            await p.getByRole("radio", { name: "Concise summary" }).check();
            await next(p).click();
            await p.getByRole("radio", { name: "Public audience" }).check();
            await p.getByRole("button", { name: "Validate answers" }).click();
            await expect(
              p.locator('[data-slot="questionnaire-error"]:visible'),
            ).toHaveText(
              "Public answers need enough context. Choose a complete answer.",
            );
          }
          await check("cross-field-error");
          for (const p of pages) {
            await p.getByRole("radio", { name: "Complete answer" }).check();
            await expect(
              p.locator('[data-slot="questionnaire-error"]:visible'),
            ).toHaveCount(0);
          }
          await check("corrected-answer");
        } else if (story === "conditional") {
          for (const p of pages) {
            await next(p).click();
            await expect(title(p)).toHaveText(
              "When should the agent request approval?",
            );
            await previous(p).click();
            await p.getByRole("radio", { name: "Cloud workspace" }).check();
            await next(p).click();
            await expect(title(p)).toHaveText(
              "Which cloud environment should it use?",
            );
          }
          await check("enabled-cloud-question");
          for (const p of pages) {
            await previous(p).click();
            await p.getByRole("radio", { name: "Local workspace" }).check();
            await next(p).click();
            await expect(title(p)).toHaveText(
              "When should the agent request approval?",
            );
          }
          await check("disabled-cloud-question-skipped");
        } else if (story === "resume") {
          for (const p of pages) {
            await p
              .getByRole("checkbox", { name: "Run migration tests" })
              .uncheck();
            await next(p).click();
            await p
              .getByRole("textbox", { name: "Saved migration note" })
              .fill("Edited draft");
            await p.getByRole("button", { name: "Reset changes" }).click();
          }
          await check("reset");
          for (const p of pages) {
            await expect(
              p.getByRole("checkbox", { name: "Run migration tests" }),
            ).toBeChecked();
            await next(p).click();
            await expect(
              p.getByRole("textbox", { name: "Saved migration note" }),
            ).toHaveValue("Keep the existing public API stable.");
          }
          await check("restored-default-values");
        } else if (story === "navigation-state") {
          for (const p of pages) {
            await expect(next(p)).toBeDisabled();
            await p
              .getByRole("radio", { name: "Project files", exact: true })
              .check();
            await expect(next(p)).toBeEnabled();
          }
          await check("answered-enables-next");
          for (const p of pages) {
            await next(p).click();
            await expect(
              p.getByRole("button", { name: "Save permissions" }),
            ).toBeDisabled();
            await p.getByRole("radio", { name: "Tests", exact: true }).check();
            await expect(
              p.getByRole("button", { name: "Save permissions" }),
            ).toBeEnabled();
          }
          await check("answered-enables-submit");
        } else {
          for (const p of pages) {
            await expect(p.locator('input[value="enterprise"]')).toBeDisabled();
            await p.locator('input[value="plus"]').focus();
            await p.keyboard.press("ArrowDown");
            await expect(p.locator('input[value="pro"]')).toBeChecked();
            await p.keyboard.press("ArrowDown");
            await expect(p.locator('input[value="plus"]')).toBeChecked();
          }
          await check("keyboard-skips-disabled-choice");
        }
      } finally {
        await context.close();
      }
    });
  }
for (const theme of ["light", "dark"])
  test(`Questionnaire styles, render composition, refs and submit / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-questionnaire--customization&globals=theme:${theme}`,
          );
          await expect(page.locator("#custom-questionnaire")).toHaveAttribute(
            "data-ref",
            "attached",
          );
          return page;
        }),
      );
      for (const page of pages) {
        await expect(page.locator("#custom-questionnaire")).toHaveCSS(
          "width",
          "320px",
        );
        await expect(page.locator("#custom-questionnaire")).toHaveCSS(
          "gap",
          "12px",
        );
        await expect(
          page.locator('[data-slot="questionnaire-title"]'),
        ).toHaveCSS("font-size", "22px");
      }
      await compare(pages[0], pages[1], info, "custom-styles");
      for (const page of pages) {
        await page.getByRole("button", { name: "Change width" }).click();
        await expect(page.locator("#custom-questionnaire")).toHaveCSS(
          "width",
          "380px",
        );
        await page
          .getByRole("textbox", { name: "Custom note" })
          .fill("Keep public props");
        await page.getByRole("button", { name: "Submit 0" }).click();
        await expect(
          page.getByRole("button", { name: "Submit 1" }),
        ).toBeVisible();
      }
      await compare(pages[0], pages[1], info, "dynamic-width-and-submit");
    } finally {
      await context.close();
    }
  });
