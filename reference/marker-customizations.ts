import {markerVariants} from '../generated/reference/aria-nova/ui/marker';
export const markerShimmer={className:'shimmer'};
export const markerColumn={className:'flex-col'};
export const markerCenter={className:'justify-center'};
export const markerFlex={className:'flex-1'};
export const markerHover={className:'transition-colors hover:text-foreground'};
export const markerCustom=(gap:number)=>({className:'gap-[var(--marker-gap)] text-primary p-2'});
export const markerCustomIcon={className:'size-5 [&_svg:not([class*=size-])]:size-5'};
export const markerHelper={className:markerVariants({variant:'border'})};

export const markerDrawerClasses={grid:{className:'grid gap-3 px-4 text-sm'},row:{className:'flex items-center justify-between gap-4 rounded-md border px-3 py-2'},truncate:{className:'truncate'},muted:{className:'text-muted-foreground'}};
