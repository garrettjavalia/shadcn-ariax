const sizes: Record<number, string> = { 12: 'size-3', 16: 'size-4', 24: 'size-6', 32: 'size-8' };
export const spinnerSize = (size: number) => ({ className: sizes[size], style: undefined as import('react').CSSProperties | undefined });
export const spinnerAside = { className: 'flex-none justify-end' };
export const spinnerEnd = { className: 'ml-auto' };
export const spinnerMinimum = { className: 'min-h-[300px]' };
export const spinnerMuted = { className: 'text-muted-foreground' };
export function customSpinnerProps() { return { className: 'size-4 animate-spin' }; }
