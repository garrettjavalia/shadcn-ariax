import type { CSSProperties } from 'react';
export const frame = { className: 'w-full max-w-sm rounded-lg bg-muted' };
export const square = { className: 'w-full max-w-[12rem] rounded-lg bg-muted' };
export const portrait = { className: 'w-full max-w-[10rem] rounded-lg bg-muted' };
export const bare = { className: 'rounded-lg bg-muted' };
// Upstream replaces its inline --ratio when style is supplied; explicitly retain it
// to compare the public style API with StyleX's preserved dynamic variables.
export const customized = (ratio: number, width: number) => ({ style: { '--ratio': ratio, width, maxWidth: 240 } as CSSProperties });
