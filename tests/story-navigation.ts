import type {Page} from '@playwright/test';

// The official test-runner uses this channel contract. Do not add its user-agent:
// Storybook would then disable animations before declaring the story finished.
type PreviewChannel = {
  on(event:string, listener:(payload:unknown)=>void):void;
  off(event:string, listener:(payload:unknown)=>void):void;
  emit(event:string, payload:unknown):void;
};
const selections = new WeakMap<Page,string>();
export async function navigateStory(page:Page, url:string, reusePreview=false) {
  const storyId = new URL(url).searchParams.get('id');
  if (!storyId) throw new Error('Missing story ID');
  if (!reusePreview || !selections.has(page)) {
    await page.goto(url);
  } else {
    if (selections.get(page) === storyId) throw new Error('Preview reuse requires distinct story IDs');
    await page.evaluate(async storyId => {
      const channel=(window as Window & {__STORYBOOK_ADDONS_CHANNEL__?:PreviewChannel}).__STORYBOOK_ADDONS_CHANNEL__;
      if (!channel) throw new Error('Missing Storybook preview channel');
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      await new Promise<void>((resolve,reject)=>{
        const cleanup=()=>{clearTimeout(timeout);for(const[event,listener]of Object.entries(listeners))channel.off(event,listener);};
        const fail=(payload:unknown)=>{cleanup();reject(new Error(JSON.stringify(payload)));};
        const listeners:Record<string,(payload:unknown)=>void>={
          storyFinished:payload=>{const result=payload as {storyId?:string;status?:string};if(result.storyId!==storyId)return;cleanup();result.status==='success'?resolve():reject(new Error(`Story ${storyId} failed`));},
          storyErrored:fail,storyThrewException:fail,playFunctionThrewException:fail,unhandledErrorsWhilePlaying:fail,
          storyMissing:payload=>{if(payload===storyId)fail(payload);},
        };
        const timeout=setTimeout(()=>{cleanup();reject(new Error(`Story ${storyId} did not finish`));},30_000);
        for(const[event,listener]of Object.entries(listeners))channel.on(event,listener);
        channel.emit('setCurrentStory',{storyId,viewMode:'story'});
      });
    },storyId);
  }
  selections.set(page,storyId);
}
