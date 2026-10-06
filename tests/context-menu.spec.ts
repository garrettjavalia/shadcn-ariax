import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
async function markPortals(page: Page) {
  await page
    .locator(
      '[data-slot="context-menu-content"],[data-slot="context-menu-sub-content"]',
    )
    .evaluateAll((elements) => {
      for (const el of elements) {
        for (const inner of el.querySelectorAll("[data-parity-portal]"))
          inner.removeAttribute("data-parity-portal");
        el.setAttribute("data-parity-portal", "");
      }
    });
}
const examples = [
  "demo-example",
  "basic",
  "submenu",
  "shortcuts",
  "groups",
  "icons",
  "checkboxes",
  "radio",
  "destructive",
  "sides",
  "rtl",
  "registry-basic",
  "registry-icons",
  "registry-shortcuts",
  "registry-submenu",
  "registry-groups",
  "registry-checkboxes",
  "registry-radio",
  "registry-destructive",
  "registry-sides",
  "inset",
  "usage",
];
for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    for (const name of width === 390
      ? examples.filter((name) =>
          ["demo-example", "sides", "registry-sides", "rtl"].includes(name),
        )
      : examples)
      test(`ContextMenu official ${name} / ${theme} / ${width}`, async ({
        browser,
      }, info) => {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
        });
        const pages = await Promise.all([0, 1].map(() => context.newPage()));
        try {
          const count =
            name === "sides" ? 4 : name === "registry-sides" ? 6 : 1;
          for (let n = 0; n < count; n++)
            await test.step("trigger-" + n, async () => {
              await Promise.all(
                pages.map(async (p, i) => {
                  await p.goto(
                    `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-contextmenu--${name}&viewMode=story&globals=theme:${theme}`,
                  );
                  await expect(p.locator("#parity-root")).toBeVisible();
                  await p
                    .locator("#parity-root [data-parity-trigger]")
                    .nth(n)
                    .click({ button: "right" });
                  await expect(p.getByRole("menu").first()).toBeVisible();
                  await markPortals(p);
                  await p.mouse.move(0, 0);
                }),
              );
              await compare(pages[0], pages[1], info, `${name}-${n}-open`);
              await Promise.all(
                pages.map((p) => p.keyboard.press("ArrowDown")),
              );
              await compare(pages[0], pages[1], info, `${name}-${n}-focused`);
              await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
              await Promise.all(
                pages.map((p) => expect(p.getByRole("menu")).toHaveCount(0)),
              );
              await compare(pages[0], pages[1], info, `${name}-${n}-closed`);
            });
        } finally {
          await context.close();
        }
      });
test("ContextMenu official documentation and registry inventory", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/context-menu.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(names).toHaveLength(11);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  for (const name of names)
    expect(
      index.entries[
        `components-contextmenu--${name === "context-menu-demo" ? "demo-example" : name.slice(13)}`
      ]?.tags,
    ).toContain("parity");
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/context-menu-example.tsx",
    "utf8",
  );
  expect(
    [...source.matchAll(/function (ContextMenu\w+)\(/g)]
      .map((m) => m[1])
      .filter((n) => n !== "ContextMenuExample"),
  ).toHaveLength(11);
  for (const name of [
    "registry-basic",
    "registry-icons",
    "registry-shortcuts",
    "registry-submenu",
    "registry-groups",
    "registry-checkboxes",
    "registry-radio",
    "registry-destructive",
    "registry-sides",
    "in-dialog",
    "inset",
    "usage",
  ])
    expect(index.entries[`components-contextmenu--${name}`]?.tags).toContain(
      "parity",
    );
});

for (const theme of ["light", "dark"])
  test(`ContextMenu selection, submenus, Dialog and callback overrides / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const pages = await Promise.all([0, 1].map(() => context.newPage()));
    const load = async (name: string) =>
      Promise.all(
        pages.map(async (p, i) => {
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-contextmenu--${name}&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
        }),
      );
    const open = async () =>
      Promise.all(
        pages.map(async (p) => {
          await p
            .locator("[data-parity-trigger]")
            .first()
            .click({ button: "right" });
          await expect(p.getByRole("menu").first()).toBeVisible();
          await markPortals(p);
          await p.mouse.move(0, 800);
        }),
      );
    try {
      await load("checkboxes");
      await open();
      await Promise.all(
        pages.map((p) =>
          p
            .getByRole("menuitemcheckbox", { name: "Show Bookmarks Bar" })
            .click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("menuitemcheckbox", { name: "Show Bookmarks Bar" }),
          ).toHaveAttribute("aria-checked", "false"),
        ),
      );
      await compare(pages[0], pages[1], info, "checkbox-toggle");
      await load("radio");
      await open();
      await Promise.all(
        pages.map((p) =>
          p.getByRole("menuitemradio", { name: "Colm Tuite" }).click(),
        ),
      );
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("menuitemradio", { name: "Colm Tuite" }),
          ).toHaveAttribute("aria-checked", "true"),
        ),
      );
      await compare(pages[0], pages[1], info, "radio-change");
      await load("submenu");
      await open();
      await Promise.all(
        pages.map(async (p) => {
          await p.getByRole("menuitem", { name: "More Tools" }).hover();
          await expect(p.getByRole("menu")).toHaveCount(2);
          await markPortals(p);
          await p.mouse.move(0, 800);
        }),
      );
      await compare(pages[0], pages[1], info, "submenu-open");
      await Promise.all(pages.map((p) => p.keyboard.press("ArrowRight")));
      await compare(pages[0], pages[1], info, "submenu-keyboard");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await Promise.all(
        pages.map((p) => expect(p.getByRole("menu")).toHaveCount(1)),
      );
      await compare(pages[0], pages[1], info, "submenu-escape");
      await load("in-dialog");
      await Promise.all(
        pages.map((p) =>
          p.getByRole("button", { name: "Open Dialog" }).click(),
        ),
      );
      await open();
      await compare(pages[0], pages[1], info, "dialog-context-menu");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await compare(pages[0], pages[1], info, "dialog-retained");
      await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
      await Promise.all(
        pages.map((p) =>
          expect(p.getByRole("button", { name: "Open Dialog" })).toBeFocused(),
        ),
      );
      await compare(pages[0], pages[1], info, "dialog-return-focus");
      await load("callback");
      await open();
      await compare(pages[0], pages[1], info, "callback-native-style");
      await Promise.all(pages.map((p) => p.keyboard.press("ArrowDown")));
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("menuitem", { name: "Focused callback" }),
          ).toBeFocused(),
        ),
      );
      await compare(pages[0], pages[1], info, "callback-focused-style");
      await Promise.all(pages.map((p) => p.keyboard.press("ArrowDown")));
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("menuitem", { name: "Focused callback" }),
          ).toBeFocused(),
        ),
      );
      await compare(pages[0], pages[1], info, "disabled-skipped");
    } finally {
      await context.close();
    }
  });

for (const theme of ["light", "dark"])
  test(`ContextMenu enter/exit animation phases and finite completion / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
      locale: "en-US",
      timezoneId: "UTC",
    });

    await context.addInitScript(() => {
      const sampled = new WeakSet<Animation>();
      const handles = new WeakMap<Element, Animation>();
      (
        window as Window & { contextAnimations?: WeakMap<Element, Animation> }
      ).contextAnimations = handles;
      document.addEventListener(
        "animationstart",
        (event) => {
          if (
            !(event.target instanceof Element) ||
            !event.target.matches('[data-slot="context-menu-content"]')
          )
            return;
          for (const animation of event.target.getAnimations())
            if (
              animation instanceof CSSAnimation &&
              (event.target.hasAttribute("data-entering") ||
                event.target.hasAttribute("data-exiting")) &&
              !sampled.has(animation)
            ) {
              sampled.add(animation);
              handles.set(event.target, animation);
              animation.pause();
              animation.currentTime = 0;
            }
        },
        true,
      );
    });
    const a = await context.newPage();
    const b = await context.newPage();
    try {
      await Promise.all(
        (
          [
            [a, upstreamURL],
            [b, stylexURL],
          ] as const
        ).map(async ([page, url]) => {
          await page.goto(
            `${url}/iframe.html?id=components-contextmenu--basic&globals=theme:${theme}`,
          );
          await expect(page.locator("#parity-root")).toBeVisible();
          await page
            .locator("[data-parity-trigger]")
            .click({ button: "right" });
          await markPortals(page);
          await page.mouse.move(0, 800);
        }),
      );
      for (const phase of ["enter", "exit"]) {
        if (phase === "exit")
          for (const page of [a, b]) await page.keyboard.press("Escape");
        for (const page of [a, b])
          await expect
            .poll(() =>
              page
                .locator('[data-slot="context-menu-content"]')
                .evaluate(
                  (element, name) =>
                    element
                      .getAnimations()
                      .some(
                        (animation) =>
                          animation instanceof CSSAnimation &&
                          element.hasAttribute(`data-${name}ing`) &&
                          animation.playState === "paused",
                      ),
                  phase,
                ),
            )
            .toBe(true);
        for (const time of [0, 50, 100]) {
          for (const page of [a, b])
            await page.locator('[data-slot="context-menu-content"]').evaluate(
              async (element, { name, time }) => {
                const animation = element
                  .getAnimations()
                  .find(
                    (animation) =>
                      animation instanceof CSSAnimation &&
                      element.hasAttribute(`data-${name}ing`),
                  )!;
                await animation.ready;
                animation.currentTime = time;
              },
              { name: phase, time },
            );
          await compare(a, b, info, `${phase}-${time}ms`);
        }
        for (const page of [a, b])
          await page
            .locator('[data-slot="context-menu-content"]')
            .evaluate((element) => {
              const animation = (
                window as Window & {
                  contextAnimations?: WeakMap<Element, Animation>;
                }
              ).contextAnimations!.get(element)!;
              animation.currentTime = 0;
              animation.play();
            });
        await compare(a, b, info, `${phase}-complete`);
        if (phase === "exit")
          for (const page of [a, b])
            await expect(page.getByRole("menu")).toHaveCount(0);
      }
    } finally {
      await context.close();
    }
  });

for (const theme of ["light", "dark"])
  test(`ContextMenu Chromium iOS-emulated long press and focus restoration / ${theme}`, async ({
    browser,
  }, info) => {
    const contexts = await Promise.all(
      [0, 1].map(() =>
        browser.newContext({
          hasTouch: true,
          viewport: { width: 390, height: 900 },
        }),
      ),
    );
    const pages = await Promise.all(contexts.map((c) => c.newPage()));
    try {
      await Promise.all(
        pages.map(async (p, i) => {
          const session = await contexts[i].newCDPSession(p);
          await session.send("Emulation.setUserAgentOverride", {
            userAgent:
              "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1",
            platform: "iPhone",
          });
          await p.goto(
            `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-contextmenu--usage&viewMode=story&globals=theme:${theme}`,
          );
          await expect(p.locator("#parity-root")).toBeVisible();
          const box = await p.locator("[data-parity-trigger]").boundingBox();
          if (!box) throw Error("Missing trigger");
          await p.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
          await p.clock.pauseAt(
            new Date(await p.evaluate(() => Date.now() + 1000)),
          );
          await session.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: [
              { x: box.x + box.width / 2, y: box.y + box.height / 2 },
            ],
          });
          await p.clock.runFor(499);
          await expect(
            p.locator('[data-slot="context-menu-content"]'),
          ).toHaveCount(0);
          await p.clock.runFor(1);
          await p.clock.resume();
          await expect(
            p.locator('[data-slot="context-menu-content"]'),
          ).toBeVisible();
          await session.send("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
          });
          await markPortals(p);
          await session.detach();
        }),
      );
      await compare(pages[0], pages[1], info, "touch-long-press");
      await Promise.all(
        pages.map(async (p) => {
          await p.keyboard.press("Escape");
          await expect(
            p.locator('[data-slot="context-menu-content"]'),
          ).toBeHidden();
          await expect(p.locator("[data-parity-trigger]")).toBeFocused();
        }),
      );
      await compare(pages[0], pages[1], info, "touch-escape");
    } finally {
      await Promise.all(contexts.map((c) => c.close()));
    }
  });
for (const theme of ["light", "dark"])
  test(`ContextMenu RTL submenus preserve logical placement and shortcuts / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext();
    const pages = await Promise.all([0, 1].map(() => context.newPage()));
    try {
      for (let n = 0; n < 2; n++) {
        await Promise.all(
          pages.map(async (p, i) => {
            await p.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-contextmenu--rtl&viewMode=story&globals=theme:${theme}`,
            );
            await p.locator("[data-parity-trigger]").click({ button: "right" });
            await p
              .locator('[data-slot="context-menu-sub-trigger"]')
              .nth(n)
              .hover();
            await expect(p.getByRole("menu")).toHaveCount(2);
            await markPortals(p);
            await p.mouse.move(0, 800);
          }),
        );
        await compare(pages[0], pages[1], info, `rtl-submenu-${n}`);
        await Promise.all(pages.map((p) => p.keyboard.press("Escape")));
        await compare(pages[0], pages[1], info, `rtl-escape-${n}`);
      }
    } finally {
      await context.close();
    }
  });
for (const theme of ["light", "dark"])
  test(`ContextMenu keyboard trigger, typeahead and forced colors / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
      forcedColors: "active",
    });
    const pages = await Promise.all([0, 1].map(() => context.newPage()));
    try {
      for (const [i, p] of pages.entries()) {
        await p.goto(
          `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-contextmenu--keyboard&viewMode=story&globals=theme:${theme}`,
        );
        await p.bringToFront();
        await p.locator("[data-parity-trigger]").focus();
        await expect(p.locator("[data-parity-trigger]")).toBeFocused();
        const mac = await p.evaluate(() => /^Mac/i.test(navigator.platform));
        await p.keyboard.press(mac ? "Control+Enter" : "Shift+F10");
        await expect(p.getByRole("menu")).toBeVisible();
        await markPortals(p);
        await p.keyboard.press("Tab");
        await expect
          .poll(() =>
            p
              .getByRole("menu")
              .evaluate((el) => el.contains(document.activeElement)),
          )
          .toBe(true);
        await p.keyboard.press("r");
        await expect(p.getByRole("menuitem", { name: "Reload" })).toBeFocused();
      }
      await compare(
        pages[0],
        pages[1],
        info,
        "keyboard-typeahead-forced-colors",
      );
      await Promise.all(pages.map((p) => p.keyboard.press("Home")));
      await Promise.all(
        pages.map((p) =>
          expect(
            p.getByRole("menuitem", { name: "Back", exact: true }),
          ).toBeFocused(),
        ),
      );
      await compare(pages[0], pages[1], info, "keyboard-home");
      await Promise.all(pages.map((p) => p.keyboard.press("Enter")));
      await Promise.all(
        pages.map((p) => expect(p.getByRole("menu")).toHaveCount(0)),
      );
      await compare(pages[0], pages[1], info, "keyboard-action-close");
    } finally {
      await context.close();
    }
  });
