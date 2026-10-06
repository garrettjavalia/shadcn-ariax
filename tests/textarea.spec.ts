import { test, expect } from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
for (const theme of ["light", "dark"])
  test(`Textarea editing, content sizing and style callback / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
      locale: "en-US",
      timezoneId: "UTC",
      colorScheme: "light",
    });
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of ["demo", "context", "inline-style"]) {
        await Promise.all(
          [a, b].map(async (page, i) => {
            await page.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-textarea--${story}&viewMode=story&globals=theme:${theme}`,
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
test("Textarea documentation coverage explicitly tracks pending Field compositions", async () => {
  const { readFile } = await import("node:fs/promises");
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/textarea.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  const covered = ["textarea-demo", "textarea-button"];
  const pending = [
    "textarea-field",
    "textarea-disabled",
    "textarea-invalid",
    "textarea-rtl",
  ];
  expect(names.sort()).toEqual([...covered, ...pending].sort());
});
test("Textarea inline style wins while retaining dynamic StyleX variables", async ({
  page,
}) => {
  await page.goto(
    `${stylexURL}/iframe.html?id=components-textarea--customized&viewMode=story`,
  );
  const textarea = page.getByRole("textbox", { name: "Customized" });
  await expect(textarea).toHaveCSS("width", "240px");
  await expect(textarea).toHaveCSS("padding-inline-start", "16px");
});
