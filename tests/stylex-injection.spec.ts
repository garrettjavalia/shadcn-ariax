import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
const require = createRequire(import.meta.url);
const root = dirname(require.resolve("@stylexjs/stylex/package.json"));
test("StyleX production ESM nested conditions preserve rules and deduplicate", async ({
  page,
}) => {
  await page.setContent(
    '<div id="container" style="container-type:inline-size;width:300px"><div id="target" class="support-a support-b media-a media-b container-a container-b duplicate"></div></div>',
  );
  let source = await readFile(resolve(root, "lib/es/inject.mjs"), "utf8");
  source = source.replace(
    "export { inject as default };",
    "window.injectRule = inject;",
  );
  await page.addScriptTag({ content: `(()=>{${source}\n})();` });
  const result = await page.evaluate(() => {
    const inject = (
      window as unknown as {
        injectRule: (rule: { ltr: string; priority: number }) => unknown;
      }
    ).injectRule;
    const css = [
      "@supports (animation-timeline: scroll()){.support-a{width:111px}}",
      "@supports (animation-timeline: scroll()){.support-b{height:222px}}",
      "@media (min-width: calc(0px + 1px)){.media-a{padding-top:13px}}",
      "@media (min-width: calc(0px + 1px)){.media-b{padding-bottom:14px}}",
      "@container (min-width: calc(0px + 1px)){.container-a{margin-top:15px}}",
      "@container (min-width: calc(0px + 1px)){.container-b{margin-bottom:16px}}",
      "@supports (display: grid){.duplicate, .unused{padding-left:17px}}",
      "@supports (display: grid){.duplicate,.unused{padding-left:18px}}",
    ];
    for (const rule of css) inject({ ltr: rule, priority: 1 });
    for (const rule of css) inject({ ltr: rule, priority: 1 });
    let rules: string[] = [];
    function walk(list: CSSRuleList) {
      for (const r of list) {
        if (r instanceof CSSStyleRule && r.selectorText.includes(".duplicate"))
          rules.push(r.cssText);
        if ("cssRules" in r) walk((r as CSSGroupingRule).cssRules);
      }
    }
    for (const sheet of document.styleSheets) walk(sheet.cssRules);
    const style = getComputedStyle(document.querySelector("#target")!);
    return {
      width: style.width,
      height: style.height,
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      paddingLeft: style.paddingLeft,
      duplicates: rules.length,
    };
  });
  expect(result).toEqual({
    width: "111px",
    height: "222px",
    paddingTop: "13px",
    paddingBottom: "14px",
    marginTop: "15px",
    marginBottom: "16px",
    paddingLeft: "17px",
    duplicates: 1,
  });
});
