export const messageScrollerCustom = {
  root: () => ({
    className: 'h-60 w-80'
  }),
  content: () => ({
    className: 'gap-3 p-4'
  }),
  item: () => ({
    className: 'h-40 p-2 border border-border'
  }),
  custom: (width: number) => ({
    style: {
      width
    }
  })
};
export function messageScrollerDynamic(width: number, style: React.CSSProperties = {}) {
  return {
    className: 'h-60 w-[var(--message-scroller-width)]',
    style: {
      '--message-scroller-width': `${width}px`,
      ...style
    } as React.CSSProperties
  };
}
