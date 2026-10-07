import { createStoryPair } from "./story-pair";
import { test, expect } from "@playwright/test";
import { settle, compare, snapshot, differences } from "./compare";

test("finite input blur transitions settle in a content-visibility hidden panel", async ({
  page,
}) => {
  test.setTimeout(10_000);
  await page.setContent(
    `<style>input{border:2px solid rgb(0,0,0);transition:border-color 150ms}input:focus{border-color:rgb(255,0,0)}</style><main id="parity-root"><section id="panel"><input aria-label="Panel input"/></section><button onclick="document.getElementById('panel').style.contentVisibility='hidden'">Close</button></main>`,
  );
  await page.getByRole("textbox").focus();
  await settle(page);
  await page.getByRole("button", { name: "Close" }).click();
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.playState === "running" || animation.pending,
          ).length,
    ),
  ).toBeGreaterThan(0);
  await settle(page);
  expect(
    await page.evaluate(() =>
      document
        .getAnimations()
        .some(
          (animation) => animation.playState === "running" || animation.pending,
        ),
    ),
  ).toBe(false);
  await expect(page.locator("input")).toHaveCSS(
    "border-top-color",
    "rgb(0, 0, 0)",
  );
  await expect(page.locator("#panel")).toHaveCSS(
    "content-visibility",
    "hidden",
  );
});

test("settle observes finite animations started when another effect completes", async ({
  page,
}) => {
  await page.setContent(
    '<main id="parity-root"><div id="first">First</div><div id="second">Second</div></main>',
  );
  await page.evaluate(() => {
    const first = document
      .getElementById("first")!
      .animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100,
        fill: "forwards",
      });
    first.finished.then(() =>
      document
        .getElementById("second")!
        .animate([{ opacity: 1 }, { opacity: 0.5 }], {
          duration: 150,
          fill: "forwards",
        }),
    );
  });
  await settle(page);
  expect(
    await page.evaluate(() =>
      document.getAnimations().map((animation) => animation.playState),
    ),
  ).toEqual(["finished", "finished"]);
  await expect(page.locator("#second")).toHaveCSS("opacity", "0.5");
});

test("scroll-driven effects remain at their actual scroll progress while time effects settle", async ({
  browser,
}, info) => {
  test.setTimeout(10_000);
  const { context, pages } = await createStoryPair(browser, undefined);
  try {
    for (const page of pages)
      await page.setContent(`<style>
      @keyframes reveal{from{opacity:0}to{opacity:1}}
      #scroll{width:200px;height:80px;overflow:auto;animation:reveal 1ms linear both;animation-timeline:scroll(self inline)}
      #content{width:800px;height:60px;background:red}
    </style><main id="parity-root"><div id="scroll"><div id="content">Scroll progress</div></div><span id="finite">Finite effect</span></main>`);
    for (const position of [0, 300, 600]) {
      for (const page of pages)
        await page.evaluate((position) => {
          document.getElementById("scroll")!.scrollLeft = position;
          document
            .getElementById("finite")!
            .animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 50,
              fill: "forwards",
            });
        }, position);
      await compare(pages[0], pages[1], info, `scroll-${position}`);
      for (const page of pages) {
        await expect(page.locator("#scroll")).toHaveCSS(
          "opacity",
          String(position / 600),
        );
        expect(
          await page.evaluate(
            () =>
              document
                .getAnimations()
                .find((a) => a.timeline?.constructor.name === "ScrollTimeline")
                ?.playState,
          ),
        ).not.toBe("paused");
        await expect(page.locator("#finite")).toHaveCSS("opacity", "1");
      }
    }
    await pages[1].locator("#scroll").evaluate((node) => {
      node.scrollLeft = 300;
    });
    await settle(pages[1]);
    const diff = differences(
      await snapshot(pages[0]),
      await snapshot(pages[1]),
    );
    expect(
      diff.some(
        (entry) =>
          entry.path.endsWith("/css/opacity") &&
          entry.upstream === "1" &&
          entry.stylex === "0.5",
      ),
    ).toBe(true);
  } finally {
    await context.close();
  }
});
