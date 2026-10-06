const classes = { row: 'flex-row justify-center gap-2', muted: 'text-muted-foreground', outline: 'border border-dashed', background: 'h-full bg-muted/30', pretty: 'max-w-xs text-pretty', avatar: 'size-12', groupAvatar: 'size-12 ring-2 ring-background grayscale', input: 'sm:w-3/4', inputAlways: 'w-3/4', mutedBackground: 'bg-muted', mutedAlt: 'bg-muted/50' };
export const emptyCustom = (key: keyof typeof classes) => ({ className: classes[key] });
export const emptyDynamic = (width: number) => ({ style: { width } });
