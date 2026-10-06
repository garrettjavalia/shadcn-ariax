export const demoRoot = {
  className: 'flex w-[350px] flex-col gap-2'
};
export const demoHeader = {
  className: 'flex items-center justify-between gap-4 px-4'
};
export const demoTitle = {
  className: 'text-sm font-semibold'
};
export const toggleSize = {
  className: 'size-8'
};
export const hidden = {
  className: 'sr-only'
};
export const statusRow = {
  className: 'flex items-center justify-between rounded-md border px-4 py-2 text-sm'
};
export const muted = {
  className: 'text-muted-foreground'
};
export const medium = {
  className: 'font-medium'
};
export const panelStack = {
  className: 'flex flex-col gap-2'
};
export const detailBox = {
  className: 'rounded-md border px-4 py-2 text-sm'
};
export const cardWidth = {
  className: 'mx-auto w-full max-w-sm'
};
export const basicRoot = {
  className: 'rounded-md data-open:bg-muted'
};
export const fullWidth = {
  className: 'w-full'
};
export const basicChevron = {
  className: 'ml-auto group-data-panel-open/button:rotate-180'
};
export const basicPanel = {
  className: 'flex flex-col items-start gap-2 p-2.5 pt-0 text-sm'
};
export const settingsWidth = {
  className: 'mx-auto w-full max-w-xs'
};
export const settingsRoot = {
  className: 'flex items-start gap-2'
};
export const settingsGrid = {
  className: 'grid w-full grid-cols-2 gap-2'
};
export const settingsPanel = {
  className: 'col-span-full grid grid-cols-subgrid gap-2'
};
export const folderButton = {
  className: 'group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground'
};
export const folderChevron = {
  className: 'transition-transform group-data-[state=open]:rotate-90'
};
export const nestedFolder = {
  className: 'mt-1 ml-5 flex flex-col gap-1 style-lyra:ml-4'
};
export const fileButton = {
  className: 'w-full justify-start gap-2 text-foreground'
};
export const treeWidth = {
  className: 'mx-auto w-full max-w-[16rem] gap-2'
};
export const treeStack = {
  className: 'flex flex-col gap-1'
};
export const fieldHidden = {
  className: 'sr-only'
};
export const dynamicRoot = (_width: number) => ({
  className: 'w-[200px] text-xl leading-[1.2]'
});
