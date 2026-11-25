import korean from "./i18n/ko-KR";
import { locales, localePrefix } from "./i18n/locales";
import { expect, test, type Page } from "@playwright/test";

const deploymentPath = process.env.ARIAX_SITE_BASE ?? "/shadcn-ariax/";
const installationPath = "docs/installation/";
const buttonPath = "docs/components/button/";
const dialogPath = "docs/components/dialog/";

function deployedPath(path = "") {
  return deploymentPath + path;
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

test("landing page navigates to installation under the deployed base", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydrat|Minified React error/i.test(message.text())
    ) {
      failures.push(message.text());
    }
  });
  await page.goto("./");
  await expect(page).toHaveURL((url) => url.pathname === deployedPath());
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const solid = page.getByRole("tab", { name: "Solid" });
  await solid.click();
  await expect(solid).toHaveAttribute("aria-selected", "true");

  await page
    .locator(`a[href="${deployedPath(installationPath)}"]`)
    .filter({ visible: true })
    .first()
    .click();
  await expect(page).toHaveURL(
    (url) => url.pathname === deployedPath(installationPath),
  );
  await expect(
    page.getByRole("heading", { name: "Installation", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText(/shadcn[^\n]*add/, { exact: false }).first(),
  ).toBeVisible();
  const next = page.getByRole("tab", { name: "Next.js" });
  await next.click();
  await expect(next).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "pnpm exec next build",
  );
  await expect(page.getByRole("tabpanel")).toContainText("pnpm dlx shadcn add");
  await expect(page.getByRole("tabpanel")).not.toContainText("vite.config.ts");
  await expect(page.getByRole("contentinfo")).toHaveText("© 2026 Minsuk Jung");
  const brand = page
    .locator("header")
    .getByRole("link", { name: "AriaX", exact: true });
  await expect(brand).toHaveText("AriaX");
  await expect(brand.locator("img, svg")).toHaveCount(0);
  expect(failures).toEqual([]);
});

test("installation code copies the visible file in each framework tab", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(installationPath);
  for (const framework of ["Vite", "Next.js"]) {
    await page.getByRole("tab", { name: framework, exact: true }).click();
    const blocks = page
      .getByRole("tabpanel")
      .locator('[data-slot="code-block"]');
    const count = await blocks.count();
    expect(count).toBeGreaterThan(4);
    for (let i = 0; i < count; i++) {
      const block = blocks.nth(i);
      const source = await block.locator("pre code").textContent();
      await block.getByRole("button", { name: "Copy code" }).click();
      await expect
        .poll(() => page.evaluate(() => navigator.clipboard.readText()))
        .toBe(source);
    }
  }
});

test("component URLs are rendered as static HTML and reload without fallback", async ({
  page,
  request,
}) => {
  const response = await request.get(buttonPath);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/html");
  expect(await response.text()).toMatch(/<h1[^>]*>\s*Button\s*<\/h1>/i);
  expect((await request.get("docs/components/__nonexistent__/")).status()).toBe(
    404,
  );

  await page.goto(buttonPath);
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
  const reloaded = await page.reload();
  expect(reloaded?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { name: "Button", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "View code" }).first(),
  ).toBeVisible();
});

test("search opens, narrows results and navigates using only the keyboard", async ({
  page,
}) => {
  await page.goto(buttonPath);
  const opener = page.getByRole("button", { name: /search components/i });
  await opener.focus();
  await page.keyboard.press("Enter");
  const search = page.getByRole("dialog", { name: "Search components" });
  const input = search.getByRole("searchbox", { name: "Search components" });
  await expect(input).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(search).toBeHidden();
  await expect(opener).toBeFocused();

  await page.keyboard.press("Control+k");
  await expect(input).toBeFocused();
  await input.fill("radio group");
  const result = search.getByRole("link", { name: /^radio group\b/i }).first();
  await expect(result).toBeVisible();
  for (let step = 0; step < 4; step++) {
    await page.keyboard.press("Tab");
    if (await result.evaluate((link) => document.activeElement === link)) break;
  }
  await expect(result).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(
    (url) => url.pathname === deployedPath("docs/components/radio-group/"),
  );
  await expect(
    page.getByRole("heading", { name: "Radio Group", level: 1 }),
  ).toBeVisible();
});

test("a missing preview chunk leaves the example code and document available", async ({ page, request }) => {
  const manifest = await (await request.get(".vite/manifest.json")).json();
  const chunk = manifest["generated/site-previews/official-demos--button-demo/example.tsx"].file;
  await page.route(deployedPath(chunk), route => route.fulfill({ status: 404 }));
  await page.goto(buttonPath);
  const example = page.locator("[data-example=button-demo]").first();
  await expect(example.getByText("Preview unavailable.")).toBeVisible();
  await example.getByRole("button", { name: "View code" }).click();
  await expect(example.getByRole("button", { name: "Copy code" })).toBeVisible();
});

test("catalog search can link directly to a named example", async ({
  page,
}) => {
  await page.goto("docs/components/");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Home", exact: true }))
    .toHaveAttribute("href", deployedPath());
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText("Components");
  const search = page.getByRole("searchbox", {
    name: "Filter component catalog",
  });
  await search.fill("message-scroller-anchoring");
  const match = page.getByRole("link", {
    name: /message scroller.*anchoring/i,
  });
  const target = deployedPath(
    "docs/components/message-scroller/#example-message-scroller-anchoring",
  );
  await expect(match).toHaveAttribute("href", target);
  await match.click();
  await expect(page).toHaveURL(new RegExp(target + "$"));
  await expect(
    page.locator("#example-message-scroller-anchoring"),
  ).toBeInViewport();
  await page.keyboard.press("Control+k");
  const modal = page.getByRole("dialog");
  await modal.getByRole("searchbox").fill("streaming");
  await modal.getByRole("link", { name: /message scroller.*streaming/i }).click();
  await expect(modal).toBeHidden();
  await expect(page.locator("#example-message-scroller-streaming")).toBeInViewport();
});

test("the documentation sidebar keeps its scroll position between component pages", async ({ page }) => {
  await page.goto("docs/components/button/");
  const sidebar = page.locator("aside").filter({ has: page.getByRole("navigation", { name: "Documentation" }) });
  const next = sidebar.getByRole("link", { name: "Switch", exact: true });
  await next.scrollIntoViewIfNeeded();
  const offset = () => sidebar.evaluate(node => node.scrollTop);
  const before = await offset();
  expect(before).toBeGreaterThan(0);
  // The first visible list must already be positioned while hydration is unavailable.
  await page.route("**/assets/*.js", route => route.abort());
  await next.click();
  await expect(page).toHaveURL(url => url.pathname === deployedPath("docs/components/switch/"));
  expect(await offset()).toBe(before);
  await page.goBack();
  expect(await offset()).toBe(before);
});

test("component content keeps the same horizontal bounds between routes", async ({
  page,
}) => {
  for (const width of [390, 980, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    let baseline: number[] | undefined;
    for (const slug of [
      "button",
      "chart",
      "code-block",
      "data-table",
      "sidebar",
    ]) {
      await page.goto("docs/components/" + slug + "/");
      await expect(
        page
          .locator("[data-preview-stage]")
          .first()
          .locator(":scope > *")
          .first(),
      ).toBeAttached();
      const bounds = await page.locator("main#main").evaluate((main) => {
        const rect = main.getBoundingClientRect();
        return [
          rect.x,
          rect.width,
          document.body.getBoundingClientRect().width,
        ];
      });
      baseline ??= bounds;
      expect(bounds, width + "px " + slug).toEqual(baseline);
      await expectNoHorizontalOverflow(page);
    }
  }
});

for (const [component, collection] of [
  ["context-menu", "menu"],
  ["dropdown-menu", "menu"],
  ["select", "listbox"],
] as const) {
  test(`${component} keeps the collection focused during an outside mouse press`, async ({ page }) => {
    await page.goto(`docs/components/${component}/`);
    const context = component === "context-menu";
    const preview = page.locator(context ? '[data-preview-stage="context-menu-basic"]' : "[data-preview-stage]").first();
    await preview.getByRole("button").first().click({ button: context ? "right" : "left" });
    const list = page.getByRole(collection).first();
    await expect(list).toBeFocused();
    await page.mouse.move(4, 4);
    await page.mouse.down();
    await expect(list).toBeFocused();
    await page.mouse.up();
    await expect(list).toBeHidden();
  });
}

test("leaving a context menu releases hover focus and preserves keyboard navigation", async ({ page }) => {
  await page.goto("docs/components/context-menu/");
  await page.locator('[data-preview-stage="context-menu-basic"]').getByRole("button").click({ button: "right" });
  const menu = page.getByRole("menu");
  const back = menu.getByRole("menuitem", {name: "Back"});
  const reload = menu.getByRole("menuitem", {name: "Reload"});
  await reload.hover();
  await expect(reload).toBeFocused();
  await page.mouse.move(4, 4);
  await expect(menu).toBeFocused();
  await expect(menu.locator("[data-focused]")).toHaveCount(0);
  await page.keyboard.press("ArrowDown");
  await expect(back).toBeFocused();
  await reload.hover();
  await page.keyboard.press("Home");
  await expect(back).toBeFocused();
  await page.mouse.move(4, 4);
  await expect(back).toBeFocused();
});

test("dialog opens in the page viewport, traps focus and restores it on Escape", async ({
  page,
}) => {
  await page.goto(dialogPath);
  const trigger = page
    .locator("[data-example=dialog-demo]")
    .getByRole("button", { name: "Open Dialog" });
  await expect(trigger).toBeVisible();
  await trigger.focus();
  await trigger.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  await expect(dialog).toBeVisible();
  const overlay = page.locator("[data-slot=dialog-overlay]");
  const viewport = page.viewportSize()!;
  await expect
    .poll(async () => {
      const box = await overlay.boundingBox();
      return (
        box &&
        Math.abs(box.x) < 1 &&
        Math.abs(box.y) < 1 &&
        Math.abs(box.width - viewport.width) < 1 &&
        Math.abs(box.height - viewport.height) < 1
      );
    })
    .toBe(true);
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      dialog.evaluate((element) => element.contains(document.activeElement)),
    )
    .toBe(true);
  for (let step = 0; step < 6; step++) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("sheet, popover and toast interact with the full browser viewport", async ({
  page,
}) => {
  await page.goto("docs/components/sheet/");
  const open = page
    .locator("[data-example=sheet-demo]")
    .getByRole("button", { name: "Open", exact: true });
  await open.click();
  const overlay = page.locator("[data-slot=sheet-overlay]");
  await expect(overlay).toBeVisible();
  const size = page.viewportSize()!;
  await expect
    .poll(async () => (await overlay.boundingBox())?.width)
    .toBe(size.width);
  await expect
    .poll(async () => (await overlay.boundingBox())?.height)
    .toBe(size.height);
  await page.keyboard.press("Escape");
  await expect(open).toBeFocused();

  await page.goto("docs/components/popover/");
  const trigger = page
    .locator("[data-example=popover-demo] [data-preview-stage] button")
    .first();
  await trigger.click();
  const popover = page.locator("[data-slot=popover-content]");
  await expect(popover).toBeVisible();
  expect(
    await popover.evaluate((el) => el.closest(".example-shell") === null),
  ).toBe(true);
  await expect
    .poll(async () => {
      const box = await popover.boundingBox();
      const anchor = await trigger.boundingBox();
      return (
        box &&
        anchor &&
        (Math.abs(box.y - anchor.y - anchor.height) < 20 ||
          Math.abs(anchor.y - box.y - box.height) < 20)
      );
    })
    .toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();

  await page.goto("docs/components/sonner/");
  await page
    .locator("[data-example=sonner-demo]")
    .getByRole("button", { name: "Show Toast" })
    .click();
  const toast = page.locator("[data-sonner-toast]");
  await expect(toast).toHaveCount(1);
  await expect(toast).toContainText("Event has been created");
  expect(
    await toast.evaluate((el) => el.closest(".example-shell") === null),
  ).toBe(true);
});

test("expanded code copies the displayed AriaX source", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(buttonPath);
  const panel = page.locator("[data-example]").first();
  await panel.getByRole("button", { name: "View code" }).click();
  const source = panel.locator("pre").first();
  await expect(source).toBeVisible();
  const expected = ((await source.textContent()) ?? "").trim();
  expect(expected).toMatch(/Button/);
  expect(expected).not.toMatch(/@\/styles\/aria-nova\/ui/);
  await panel.getByRole("button", { name: "Copy code" }).click();
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.clipboard.readText()).trim()),
    )
    .toBe(expected);
});

test("the shadcn preview and code share one frame and retain the live example when expanded", async ({
  page,
}) => {
  await page.goto("docs/components/checkbox/");
  const shell = page.locator("[data-example=checkbox-demo] .example-shell");
  const example = shell
    .locator("[data-preview-stage] [data-slot=field-group]")
    .first();
  await expect(example).toBeVisible();
  await expect
    .poll(async () => Math.round((await example.boundingBox())!.width))
    .toBe(384);
  await expect(shell).toHaveCSS("border-radius", "18px");
  const code = shell.locator("[data-slot=code]");
  await expect
    .poll(async () => (await code.boundingBox())!.height)
    .toBeCloseTo(108.5, 0);
  await code.getByRole("button", { name: "View code" }).click();
  await expect(example).toBeVisible();
  await expect(code.locator("pre")).toHaveCSS("max-height", "288px");
});

test("theme updates the preview and persists even before hydration", async ({
  page,
}) => {
  await page.goto(buttonPath);
  const toggle = page.getByRole("button", { name: /^Theme:/ });
  const html = page.locator("html");
  const stage = page.locator('[data-preview-stage="button-demo"]');
  const isDark = (locator: ReturnType<Page["locator"]>) =>
    locator.evaluate((element) => element.classList.contains("dark"));

  await expect(toggle).toHaveAccessibleName("Theme: System");
  await expect.poll(() => isDark(html)).toBe(false);
  await expect(
    stage.getByRole("button", { name: "Button", exact: true }),
  ).toBeVisible();

  await toggle.click();
  await expect(toggle).toHaveAccessibleName("Theme: Light");
  await toggle.click();
  await expect(toggle).toHaveAccessibleName("Theme: Dark");
  await expect.poll(() => isDark(html)).toBe(true);
  await expect(page.locator(".example-shell").first()).toHaveCSS(
    "border-top-width",
    "1px",
  );
  const tokens = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--background").trim(),
      );
  expect(await tokens('[data-preview-stage="button-demo"]')).toBe(
    await tokens("html"),
  );

  await page.goto(dialogPath);
  await expect(toggle).toHaveAccessibleName("Theme: Dark");
  await expect.poll(() => isDark(html)).toBe(true);

  // 외부 클라이언트 번들만 차단해 초기 테마 스크립트를 확인한다.
  let blockedClient = false;
  await page.route(
    (url) => url.pathname.startsWith(deployedPath("assets/")) && url.pathname.endsWith(".js"),
    (route) => {
      blockedClient = true;
      return route.abort();
    },
  );
  await page.reload({ waitUntil: "domcontentloaded" });
  expect(blockedClient).toBe(true);
  await expect.poll(() => isDark(html)).toBe(true);
});

test("adapted variants load automatically and expose the matching AriaX source", async ({
  page,
}) => {
  await page.goto("docs/components/message-scroller/");
  const variant = page.locator('[data-example="message-scroller-demo"]');
  await expect(
    variant
      .getByRole("region", { name: "Conversation" })
      .or(variant.getByLabel("Conversation"))
      .first(),
  ).toBeVisible();
  await variant.getByRole("button", { name: "View code" }).click();
  await expect(variant.locator("pre")).toContainText("MessageScrollerProvider");
  const later = page.locator(
    '[data-preview-stage="message-scroller-streaming"]',
  );
  await later.scrollIntoViewIfNeeded();
  await expect(later).not.toBeEmpty();
});

test("locale detection and language switching preserve component routes", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "ko-KR" });
  const page = await context.newPage();
  try {
    await page.goto(
      "http://127.0.0.1:" +
        (process.env.ARIAX_SITE_TEST_PORT ?? "4187") +
        deployedPath("docs/components/input/#example-input-file"),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "ko-KR");
    await expect(page).toHaveURL(
      /ko\/docs\/components\/input\/#example-input-file$/,
    );
    await expect(
      page.getByText(korean.descriptions.input, { exact: true }),
    ).toBeVisible();
    const breadcrumb = page.getByRole("navigation", { name: korean.ui.Breadcrumb });
    await expect(breadcrumb.getByRole("link", { name: korean.ui.Home })).toHaveAttribute(
      "href", deployedPath("ko/"),
    );
    await expect(breadcrumb.getByRole("link", { name: korean.ui.Components })).toHaveAttribute(
      "href", deployedPath("ko/docs/components/"),
    );
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText("Input");
    await page.getByRole("button", { name: "KO 언어", exact: true }).click();
    await page.getByRole("option", { name: "English", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
    await expect(page).toHaveURL(
      (url) => url.pathname + url.hash === deployedPath("docs/components/input/#example-input-file"),
    );
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");

    const missing = await page.goto(page.url().replace(/docs\/components\/input\/.*$/, "missing/"));
    expect(missing?.status()).toBe(404);
    await page.getByRole("button", { name: "EN Language", exact: true }).click();
    await page.getByRole("option", { name: "한국어", exact: true }).click();
    await expect(page).toHaveURL(url => url.pathname === deployedPath("ko/404.html"));
    await expect(page.locator("html")).toHaveAttribute("lang", "ko-KR");
  } finally {
    await context.close();
  }
});

test("each locale has a two-line mobile headline and localized guide", async ({
  browser,
}) => {
  for (const locale of locales) {
    const context = await browser.newContext({
      locale,
      viewport: { width: 320, height: 844 },
      isMobile: true,
    });
    try {
      const page = await context.newPage();
      const root =
        "http://127.0.0.1:" +
        (process.env.ARIAX_SITE_TEST_PORT ?? "4187") +
        deployedPath();
      await page.goto(root);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      const heading = page.locator("h1");
      await expect(page.locator("[data-doc-breadcrumb]")).toHaveCount(0);
      const lines = heading.locator(".hero-line");
      await expect(lines).toHaveCount(2);
      const widths = await lines.evaluateAll((items) =>
        items.map((el) => {
          const range = document.createRange();
          range.selectNodeContents(el);
          return (
            range.getBoundingClientRect().width -
            el.getBoundingClientRect().width
          );
        }),
      );
      expect(Math.max(...widths), locale).toBeLessThanOrEqual(1);
      expect(await page.evaluate(() => innerWidth)).toBe(320);
      await expectNoHorizontalOverflow(page);
      await page.goto(root + localePrefix(locale) + installationPath);
      const breadcrumb = page.locator("[data-doc-breadcrumb]");
      await expect(breadcrumb.getByRole("link")).toHaveAttribute("href", deployedPath(localePrefix(locale)));
      await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText(await heading.innerText());
      await expect(
        page.getByRole("tabpanel").locator("pre").first(),
      ).toContainText("pnpm dlx shadcn add");
      await expect(page.getByRole("tabpanel")).not.toContainText("shadcn@");
    } finally {
      await context.close();
    }
  }
});

test("legacy story links resolve to the native guide and registry artifacts remain public", async ({
  page,
  request,
}) => {
  for (const asset of [
    "index.json",
    "storybook/index.json",
    "storybook/sb-manager/runtime.js",
  ]) {
    expect((await request.get(asset)).status(), asset).toBe(404);
  }
  const catalog = await request.get("registry.json");
  expect(await catalog.json()).toMatchObject({
    items: expect.arrayContaining([
      expect.objectContaining({ name: "button" }),
    ]),
  });
  const registryItem = await request.get("registry/button.json");
  expect(await registryItem.json()).toMatchObject({
    name: "button",
    type: "registry:ui",
  });
  for (const path of [
    "./?path=/story/components-checkbox--demo",
    "storybook/?path=/story/components-checkbox--demo",
    "iframe.html?id=components-checkbox--demo&viewMode=story",
    "storybook/iframe.html?id=components-checkbox--demo",
  ]) {
    await page.goto(path, { waitUntil: "commit" });
    await expect(page).toHaveURL(
      (url) =>
        url.pathname === deployedPath("docs/components/checkbox/") &&
        url.hash === "#example-checkbox-demo",
    );
  }
  await page.goto("storybook/?path=/docs/components-checkbox--docs", {
    waitUntil: "commit",
  });
  await expect(page).toHaveURL(
    (url) => url.pathname === deployedPath("docs/components/checkbox/"),
  );
});

test("every static docs route and preview link resolves without starting demos", async ({
  page,
  request,
}) => {
  const docsRoot = deployedPath("docs/");
  const docsIndex = deployedPath("docs/components/");
  const manifest = await (
    await request.get(deployedPath(".vite/manifest.json"))
  ).json();
  const seen = new Set([docsIndex, deployedPath(installationPath)]);
  const pending = [...seen];
  const stories = new Set<string>();
  let componentCount = 0;
  while (pending.length) {
    const batch = pending.splice(0, 8);
    const documents = await Promise.all(
      batch.map(async (path) => {
        const result = await request.get(path);
        expect(result.ok(), path).toBe(true);
        expect(result.headers()["content-type"], path).toContain("text/html");
        return { path, url: result.url(), html: await result.text() };
      }),
    );
    const pages = await page.evaluate((documents) => {
      return documents.map(({ path, url, html }) => {
        const template = document.createElement("template");
        template.innerHTML = html;
        const doc = template.content;
        const resolve = (value: string | null) =>
          new URL(value ?? "", url).href;
        return {
          path,
          url,
          heading: doc.querySelector("main h1")?.textContent?.trim(),
          links: Array.from(doc.querySelectorAll("a[href]"), (link) =>
            resolve(link.getAttribute("href")),
          ),
          stories: Array.from(
            doc.querySelectorAll("[data-live-story]"),
            (node) => node.getAttribute("data-live-story")!,
          ),
        };
      });
    }, documents);

    for (const { path, url, heading, links, stories: ids } of pages) {
      expect(heading, path).toBeTruthy();
      if (path !== docsIndex && path.startsWith(docsIndex)) componentCount++;
      const origin = new URL(url).origin;
      for (const href of links) {
        const link = new URL(href);
        if (link.origin !== origin) continue;
        expect(
          link.pathname.startsWith(deploymentPath),
          `${path}: ${href}`,
        ).toBe(true);
        if (link.pathname.startsWith(docsRoot) && !seen.has(link.pathname)) {
          seen.add(link.pathname);
          pending.push(link.pathname);
        }
      }
      for (const id of ids) {
        expect(
          manifest[`generated/site-previews/${id}/example.tsx`]?.file,
          id,
        ).toBeTruthy();
        stories.add(id);
      }
    }
  }

  expect(componentCount).toBeGreaterThan(40);
  expect(stories.size).toBeGreaterThan(200);
});

for (const width of [320, 390]) {
  test.describe(`phone layout at ${width}px`, () => {
    test.use({
      viewport: { width, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    test("landing, code and search fit the viewport", async ({ page }) => {
      await page.goto("./");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => innerWidth)).toBe(width);
      await expectNoHorizontalOverflow(page);
      await page.goto(buttonPath);
      await expect(
        page.getByRole("heading", { name: "Button", level: 1 }),
      ).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await page.getByRole("button", { name: "View code" }).first().click();
      await expect(
        page
          .locator("[data-slot=code]")
          .first()
          .getByRole("button", { name: "Copy code" }),
      ).toBeVisible();
      await expectNoHorizontalOverflow(page);
      const search = page.getByRole("button", { name: /search components/i });
      await search.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await expectNoHorizontalOverflow(page);
    });
  });
}

test("homepage compares the rendered buttons and reports specific mismatches", async ({
  page,
}) => {
  await page.goto("./");
  const panel = page.locator(".comparison-demo");
  await panel.scrollIntoViewIfNeeded();
  const result = panel.getByRole("status");
  const buttons = ["shadcn/ui", "AriaX"].map((name) =>
    panel
      .frameLocator('iframe[title="' + name + '"]')
      .getByRole("button", { name: "Button" }),
  );
  await expect(result).toContainText("Buttons match");
  for (const value of await result.locator("dd").allTextContents())
    expect(Number(value)).toBeGreaterThan(0);
  async function expectSiteTheme() {
    const palette = await page.evaluate(() => {
      const swatch = document.createElement("span");
      swatch.style.cssText =
        "display:none;color:var(--primary-foreground);background:var(--primary)";
      document.body.append(swatch);
      const color = getComputedStyle(swatch);
      const pair = [color.color, color.backgroundColor];
      swatch.remove();
      return pair;
    });
    for (const button of buttons) {
      await expect(button).toHaveCSS("color", palette[0]);
      await expect(button).toHaveCSS("background-color", palette[1]);
    }
  }
  await expectSiteTheme();
  const inspector = panel.locator(".comparison-inspector");
  await expect(inspector.locator("pre")).toHaveCount(2);
  for (const pre of await inspector.locator("pre").all())
    await expect(pre).toContainText("<button");
  await inspector
    .getByRole("textbox", { name: "Filter properties" })
    .fill("background-color");
  await expect(
    inspector.getByRole("rowheader", { name: "background-color", exact: true }),
  ).toBeVisible();
  const differencesOnly = inspector.getByRole("checkbox", { name: "Differences only" });
  await inspector.getByText("Differences only", { exact: true }).click();
  await expect(differencesOnly).toBeChecked();
  await expect(inspector.getByText("No matching properties")).toBeVisible();
  await buttons[1].evaluate((node) => node.style.setProperty("background-color", "red", "important"));
  await expect(inspector.getByRole("rowheader", { name: "background-color", exact: true })).toBeVisible();
  await buttons[1].evaluate((node) => node.style.removeProperty("background-color"));
  await expect(inspector.getByText("No matching properties")).toBeVisible();
  await differencesOnly.press("Space");
  await expect(differencesOnly).not.toBeChecked();
  await inspector.getByRole("textbox", { name: "Filter properties" }).fill("");
  const variantControl = panel.getByRole("button", {
    name: /Button variant$/,
  });
  const stateControl = panel.getByRole("button", {
    name: /Button state$/,
  });
  async function choose(control: typeof variantControl, label: string) {
    await control.click();
    await page.getByRole("option", { name: label, exact: true }).click();
    await expect(control).toBeFocused();
  }
  for (const [variant, label] of [
    ["outline", "Outline"],
    ["secondary", "Secondary"],
    ["ghost", "Ghost"],
    ["destructive", "Destructive"],
    ["link", "Link"],
    ["default", "Solid"],
  ]) {
    await choose(variantControl, label);
    for (const button of buttons)
      await expect(button).toHaveAttribute("data-variant", variant);
    await expect(result).toContainText("Buttons match");
  }
  const before = await buttons[0].evaluate(
    (node) => getComputedStyle(node).boxShadow,
  );
  for (const [state, label] of [
    ["hover", "Hover"],
    ["focus-visible", "Keyboard focus"],
    ["pressed", "Pressed"],
    ["rest", "Rest"],
  ]) {
    await choose(stateControl, label);
    for (const button of buttons)
      await expect
        .poll(() =>
          button.evaluate(
            (node) =>
              node.closest<HTMLElement>("#parity-root")?.dataset.readyState,
          ),
        )
        .toBe(state);
    if (state === "focus-visible") {
      for (const button of buttons)
        await expect
          .poll(() =>
            button.evaluate((node) => getComputedStyle(node).boxShadow),
          )
          .not.toBe(before);
    }
    if (state === "pressed") {
      for (const button of buttons)
        await expect(button).toHaveAttribute("data-pressed", /^(?:true)?$/);
    }
    await expect(result).toContainText("Buttons match");
    await expect(inspector.locator("pre").first()).toBeVisible();
  }
  const disabled = panel.getByRole("checkbox", {
    name: "Disable both buttons",
  });
  await disabled.focus();
  await page.keyboard.press("Space");
  for (const button of buttons) await expect(button).toBeDisabled();
  await expect(result).toContainText("Buttons match");
  await disabled.press("Space");
  for (const button of buttons) await expect(button).toBeEnabled();
  await buttons[1].evaluate((button) =>
    button.setAttribute("aria-label", "Changed label"),
  );
  await expect(result).toContainText("Differences found");
  await panel.getByText(/^View differences/).click();
  await expect(panel.getByText("Changed label", { exact: true })).toBeVisible();
  await panel
    .frameLocator('iframe[title="AriaX"]')
    .locator('[data-slot="button"]')
    .evaluate((button) => button.removeAttribute("aria-label"));
  await expect(result).toContainText("Buttons match");
  await page.emulateMedia({ colorScheme: "dark" });
  for (const button of buttons)
    await expect
      .poll(() =>
        button.evaluate((node) =>
          node.ownerDocument.documentElement.classList.contains("dark"),
        ),
      )
      .toBe(true);
  await page.setViewportSize({ width: 391, height: 844 });
  const widths = await Promise.all(
    buttons.map((button) =>
      button.evaluate((node) => node.ownerDocument.documentElement.clientWidth),
    ),
  );
  expect(widths[0]).toBe(widths[1]);
  await expect(result).toContainText("Buttons match");
  await expectSiteTheme();
  expect(
    await panel.evaluate((node) => node.scrollWidth <= node.clientWidth),
  ).toBe(true);
});
