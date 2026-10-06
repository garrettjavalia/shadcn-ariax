'use client';
import * as stylex from '@stylexjs/stylex';
import { CheckIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive, composeRenderProps, type CheckboxProps as PrimitiveProps } from 'react-aria-components';

export type CheckboxProps = Omit<PrimitiveProps, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export function Checkbox({ className: _className, xstyle, style, children, ...props }: CheckboxProps) {
  const applied = stylex.props(styles.base, xstyle);
  const indicator = stylex.props(styles.indicator);
  const icon = stylex.props(styles.icon);
  return <CheckboxPrimitive data-slot="checkbox" {...props} className={['peer', applied.className].filter(Boolean).join(' ')}
    style={state => ({ ...applied.style, ...(typeof style === 'function' ? style(state) : style) })}>
    {composeRenderProps(children, (children, { isSelected, isIndeterminate }) => <><span data-slot="checkbox-indicator" className={indicator.className} style={indicator.style}>{(isSelected || isIndeterminate) && <CheckIcon className={icon.className} style={icon.style} />}</span>{children}</>)}
  </CheckboxPrimitive>;
}
const styles = stylex.create({
  base: {
    position: { default:'relative', '::after':'absolute' },
    content: {default:null,'::after':'""'},
    left:{default:null,'::after':'-0.75rem'},right:{default:null,'::after':'-0.75rem'},
    top:{default:null,'::after':'-0.5rem'},bottom:{default:null,'::after':'-0.5rem'},
    flexShrink:0, outlineStyle:'none', display:'flex', width:'1rem',height:'1rem',alignItems:'center',justifyContent:'center',
    borderRadius:4,borderWidth:1,borderStyle:'solid',
    borderColor:{default:'var(--input)',':is(:where(.group\\/field-label):has(:focus-visible) *):not([data-checked])':'var(--input)',':is(:where(.group\\/field-label):has(:focus-visible) *)[data-checked]':'var(--primary)',':is([data-checked])':'var(--primary)',':is([data-selected])':'var(--primary)',':is([data-selected][data-focus-visible])':'var(--primary)',':is([data-selected]):focus-visible':'var(--primary)',':focus-visible':'var(--ring)',':is([data-focus-visible])':'var(--ring)',':is([aria-invalid="true"])':'var(--destructive)',':is([aria-invalid="true"][aria-checked="true"])':'var(--primary)',':is([data-invalid])':'var(--destructive)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 50%, transparent)',':is(.dark *)[data-invalid]':'color-mix(in oklab, var(--destructive) 50%, transparent)',':is([data-invalid][data-selected])':'var(--primary)',':is(.dark *)[data-invalid][data-selected]':'color-mix(in oklab, var(--destructive) 50%, transparent)'},
    backgroundColor:{default:null,':is(.dark *)':'color-mix(in oklab, var(--input) 30%, transparent)',':is([data-checked])':'var(--primary)',':is([data-selected])':'var(--primary)',':is(.dark *)[data-checked]':'var(--primary)',':is(.dark *)[data-selected]':'var(--primary)'},
    color:{default:null,':is([data-checked])':'var(--primary-foreground)',':is([data-selected])':'var(--primary-foreground)'},
    cursor:{default:null,':is([data-disabled])':'not-allowed'},
    opacity:{default:null,':is([data-disabled])':0.5,':is(:where(.group\\/field):has(:disabled) *)':0.5},
    transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transitionDuration:'150ms',
    '--ariax-checkbox-ring':{default:'color-mix(in oklab, var(--ring) 50%, transparent)',':is([aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is([data-invalid])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 40%, transparent)',':is(.dark *)[data-invalid]':'color-mix(in oklab, var(--destructive) 40%, transparent)'},
    boxShadow:{default:null,':is(:where(.group\\/field-label):has(:focus-visible) *)':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0px var(--ariax-checkbox-ring), 0 0 0 0 #0000',':focus-visible':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-checkbox-ring), 0 0 0 0 #0000',':is([data-focus-visible])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-checkbox-ring), 0 0 0 0 #0000',':is([aria-invalid="true"])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-checkbox-ring), 0 0 0 0 #0000',':is([data-invalid])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-checkbox-ring), 0 0 0 0 #0000'},
  },
  indicator:{display:'grid',placeContent:'center',color:'currentColor',transitionProperty:'none'},
  icon:{width:'0.875rem',height:'0.875rem'},
});
