export function avatarCustom(key:'grayscale'|'bg-green-600 dark:bg-green-800'|'rounded-full'|'w-32'){return {className:key};}
export function avatarLayout(key:'layout'|'sizes'|'states'){return {className:key==='layout'?'flex flex-row flex-wrap items-center gap-6 md:gap-12':key==='sizes'?'flex flex-wrap items-center gap-2 grayscale':'flex flex-wrap items-center gap-2'};}
export function avatarDynamic(size:number){return {className:size===32?'size-8':'size-12'};}
export function avatarFallbackCustom(){return {className:'bg-primary text-primary-foreground'};}

export const avatarRegistryEmpty={className:'w-full flex-none border'};
