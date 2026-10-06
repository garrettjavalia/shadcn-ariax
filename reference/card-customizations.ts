export const fullWidthButton={className:'w-full'};
export const customCard={className:'w-[280px] rounded-none [--card-spacing:1.5rem]'};
export const customPart={className:'p-3 text-primary'};
export const dynamicCard=(value:number)=>({style:{minWidth:value,width:280}});
const spacingExampleClasses=['mx-auto grid w-full max-w-sm gap-4','justify-center','flex flex-col gap-6','grid gap-2','flex items-center','ml-auto inline-block text-sm underline-offset-4 hover:underline','flex-col gap-2','w-full'] as const;
export function cardSpacingExampleStyle(key:typeof spacingExampleClasses[number]){return {className:key};}
export const cardSpacingNativeStyle=cardSpacingExampleStyle;
