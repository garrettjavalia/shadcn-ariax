import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { animationStyles } from './animations.stylex';

const styles = stylex.create({
  base: {
    backgroundColor: 'var(--muted)',
    borderRadius: 'calc(var(--radius) * 0.8)',
    animationDuration: '2s',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    animationIterationCount: 'infinite',
  },
});

export type SkeletonProps = Omit<ComponentProps<'div'>, 'className'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
};

export function Skeleton({ xstyle, className: _className, style: userStyle, ...props }: SkeletonProps) {
  const { className, style } = stylex.props(animationStyles.pulse, styles.base, xstyle);
  return <div data-slot="skeleton" className={className} style={{ ...style, ...userStyle }} {...props} />;
}
