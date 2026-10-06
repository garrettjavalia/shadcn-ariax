import {test,expect} from '@playwright/test';
import {navigateStory} from './story-navigation';
import {snapshot,differences,settle} from './compare';
import {stylexURL} from './servers';
import {controlAvatarAssets,waitAvatarAssets} from './avatar-assets';
import {waitForStoryReadiness} from './story-readiness';

test('preview transitions remount state and preserve fresh-page DOM/CSS',async({browser})=>{
  const context=await browser.newContext();
  await controlAvatarAssets(context);
  const reused=await context.newPage();
  await reused.clock.setFixedTime(new Date('2026-02-12T12:00:00Z'));
  try {
    for(const id of ['components-checkbox--usage','components-checkbox--controlled','components-checkbox--context']) {
      const url=`${stylexURL}/iframe.html?id=${id}&viewMode=story&globals=theme:light`;
      const fresh=await context.newPage();
      await test.step(`${id} navigation`,()=>Promise.all([navigateStory(reused,url,true),navigateStory(fresh,url)]));
      await Promise.all([reused,fresh].map(async page=>{
        await expect(page.locator('#parity-root')).toBeVisible();
        await test.step(`${id} readiness`,async()=>{await waitAvatarAssets(page);await waitForStoryReadiness(page);});
        await page.mouse.move(0,0);await test.step(`${id} settle`,()=>settle(page));
      }));
      expect(differences(await snapshot(reused,'dom-css'),await snapshot(fresh,'dom-css'))).toEqual([]);
      // Leave controlled component state and focus behind for the next transition.
      const checkbox=reused.getByRole('checkbox').first();
      if(await checkbox.isEnabled())await reused.locator('[data-slot=checkbox]').first().click();
      await fresh.close();
    }
  }finally{await context.close().catch(()=>{});}
});
