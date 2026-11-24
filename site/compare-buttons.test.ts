import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { chromium } from "@playwright/test";
import type { compareButtons } from "./compare-buttons";

test("compares actual button frames and reports scoped DOM and style differences", async () => {
  const browser = await chromium.launch({
    executablePath: process.env.ARIAX_CHROMIUM_EXECUTABLE_PATH,
  });
  try {
    const page = await browser.newPage();
    await page.setContent("<iframe></iframe><iframe></iframe>");
    const source = stripTypeScriptTypes(
      await readFile(new URL("./compare-buttons.ts", import.meta.url), "utf8"),
    );
    await page.addScriptTag({
      type: "module",
      content: source + "\nwindow.compareButtons = compareButtons;",
    });
    await page.waitForFunction(() => "compareButtons" in window);
    const frames = page.frames().filter((frame) => frame !== page.mainFrame());
    async function render(i: number) {
      const id = "button-" + i;
      await frames[i]
        .setContent(`<style>button {--pad: 10px; padding: ${i ? "var(--pad)" : "10px"}; color:${i ? "color(srgb 1 0 0)" : "red"} } button::before { content:""; display:block; width:4px }</style>
        <label for="${id}">Action</label><button id="${id}" class="style-${i}" aria-labelledby="text-${i}"><span id="text-${i}">Save</span></button>`);
    }
    async function compare() {
      return page.evaluate(() => {
        const [a, b] = Array.from(
          document.querySelectorAll("iframe"),
          (frame) => frame.contentDocument!.querySelector("button")!,
        );
        return (
          window as unknown as Window & {
            compareButtons: typeof compareButtons;
          }
        ).compareButtons(a, b);
      });
    }
    await Promise.all([render(0), render(1)]);
    // Observe the host as well as both same-origin fixture documents. Even a
    // color-equivalent pair must not cause further comparison notifications.
    await page.evaluate(() => {
      const observer = new MutationObserver(() => {
        throw Error("compareButtons mutated the DOM");
      });
      const fixtureDocs = Array.from(
        document.querySelectorAll("iframe"),
        (f) => f.contentDocument!,
      );
      for (const doc of [document, ...fixtureDocs])
        observer.observe(doc.documentElement, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      Object.assign(window, { comparisonObserver: observer });
    });
    const mutations: Error[] = [];
    page.on("pageerror", (error) => mutations.push(error));
    const base = await compare();
    await page.evaluate(() =>
      (
        window as unknown as { comparisonObserver: MutationObserver }
      ).comparisonObserver.disconnect(),
    );
    assert.deepEqual(mutations, []);
    assert.equal(base.states.ariax.applied, null);
    assert.deepEqual(base.differences, []);
    assert.ok(base.domChecks > 5 && base.styleChecks > 50);
    assert.ok(base.cssPropertyCount > 300);
    assert.ok(base.dom.upstream.includes('class="style-0"'));
    assert.ok(base.dom.ariax.includes('class="style-1"'));
    const root = base.computedStyles.find((row) => row.path === "button")!;
    const color = root.properties.find((row) => row.property === "color")!;
    assert.notEqual(color.upstream, color.ariax);
    assert.equal(
      root.customProperties.find((row) => row.property === "--pad")?.ariax,
      "10px",
    );
    await frames[1].evaluate(() => {
      const button = document.querySelector("button")!;
      button.style.setProperty("--unused-fixture-value", "42px");
      button.style.setProperty("scroll-margin-block-start", "17px");
      button.style.setProperty("word-spacing", "7px");
      button.setAttributeNS("urn:example", "demo:flag", "yes");
      button.disabled = true;
      button.dataset.compareState = "pressed";
      button.style.paddingLeft = "12px";
      button.firstElementChild!.textContent = "Submit";
      document.querySelector("label")!.textContent = "Different label";
      document
        .querySelector("style")!
        .sheet!.insertRule("button::before {height: 3px}", 0);
    });
    const changed = await compare();
    assert.equal(changed.states.ariax.applied, "pressed");
    assert.equal(changed.states.ariax.native[":active"], false);
    assert.equal(changed.states.ariax.native[":disabled"], true);
    for (const [kind, path, property, upstream, ariax] of [
      ["dom", "button", "{urn:example}flag", null, "yes"],
      ["style", "button", "scroll-margin-block-start", "0px", "17px"],
      ["style", "button/child[1]", "word-spacing", "0px", "7px"],
      ["dom", "button", "associated labels", "Action", "Different label"],
      ["dom", "button", "disabled", null, "true"],
      ["dom", "button", ":disabled", "false", "true"],
      ["dom", "button/child[1]/child[1]", "content", "Save", "Submit"],
      ["style", "button", "padding-left", "10px", "12px"],
      ["style", "button::before", "height", "0px", "3px"],
    ])
      assert.ok(
        changed.differences.some(
          (d) =>
            d.kind === kind &&
            d.path === path &&
            d.property === property &&
            d.upstream === upstream &&
            d.ariax === ariax,
        ),
        String(property),
      );
    assert.ok(
      changed.customPropertyDifferences.some(
        (d) =>
          d.path === "button" &&
          d.property === "--unused-fixture-value" &&
          d.upstream === null &&
          d.ariax === "42px",
      ),
    );
    assert.ok(
      !changed.differences.some((d) => d.property === "--unused-fixture-value"),
    );
    assert.ok(changed.customPropertyChecks > 0);
    await frames[1].evaluate(() => {
      const b = document.querySelector("button")!;
      b.style.color = "rgba(255,0,0,.5)";
      b.setAttribute("aria-labelledby", "missing");
      b.append(document.createElement("strong"));
    });
    const { differences: structural, computedStyles } = await compare();
    assert.ok(
      computedStyles.some(
        (group) =>
          group.path === "button/child[2]" &&
          group.properties.some(
            (p) => p.property === "display" && p.upstream === null,
          ),
      ),
    );
    await frames[1].evaluate(() =>
      document
        .querySelector("button")!
        .append(
          document.createComment("details"),
          document.createTextNode(" "),
        ),
    );
    const rawDOM = (await compare()).differences;
    assert.ok(
      rawDOM.some((d) => d.property === "node type" && d.ariax === "#comment"),
    );
    assert.ok(rawDOM.some((d) => d.property === "content" && d.ariax === " "));
    assert.ok(
      structural.some(
        (d) => d.property === "color" && d.ariax === "rgba(255, 0, 0, 0.5)",
      ),
    );
    assert.ok(
      structural.some(
        (d) =>
          d.property === "aria-labelledby" &&
          d.ariax === "unresolved(#missing)",
      ),
    );
    assert.ok(
      structural.some((d) => d.property === "child count" && d.ariax === "2"),
    );
  } finally {
    await browser.close();
  }
});
