import { test, expect } from '@playwright/test';
import { controlAvatarAssets, waitAvatarAssets } from './avatar-assets';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
for (const theme of ['light', 'dark']) for (const width of [1000, 390]) test(`Avatar official Empty composition / ${theme} / ${width}`, async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width,
      height: 900
    }
  });
  await controlAvatarAssets(context);
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-avatar--registry-empty&globals=theme:${theme}`);
      await expect(page.getByText('No Team Members', {
        exact: true
      })).toBeVisible();
      await waitAvatarAssets(page);
      await expect(page.locator('[data-slot="avatar-group"] [data-slot="avatar"]')).toHaveCount(3);
      await expect(page.locator('[data-slot="avatar-group-count"]')).toHaveCount(1);
      return page;
    }));
    await compare(pages[0], pages[1], info, 'actual-empty');
    for (const page of pages) await page.getByRole('button', {
      name: 'Invite Members'
    }).hover();
    await compare(pages[0], pages[1], info, 'invite-hover');
    for (const page of pages) {
      await page.mouse.move(0, 0);
      await page.getByRole('button', {
        name: 'Invite Members'
      }).focus();
    }
    await compare(pages[0], pages[1], info, 'invite-focus');
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Invite Members'
      }).press('Enter');
      await expect(page.getByRole('button', {
        name: 'Invite Members'
      })).toBeFocused();
    }
    await compare(pages[0], pages[1], info, 'invite-keyboard');
  } finally {
    await context.close();
  }
});
