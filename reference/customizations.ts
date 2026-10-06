// Original side uses real Tailwind utilities, never a shared CSS imitation.
export const rounded = { className: 'rounded-full' };
export const customized = { className: 'h-11 min-w-40 rounded-xl px-5 hover:opacity-80' };
export const dynamic = (width: number) => ({ style: { width } });
export const separatorMenu = { className: 'hidden md:block' };
export const separatorCustom = { className: '[:is(hr)]:h-1 [:is(hr)]:w-[180px] bg-primary' };
export const labelCustomized = { className: 'text-2xl leading-none opacity-80', style: { width: 240, opacity: 0.6 } };
export const checkboxCustomized = (width:number) => ({className:'h-6 opacity-80',style:{width}});

export const fieldCustomized = {className:'gap-5 p-3 w-[280px]',style:{gap:'1.5rem'}};
export const fieldLabelCustomized = {className:'text-primary text-xl',style:{opacity:0.75}};

export const inlineSizing = { className: 'w-40' };
export const inlineSkeletonSizing = { xstyle: 'w-40' };

export const typographySizing={className:"text-[18px] leading-[2]"};

export const nativeSelectCustomized=(width:number)=>({className:width===220?'w-[220px] opacity-80':'w-[280px] opacity-80',style:{opacity:0.6}});
export const nativeSelectOptionCustomized={className:'text-primary font-medium',style:{color:'blue'}};
export const nativeSelectGroupCustomized={className:'font-semibold',style:{fontWeight:400}};

export const radioFit={className:'w-fit'}; export const radioMax={className:'max-w-sm'};export const radioFieldset={className:'w-full max-w-xs'};export const radioNormal={className:'font-normal'};
export const radioCustom=(width:number)=>({style:({isDisabled}:{isDisabled:boolean})=>({width,padding:isDisabled?0:8}),className:'gap-4'});
export const radioItemCustom={className:'size-6',style:({isSelected}:{isSelected:boolean})=>({width:isSelected?28:24,opacity:0.8})};
