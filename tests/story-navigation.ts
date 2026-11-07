import type { Page } from "@playwright/test";

// The official test-runner uses this channel contract. Do not add its user-agent:
// Storybook would then disable animations before declaring the story finished.
type PreviewChannel = {
  on(event: string, listener: (payload: unknown) => void): void;
  off(event: string, listener: (payload: unknown) => void): void;
  emit(event: string, payload: unknown): void;
};
const selections = new WeakMap<Page, string>();
export async function navigateStory(
  page: Page,
  url: string,
  reusePreview = false,
) {
  const storyId = new URL(url).searchParams.get("id");
  if (!storyId) throw new Error("Missing story ID");
  if (!reusePreview || !selections.has(page)) {
    await page.goto(url);
  } else {
    if (selections.get(page) === storyId)
      throw new Error("Preview reuse requires distinct story IDs");
    await page.evaluate(async (storyId) => {
      const channel = (
        window as Window & { __STORYBOOK_ADDONS_CHANNEL__?: PreviewChannel }
      ).__STORYBOOK_ADDONS_CHANNEL__;
      if (!channel) throw new Error("Missing Storybook preview channel");
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      await new Promise<void>((resolve, reject) => {
        // Storybook 10.6 waits on scroll-driven Animation.finished until its
        // five-second timeout. Only its completing phase needs a time-based
        // inventory. Keep effects untouched and restore the native inventory
        // before afterEach, storyFinished and the strict comparator.
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
          clearTimeout(timeout);
          for (const [event, listener] of Object.entries(listeners))
            channel.off(event, listener);
        };
        const fail = (payload: unknown) => {
          cleanup();
          reject(new Error(JSON.stringify(payload)));
        };
        const listeners: Record<string, (payload: unknown) => void> = {
          storyRenderPhaseChanged: (payload) => {
            const phase = payload as { storyId?: string; newPhase?: string };
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
            const result = payload as { storyId?: string; status?: string };
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
        const timeout = setTimeout(() => {
          cleanup();
          reject(new Error(`Story ${storyId} did not finish`));
        }, 30_000);
        for (const [event, listener] of Object.entries(listeners))
          channel.on(event, listener);
        channel.emit("setCurrentStory", { storyId, viewMode: "story" });
      });
    }, storyId);
  }
  selections.set(page, storyId);
}
