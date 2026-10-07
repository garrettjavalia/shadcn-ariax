import { createStoryPair, loadStoryPair } from "./story-pair";
import { readFile } from "node:fs/promises";
import { test, expect, type Page } from "@playwright/test";
import { compare } from "./compare";
import { stylexURL } from "./servers";
async function load(pages: [Page, Page], story: string, theme: string) {
  await loadStoryPair(pages, `components-sonner--${story}`, theme);
}
for (const theme of ["light", "dark"])
  for (const story of [
    "demo",
    "types",
    "description",
    "position",
    "registry-basic",
    "registry-description",
    "usage",
    "rtl",
    "rich-colors",
    "custom",
    "loading",
    "stacked",
    "non-dismissible",
  ])
    test(`Sonner ${story} / ${theme}`, async ({ browser }, info) => {
      const { context: ctx, pages } = await createStoryPair(browser, undefined);
      try {
        await load(pages, story, theme);
        const count = await pages[0]
          .locator("#parity-root > button, #parity-root > div > button")
          .count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
          await test.step("trigger " + i, async () => {
            if (i) await load(pages, story, theme);
            await Promise.all(
              pages.map((p) => p.locator("#parity-root button").nth(i).click()),
            );
            await Promise.all(
              pages.map((p) =>
                expect(p.locator("[data-sonner-toast]").first()).toBeVisible(),
              ),
            );
            await Promise.all(
              pages.map((p) =>
                p
                  .locator("[data-sonner-toaster]")
                  .evaluateAll((els) =>
                    els.forEach((el) =>
                      el.setAttribute("data-parity-portal", ""),
                    ),
                  ),
              ),
            );
            await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
            await test.step("compare initial toast", () =>
              compare(pages[0], pages[1], info, "toast-" + i));
            if (story === "types" || story === "rich-colors") {
              const label = await pages[0]
                .locator("#parity-root button")
                .nth(i)
                .textContent();
              if (label === "Promise") {
                await Promise.all(
                  pages.map((p) =>
                    expect(p.locator("[data-title]")).toHaveText(
                      "Event has been created",
                    ),
                  ),
                );
                await compare(pages[0], pages[1], info, "promise-success");
              }
            }
            if (story === "stacked") {
              await test.step("hover visible front toast", () =>
                Promise.all(
                  pages.map((p) =>
                    p.locator("[data-sonner-toast][data-front=true]").hover(),
                  ),
                ));
              await compare(pages[0], pages[1], info, "expanded");
            }
          });
        }
      } finally {
        await ctx.close();
      }
    });
for (const theme of ["light", "dark"])
  for (const story of ["position", "rtl"])
    test(`Sonner mobile ${story} / ${theme}`, async ({ browser }, info) => {
      const { context: ctx, pages } = await createStoryPair(browser, {
        viewport: { width: 390, height: 900 },
      });
      try {
        await load(pages, story, theme);
        const count = await pages[0].locator("#parity-root button").count();
        for (let i = 0; i < count; i++) {
          if (i) await load(pages, story, theme);
          await Promise.all(
            pages.map((p) => p.locator("#parity-root button").nth(i).click()),
          );
          await Promise.all(
            pages.map((p) =>
              expect(p.locator("[data-sonner-toast]")).toBeVisible(),
            ),
          );
          await Promise.all(
            pages.map((p) =>
              p
                .locator("[data-sonner-toaster]")
                .evaluateAll((els) =>
                  els.forEach((el) =>
                    el.setAttribute("data-parity-portal", ""),
                  ),
                ),
            ),
          );
          await Promise.all(pages.map((p) => p.mouse.move(0, 0)));
          await compare(pages[0], pages[1], info, "position-" + i);
        }
      } finally {
        await ctx.close();
      }
    });
test("Sonner official example inventory", async ({ request }) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/sonner.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toEqual([
    "sonner-demo",
    "sonner-types",
    "sonner-description",
    "sonner-position",
  ]);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of names)
    expect(
      index.entries["components-sonner--" + name.slice(7)]?.tags,
    ).toContain("parity");
});
