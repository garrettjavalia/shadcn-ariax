import { test, expect } from "@playwright/test";
import { waitForStoryReadiness } from "./story-readiness";

test("stories without a readiness signal need no additional work", async ({
  page,
}) => {
  await page.setContent("<main>Ready</main>");
  await waitForStoryReadiness(page);
  await expect(page.locator("main")).toHaveText("Ready");
});

test("initial readiness waits for the actual asynchronous result", async ({
  page,
}) => {
  await page.setContent('<main id="parity-root"><div>Pending</div></main>');
  await page.evaluate(() => {
    const scope = window as Window & { parityReady?: Promise<void> };
    scope.parityReady = new Promise((resolveCanceled) => {
      setTimeout(() => {
        // A discarded generation releases its waiter while the replacement
        // still has actual initialization and SDK positioning to complete.
        scope.parityReady = new Promise((resolveReplacement) => {
          setTimeout(() => {
            const content = document.querySelector("main div")!;
            content.setAttribute("data-pending-scroll", "");
            resolveReplacement();
            setTimeout(() => {
              content.removeAttribute("data-pending-scroll");
              content.textContent = "Completed";
            }, 50);
          }, 50);
        });
        resolveCanceled();
      }, 50);
    });
  });
  await waitForStoryReadiness(page);
  expect(await page.locator("main").textContent()).toBe("Completed");
  // The SDK's DOM signal must work without a fixture-provided promise too.
  await page.setContent(
    '<main id="parity-root"><div data-pending-scroll>Pending</div></main>',
  );
  await page.evaluate(() => {
    delete (window as Window & { parityReady?: Promise<void> }).parityReady;
    setTimeout(() => {
      const content = document.querySelector("[data-pending-scroll]")!;
      content.removeAttribute("data-pending-scroll");
      content.textContent = "Completed";
    }, 50);
  });
  await waitForStoryReadiness(page);
  expect(await page.locator("main").textContent()).toBe("Completed");
});

test("initial readiness failures propagate to the parity test", async ({
  page,
}) => {
  await page.evaluate(() => {
    (window as Window & { parityReady?: Promise<void> }).parityReady =
      new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Fixture initialization failed")),
          50,
        );
      });
  });
  await expect(waitForStoryReadiness(page)).rejects.toThrow(
    "Fixture initialization failed",
  );
});

test("a stalled fixture fails by phase even when the page clock is paused", async ({
  page,
}) => {
  await page.setContent('<main id="parity-root">Waiting</main>');
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await page.evaluate(() => {
    (window as Window & { parityReady?: Promise<void> }).parityReady =
      new Promise(() => {});
  });
  await expect(waitForStoryReadiness(page, 100)).rejects.toThrow(
    "fixture readiness signal",
  );
});

test("shared image readiness decodes an avatar only once", async ({ page }) => {
  await page.setContent(
    '<main id="parity-root"><img data-slot="avatar-image" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E"></main>',
  );
  await page.evaluate(() => {
    const image = document.querySelector("img")!;
    image.decode = async () => {
      image.dataset.decodes = String(Number(image.dataset.decodes ?? 0) + 1);
    };
  });
  await waitForStoryReadiness(page);
  expect(await page.locator("img").getAttribute("data-decodes")).toBe("1");
});
