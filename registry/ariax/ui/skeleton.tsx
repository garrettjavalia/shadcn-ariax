import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    backgroundColor: 'var(--muted)',
    borderRadius: 'calc(var(--radius) * 0.8)',
    animationName: 'pulse',
    animationDuration: '2s',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    animationIterationCount: 'infinite',
  },
});

export type SkeletonProps = Omit<ComponentProps<'div'>, 'className' | 'style'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
  style?: never;
};

export function Skeleton({ xstyle, className: _className, style: _style, ...props }: SkeletonProps) {
  const { className, style } = stylex.props(styles.base, xstyle);
  return <div data-slot="skeleton" className={className} style={style} {...props} />;
}
