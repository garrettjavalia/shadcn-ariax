import { assertSourceComponents } from "./source-components";
import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { compare } from "./compare";
import { upstreamURL, stylexURL } from "./servers";
const fieldDocumentation: Record<string, string> = {
  "field-demo": "components-field--document-demo",
  "field-input": "components-field--document-input",
  "field-textarea": "components-field--document-textarea",
  "field-select": "components-field--document-select",
  "field-slider": "components-field--document-slider",
  "field-fieldset": "components-field--document-fieldset",
  "field-checkbox": "compositions-fieldcheckbox--field-checkbox",
  "field-radio": "components-field--radio",
  "field-switch": "components-field--document-switch",
  "field-choice-card": "components-field--radio-choice-card",
  "field-responsive": "components-field--document-responsive",
  "field-rtl": "components-field--document-rtl",
  "field-group": "compositions-fieldcheckbox--field-group-example",
};
test("Field official docs and registry examples preserve actual component compositions", async ({
  request,
}) => {
  const doc = await readFile(
    "generated/upstream/shadcn/apps/v4/content/docs/components/aria/field.mdx",
    "utf8",
  );
  const examples = [
    ...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g),
  ].map((m) => m[1]);
  expect(examples.sort()).toEqual(Object.keys(fieldDocumentation).sort());
  const fixtures: Record<string, string> = {
    "field-checkbox": "stories/field-checkbox-example.tsx",
    "field-radio": "stories/field-radio.tsx",
    "field-choice-card": "stories/field-choice-card.tsx",
    "field-group": "stories/field-group-example.tsx",
  };
  for (const name of examples)
    await assertSourceComponents(
      "generated/upstream/shadcn/apps/v4/examples/aria/" + name + ".tsx",
      fixtures[name] ?? "stories/field-examples/" + name.slice(6) + ".tsx",
    );
  await assertSourceComponents(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/field-example.tsx",
    "stories/field-examples/registry.tsx",
  );
  const index = await (await request.get(stylexURL + "/index.json")).json();
  for (const name of examples)
    expect(index.entries[fieldDocumentation[name]]?.tags, name).toContain(
      "parity",
    );
  const registry = await readFile(
    "generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/field-example.tsx",
    "utf8",
  );
  const functions = [...registry.matchAll(/^function (\w+)\(/gm)].map(
    (m) => m[1],
  );
  expect(functions).toHaveLength(10);
  for (const name of functions) {
    const id =
      "components-field--registry-" +
      name
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
    expect(index.entries[id]?.tags, name).toContain("parity");
  }
});
for (const theme of ["light", "dark"])
  test(`Field choice focus, hover, disabled, checked / ${theme}`, async ({
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
          `${url}/iframe.html?id=components-field--choice-selectors&viewMode=story&globals=theme:${theme}`,
        );
        await expect(p.locator("#parity-root")).toBeVisible();
        return p;
      }),
    );
    try {
      for (let i = 0; i < 4; i++) {
        await Promise.all(
          [a, b].map((p) =>
            p
              .locator('[data-slot="field-label"]')
              .filter({ has: p.locator('[data-slot="field"]') })
              .nth(i)
              .hover(),
          ),
        );
        await compare(a, b, info, `choice-${i}-hover`);
      }
      await Promise.all(
        [a, b].map(async (p) => {
          await p.mouse.move(0, 0);
          await p.keyboard.press("Tab");
        }),
      );
      await compare(a, b, info, "choice-keyboard-focus");
      await Promise.all([a, b].map((p) => p.keyboard.press("Space")));
      await compare(a, b, info, "choice-keyboard-toggle");
    } finally {
      await ctx.close();
    }
  });
