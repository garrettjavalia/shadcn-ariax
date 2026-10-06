import {test,expect} from '@playwright/test';
import {waitForStoryReadiness} from './story-readiness';

test('stories without a readiness signal need no additional work',async({page})=>{
  await page.setContent('<main>Ready</main>');
  await waitForStoryReadiness(page);
  await expect(page.locator('main')).toHaveText('Ready');
});

test('initial readiness waits for the actual asynchronous result',async({page})=>{
  await page.setContent('<main>Pending</main>');
  await page.evaluate(()=>{
    (window as Window & {parityReady?:Promise<void>}).parityReady=new Promise(resolve=>{
      setTimeout(()=>{document.querySelector('main')!.textContent='Completed';resolve();},50);
    });
  });
  await waitForStoryReadiness(page);
  expect(await page.locator('main').textContent()).toBe('Completed');
});

test('initial readiness failures propagate to the parity test',async({page})=>{
  await page.evaluate(()=>{
    (window as Window & {parityReady?:Promise<void>}).parityReady=new Promise((_,reject)=>{
      setTimeout(()=>reject(new Error('Fixture initialization failed')),50);
    });
  });
  await expect(waitForStoryReadiness(page)).rejects.toThrow('Fixture initialization failed');
});
