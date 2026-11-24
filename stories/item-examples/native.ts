import type { CSSProperties } from 'react';
const column = { display: 'flex', width: '100%', flexDirection: 'column', gap: 'calc(var(--ariax-spacing, .25rem) * 6)' } satisfies CSSProperties;
const styles: Record<string, CSSProperties> = {
 'flex w-full max-w-md flex-col gap-6': { ...column, maxWidth: '28rem' },
 'flex w-full max-w-md flex-col gap-4': { ...column, maxWidth: '28rem', gap: 'calc(var(--ariax-spacing, .25rem) * 4)' },
 'flex w-full max-w-lg flex-col gap-6': { ...column, maxWidth: '32rem' },
 'flex w-full max-w-xl flex-col gap-6': { ...column, maxWidth: '36rem' },
 'size-5': { width: 'calc(var(--ariax-spacing, .25rem) * 5)', height: 'calc(var(--ariax-spacing, .25rem) * 5)' }, 'size-4': { width: 'calc(var(--ariax-spacing, .25rem) * 4)', height: 'calc(var(--ariax-spacing, .25rem) * 4)' },
 'aspect-square w-full rounded-sm object-cover': { aspectRatio: '1 / 1', width: '100%', borderRadius: 'calc(var(--radius) * .6)', objectFit: 'cover' },
 'object-cover grayscale': { objectFit: 'cover', filter: 'grayscale(100%)' },
 'text-muted-foreground': { color: 'var(--muted-foreground)' },
 'text-sm font-medium': { fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', fontWeight: 500 },
 'text-sm text-muted-foreground': { fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', color: 'var(--muted-foreground)' },
};
export function nativeItem(key: string) { if (!styles[key]) throw new Error(`Unknown native Item example style: ${key}`); return { style: styles[key], className: key.startsWith('size-') ? 'size-explicit' : undefined }; }
