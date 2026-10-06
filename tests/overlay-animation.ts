import type { BrowserContext, Page } from "@playwright/test";
type OverlayWindow = Window & {
  parityOverlayAnimations?: WeakMap<Element, Animation>;
};
export async function installOverlayAnimationControl(
  context: BrowserContext,
  selector: string,
) {
  await context.addInitScript((selector) => {
    const handles = new WeakMap<Element, Animation>();
    (window as OverlayWindow).parityOverlayAnimations = handles;
    const seen = new WeakSet<Animation>();
    document.addEventListener(
      "animationstart",
      (event) => {
        if (
          !(event.target instanceof Element) ||
          !event.target.matches(selector)
        )
          return;
        for (const animation of event.target.getAnimations())
          if (
            animation instanceof CSSAnimation &&
            !seen.has(animation) &&
            (event.target.hasAttribute("data-entering") ||
              event.target.hasAttribute("data-exiting"))
          ) {
            seen.add(animation);
            handles.set(event.target, animation);
            animation.pause();
            animation.currentTime = 0;
          }
      },
      true,
    );
  }, selector);
}
export async function sampleOverlayAnimation(
  page: Page,
  selector: string,
  time: number,
) {
  await page.locator(selector).evaluate(async (node, time) => {
    const animation = (window as OverlayWindow).parityOverlayAnimations?.get(
      node,
    );
    if (!animation) throw new Error("Missing observed overlay animation");
    await animation.ready;
    animation.currentTime = time;
  }, time);
}
export async function completeOverlayAnimation(page: Page, selector: string) {
  await page.locator(selector).evaluate((node) => {
    const animation = (window as OverlayWindow).parityOverlayAnimations?.get(
      node,
    );
    if (!animation) throw new Error("Missing observed overlay animation");
    animation.currentTime = 0;
    animation.play();
  });
}
