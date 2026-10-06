import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { stylexURL } from './servers';
test('Label documentation examples map to stories or the Field integration', async ({request}) => {
 const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/label.mdx','utf8');
 const examples=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
 expect(examples.sort()).toEqual(['field-demo','label-demo','label-rtl']);
 const index=await(await request.get(`${stylexURL}/index.json`)).json();
 for(const name of ['demo','rtl','usage']) expect(index.entries[`components-label--${name}`]?.tags).toContain('parity');
});
test('Label click focuses control, toggles checkbox, and preserves context rules',async({page})=>{
 await page.goto(`${stylexURL}/iframe.html?id=components-label--demo&viewMode=story`);
 await page.getByText('Accept terms and conditions').click();
 await expect(page.getByRole('checkbox')).toBeChecked();
 await page.goto(`${stylexURL}/iframe.html?id=components-label--context&viewMode=story`);
 await expect(page.getByText('Explicit clears context')).not.toHaveAttribute('id');
 await expect(page.getByText('Slot retains context')).toHaveAttribute('id','context-label');
 await page.getByText('Context field').click();
 await expect(page.getByRole('textbox',{name:'Context field'})).toBeFocused();
});
