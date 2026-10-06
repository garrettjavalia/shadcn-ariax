// Original side uses real Tailwind utilities, never a shared CSS imitation.
export const rounded = { className: 'rounded-full' };
export const customized = { className: 'h-11 min-w-40 rounded-xl px-5 hover:opacity-80' };
export const dynamic = (width: number) => ({ style: { width } });
export const separatorMenu = { className: 'hidden md:block' };
export const separatorCustom = { className: '[:is(hr)]:h-1 [:is(hr)]:w-[180px] bg-primary' };

export const inlineSizing = { className: 'w-40' };
export const inlineSkeletonSizing = { xstyle: 'w-40' };
