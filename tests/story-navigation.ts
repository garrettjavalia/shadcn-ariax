import type { Page } from "@playwright/test";
import { waitForBrowserWork } from "./browser-wait";
import { e2eTimeouts } from "./timeouts";

// The official test-runner uses this channel contract. Do not add its user-agent:
// Storybook would then disable animations before declaring the story finished.
type PreviewChannel = {
  on(event: string, listener: (payload: unknown) => void): void;
  off(event: string, listener: (payload: unknown) => void): void;
  emit(event: string, payload: unknown): void;
};
type NavigationScope = Window & {
  __STORYBOOK_ADDONS_CHANNEL__?: PreviewChannel;
  parityNavigation?: { token: number; cancel: () => void };
};
const selections = new WeakMap<
  Page,
  { storyId: string; environment: string }
>();
const observed = new WeakSet<Page>();
let navigationToken = 0;

export async function navigateStory(
  page: Page,
  url: string,
  reusePreview = false,
  timeout: number = e2eTimeouts.storyTransition,
) {
  const destination = new URL(url);
  const storyId = destination.searchParams.get("id");
  if (!storyId) throw new Error("Missing story ID");
  // Only the selected story may change in a reused document. Globals, args,
  // origin, pathname and hash all belong to the page's initialization contract.
  destination.searchParams.delete("id");
  destination.searchParams.sort();
  const environment = destination.href;
  if (!observed.has(page)) {
    observed.add(page);
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) selections.delete(page);
    });
  }
  const previous = selections.get(page);
  if (
    !reusePreview ||
    !previous ||
    previous.environment !== environment ||
    previous.storyId === storyId
  ) {
    // Selecting the same ID must reset component state rather than asking
    // Storybook to select its already active story (which emits no completion).
    await page.goto(url);
    selections.set(page, { storyId, environment });
    return;
  }
  const token = ++navigationToken;
  try {
    await waitForBrowserWork(
      page,
      () => `Storybook transition to ${storyId}`,
      () =>
        page.evaluate(
          async ({ storyId, token }) => {
            const scope = window as NavigationScope;
            const channel = scope.__STORYBOOK_ADDONS_CHANNEL__;
            if (!channel) throw new Error("Missing Storybook preview channel");
            if (document.activeElement instanceof HTMLElement)
              document.activeElement.blur();
            await new Promise<void>((resolve, reject) => {
              // Storybook 10.6 waits on scroll-driven Animation.finished until its
              // five-second timeout. Only its completing phase needs a time-based
              // inventory. Restore it before afterEach, completion and comparison.
              const original = Object.getOwnPropertyDescriptor(
                document,
                "getAnimations",
              );
              const getAnimations = document.getAnimations;
              let filtered = false;
              const restore = () => {
                if (!filtered) return;
                if (original)
                  Object.defineProperty(document, "getAnimations", original);
                else delete (document as Partial<Document>).getAnimations;
                filtered = false;
              };
              const cleanup = () => {
                restore();
                for (const [event, listener] of Object.entries(listeners))
                  channel.off(event, listener);
                if (scope.parityNavigation?.token === token)
                  delete scope.parityNavigation;
              };
              const fail = (payload: unknown) => {
                if (
                  payload &&
                  typeof payload === "object" &&
                  "storyId" in payload &&
                  payload.storyId !== storyId
                )
                  return;
                cleanup();
                reject(new Error(JSON.stringify(payload)));
              };
              const listeners: Record<string, (payload: unknown) => void> = {
                storyRenderPhaseChanged: (payload) => {
                  const phase = payload as {
                    storyId?: string;
                    newPhase?: string;
                  };
                  if (phase.storyId !== storyId) return;
                  if (phase.newPhase === "completing") {
                    Object.defineProperty(document, "getAnimations", {
                      configurable: true,
                      value: function () {
                        return getAnimations
                          .call(document)
                          .filter(
                            (animation) =>
                              !animation.timeline ||
                              animation.timeline instanceof DocumentTimeline,
                          );
                      },
                    });
                    filtered = true;
                  } else restore();
                },
                storyFinished: (payload) => {
                  const result = payload as {
                    storyId?: string;
                    status?: string;
                  };
                  if (result.storyId !== storyId) return;
                  cleanup();
                  result.status === "success"
                    ? resolve()
                    : reject(new Error(`Story ${storyId} failed`));
                },
                storyErrored: fail,
                storyThrewException: fail,
                playFunctionThrewException: fail,
                unhandledErrorsWhilePlaying: fail,
                storyMissing: (payload) => {
                  if (payload === storyId) fail(payload);
                },
              };
              scope.parityNavigation = {
                token,
                cancel: () => fail(`Story ${storyId} did not finish`),
              };
              for (const [event, listener] of Object.entries(listeners))
                channel.on(event, listener);
              try {
                channel.emit("setCurrentStory", { storyId, viewMode: "story" });
              } catch (error) {
                fail(String(error));
              }
            });
          },
          { storyId, token },
        ),
      timeout,
    );
    selections.set(page, { storyId, environment });
  } catch (error) {
    // A paused browser clock must not freeze the timeout or leave the animation
    // inventory patched. A wedged renderer cannot block runner-side cleanup.
    selections.delete(page);
    let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([
      page
        .evaluate((token) => {
          const pending = (window as NavigationScope).parityNavigation;
          if (pending?.token === token) pending.cancel();
        }, token)
        .catch(() => {}),
      new Promise<void>((resolve) => {
        cleanupTimer = setTimeout(resolve, 500);
      }),
    ]);
    clearTimeout(cleanupTimer);
    throw error;
  }
}
