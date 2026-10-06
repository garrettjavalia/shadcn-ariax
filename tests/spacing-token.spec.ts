import { test, expect } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
import { controlAvatarAssets, waitAvatarAssets } from "./avatar-assets";
import { waitForStoryReadiness } from "./story-readiness";
import { partitionStories } from "./story-batches";
import type { StoryEntry } from "./catalog";

// Derive the coverage floor from installed production sources, including recipes
// and internal components. Components without spacing still run in normal parity.
const components = readdirSync("registry/ariax/ui")
  .filter(
    (file) =>
      /(?:\.tsx|\.recipe\.stylex\.ts)$/.test(file) &&
      readFileSync(`registry/ariax/ui/${file}`, "utf8").includes(
        "--ariax-spacing",
      ),
  )
  .map((file) =>
    file.replace(/(?:\.internal|\.recipe\.stylex)?\.(tsx|ts)$/, ""),
  );
const scenarios = [
  { name: "custom spacing", spacing: ".375rem", fontSize: "16px" },
  { name: "root font size", spacing: ".25rem", fontSize: "20px" },
];
const batchCount = process.env.PARITY_COMPONENT
  ? 1
  : Math.ceil(components.length / 4);
for (const scenario of scenarios)
  for (let batch = 0; batch < batchCount; batch++) {
    test(`spacing token / ${scenario.name} / batch ${batch + 1}`, async ({
      browser,
      request,
    }, info) => {
      test.setTimeout(240_000);
      const left = await (
        await request.get(`${upstreamURL}/index.json`)
      ).json();
      const right = await (await request.get(`${stylexURL}/index.json`)).json();
      const entries = Object.values(left.entries) as StoryEntry[];
      const ids = components
        .flatMap((component) => {
          const candidates = entries.filter(
            (entry) =>
              entry.type === "story" &&
              entry.tags?.includes("parity") &&
              entry.title
                .split("/")
                .at(-1)
                ?.replace(/\W/g, "")
                .toLowerCase() === component.replaceAll("-", ""),
          );
          expect(
            candidates.length,
            `${component} must have a parity story`,
          ).toBeGreaterThan(0);
          // Matrix/gallery stories exercise variants together when available.
          const preferred: Record<string, string> = {
            "context-menu": "basic",
            "dropdown-menu": "basic",
            sonner: "types",
            drawer: "demo-example",
          };
          const story =
            candidates.find((entry) =>
              entry.id.endsWith(`--${preferred[component]}`),
            ) ??
            candidates.find((entry) =>
              /--(?:default-open|open)$/.test(entry.id),
            ) ??
            candidates.find((entry) =>
              /--(?:matrix|gallery|variants)$/.test(entry.id),
            ) ??
            candidates.find((entry) => /--demo$/.test(entry.id)) ??
            candidates[0];
          expect(right.entries[story.id]?.tags).toContain("parity");
          return component === "button"
            ? [
                story.id,
                "components-button--helper-matrix",
                "components-button--customized",
                "components-button--inline-style",
                "components-button--dynamic",
              ]
            : story.id;
        })
        .filter(
          (id) =>
            !process.env.PARITY_COMPONENT ||
            id.startsWith(process.env.PARITY_COMPONENT),
        );
      const selected = partitionStories(ids, batchCount)[batch];
      test.skip(selected.length === 0, "No spacing stories in this batch.");
      const context = await browser.newContext({
        viewport: { width: 1000, height: 900 },
        locale: "en-US",
        timezoneId: "UTC",
        colorScheme: "light",
      });
      // Initialize tokens before React creates animated SVGs. Resizing an already
      // composited SVG can retain Chromium's previous transformed scroll overflow.
      await context.addInitScript(({ spacing, fontSize }) => {
        const apply = () => {
          const root = document.documentElement;
          if (!root) return false;
          root.style.setProperty("--spacing", spacing);
          root.style.setProperty("--ariax-spacing", spacing);
          root.style.fontSize = fontSize;
          return true;
        };
        if (!apply()) {
          const observer = new MutationObserver(() => {
            if (apply()) observer.disconnect();
          });
          observer.observe(document, { childList: true, subtree: true });
        }
      }, scenario);
      await controlAvatarAssets(context);
      const a = await context.newPage(),
        b = await context.newPage();
      try {
        for (const id of selected)
          await test.step(id, async () => {
            await Promise.all(
              (
                [
                  [a, upstreamURL],
                  [b, stylexURL],
                ] as const
              ).map(async ([page, url]) => {
                await page.goto(
                  `${url}/iframe.html?id=${id}&viewMode=story&globals=theme:light`,
                );
                await expect(page.locator("#parity-root")).toBeVisible();
                await waitAvatarAssets(page);
                await waitForStoryReadiness(page);
                await page.mouse.move(0, 0);
                if (id.startsWith("components-contextmenu--")) {
                  await page
                    .locator("#parity-root [data-parity-trigger]")
                    .first()
                    .click({ button: "right" });
                  await expect(page.getByRole("menu").first()).toBeVisible();
                } else if (id.startsWith("components-dropdown-menu--")) {
                  await page
                    .locator('#parity-root [data-slot="button"]')
                    .first()
                    .click();
                  await expect(page.getByRole("menu").first()).toBeVisible();
                } else if (id.startsWith("components-select--")) {
                  await page
                    .locator('[data-slot="select-trigger"]')
                    .first()
                    .click();
                  await expect(page.getByRole("listbox").first()).toBeVisible();
                  await page
                    .locator('[data-slot="select-content"]')
                    .evaluate((element) =>
                      element.setAttribute("data-parity-portal", ""),
                    );
                } else if (id.startsWith("components-combobox--")) {
                  await page
                    .locator('[data-slot="combobox-trigger"]')
                    .first()
                    .click();
                  await expect(page.getByRole("listbox").first()).toBeVisible();
                  await page
                    .locator('[data-slot="combobox-content"]')
                    .evaluate((element) =>
                      element.setAttribute("data-parity-portal", ""),
                    );
                } else if (id.startsWith("components-drawer--")) {
                  await page.locator("#parity-root button").first().click();
                  await expect(page.getByRole("dialog").first()).toBeVisible();
                  await page
                    .locator(
                      '[data-slot="drawer-portal"], [data-slot="dialog-overlay"]',
                    )
                    .evaluateAll((elements) =>
                      elements.forEach((element) =>
                        element.setAttribute("data-parity-portal", ""),
                      ),
                    );
                } else if (id.startsWith("components-sonner--")) {
                  await page
                    .getByRole("button", { name: "Success", exact: true })
                    .click();
                  await expect(
                    page.locator("[data-sonner-toast]").first(),
                  ).toBeVisible();
                  await page
                    .locator("[data-sonner-toaster]")
                    .evaluateAll((elements) =>
                      elements.forEach((element) =>
                        element.setAttribute("data-parity-portal", ""),
                      ),
                    );
                }
              }),
            );
            try {
              await compare(a, b, info, `${id}-${scenario.name}`);
            } catch (error) {
              expect.soft(false, String(error)).toBe(true);
            }
          });
      } finally {
        await context.close();
      }
    });
  }

test("public spacing token inherits locally and is independent of Tailwind spacing", async ({
  page,
}) => {
  await page.goto(
    `${stylexURL}/iframe.html?id=components-button--matrix&viewMode=story&globals=theme:light`,
  );
  const button = page.locator('[data-slot="button"][data-size="icon"]').first();
  await expect(button).toBeVisible();
  await expect(button).toHaveCSS("width", "32px");
  await page.addStyleTag({
    content: ":root { --spacing: 20px; --ariax-spacing: 6px; }",
  });
  await expect(button).toHaveCSS("width", "48px");
  await page
    .locator("#parity-root")
    .evaluate((element) =>
      (element as HTMLElement).style.setProperty("--ariax-spacing", "2px"),
    );
  await expect(button).toHaveCSS("width", "16px");
  await expect(button).toHaveCSS("font-size", "14px");
  await button.evaluate(
    (element) => ((element as HTMLElement).style.width = "35px"),
  );
  await expect(button).toHaveCSS("width", "35px");
});
