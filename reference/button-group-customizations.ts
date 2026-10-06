export const voice={className:'data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100'};
export const responsiveGroup={className:'hidden sm:flex'};
const widths:Record<number,string>={10:'w-[10px]',70:'w-[70px]',180:'w-[180px]',260:'w-[260px]',280:'w-[280px]',320:'w-[320px]'};
export const dynamic=(width:number)=>({className:widths[width]});

import {buttonProps} from './button';
export const menu160={className:'w-40'},menu176={className:'w-44'},menu200={className:'w-50'};
export const triggerPadding={className:'ps-2!'},mono={className:'font-mono'},muted={className:'text-muted-foreground'},mutedText=muted;
export const popoverCustom={className:'rounded-xl text-sm'},hiddenLabel={className:'sr-only'},noResize={className:'resize-none'},rtlIcon={className:'rtl:rotate-180'};
export const column4={className:'flex flex-col gap-4'},lumaBorder={className:'style-luma:border-border'},fieldsGrid={className:'grid grid-cols-3 gap-4'},fieldSpan={className:'col-span-2'},row6={className:'flex gap-6'},fitHeight={className:'h-fit'};
export const likeCount=buttonProps({variant:'outline',size:'icon',className:'w-12'});
export const sizeColumn={className:'flex flex-col items-start gap-8'},pill={className:'[--radius:9999rem]'};
