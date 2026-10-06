import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { upstreamURL, stylexURL } from "./servers";
import { compare } from "./compare";
test("NativeSelect official documentation previews have parity stories", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/native-select.mdx",
    "utf8",
  );
  const examples = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(examples.sort()).toEqual([
    "native-select-demo",
    "native-select-disabled",
    "native-select-groups",
    "native-select-invalid",
    "native-select-rtl",
  ]);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of examples)
    expect(
      index.entries[
        `components-native-select--${name.replace("native-select-", "")}`
      ]?.tags,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  test(`NativeSelect focus hover selection and customization / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
      locale: "en-US",
      timezoneId: "UTC",
    });
    const a = await context.newPage(),
      b = await context.newPage();
    try {
      for (const story of [
        "demo",
        "small",
        "invalid",
        "disabled",
        "disabled-options",
        "controlled",
        "customized",
        "field-composition",
      ]) {
        await Promise.all(
          [
            [a, upstreamURL],
            [b, stylexURL],
          ].map(async ([page, url]) => {
            const p = page as typeof a;
            await p.goto(
              `${url}/iframe.html?id=components-native-select--${story}&viewMode=story&globals=theme:${theme}`,
            );
            await expect(p.locator("#parity-root")).toBeVisible();
          }),
        );
        if (story === "customized") {
          await a.getByRole("button", { name: "Resize" }).click();
          await b.getByRole("button", { name: "Resize" }).click();
          await compare(a, b, info, `${theme}-${story}-dynamic`);
        }
        for (const page of [a, b]) {
          await page.getByRole("combobox").hover({ force: true });
        }
        await compare(a, b, info, `${theme}-${story}-hover`);
        if (story === "disabled") {
          for (const page of [a, b])
            await expect(page.getByRole("combobox")).toBeDisabled();
          continue;
        }
        for (const page of [a, b]) {
          await page.mouse.move(0, 0);
          await page.getByRole("combobox").focus();
        }
        await compare(a, b, info, `${theme}-${story}-focus`);
        if (story === "controlled") {
          for (const page of [a, b]) {
            await page.getByRole("combobox").selectOption("two");
            await expect(page.locator("output")).toHaveText("two");
            const values = await page
              .locator("form")
              .evaluate((form) =>
                Array.from(new FormData(form as HTMLFormElement)),
              );
            expect(values).toEqual([["choice", "two"]]);
          }
          await compare(a, b, info, `${theme}-${story}-changed`);
        }
        if (story === "disabled-options") {
          for (const page of [a, b]) {
            await page.getByRole("combobox").press("f");
            await expect(page.getByRole("combobox")).toHaveValue("four");
          }
          await compare(a, b, info, `${theme}-${story}-keyboard`);
        }
      }
    } finally {
      await context.close();
    }
  });
test("NativeSelect dark hover respects non-hover touch media", async ({
  browser,
}, info) => {
  const context = await browser.newContext({
    viewport: { width: 1000, height: 900 },
    locale: "en-US",
    timezoneId: "UTC",
    isMobile: true,
    hasTouch: true,
  });
  const a = await context.newPage(),
    b = await context.newPage();
  try {
    for (const [page, url] of [
      [a, upstreamURL],
      [b, stylexURL],
    ] as const) {
      await page.goto(
        `${url}/iframe.html?id=components-native-select--demo&viewMode=story&globals=theme:dark`,
      );
      await expect(page.locator("#parity-root")).toBeVisible();
      expect(
        await page.evaluate(() => matchMedia("(hover: hover)").matches),
      ).toBe(false);
      await page.getByRole("combobox").hover({ force: true });
    }
    await compare(a, b, info, "touch-dark-hover");
  } finally {
    await context.close();
  }
});
