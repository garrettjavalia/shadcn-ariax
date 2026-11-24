import { navigateStory } from "./story-navigation";
import { deterministicStoryContextOptions } from "./story-pair";
import { test, expect } from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
for (const theme of ["light", "dark"])
  test(`Textarea editing, content sizing and style callback / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(1000, { colorScheme: "light" }),
    );
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of ["demo", "context", "inline-style"]) {
        await Promise.all(
          [a, b].map(async (page, i) => {
            await navigateStory(
              page,
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-textarea--${story}&viewMode=story&globals=theme:${theme}`,
              true,
            );
            await expect(page.locator("#parity-root textarea")).toBeVisible();
            await page.keyboard.press("Tab");
          }),
        );
        await compare(a, b, info, `${story}-focus`);
        await Promise.all(
          [a, b].map((page) =>
            page
              .locator("textarea")
              .fill(
                "First line\nSecond line\nThird line\nFourth line\nFifth line",
              ),
          ),
        );
        await compare(a, b, info, `${story}-multiline`);
      }
    } finally {
      await context.close();
    }
  });

test("Textarea inline style wins while retaining dynamic StyleX variables", async ({
  page,
}) => {
  await navigateStory(
    page,
    `${stylexURL}/iframe.html?id=components-textarea--customized&viewMode=story`,
    true,
  );
  const textarea = page.getByRole("textbox", { name: "Customized" });
  await expect(textarea).toHaveCSS("width", "240px");
  await expect(textarea).toHaveCSS("padding-inline-start", "16px");
});
