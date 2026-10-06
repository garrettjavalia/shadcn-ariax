import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("every official Radio Group example has a parity story", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/radio-group.mdx",
    "utf8",
  );
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  const examples = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="radio-group-([^"]+)"/g),
  ].map((m) => m[1]);
  expect(examples).toHaveLength(7);
  for (const id of [
    "components-field--radio",
    "components-field--radio-choice-card",
  ])
    expect(index.entries[id]?.tags).toContain("parity");
  for (const name of examples)
    expect(index.entries[`components-radio-group--${name}`]?.tags).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "choice-card",
    "disabled",
    "invalid",
    "rtl",
    "customized",
    "controlled",
  ])
    test(`Radio Group ${story} keyboard and pointer / ${theme}`, async ({
      browser,
    }, info) => {
      const ctx = await browser.newContext({
        viewport: { width: 1000, height: 900 },
        locale: "en-US",
        timezoneId: "UTC",
        colorScheme: "light",
      });
      const [a, b] = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const p = await ctx.newPage();
          await p.goto(
            `${url}/iframe.html?id=components-radio-group--${story}&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          return p;
        }),
      );
      try {
        if (story === "customized") {
          await Promise.all(
            [a, b].map((p) =>
              p.getByRole("button", { name: "Resize" }).click(),
            ),
          );
          await compare(a, b, info, "dynamic-resize");
        }
        await Promise.all(
          [a, b].map((p) =>
            p.locator('[data-slot="radio-group-item"]').last().hover(),
          ),
        );
        await compare(a, b, info, "hover");
        await Promise.all(
          [a, b].map(async (p) => {
            await p.mouse.move(0, 0);
            await p.keyboard.press("Tab");
          }),
        );
        await compare(a, b, info, "focus");
        await Promise.all([a, b].map((p) => p.keyboard.press("ArrowDown")));
        await compare(a, b, info, "keyboard-selection");
        await Promise.all(
          [a, b].map((p) =>
            p.locator('[data-slot="radio-group-item"]').last().click(),
          ),
        );
        await compare(a, b, info, "pointer-selection");
        if (story === "controlled")
          for (const p of [a, b]) {
            await expect(p.locator("output")).toHaveText("two");
            expect(
              await p
                .locator("form")
                .evaluate((form) =>
                  new FormData(form as HTMLFormElement).get("choice"),
                ),
            ).toBe("two");
          }
        if (story === "disabled")
          for (const p of [a, b]) {
            await expect(p.locator("input[value=option1]")).toBeDisabled();
            await expect(p.locator("input[value=option3]")).toBeChecked();
          }
      } finally {
        await ctx.close();
      }
    });

test("radio generated name normalization preserves group relationships and explicit names", async ({
  page,
}) => {
  const { snapshot, differences } = await import("./compare");
  const markup = (prefix: string, second = "b", explicit = "user-choice") =>
    `<main id="parity-root"><input type="radio" name="react-aria${prefix}-_r_a_"/><input type="radio" name="react-aria${prefix}-_r_a_"/><input type="radio" name="react-aria${prefix}-_r_${second}_"/><input type="radio" name="${explicit}"/></main>`;
  await page.setContent(markup("123"));
  const baseline = await snapshot(page);
  await page.setContent(markup("456"));
  expect(differences(baseline, await snapshot(page))).toEqual([]);
  await page.setContent(markup("456", "a"));
  expect(
    differences(baseline, await snapshot(page)).some((d) =>
      d.path.endsWith("/attrs/name"),
    ),
  ).toBe(true);
  await page.setContent(markup("456", "b", "react-aria456-user-choice"));
  expect(
    differences(baseline, await snapshot(page)).some((d) =>
      d.path.endsWith("/attrs/name"),
    ),
  ).toBe(true);
});
