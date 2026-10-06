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
