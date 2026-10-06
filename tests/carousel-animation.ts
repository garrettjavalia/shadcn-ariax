import { expect, type Page } from "@playwright/test";
import type {} from "../stories/carousel-examples/observe";
declare global {
  interface Window {
    parityCarouselFrames?: {
      advance: (frames: number) => number;
      running: () => boolean;
    };
  }
}
export async function controlCarouselFrames(page: Page) {
  await page.evaluate(() => {
    const api = window.parityCarousel!;
    const install = () => {
      const engine = api.internalEngine();
      let running = false,
        first = false;
      const stop = engine.animation.stop;
      engine.animation.start = () => {
        if (!running) {
          running = true;
          first = true;
        }
      };
      engine.animation.stop = () => {
        running = false;
        stop();
      };
      // Embla 8.5.2 uses a 60 Hz fixed step, two initial updates and render(alpha).
      // Keep its actual physics/render functions; replace only the RAF scheduler.
      // Read overflow each frame so Chromium measures the same transform history.
      window.parityCarouselFrames = {
        running: () => running,
        advance: (frames) => {
          let advanced = 0;
          while (running && advanced < frames) {
            engine.animation.update();
            if (first) {
              engine.animation.update();
              first = false;
            }
            engine.animation.render(0);
            void api.rootNode().scrollWidth;
            advanced++;
          }
          return advanced;
        },
      };
    };
    install();
    api.on("reInit", install);
  });
}
export async function advanceCarousel(page: Page, frames: number) {
  return page.evaluate(
    (frames) => window.parityCarouselFrames!.advance(frames),
    frames,
  );
}
export async function finishCarousel(page: Page) {
  await advanceCarousel(page, 300);
  expect(
    await page.evaluate(() => window.parityCarouselFrames!.running()),
    "Embla must emit settle within 5 seconds of simulated frames",
  ).toBe(false);
  expect(
    await page.evaluate(() =>
      window.parityCarousel!.internalEngine().scrollBody.settled(),
    ),
  ).toBe(true);
}
