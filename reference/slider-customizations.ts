export const sliderBounded = {
  className: 'mx-auto w-full max-w-xs'
};
export const controlledRoot = {
  className: 'mx-auto grid w-full max-w-xs gap-3'
};
export const controlledHeader = {
  className: 'flex items-center justify-between gap-2'
};
export const controlledValue = {
  className: 'text-sm text-muted-foreground'
};
export const verticalRoot = {
  className: 'mx-auto flex w-full max-w-xs items-center justify-center gap-6'
};
export const verticalSlider = {
  className: 'h-40'
};
export const sliderCustom = (width: number) => ({
  className: width === 240 ? 'w-[240px]' : 'w-[300px]'
});
