import { deterministicStoryContextOptions } from "./story-pair";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { controlAvatarAssets, waitAvatarAssets } from "./avatar-assets";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
test("Avatar official documentation has all ten previews and real Dropdown Avatar composition", async ({
  request,
}) => {
  const document = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/avatar.mdx",
    "utf8",
  );
  const names = [
    ...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(10);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of names)
    expect(
      index.entries[`components-avatar--${name.replace("avatar-", "")}`]?.tags,
      name,
    ).toContain("parity");
  expect(index.entries["components-dropdown-menu--avatar"]?.tags).toContain(
    "parity",
  );
  const registry = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/avatar-example.tsx",
    "utf8",
  );
  const mapping: Record<string, string> = {
    AvatarSizes: "registry-sizes",
    AvatarWithBadge: "registry-badge",
    AvatarWithBadgeIcon: "registry-badge-icon",
    AvatarGroupExample: "registry-group",
    AvatarGroupWithCount: "registry-group-count",
    AvatarGroupWithIconCount: "registry-group-count-icon",
    AvatarInEmpty: "registry-empty",
  };
  expect(
    [...registry.matchAll(/^function (Avatar\w+)\(/gm)]
      .map((match) => match[1])
      .sort(),
  ).toEqual(Object.keys(mapping).sort());
  for (const story of Object.values(mapping))
    expect(index.entries["components-avatar--" + story]?.tags, story).toContain(
      "parity",
    );
});
for (const theme of ["light", "dark"])
  test(`Avatar missing/loading/loaded/error and original callback precedence / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(),
    );
    let finish!: () => void;
    const delayed = new Promise<void>((resolve) => (finish = resolve));
    await controlAvatarAssets(context, delayed);
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      for (const [page, url] of [
        [a, upstreamURL],
        [b, stylexURL],
      ] as const) {
        await page.goto(
          `${url}/iframe.html?id=components-avatar--states&globals=theme:${theme}`,
          { waitUntil: "domcontentloaded" },
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        await waitAvatarAssets(page, "/avatar-delayed.svg");
        await expect(
          page.locator('img[src="/avatar-controlled.svg"]').first(),
        ).toHaveAttribute("data-state", "loaded");
        await expect(
          page.locator('img[src="/avatar-failure.svg"]').first(),
        ).toHaveAttribute("data-state", "error");
        await expect(
          page.locator('img[src="/avatar-delayed.svg"]'),
        ).toHaveAttribute("data-state", "loading");
        await expect(
          page.locator(
            'img[src="/avatar-delayed.svg"] + [data-slot="avatar-fallback"]',
          ),
        ).toHaveCSS("display", "none");
        await expect(
          page.locator('img[src="/avatar-controlled.svg"]').last(),
        ).toHaveAttribute("data-state", "loading");
        await expect(page.getByTestId("error-override")).toHaveAttribute(
          "data-state",
          "loading",
        );
        await expect(
          page
            .getByTestId("error-override")
            .locator("xpath=following-sibling::*"),
        ).toHaveCSS("display", "none");
      }
      await compare(a, b, info, "image-loading-error-callback");
      finish();
      for (const page of [a, b]) {
        await expect(
          page.locator('img[src="/avatar-delayed.svg"]'),
        ).toHaveAttribute("data-state", "loaded");
        await waitAvatarAssets(page);
      }
      await compare(a, b, info, "image-loaded");
    } finally {
      finish();
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`Avatar dynamic xstyle, native style precedence and src error transition / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(),
    );
    await controlAvatarAssets(context);
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      for (const [page, url] of [
        [a, upstreamURL],
        [b, stylexURL],
      ] as const) {
        await page.goto(
          `${url}/iframe.html?id=components-avatar--customized&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        await waitAvatarAssets(page);
        await page.getByRole("button", { name: "Resize", exact: true }).click();
      }
      await compare(a, b, info, "dynamic-size-user-height");
      await expect(b.locator('[data-slot="avatar"]')).toHaveCSS(
        "width",
        "48px",
      );
      await expect(b.locator('[data-slot="avatar"]')).toHaveCSS(
        "height",
        "40px",
      );
      for (const page of [a, b]) {
        await page
          .getByRole("button", { name: "Fail image", exact: true })
          .click();
        await expect(
          page.locator('[data-slot="avatar-image"]'),
        ).toHaveAttribute("data-state", "error");
        await expect(page.locator('[data-slot="avatar-fallback"]')).toHaveCSS(
          "display",
          "flex",
        );
      }
      await compare(a, b, info, "changed-src-error");
      for (const page of [a, b]) {
        await page
          .getByRole("button", { name: "Recover image", exact: true })
          .click();
        await expect(
          page.locator('[data-slot="avatar-image"]'),
        ).toHaveAttribute("data-state", "loaded");
      }
      await compare(a, b, info, "changed-src-recovered");
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`official Avatar Dropdown opens full portal and executes keyboard item / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext(
      deterministicStoryContextOptions(),
    );
    await controlAvatarAssets(context);
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      for (const [page, url] of [
        [a, upstreamURL],
        [b, stylexURL],
      ] as const) {
        await page.goto(
          `${url}/iframe.html?id=components-avatar--dropdown&globals=theme:${theme}`,
        );
        await expect(page.locator("#parity-root")).toBeVisible();
        await waitAvatarAssets(page);
        await page.locator('[data-slot="button"]').click();
        await expect(page.getByRole("menu")).toBeVisible();
        await expect(page.locator("[data-parity-portal]")).toHaveCount(1);
        await page.keyboard.press("End");
        await expect(
          page.getByRole("menuitem", { name: "Log out", exact: true }),
        ).toBeFocused();
      }
      await compare(a, b, info, "avatar-dropdown-portal");
      for (const page of [a, b]) {
        await page.keyboard.press("Enter");
        await expect(page.getByRole("menu")).toHaveCount(0);
      }
      await compare(a, b, info, "avatar-dropdown-action");
    } finally {
      await context.close();
    }
  });
