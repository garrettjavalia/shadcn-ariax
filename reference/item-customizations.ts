const classes = ['max-w-sm', 'grayscale', 'gap-1', 'rounded-full', 'w-48', 'w-full p-2', 'size-(--avatar-size) [--avatar-size:--spacing(6.5)]', 'gap-0', 'leading-none', 'grid grid-cols-3 gap-4', 'size-10', 'hidden sm:flex', 'gap-4', 'line-clamp-1', 'flex-none text-center'] as const;
export const itemCustom = (key: typeof classes[number]) => ({ className: key });
export const itemDynamic = (width: number) => ({ style: { width } });
