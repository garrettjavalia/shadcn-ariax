export const groupStack = {
  className: 'flex flex-col gap-4'
};
export const weightItem = {
  className: 'flex size-16 flex-col items-center justify-center rounded-xl'
};
export const weightLight = {
  className: 'text-2xl leading-none font-light'
};
export const weightNormal = {
  className: 'text-2xl leading-none font-normal'
};
export const weightMedium = {
  className: 'text-2xl leading-none font-medium'
};
export const weightBold = {
  className: 'text-2xl leading-none font-bold'
};
export const weightLabel = {
  className: 'text-xs text-muted-foreground'
};
export const weightCode = {
  className: 'rounded-md bg-muted px-1 py-0.5 font-mono'
};
export const groupCustom = (width: number) => ({
  className: width === 240 ? 'w-[240px]' : 'w-[300px]'
});
import { toggleVariants } from '@toggle';
import {cn} from 'cn';
export const helperToggle = {
  className: cn(toggleVariants({
    variant: 'outline',
    size: 'sm'
  }))
};
