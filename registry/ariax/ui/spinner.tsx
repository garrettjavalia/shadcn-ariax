import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Loader2Icon } from 'lucide-react';
import { animationStyles } from './animations.stylex';
export type SpinnerProps = Omit<ComponentProps<'svg'>, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
const styles = stylex.create({ root: { width: '1rem', height: '1rem', animationDuration: '1s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' } });
export function Spinner({ className: _, xstyle, style, ...props }: SpinnerProps) {
  const sx = stylex.props(animationStyles.spin, styles.root, xstyle);
  return <Loader2Icon data-slot="spinner" role="status" aria-label="Loading" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
