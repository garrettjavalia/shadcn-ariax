import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("all official ButtonGroup previews are mapped to actual widget compositions", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/button-group.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  const mapped: Record<string, string> = {
    "button-group-orientation": "orientation",
    "button-group-size": "size",
    "button-group-nested": "nested",
    "button-group-separator": "separator",
    "button-group-split": "split",
    "button-group-input": "in-input",
    "button-group-input-group": "in-input-group",
    "button-group-demo": "demo",
    "button-group-dropdown": "dropdown",
    "button-group-select": "select",
    "button-group-popover": "popover",
    "button-group-rtl": "rtl",
  };

  expect(names).toHaveLength(12);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of names) {
    expect(mapped[name], name).toBeTruthy();
    expect(
      index.entries[`components-buttongroup--${mapped[name]}`]?.tags,
      name,
    ).toContain("parity");
  }
});
for (const theme of ["light", "dark"])
  test(`ButtonGroup focus, input editing and voice toggle / ${theme}`, async ({
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
    const load = async (story: string) =>
      Promise.all(
        [
          [a, upstreamURL],
          [b, stylexURL],
        ].map(async ([page, url]) => {
          await (page as typeof a).goto(
            `${url}/iframe.html?id=components-buttongroup--${story}&viewMode=story&globals=theme:${theme}`,
          );
          await expect(
            (page as typeof a).locator("#parity-root"),
          ).toBeVisible();
        }),
      );
    try {
      await load("usage");
      for (let i = 0; i < 2; i++) {
        await Promise.all([a, b].map((p) => p.keyboard.press("Tab")));
        await compare(a, b, info, `focus-${i}`);
        await expect(b.getByRole("button").nth(i)).toBeFocused();
      }
      await load("in-input");
      await Promise.all(
        [a, b].map((p) => p.getByPlaceholder("Search...").fill("Query")),
      );
      await compare(a, b, info, "input-filled");
      await load("in-input-group");
      await Promise.all(
        [a, b].map((p) => p.getByRole("button").last().click()),
      );
      await Promise.all([a, b].map((p) => p.mouse.move(0, 0)));
      await compare(a, b, info, "voice-enabled");
      await expect(
        b.getByPlaceholder("Record and send audio..."),
      ).toBeDisabled();
      await Promise.all(
        [a, b].map((p) => p.getByRole("button").last().click()),
      );
      await Promise.all([a, b].map((p) => p.mouse.move(0, 0)));
      await compare(a, b, info, "voice-disabled");
      await expect(b.getByPlaceholder("Send a message...")).toBeEnabled();
      await load("customized");
      await Promise.all(
        [a, b].map((p) => p.getByText("Text", { exact: true }).click()),
      );
      await compare(a, b, info, "dynamic-style");
      await expect(b.getByRole("group", { name: "Custom group" })).toHaveCSS(
        "width",
        "320px",
      );
      await expect(
        b.getByRole("group", { name: "Custom group" }),
      ).toHaveAttribute("data-ref", "attached");
      await expect(b.locator('[data-slot="button-group-text"]')).toHaveCSS(
        "width",
        "80px",
      );
    } finally {
      await context.close();
    }
  });

test("official registry ButtonGroup compositions are mapped to actual widget compositions", async ({
  request,
}) => {
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/button-group-example.tsx",
    "utf8",
  );
  const names = [...source.matchAll(/function (ButtonGroup\w+)\(/g)]
    .map((m) => m[1])
    .filter((n) => n !== "ButtonGroupExample");
  const mapped: Record<string, string> = {
    ButtonGroupBasic: "basic",
    ButtonGroupWithInput: "with-input",
    ButtonGroupWithIcons: "icons",
    ButtonGroupWithInputGroup: "showcase-input-group",
    ButtonGroupWithLike: "like",
    ButtonGroupNested: "showcase-nested",
    ButtonGroupPagination: "pagination",
    ButtonGroupPaginationSplit: "pagination-split",
    ButtonGroupNavigation: "navigation",
    ButtonGroupVertical: "registry-vertical",
    ButtonGroupVerticalNested: "nested-vertical",
    ButtonGroupWithText: "text",
    ButtonGroupWithDropdown: "registry-dropdown",
    ButtonGroupWithSelect: "registry-select",
    ButtonGroupWithFields: "fields",
    ButtonGroupWithSelectAndInput: "select-and-input",
    ButtonGroupTextAlignment: "text-alignment",
  };

  expect(names).toHaveLength(17);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of names) {
    expect(mapped[name], name).toBeTruthy();
    expect(
      index.entries[`components-buttongroup--${mapped[name]}`]?.tags,
      name,
    ).toContain("parity");
  }
});

for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    test(`ButtonGroup real dependencies and RTL portal / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const ctx = await browser.newContext({
        viewport: { width, height: 900 },
      });
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(() => ctx.newPage()),
      );
      const load = async (story: string) =>
        Promise.all(
          pages.map(async (p, i) => {
            await p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-buttongroup--${story}&viewMode=story&globals=theme:${theme}`,
            );
            await expect(p.locator("#parity-root")).toBeVisible();
          }),
        );
      const parity = async (label: string) =>
        compare(pages[0], pages[1], info, label);
      try {
        await load("text");
        await Promise.all(
          pages.map((p) => p.getByText("GPU Size", { exact: true }).click()),
        );
        await Promise.all(
          pages.map((p) => expect(p.locator("#input-text")).toBeFocused()),
        );
        await parity("rendered-label-focus");
        await load("fields");
        await Promise.all(
          pages.map((p) => p.getByLabel("Width", { exact: true }).fill("24")),
        );
        await parity("actual-field-input");
        await load("select");
        await Promise.all(
          pages.map(async (p) => {
            await p.getByRole("button", { name: "$", exact: true }).click();
            await expect(p.getByRole("listbox")).toBeVisible();
          }),
        );
        await parity("currency-open");
        await Promise.all(
          pages.map((p) => p.getByRole("option", { name: /Euro/ }).click()),
        );
        await Promise.all(
          pages.map(async (p) => {
            await expect(p.getByRole("listbox")).toBeHidden();
            await expect(
              p.getByRole("button", { name: "€", exact: true }),
            ).toBeFocused();
          }),
        );
        await parity("currency-selected");
        await Promise.all(
          pages.map((p) => p.getByPlaceholder("10.00").fill("125")),
        );
        await parity("currency-input");
        await load("popover");
        await Promise.all(
          pages.map(async (p) => {
            await p.getByRole("button", { name: "Open Popover" }).click();
            await expect(
              p.locator('[data-slot="popover-content"]'),
            ).toBeVisible();
          }),
        );
        await parity("copilot-open");
        await Promise.all(
          pages.map((p) =>
            p.getByPlaceholder("I need to...").fill("Review this change"),
          ),
        );
        await parity("copilot-edit");
        await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
        await Promise.all(
          pages.map((p) =>
            expect(p.locator('[data-slot="popover-content"]')).toBeHidden(),
          ),
        );
        await parity("copilot-dismissed");
        for (const story of ["demo", "rtl"]) {
          await load(story);
          await parity(`${story}-responsive`);
          await Promise.all(
            pages.map(async (p) => {
              await p.getByRole("button").last().click();
              await expect(p.getByRole("menu")).toBeVisible();
            }),
          );
          await parity(`${story}-menu-open`);
          await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
          await Promise.all(
            pages.map((p) => expect(p.getByRole("menu")).toBeHidden()),
          );
          await parity(`${story}-menu-dismissed`);
        }
      } finally {
        await ctx.close();
      }
    });
