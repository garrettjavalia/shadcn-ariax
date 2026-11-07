import { test, expect } from "@playwright/test";
import { navigateStory } from "./story-navigation";
import { snapshot, differences, settle } from "./compare";
import { stylexURL } from "./servers";
import { controlAvatarAssets, waitAvatarAssets } from "./avatar-assets";
import { waitForStoryReadiness } from "./story-readiness";

test("preview transitions remount state and preserve fresh-page DOM/CSS", async ({
  browser,
}) => {
  const context = await browser.newContext();
  await controlAvatarAssets(context);
  const reused = await context.newPage();
  await reused.clock.setFixedTime(new Date("2026-02-12T12:00:00Z"));
  try {
    for (const id of [
      "components-checkbox--usage",
      "components-checkbox--controlled",
      "components-checkbox--context",
      "components-progress--demo",
      "components-checkbox--usage",
    ]) {
      const url = `${stylexURL}/iframe.html?id=${id}&viewMode=story&globals=theme:light`;
      const fresh = await context.newPage();
      await test.step(`${id} navigation`, () =>
        Promise.all([
          navigateStory(reused, url, true),
          navigateStory(fresh, url),
        ]));
      await Promise.all(
        [reused, fresh].map(async (page) => {
          await expect(page.locator("#parity-root")).toBeVisible();
          await test.step(`${id} readiness`, async () => {
            await waitAvatarAssets(page);
            await waitForStoryReadiness(page);
          });
          await page.mouse.move(0, 0);
          await test.step(`${id} settle`, () => settle(page));
        }),
      );
      expect(
        differences(await snapshot(reused), await snapshot(fresh)),
      ).toEqual([]);
      // Leave controlled component state and focus behind for the next transition.
      const checkbox = reused.getByRole("checkbox").first();
      if ((await checkbox.count()) && (await checkbox.isEnabled()))
        await reused.locator("[data-slot=checkbox]").first().click();
      await fresh.close();
    }
  } finally {
    await context.close().catch(() => {});
  }
});

for (const fails of [false, true])
  test(`navigation preserves scroll effects and ${fails ? "propagates errors" : "waits for finite effects and afterEach"}`, async ({
    page,
  }) => {
    await page.route("http://navigation.test/**", (route) =>
      route.fulfill({
        contentType: "text/html",
        body: `<style>
      @keyframes reveal { from {opacity:0} to {opacity:1} }
      #scroll {width:100px;height:40px;overflow:auto;animation:reveal 1ms linear both;animation-timeline:scroll(self inline)}
      #content {width:400px;height:20px}
      </style><main><div id="scroll"><div id="content">Scroll</div></div><div id="finite">Finite</div><output>Pending</output></main>`,
      }),
    );
    await navigateStory(page, "http://navigation.test/?id=initial", true);
    await page.evaluate((fails) => {
      const listeners = new Map<string, Set<(payload: unknown) => void>>();
      const dispatch = (name: string, payload: unknown) => {
        for (const listener of listeners.get(name) ?? []) listener(payload);
      };
      const scope = window as Window & {
        __STORYBOOK_ADDONS_CHANNEL__?: unknown;
        nativeInventory?: typeof document.getAnimations;
        observed?: unknown;
      };
      scope.nativeInventory = document.getAnimations;
      scope.__STORYBOOK_ADDONS_CHANNEL__ = {
        on(name: string, listener: (payload: unknown) => void) {
          if (!listeners.has(name)) listeners.set(name, new Set());
          listeners.get(name)!.add(listener);
        },
        off(name: string, listener: (payload: unknown) => void) {
          listeners.get(name)?.delete(listener);
        },
        emit(_name: string, { storyId }: { storyId: string }) {
          void (async () => {
            document.getElementById("scroll")!.scrollLeft = 150;
            const finite = document
              .getElementById("finite")!
              .animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 100,
                fill: "forwards",
              });
            dispatch("storyRenderPhaseChanged", {
              storyId,
              newPhase: "completing",
            });
            scope.observed = {
              finitePresent: document.getAnimations().includes(finite),
              scrollExcluded: !document
                .getAnimations()
                .some((a) => a.timeline?.constructor.name === "ScrollTimeline"),
              scrollStillPresent: document
                .getElementById("scroll")!
                .getAnimations()
                .some((a) => a.timeline?.constructor.name === "ScrollTimeline"),
            };
            await finite.finished;
            if (fails) {
              dispatch("storyErrored", { message: "Failed lifecycle" });
              return;
            }
            dispatch("storyRenderPhaseChanged", {
              storyId,
              newPhase: "completed",
            });
            await new Promise((resolve) => setTimeout(resolve, 25));
            document.querySelector("output")!.textContent =
              "After each completed";
            dispatch("storyFinished", { storyId, status: "success" });
          })();
        },
      };
    }, fails);
    const navigation = navigateStory(
      page,
      "http://navigation.test/?id=next",
      true,
    );
    if (fails) await expect(navigation).rejects.toThrow("Failed lifecycle");
    else {
      await navigation;
      expect(await page.locator("output").textContent()).toBe(
        "After each completed",
      );
    }
    expect(
      await page.evaluate(() => {
        const scope = window as Window & {
          nativeInventory?: typeof document.getAnimations;
          observed?: unknown;
        };
        return {
          observed: scope.observed,
          restored: document.getAnimations === scope.nativeInventory,
          scrollPresent: document
            .getAnimations()
            .some((a) => a.timeline?.constructor.name === "ScrollTimeline"),
          opacity: getComputedStyle(document.getElementById("scroll")!).opacity,
        };
      }),
    ).toEqual({
      observed: {
        finitePresent: true,
        scrollExcluded: true,
        scrollStillPresent: true,
      },
      restored: true,
      scrollPresent: true,
      opacity: "0.5",
    });
  });

test("Chart readiness is released when a preview unmounts and renewed on remount", async ({
  page,
}) => {
  for (const id of [
    "components-chart--legend",
    "components-checkbox--usage",
    "components-chart--legend",
  ]) {
    await navigateStory(
      page,
      `${stylexURL}/iframe.html?id=${id}&viewMode=story&globals=theme:light`,
      true,
    );
    await expect(page.locator("#parity-root")).toBeVisible();
    await waitForStoryReadiness(page);
    expect(
      await page.evaluate(() =>
        Boolean(
          (window as Window & { parityReady?: Promise<void> }).parityReady,
        ),
      ),
    ).toBe(id.includes("chart"));
  }
});
