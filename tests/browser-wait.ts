import type { Page } from "@playwright/test";

export class BrowserWaitTimeout extends Error {}

// Use the runner's clock: a page may deliberately pause or replace its timers.
// A stalled readiness promise must fail with its phase, not consume a whole batch.
export async function waitForBrowserWork<T>(
  page: Page,
  phase: () => string,
  work: () => Promise<T>,
  timeout = 15_000,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(async () => {
          let diagnosticTimer: ReturnType<typeof setTimeout> | undefined;
          let diagnostics: unknown;
          try {
            diagnostics = await Promise.race([
              page.evaluate(() => ({
                fonts: document.fonts.status,
                elements: Array.from(
                  document.querySelectorAll<HTMLElement>(
                    '#parity-root [data-slot$="-viewport"], #parity-root [data-slot$="-content"], #parity-root [data-message-id], #parity-root [data-pending-scroll], #parity-root [data-autoscrolling]',
                  ),
                )
                  .slice(0, 20)
                  .map((el) => ({
                    slot: el.dataset.slot,
                    id: el.dataset.messageId,
                    rect: el.getBoundingClientRect().toJSON(),
                    scrollTop: el.scrollTop,
                    scrollHeight: el.scrollHeight,
                    clientHeight: el.clientHeight,
                    paddingTop: getComputedStyle(el).paddingTop,
                    attributes: Object.fromEntries(
                      Array.from(el.attributes)
                        .filter((a) => a.name.startsWith("data-"))
                        .map((a) => [a.name, a.value]),
                    ),
                  })),
                animations: document.getAnimations().map((a) => ({
                  state: a.playState,
                  pending: a.pending,
                  timeline: a.timeline?.constructor.name,
                  target:
                    (a.effect as KeyframeEffect)?.target instanceof Element
                      ? (
                          (a.effect as KeyframeEffect).target as Element
                        ).getAttribute("data-slot")
                      : null,
                })),
              })),
              new Promise((resolve) => {
                diagnosticTimer = setTimeout(
                  () => resolve("Renderer did not respond"),
                  500,
                );
              }),
            ]);
          } catch (error) {
            diagnostics = String(error);
          } finally {
            clearTimeout(diagnosticTimer);
          }
          reject(
            new BrowserWaitTimeout(
              `Browser wait timed out after ${timeout}ms: ${phase()} (${page.url()}) ${JSON.stringify(diagnostics)}`,
            ),
          );
        }, timeout);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
