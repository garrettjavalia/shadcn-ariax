import { Skeleton as Original } from '../generated/reference/aria-nova/ui/skeleton';
import type { ComponentProps } from 'react';
export function Skeleton({ xstyle, ...props }: Omit<ComponentProps<typeof Original>, 'className'> & {xstyle?: string | (string | false | undefined)[]}) {
  return <Original {...props} className={Array.isArray(xstyle) ? xstyle.filter(Boolean).join(' ') : xstyle} />;
}
