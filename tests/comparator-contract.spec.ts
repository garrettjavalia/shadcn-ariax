import { test, expect } from "@playwright/test";
import {
  compare,
  compareDOMCSS,
  snapshot,
  differences,
  normalizeAnimationSnapshots,
} from "./compare";

test("full and CI comparators enforce their declared snapshot contracts", async ({
  context,
}, info) => {
  const a = await context.newPage(),
    b = await context.newPage();
  const markup =
    '<style>#parity-root::before{content:"Prefix";color:red}</style><div id="offset"></div><main id="parity-root"><button aria-label="Save">Save</button></main>';
  const mutations = [
    { kind: "text", path: "/text" },
    { kind: "attribute", path: "/attrs/aria-label" },
    { kind: "css", path: "/css/color" },
    { kind: "pseudo", path: "/pseudos/::before/color" },
    { kind: "child", path: "/children/0" },
    { kind: "geometry", path: "/rect/y" },
  ] as const;
  await Promise.all([a, b].map((page) => page.setContent(markup)));
  await b
    .locator("button")
    .evaluate((button) => button.setAttribute("data-parity-trigger", "true"));
  await compare(a, b, info, "equivalent-full", false);
  await compareDOMCSS(a, b, info, "equivalent-ci");
  for (const { kind, path } of mutations)
    await test.step(kind, async () => {
      await Promise.all([a, b].map((page) => page.setContent(markup)));
      await b.evaluate((kind) => {
        const button = document.querySelector("button")!;
        if (kind === "text") button.textContent = "Changed";
        if (kind === "attribute") button.setAttribute("aria-label", "Changed");
        if (kind === "css") button.style.color = "rgb(0,128,0)";
        if (kind === "pseudo")
          document.querySelector("style")!.textContent =
            '#parity-root::before{content:"Prefix";color:blue}';
        if (kind === "child")
          button.appendChild(document.createElement("span"));
        if (kind === "geometry")
          (document.getElementById("offset") as HTMLElement).style.height =
            "40px";
      }, kind);
      expect(
        differences(await snapshot(a), await snapshot(b)).some((diff) =>
          diff.path.includes(path),
        ),
        `${kind} must remain observable`,
      ).toBe(true);
      await expect(compare(a, b, info, `full-${kind}`, false)).rejects.toThrow(
        `full-${kind}`,
      );
      if (kind === "geometry")
        await compareDOMCSS(a, b, info, "ci-geometry-outside-contract");
      else
        await expect(compareDOMCSS(a, b, info, `ci-${kind}`)).rejects.toThrow(
          `ci-${kind}`,
        );
    });
});

test("color tolerance preserves alpha, geometry, DOM and perceptible differences", async ({
  page,
}) => {
  const { filterColorDifferences } = await import("./color-differences");
  const changes = [
    {
      path: "/0/css/color",
      upstream: "oklch(0.282 0.091 267.935)",
      stylex: "rgb(22, 36, 86)",
    },
    {
      path: "/0/pseudos/::before/background-color",
      upstream: "oklab(0.5 0 0)",
      stylex: "oklab(0.5019 0 0)",
    },
    {
      path: "/0/css/background-color",
      upstream: "oklab(0 0 0 / 0.1)",
      stylex: "rgba(0, 0, 0, 0.1)",
    },
    {
      path: "/0/css/fill",
      upstream: "oklab(0.5 0 0)",
      stylex: "oklab(0.5021 0 0)",
    },
    {
      path: "/0/css/color",
      upstream: "oklab(0.5 0 0 / 0.5)",
      stylex: "oklab(0.5 0 0 / 0.501)",
    },
    {
      path: "/0/css/color",
      upstream: "rgba(0, 0, 0, 0.5)",
      stylex: "rgba(0, 0, 0, 0.501)",
    },
    {
      path: "/0/css/color",
      upstream: "rgb(0 0 0 / 0.5000001)",
      stylex: "oklab(0 0 0 / 0.5000002)",
    },
    { path: "/0/css/width", upstream: "12px", stylex: "11.984375px" },
    { path: "/0/attrs/color", upstream: "red", stylex: "rgb(255, 0, 0)" },
    { path: "/0/css/stroke", upstream: "none", stylex: "rgb(0, 0, 0)" },
    {
      path: "/0/css/color",
      upstream: "color(display-p3 1 0 0)",
      stylex: "rgb(255, 0, 0)",
    },
    {
      path: "/0/css/color",
      upstream: "oklab(none 0 0)",
      stylex: "oklab(0 0 0)",
    },
    {
      path: "/0/css/color",
      upstream: "rgb(0 0 0 / calc(.1 + .1))",
      stylex: "rgb(0 0 0 / .2)",
    },
    {
      path: "/0/css/color",
      upstream: "color-mix(in srgb, black, black)",
      stylex: "rgb(0 0 0)",
    },
  ];
  expect(await filterColorDifferences(page, changes)).toEqual(changes.slice(3));
});

test("both comparators accept optimized color notation in elements and pseudos", async ({
  context,
}, info) => {
  const a = await context.newPage(),
    b = await context.newPage();
  const markup = (color: string) =>
    `<style>#parity-root { color:${color} } #parity-root::before {content:'test';color:${color}}</style><main id="parity-root">text</main>`;
  await a.setContent(markup("oklch(0.282 0.091 267.935 / .1)"));
  await b.setContent(markup("rgba(22, 36, 86, .1)"));
  await compareDOMCSS(a, b, info, "optimized-color-ci");
  await compare(a, b, info, "optimized-color-full", false);
});

test("animation names require equivalent transform paths and timing", async ({
  context,
}, info) => {
  const pages = await Promise.all([context.newPage(), context.newPage()]);
  const fixture = (name: string, middle: string, end: string) =>
    `<style>@keyframes ${name}{from{transform:translate3d(0px,0px,5px) scale3d(1,1,1) rotate(0deg)}50%{transform:${middle}}to{transform:${end}}}#parity-root{width:100px;height:80px;animation:${name} 1s linear both}</style><main id="parity-root">motion</main>`;
  await pages[0].setContent(
    fixture(
      "source",
      "translateX(20px) scaleX(.8) rotate(90deg)",
      "translate3d(0px,0px,12px) scale3d(.95,.95,.95) rotate(0deg)",
    ),
  );
  await pages[1].setContent(
    fixture(
      "compiled",
      "translate(20px,0px) scale(.8,1) rotate(90deg)",
      "translateZ(12px) scale3d(.95,.95,.95) rotate(0deg)",
    ),
  );
  for (const page of pages)
    await page.locator("#parity-root").evaluate(async (element) => {
      const animation = element.getAnimations()[0];
      animation.pause();
      await animation.ready;
      animation.currentTime = 0;
    });
  const captures = await Promise.all(pages.map((page) => snapshot(page)));
  expect(
    differences(captures[0], captures[1]).some((diff) =>
      diff.path.includes("/frames/"),
    ),
  ).toBe(true);
  expect(
    differences(...normalizeAnimationSnapshots(captures[0], captures[1])),
  ).toEqual([]);
  await compare(
    pages[0],
    pages[1],
    info,
    "equivalent-transform-path",
    false,
    false,
  );
  await compareDOMCSS(pages[0], pages[1], info, "equivalent-transform-ci");
  for (const mutation of [
    "translation",
    "rotation",
    "order",
    "timing",
  ] as const) {
    await test.step(mutation, async () => {
      await pages[1].locator("#parity-root").evaluate((element, mutation) => {
        const effect = element.getAnimations()[0].effect as KeyframeEffect;
        effect.updateTiming({ duration: mutation === "timing" ? 2000 : 1000 });
        effect.setKeyframes([
          { transform: "translate3d(0px,0px,5px) scale3d(1,1,1) rotate(0deg)" },
          { transform: "translate(20px,0px) scale(.8,1) rotate(90deg)" },
          {
            transform:
              mutation === "order"
                ? "scale3d(.95,.95,.95) translateZ(12px) rotate(0deg)"
                : `translateZ(${mutation === "translation" ? 13 : 12}px) scale3d(.95,.95,.95) rotate(${mutation === "rotation" ? 360 : 0}deg)`,
          },
        ]);
      }, mutation);
      await expect(
        compare(
          pages[0],
          pages[1],
          info,
          `transform-${mutation}`,
          false,
          false,
        ),
      ).rejects.toThrow(`transform-${mutation}`);
      await expect(
        compareDOMCSS(pages[0], pages[1], info, `transform-ci-${mutation}`),
      ).rejects.toThrow(`transform-ci-${mutation}`);
    });
  }
});
