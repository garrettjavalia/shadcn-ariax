import type {CSSProperties} from 'react';
export function dropdownCustom(key:'w-32'|'w-36'|'w-40'|'w-44'|'w-48'|'min-w-56'|'size-8'|'text-right'|'font-medium'){return {className:key};}
export function dropdownDynamic(width:number){return {className:width===160?'w-40':'w-[220px]',style:undefined as CSSProperties|undefined};}
export function dropdownSr(){return {className:'sr-only'};}
export function dropdownExampleStyle(key:string){return {className:key};}
export const dropdownNativeExampleStyle=dropdownExampleStyle;
