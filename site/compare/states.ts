import type { Plugin, Root, Rule } from "postcss";
import selectorParser from "postcss-selector-parser";

const attributes = new Map([
  [":hover", "data-compare-hover"],
  [":focus", "data-compare-focus"],
  [":focus-visible", "data-compare-focus-visible"],
  [":active", "data-compare-active"],
]);

function fixtureSelector(rule: Rule) {
  if (!/:(?:hover|focus|active)/.test(rule.selector)) return "";
  const selectors = selectorParser().astSync(rule.selector);
  for (const selector of [...selectors.nodes]) {
    let changed = false;
    selector.walkPseudos((pseudo) => {
      const attribute = attributes.get(pseudo.value);
      if (!attribute) return;
      pseudo.replaceWith(
        selectorParser.attribute({ attribute, value: undefined, raws: {} }),
      );
      changed = true;
    });
    if (!changed) selector.remove();
  }
  return selectors.toString();
}

// Preserve the original selectors, specificity, layer and cascade positions.
export function addFixtureStates(root: Root) {
  root.walkRules((rule) => {
    const selector = fixtureSelector(rule);
    if (selector) rule.selector += ", " + selector;
  });
  // Touchscreens can opt into a desktop hover preview without changing native hover.
  root.walkAtRules("media", (media) => {
    if (!/^\(hover:\s*hover\)$/.test(media.params)) return;
    const touch = media.clone({ params: "(hover: none)" });
    touch.walkDecls((declaration) => {
      let scoped = false;
      for (
        let parent = declaration.parent;
        parent;
        parent = parent.type === "root" ? undefined : parent.parent
      ) {
        if (parent.type !== "rule") continue;
        const selectors = parent.selectors.filter((selector) =>
          selector.includes("[data-compare-hover]"),
        );
        if (selectors.length) {
          parent.selectors = selectors;
          scoped = true;
        }
      }
      if (!scoped) declaration.remove();
    });
    if (touch.toString().includes("[data-compare-hover]")) media.after(touch);
  });
}

export const fixtureStates: Plugin = {
  postcssPlugin: "ariax-comparison-states",
  OnceExit: addFixtureStates,
};
