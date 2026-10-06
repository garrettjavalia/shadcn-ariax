import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
async function drag(page: Page, index: number, delta: number) {
  const handle = page.getByRole("separator").nth(index);
  const box = await handle.boundingBox();
  if (!box) throw Error("Missing resize separator");
  const horizontal =
    (await handle.getAttribute("aria-orientation")) === "horizontal";
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(
    x + (horizontal ? 0 : delta),
    y + (horizontal ? delta : 0),
    { steps: 4 },
  );
  await page.mouse.up();
}
test("Resizable official document and registry examples are covered", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/resizable.mdx",
    "utf8",
  );
  const names = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((match) => match[1]);
  expect(names).toHaveLength(4);
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of names)
    expect(
      index.entries["components-resizable--" + name.slice(10)]?.tags,
      name,
    ).toContain("parity");
  const source = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/resizable-example.tsx",
    "utf8",
  );
  const mapping: Record<string, string> = {
    ResizableHorizontal: "registry-horizontal",
    ResizableVertical: "registry-vertical",
    ResizableWithHandle: "registry-handle",
    ResizableNested: "registry-nested",
    ResizableControlled: "registry-controlled",
  };
  const functions = [...source.matchAll(/^function (Resizable\w+)\(/gm)].map(
    (match) => match[1],
  );
  expect(functions.sort()).toEqual(Object.keys(mapping).sort());
  for (const name of functions)
    expect(
      index.entries["components-resizable--" + mapping[name]]?.tags,
      name,
    ).toContain("parity");
});
for (const theme of ["light", "dark"])
  for (const width of [1000, 390])
    test(`Resizable real drag, nested keyboard and RTL / ${theme} / ${width}`, async ({
      browser,
    }, info) => {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
      });
      const pages = await Promise.all([context.newPage(), context.newPage()]);
      try {
        for (const story of width === 390
          ? ["demo", "vertical", "rtl"]
          : [
              "demo",
              "vertical",
              "handle",
              "rtl",
              "registry-horizontal",
              "registry-vertical",
              "registry-handle",
              "registry-nested",
              "registry-controlled",
              "customization",
            ]) {
          await Promise.all(
            pages.map((page, i) =>
              page.goto(
                `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-resizable--${story}&globals=theme:${theme}`,
              ),
            ),
          );
          for (const page of pages)
            await expect(page.getByRole("separator").first()).toBeVisible();
          const count = await pages[0].getByRole("separator").count();
          expect(count).toBeGreaterThan(0);
          for (let index = 0; index < count; index++) {
            const before = await pages[0]
              .getByRole("separator")
              .nth(index)
              .getAttribute("aria-valuenow");
            for (const page of pages) await drag(page, index, 24);
            await expect(
              pages[0].getByRole("separator").nth(index),
            ).not.toHaveAttribute("aria-valuenow", before!);
            await compare(pages[0], pages[1], info, `${story}-${index}-drag`);
            for (const page of pages) {
              const handle = page.getByRole("separator").nth(index);
              await handle.focus();
              await page.keyboard.press(
                (await handle.getAttribute("aria-orientation")) === "horizontal"
                  ? "ArrowDown"
                  : "ArrowRight",
              );
            }
            await compare(
              pages[0],
              pages[1],
              info,
              `${story}-${index}-keyboard`,
            );
          }
        }
      } finally {
        await context.close();
      }
    });
for (const theme of ["light", "dark"])
  test(`Resizable constraints, collapse, disabled and imperative API / ${theme}`, async ({
    browser,
  }, info) => {
    const context = await browser.newContext({
      viewport: { width: 1000, height: 900 },
    });
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    try {
      for (const story of [
        "constraints",
        "vertical-constraints",
        "disabled",
        "imperative",
      ]) {
        await Promise.all(
          pages.map((page, i) =>
            page.goto(
              `${[upstreamURL, stylexURL][i]}/iframe.html?id=components-resizable--${story}&globals=theme:${theme}`,
            ),
          ),
        );
        for (const page of pages)
          await expect(page.getByRole("separator")).toBeVisible();
        if (story === "imperative") {
          for (const label of ["Collapse", "Expand", "Resize"]) {
            for (const page of pages)
              await page
                .getByRole("button", { name: label, exact: true })
                .click();
            await compare(pages[0], pages[1], info, label);
          }
        } else if (story === "disabled") {
          const before = await pages[0]
            .getByRole("separator")
            .getAttribute("aria-valuenow");
          for (const page of pages) await drag(page, 0, 60);
          for (const page of pages)
            await expect(page.getByRole("separator")).toHaveAttribute(
              "aria-valuenow",
              before!,
            );
          await compare(pages[0], pages[1], info, "disabled");
        } else {
          for (const key of ["End", "Home", "Enter", "Enter"]) {
            for (const page of pages) {
              await page.getByRole("separator").focus();
              await page.keyboard.press(key);
            }
            await compare(pages[0], pages[1], info, story + "-" + key);
          }
          for (const page of pages) await drag(page, 0, 1000);
          for (const page of pages)
            await expect(page.getByRole("separator")).toHaveAttribute(
              "aria-valuenow",
              "70",
            );
          await compare(pages[0], pages[1], info, story + "-maximum");
        }
      }
    } finally {
      await context.close();
    }
  });
