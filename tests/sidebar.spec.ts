import { test, expect } from "@playwright/test";
import { compare, settle } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
for (const story of ["group", "group-collapsible"])
  test(`Sidebar initial ${story} structure and collapse`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 1000,
        height: 900,
      },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(`${url}/iframe.html?id=components-sidebar--${story}`);
          await expect(
            page.locator("[data-slot=sidebar-container]"),
          ).toBeVisible();
          return page;
        }),
      );
      await compare(pages[0], pages[1], info, "initial");
      for (const page of pages) await page.keyboard.press("Control+b");
      await compare(pages[0], pages[1], info, "offcanvas-collapse");
      for (const page of pages) await page.keyboard.press("Control+b");
      await compare(pages[0], pages[1], info, "expanded");
      if (story === "group-collapsible") {
        for (const page of pages)
          await page
            .getByRole("button", {
              name: "Help",
            })
            .click();
        await compare(pages[0], pages[1], info, "group-collapsed");
      }
    } finally {
      await context.close();
    }
  });
const desktop = [
  "demo",
  "controlled",
  "header",
  "footer",
  "group-action",
  "menu",
  "menu-action",
  "menu-badge",
  "menu-collapsible",
  "menu-sub",
  "rtl",
  "registry",
  "registry-inset",
  "registry-floating",
  "registry-icon",
];
for (const theme of ["light", "dark"])
  for (const story of desktop)
    test(`Sidebar official ${story} desktop states / ${theme}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: {
          width: 1000,
          height: 900,
        },
      });
      try {
        const pages = await Promise.all(
          [upstreamURL, stylexURL].map(async (url) => {
            const page = await context.newPage();
            await page.goto(
              `${url}/iframe.html?id=components-sidebar--${story}&globals=theme:${theme}`,
            );
            await expect(
              page.locator('[data-slot="sidebar-container"]'),
            ).toBeVisible();
            return page;
          }),
        );
        await compare(pages[0], pages[1], info, "initial");
        const controls = await pages[0]
          .locator('[data-slot="sidebar-menu-button"]:visible')
          .count();
        if (controls) {
          for (const page of pages)
            await page
              .locator('[data-slot="sidebar-menu-button"]:visible')
              .first()
              .hover();
          await compare(pages[0], pages[1], info, "menu-hover");
          for (const page of pages) {
            await page.mouse.move(0, 0);
            await page.keyboard.press("Tab");
            await page
              .locator('[data-slot="sidebar-menu-button"]:visible')
              .first()
              .focus();
          }
          await compare(pages[0], pages[1], info, "menu-focus");
        }
        if (story === "controlled") {
          for (const page of pages)
            await page
              .getByRole("button", {
                name: "Close Sidebar",
                exact: true,
              })
              .click();
          await compare(pages[0], pages[1], info, "controlled-closed");
          for (const page of pages)
            await page
              .getByRole("button", {
                name: "Open Sidebar",
                exact: true,
              })
              .click();
          await compare(pages[0], pages[1], info, "controlled-open");
        }
        if (story === "group-action") {
          for (const page of pages)
            await page
              .getByRole("button", {
                name: "Add Project",
              })
              .click();
          for (const page of pages)
            await expect(
              page.getByText("You clicked the group action!"),
            ).toBeVisible();
          await compare(pages[0], pages[1], info, "group-action-toast");
        }
        if (story.startsWith("registry")) {
          const input = pages[0].locator('[data-slot="sidebar-input"]');
          if (await input.count()) {
            for (const page of pages) {
              await page.locator('[data-slot="sidebar-input"]').focus();
              await page.locator('[data-slot="sidebar-input"]').fill("search");
            }
            await compare(pages[0], pages[1], info, "input-focus");
          }
        }
        for (const page of pages) {
          await page.mouse.move(0, 0);
          await page.keyboard.press("Control+b");
        }
        await compare(pages[0], pages[1], info, "desktop-collapsed");
        for (const page of pages)
          await expect
            .poll(() => page.evaluate(() => document.cookie))
            .toContain("sidebar_state=false");
        for (const page of pages) await page.keyboard.press("Meta+b");
        await compare(pages[0], pages[1], info, "shortcut-expanded");
        if (story === "menu-collapsible") {
          const trigger = pages[0]
            .locator('[data-slot="sidebar-menu-button"][aria-expanded]')
            .first();
          if (await trigger.count()) {
            for (const page of pages)
              await page
                .locator('[data-slot="sidebar-menu-button"][aria-expanded]')
                .first()
                .click();
            await compare(pages[0], pages[1], info, "menu-disclosure");
          }
        }
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Sidebar variants sizes invalid and native styles / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 1000,
        height: 900,
      },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-sidebar--states&globals=theme:${theme}`,
          );
          await expect(
            page.locator("[data-slot=sidebar-container]"),
          ).toBeVisible();
          return page;
        }),
      );
      await compare(pages[0], pages[1], info, "matrix");
      for (const index of [0, 4]) {
        for (const page of pages) {
          await page.keyboard.press("Tab");
          await page
            .locator("[data-slot=sidebar-menu-button]")
            .nth(index)
            .focus();
        }
        await compare(pages[0], pages[1], info, `focus-${index}`);
      }
      for (const page of pages) {
        await page
          .getByRole("button", {
            name: "Invalid",
            exact: true,
          })
          .click();
        await page
          .getByRole("textbox", {
            name: "Search",
            exact: true,
          })
          .focus();
      }
      await compare(pages[0], pages[1], info, "invalid-input");
      for (const page of pages) await page.keyboard.press("Control+b");
      await compare(pages[0], pages[1], info, "icon-matrix");
    } finally {
      await context.close();
    }
  });
for (const story of ["demo", "registry-inset", "registry-floating", "rtl"])
  test(`Sidebar mobile Sheet ${story}`, async ({ browser }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 390,
        height: 844,
      },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(`${url}/iframe.html?id=components-sidebar--${story}`);
          await expect(page.locator("#parity-root")).toBeVisible();
          await expect(
            page.locator("[data-slot=sidebar-container]"),
          ).toHaveCount(0);
          return page;
        }),
      );
      await compare(pages[0], pages[1], info, "mobile-closed");
      for (const page of pages) await page.keyboard.press("Control+b");
      for (const page of pages)
        await expect(page.getByRole("dialog")).toBeVisible();
      await compare(pages[0], pages[1], info, "mobile-open");
      for (const page of pages) await page.keyboard.press("Escape");
      for (const page of pages)
        await expect(page.getByRole("dialog")).toHaveCount(0);
      await compare(pages[0], pages[1], info, "mobile-escape");
    } finally {
      await context.close();
    }
  });
for (const story of ["skeletons", "rsc"])
  test(`Sidebar seeded ${story} loading and resolved`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 1000,
        height: 900,
      },
    });
    await context.addInitScript(() => {
      const random = Math.random;
      Math.random = () =>
        new Error().stack?.includes("SidebarMenuSkeleton") ? 0.5 : random();
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(`${url}/iframe.html?id=components-sidebar--${story}`);
          await expect(
            page.locator("#parity-root [data-slot=sidebar]").first(),
          ).toBeVisible();
          return page;
        }),
      );
      if (story === "rsc") {
        for (const page of pages) await page.reload();
        for (const page of pages)
          await expect(
            page.locator("[data-slot=sidebar-menu-skeleton]").first(),
          ).toBeVisible();
        await compare(pages[0], pages[1], info, "suspense-loading");
        for (const page of pages)
          await expect(page.getByText("Design Engineering")).toBeVisible();
        await compare(pages[0], pages[1], info, "suspense-resolved");
      } else await compare(pages[0], pages[1], info, "seeded-skeletons");
    } finally {
      await context.close();
    }
  });
for (const story of [
  "controlled",
  "registry-inset",
  "registry-floating",
  "registry-icon",
])
  test(`Sidebar collapse transition samples ${story}`, async ({
    browser,
  }, info) => {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await browser.newPage({
          viewport: {
            width: 1000,
            height: 900,
          },
        });
        await page.goto(`${url}/iframe.html?id=components-sidebar--${story}`);
        await expect(
          page.locator("[data-slot=sidebar-container]"),
        ).toBeVisible();
        // The collapsing rail crosses (0, 0), starting an unrelated hover transition.
        // Keep the pointer outside the viewport while sampling the collapse effects.
        await page.mouse.move(-1, -1);
        await settle(page);
        await page.keyboard.press("Control+b");
        await page.evaluate(async () => {
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          const animations = document
            .getAnimations()
            .filter((animation) => animation instanceof CSSTransition);
          if (
            !animations.some(
              (animation) => animation.transitionProperty === "width",
            )
          )
            throw new Error("Missing actual sidebar width transition");
          (
            window as Window & {
              sidebarEffects?: Animation[];
            }
          ).sidebarEffects = animations;
          // Pause the entire inventory before waiting; sequential ready waits
          // otherwise let later effects finish while earlier ones are pausing.
          for (const animation of animations) animation.pause();
          await Promise.all(animations.map((animation) => animation.ready));
          for (const animation of animations) animation.currentTime = 0;
        });
        return page;
      }),
    );
    try {
      const effects = await Promise.all(
        pages.map((page) =>
          page.evaluate(() =>
            (
              (
                window as Window & {
                  sidebarEffects?: Animation[];
                }
              ).sidebarEffects ?? []
            ).map((animation) => {
              const effect = animation.effect as KeyframeEffect;
              const target = effect.target as Element;
              return {
                slot: target.getAttribute("data-slot"),
                property: (animation as CSSTransition).transitionProperty,
                frames: effect.getKeyframes(),
                timing: effect.getTiming(),
              };
            }),
          ),
        ),
      );
      expect(effects[1]).toEqual(effects[0]);
      for (const time of [0, 75, 150, 200]) {
        for (const page of pages)
          await page.evaluate((time) => {
            for (const animation of (
              window as Window & {
                sidebarEffects?: Animation[];
              }
            ).sidebarEffects ?? [])
              animation.currentTime = time;
          }, time);
        await compare(
          pages[0],
          pages[1],
          info,
          `collapse-${time}ms`,
          true,
          false,
        );
      }
    } finally {
      await Promise.all(pages.map((page) => page.close()));
    }
  });
for (const theme of ["light", "dark"])
  test(`Sidebar custom native precedence ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: {
        width: 1000,
        height: 900,
      },
    });
    try {
      const pages = await Promise.all(
        [upstreamURL, stylexURL].map(async (url) => {
          const page = await context.newPage();
          await page.goto(
            `${url}/iframe.html?id=components-sidebar--customization&globals=theme:${theme}`,
          );
          await expect(
            page.locator("[data-slot=sidebar-container]"),
          ).toBeVisible();
          return page;
        }),
      );
      await compare(pages[0], pages[1], info, "custom-initial");
      for (const page of pages)
        await page.locator("[data-slot=sidebar-menu-button]").hover();
      await compare(pages[0], pages[1], info, "custom-hover");
      for (const page of pages) {
        await page
          .getByRole("button", {
            name: "Resize",
            exact: true,
          })
          .click();
        await expect(page.locator("[data-slot=sidebar-menu-button]")).toHaveCSS(
          "width",
          "304px",
        );
      }
      await compare(pages[0], pages[1], info, "custom-resized");
      for (const page of pages) await page.keyboard.press("Control+b");
      await compare(pages[0], pages[1], info, "custom-collapsed");
    } finally {
      await context.close();
    }
  });
test("Sidebar official MDX preview and example inventory", async ({
  request,
}) => {
  const { readFile, readdir } = await import("node:fs/promises");
  const mdx = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/sidebar.mdx",
    "utf8",
  );
  expect(
    [...mdx.matchAll(/<ComponentPreview[\s\S]*?name="([^"]+)"/g)].map(
      (match) => match[1],
    ),
  ).toEqual(["sidebar-demo"]);
  const files = (
    await readdir("generated/upstream/shadcn/apps/v4/examples/aria")
  ).filter((name) => /^sidebar-.*\.tsx$/.test(name));
  expect(files).toHaveLength(14);
  for (const url of [upstreamURL, stylexURL]) {
    const index = await (await request.get(`${url}/index.json`)).json();
    for (const file of files) {
      const suffix = file.slice(8, -4);
      expect(index.entries[`components-sidebar--${suffix}`]).toBeDefined();
    }
    for (const suffix of [
      "registry",
      "registry-inset",
      "registry-floating",
      "registry-icon",
      "states",
      "customization",
      "skeletons",
    ])
      expect(index.entries[`components-sidebar--${suffix}`]).toBeDefined();
  }
});
test("Sidebar actual Collapsible Tooltip DropdownMenu and language switching", async ({
  browser,
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 900,
    },
  });
  try {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(`${url}/iframe.html?id=components-sidebar--demo`);
        await expect(
          page.locator("[data-slot=sidebar-container]"),
        ).toBeVisible();
        return page;
      }),
    );
    for (const page of pages)
      await page
        .getByRole("button", {
          name: "Playground",
          exact: true,
        })
        .click();
    await compare(pages[0], pages[1], info, "actual-disclosure");
    for (const page of pages)
      await page.locator("[data-slot=sidebar-menu-action]").first().click();
    for (const page of pages)
      await expect(page.getByRole("menu")).toBeVisible();
    await compare(pages[0], pages[1], info, "actual-menu");
    for (const page of pages) {
      await page.keyboard.press("Escape");
      await page.mouse.move(0, 0);
      await page.keyboard.press("Control+b");
      await page
        .getByRole("button", {
          name: "Playground",
          exact: true,
        })
        .hover();
    }
    for (const page of pages)
      await expect(page.getByRole("tooltip")).toBeVisible();
    await compare(pages[0], pages[1], info, "actual-tooltip");
    for (const page of pages)
      await page.goto(page.url().replace("--demo", "--rtl"));
    for (const page of pages)
      await expect(page.locator("[data-name=language-selector]")).toBeVisible();
    for (const language of ["English", "Hebrew (עברית)"]) {
      for (const page of pages) {
        await page.locator("[data-name=language-selector]").click();
        await page
          .getByRole("option", {
            name: language,
            exact: true,
          })
          .click();
      }
      for (const page of pages) {
        await page.mouse.move(0, 0);
        await expect(page.getByRole("tooltip")).toHaveCount(0);
      }
      await compare(pages[0], pages[1], info, `language-${language}`);
      for (const page of pages) await page.keyboard.press("Control+b");
      await compare(pages[0], pages[1], info, `language-collapsed-${language}`);
      for (const page of pages) await page.keyboard.press("Control+b");
    }
  } finally {
    await context.close();
  }
});
test("Sidebar responsive 767/768 boundary and mobile trigger", async ({
  browser,
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 768,
      height: 900,
    },
  });
  try {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await page.goto(
          `${url}/iframe.html?id=components-sidebar--registry-inset`,
        );
        await expect(
          page.locator("[data-slot=sidebar-container]"),
        ).toBeVisible();
        return page;
      }),
    );
    await compare(pages[0], pages[1], info, "desktop-768");
    for (const page of pages) {
      await page.setViewportSize({
        width: 767,
        height: 900,
      });
      await expect(page.locator("[data-slot=sidebar-container]")).toHaveCount(
        0,
      );
    }
    await compare(pages[0], pages[1], info, "mobile-767");
    for (const page of pages)
      await page.locator("[data-slot=sidebar-trigger]").click();
    for (const page of pages)
      await expect(page.getByRole("dialog")).toBeVisible();
    await compare(pages[0], pages[1], info, "mobile-trigger");
    for (const page of pages) {
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
      await page.setViewportSize({
        width: 768,
        height: 900,
      });
      await expect(page.locator("[data-slot=sidebar-container]")).toBeVisible();
    }
    await compare(pages[0], pages[1], info, "desktop-restored");
  } finally {
    await context.close();
  }
});
