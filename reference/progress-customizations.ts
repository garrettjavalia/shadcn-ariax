export const progressCustom = (key: string) => ({
  className: ({
    demo: 'w-[60%]',
    bounded: 'w-full max-w-sm',
    full: 'w-full',
    width32: 'w-32',
    px0: 'px-0',
    truncate: 'inline-block truncate',
    inline: 'inline',
    actions: 'w-16 justify-end',
    custom: 'w-[240px]',
    nativeIndicator: 'w-[90px]!',
    indicator: 'w-[80px]!'
  } as Record<string, string>)[key]
});
export const progressNative = (key: string) => ({
  className: ({
    column: 'flex w-full flex-col gap-4',
    boundedColumn: 'flex w-full max-w-sm flex-col gap-4',
    auto: 'ms-auto',
    muted: 'text-sm text-muted-foreground'
  } as Record<string, string>)[key]
});
