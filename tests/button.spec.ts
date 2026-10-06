import { upstreamPort, stylexPort } from './servers';
import { test, expect, type Browser, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { compare } from './compare';

async function pair(browser: Browser, story: string, theme: string, width = 1000) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  const pages = await Promise.all([upstreamPort, stylexPort].map(async port => {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}/iframe.html?id=components-button--${story}&viewMode=story&globals=theme:${theme}`);
    await expect(page.locator('#parity-root')).toBeVisible();
    await page.mouse.move(0, 0);
    return page;
  }));
  return { context, a: pages[0], b: pages[1] };
}

for (const theme of ['light', 'dark']) for (const variant of ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link']) {
  test(`interaction / ${variant} / ${theme}`, async ({ browser }, info) => {
    const { context, a, b } = await pair(browser, `interaction-${variant}`, theme);
    const each = (action: (p: Page) => Promise<unknown>) => Promise.all([a, b].map(action));
    try {
      await each(p => expect(p.getByRole('button')).toHaveAttribute('data-variant', variant));
      // Resting appearance is covered once by the shared story suite.
      await each(p => p.getByRole('button').hover());
      await compare(a, b, info, 'hover');
      await each(p => p.mouse.down());
      await compare(a, b, info, 'pointer-held');
      await each(p => p.mouse.up());
      await each(p => expect(p.locator('output')).toHaveText('Pressed: 1'));
      await each(p => p.mouse.move(0, 0));
      await each(p => p.getByRole('button').focus());
      await each(p => p.keyboard.press('Shift+Tab'));
      await each(p => p.keyboard.press('Tab'));
      await each(p => expect(p.getByRole('button')).toBeFocused());
      await compare(a, b, info, 'keyboard-focus');
      await each(p => p.keyboard.down('Space'));
      await compare(a, b, info, 'space-held');
      await each(p => p.keyboard.up('Space'));
      await each(p => p.keyboard.press('Enter'));
      await each(p => expect(p.locator('output')).toHaveText('Pressed: 3'));
      await compare(a, b, info, 'activated');
    } finally { await context.close(); }
  });
}

test('disabled and pending suppress activation; accessible button names', async ({ browser }) => {
  for (const story of ['disabled', 'pending']) {
    const { context, a, b } = await pair(browser, story, 'light');
    try {
      for (const p of [a, b]) {
        const button = p.getByRole('button');
        await button.click({ force: true });
        await p.keyboard.press('Tab'); await p.keyboard.press('Enter');
        await expect(p.locator('output')).toHaveText('Pressed: 0');
      }
      const results = await new AxeBuilder({ page: b }).include('#parity-root').analyze();
      expect(results.violations).toEqual([]);
    } finally { await context.close(); }
  }
});

// Overrides have no theme branch; dark resting appearance is covered generically.
test('StyleX customization', async ({ browser }, info) => {
  const { context, a, b } = await pair(browser, 'customized', 'light');
  try {
    for (const p of [a, b]) {
      for (const item of [p.getByRole('button'), p.getByRole('link')]) {
        await expect(item).toHaveCSS('height', '44px');
        await expect(item).toHaveCSS('min-width', '160px');
        await expect(item).toHaveCSS('padding-left', '20px');
        await expect(item).toHaveCSS('padding-right', '20px');
      }
    }
    for (const p of [a, b]) await p.getByRole('button').hover();
    await compare(a, b, info, 'customized-hover');
    for (const p of [a, b]) await expect(p.getByRole('button')).toHaveCSS('opacity', '0.8');
  } finally { await context.close(); }
});

test('dynamic StyleX props survive composition and React updates', async ({ browser }, info) => {
  const { context, a, b } = await pair(browser, 'dynamic', 'light');
  try {
    for (const p of [a, b]) await expect(p.getByRole('button')).toHaveCSS('width', '180px');
    for (const p of [a, b]) await p.getByRole('button').click();
    for (const p of [a, b]) await expect(p.getByRole('button')).toHaveCSS('width', '220px');
    await compare(a, b, info, 'dynamic-updated');
  } finally { await context.close(); }
});

for (const theme of ['light', 'dark']) test(`group menu / ${theme}`, async ({ browser }, info) => {
  const { context, a, b } = await pair(browser, 'group', theme);
  try {
    for (const p of [a, b]) await p.getByRole('button', { name: 'More Options' }).click();
    await compare(a, b, info, 'menu-open');
    for (const p of [a, b]) {
      await expect(p.getByRole('button', { name: 'More Options' })).toHaveAttribute('aria-expanded', 'true');
      await p.getByRole('menuitem', { name: 'Label As...' }).hover();
      await expect(p.getByRole('menuitemradio', { name: 'Work', exact: true })).toBeVisible();
    }
    await compare(a, b, info, 'submenu-open');
    for (const p of [a, b]) await p.getByRole('menuitemradio', { name: 'Work', exact: true }).click();
    await compare(a, b, info, 'menu-selected');
    for (const p of [a, b]) {
      await p.getByRole('button', { name: 'More Options' }).click();
      await p.keyboard.press('Escape');
      await expect(p.getByRole('button', { name: 'More Options' })).toBeFocused();
    }
    await compare(a, b, info, 'escape-focus-restored');
  } finally { await context.close(); }
});

test('native style preserves dynamic StyleX values, overrides and RAC state callbacks', async ({ browser }, info) => {
  const { context, a, b } = await pair(browser, 'inline-style', 'light');
  try {
    for (const p of [a, b]) {
      for (const label of ['Inline button', 'Inline link', 'State button', 'Inline helper']) {
        await expect(p.getByRole(label.includes('link') || label.includes('helper') ? 'link' : 'button', { name: label, exact: true })).toHaveCSS('width', '160px');
      }
      await expect(p.getByTestId('inline-skeleton')).toHaveCSS('width', '160px');
      await expect(p.getByTestId('inline-separator')).toHaveCSS('width', '140px');
      await p.getByRole('button', { name: 'Inline button', exact: true }).click();
      await expect(p.getByTestId('inline-skeleton')).toHaveCSS('height', '52px');
      await expect(p.getByRole('link', { name: 'Inline helper' })).toHaveCSS('height', '52px');
      await p.getByRole('link', { name: 'Inline link' }).hover();
      await expect(p.getByRole('link', { name: 'Inline link' })).toHaveCSS('opacity', '0.6');
    }
    await compare(a, b, info, 'inline-style-updated');
    for (const p of [a, b]) {
      await p.getByRole('button', { name: 'State button' }).hover();
      await p.mouse.down();
      await expect(p.getByRole('button', { name: 'State button' })).toHaveCSS('opacity', '0.4');
    }
    await compare(a, b, info, 'inline-style-pressed');
    for (const p of [a, b]) await p.mouse.up();
  } finally { await context.close(); }
});

test('Button typography preserves unitless scaling and native style priority',async({browser},info)=>{
 const first=await pair(browser,'font-size-override','light');
 try{for(const p of [first.a,first.b])for(const [size,lineHeight] of [['default','28.5714px'],['xs','26.6667px'],['sm','30px'],['lg','28.5714px']])for(const api of ['button','link','helper']){await expect(p.getByTestId(`font-${size}-${api}`)).toHaveCSS('font-size','20px');await expect(p.getByTestId(`font-${size}-${api}`)).toHaveCSS('line-height',lineHeight);}await compare(first.a,first.b,info,'font-size-unitless');}finally{await first.context.close();}
 const second=await pair(browser,'typography-override','light');
 try{for(const p of [second.a,second.b]){await expect(p.getByRole('button',{name:'Typography button'})).toHaveCSS('line-height','25px');await expect(p.getByRole('link',{name:'Typography helper'})).toHaveCSS('line-height','25px');await expect(p.getByRole('link',{name:'Typography link'})).toHaveCSS('line-height','30px');await p.getByRole('link',{name:'Typography link'}).hover();await expect(p.getByRole('link',{name:'Typography link'})).toHaveCSS('line-height','25px');}await compare(second.a,second.b,info,'typography-callback-override');}finally{await second.context.close();}
});
