import { readFile } from "node:fs/promises";
import type { BrowserContext } from "@playwright/test";
const image = await readFile("public/avatar-controlled.svg");
export async function controlAvatarAssets(
  context: BrowserContext,
  delayed?: Promise<void>,
) {
  await context.route("https://github.com/*.png", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: image }),
  );
  await context.route("**/avatar-controlled.svg", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: image }),
  );
  await context.route("**/avatar-failure.svg", (route) =>
    route.fulfill({ status: 404, body: "Missing image" }),
  );
  await context.route("**/avatar-delayed.svg", async (route) => {
    if (delayed) await delayed;
    await route.fulfill({ contentType: "image/svg+xml", body: image });
  });
}
export async function waitAvatarAssets(
  page: import("@playwright/test").Page,
  pendingSource?: string,
) {
  await page.waitForFunction(
    (pending) =>
      [
        ...document.querySelectorAll<HTMLImageElement>(
          '[data-slot="avatar-image"]',
        ),
      ]
        .filter((image) => image.getAttribute("src") !== pending)
        .every((image) => image.complete),
    pendingSource,
  );
  await page.evaluate(async (pending) => {
    await Promise.all(
      [
        ...document.querySelectorAll<HTMLImageElement>(
          '[data-slot="avatar-image"]',
        ),
      ]
        .filter((image) => image.getAttribute("src") !== pending)
        .map((image) => image.decode().catch(() => {})),
    );
  }, pendingSource);
}
