'use client';
import type { ComponentProps } from 'react';
import { Separator as SeparatorPrimitive } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';

export type SeparatorProps = Omit<ComponentProps<typeof SeparatorPrimitive>, 'className'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
};
const styles = stylex.create({
  base: {
    display: 'block', flexShrink: 0, borderWidth: 0, backgroundColor: 'var(--border)',
    '--ariax-separator-height': { default: 'auto', ':is(hr, [aria-orientation="horizontal"])': '1px' },
    '--ariax-separator-width': { default: 'auto', ':is(hr, [aria-orientation="horizontal"])': '100%', ':is([aria-orientation="vertical"])': '1px' },
    '--ariax-separator-align': { default: 'auto', ':is([aria-orientation="vertical"])': 'stretch' },
    height: 'var(--ariax-separator-height)', width: 'var(--ariax-separator-width)', alignSelf: 'var(--ariax-separator-align)',
  },
});
export function Separator({ orientation = 'horizontal', xstyle, className: _className, style: userStyle, ...props }: SeparatorProps) {
  // Select dimensions from the rendered DOM, including RAC context and render props.
  // Local variables keep a later xstyle width/height override unconditional.
  const applied = stylex.props(styles.base, xstyle);
  return <SeparatorPrimitive data-slot="separator" orientation={orientation} {...props} className={applied.className} style={{ ...applied.style, ...userStyle }} />;
}
