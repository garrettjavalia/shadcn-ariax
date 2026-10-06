import { tabsListVariants } from '@tabs';
export const width = {
  className: 'w-[400px]'
};
export const content = {
  className: 'text-sm text-muted-foreground'
};
export const rtlWidth = {
  className: 'w-full max-w-sm'
};
export const rootOverride = (_width: number) => ({
  className: 'w-[200px] text-xl leading-[1.2]'
});
export const triggerOverride = {
  className: '[&&]:px-2.5 text-xl leading-[1.1]'
};
export const listHelper = {
  className: tabsListVariants({
    variant: 'line'
  }),
  style: {
    width: 320
  }
};
