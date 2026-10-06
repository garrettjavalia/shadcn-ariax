import type {CSSProperties} from 'react';
export function dropdownCustom(key:'w-32'|'w-36'|'w-40'|'w-44'|'w-48'|'min-w-56'|'size-8'|'text-right'|'font-medium'){return {className:key};}
export function dropdownDynamic(width:number){return {className:width===160?'w-40':'w-[220px]',style:undefined as CSSProperties|undefined};}
export function dropdownSr(){return {className:'sr-only'};}
export function dropdownExampleStyle(key:typeof exampleClasses[number]){return {className:key};}
export const dropdownNativeExampleStyle=dropdownExampleStyle;

const exampleClasses=["w-fit","flex flex-wrap justify-center gap-2","w-fit capitalize","min-w-40","min-w-56","flex items-center justify-between gap-4","h-12 justify-start px-2 md:max-w-[200px] style-sera:font-normal style-sera:tracking-normal style-sera:normal-case","rounded-lg","grid flex-1 text-left text-sm leading-tight","truncate font-semibold","truncate text-xs text-muted-foreground","ml-auto text-muted-foreground","w-(--anchor-width) min-w-56","rounded-full","w-44","w-56"] as const;
