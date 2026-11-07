export const toggleRow = {
  className: 'flex flex-wrap items-center gap-2'
};
export const bookmarkIcon = {
  className: 'group-aria-pressed/toggle:fill-foreground'
};
export const customToggle = (width: number) => ({
  className: `[width:${width}px]`
});

import {toggleVariants} from '@toggle';
export const helperToggle = {className:toggleVariants({variant:'outline',size:'default'})};
