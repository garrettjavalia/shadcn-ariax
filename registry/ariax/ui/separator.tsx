'use client';
import type { ComponentProps } from 'react';
import { Separator as SeparatorPrimitive } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';

export type SeparatorProps = Omit<ComponentProps<typeof SeparatorPrimitive>, 'className' | 'style'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
  style?: never;
};
const styles = stylex.create({
  base: { display: 'block', flexShrink: 0, borderWidth: 0, backgroundColor: 'var(--border)' },
  horizontal: { height: 1, width: '100%' },
  vertical: { width: 1, alignSelf: 'stretch' },
});
export function Separator({ orientation = 'horizontal', xstyle, className: _className, style: _style, ...props }: SeparatorProps) {
  // Match pinned RAC output: horizontal div and explicit hr + vertical have no
  // orientation attribute (the latter renders a div), so upstream sizes neither.
  const dimensions = orientation === 'vertical'
    ? props.elementType !== 'hr' && styles.vertical
    : (!props.elementType || props.elementType === 'hr') && styles.horizontal;
  const applied = stylex.props(styles.base, dimensions, xstyle);
  return <SeparatorPrimitive data-slot="separator" orientation={orientation} {...props} className={applied.className} style={applied.style} />;
}
