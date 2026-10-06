'use client';
import * as stylex from '@stylexjs/stylex';
import { composeRenderProps, Switch as Primitive, type SwitchProps as PrimitiveProps } from 'react-aria-components';
export type SwitchProps = Omit<PrimitiveProps, 'className'> & { className?: never; size?: 'sm' | 'default'; xstyle?: stylex.StyleXStyles };
export function Switch({ size = 'default', children, xstyle, style, className: _className, ...props }: SwitchProps) {
 const thumb = stylex.props(styles.thumb, thumbs[size]);
 const applied = stylex.props(styles.base, sizes[size], xstyle);
 return <Primitive data-slot="switch" data-size={size} {...props} className={['peer group/switch', applied.className].join(' ')} style={composeRenderProps(style, value => ({...applied.style,...value}))}>
 {composeRenderProps(children, (children,{isSelected}) => <><span data-slot="switch-thumb" data-selected={isSelected || undefined} className={thumb.className} style={thumb.style}/>{children}</>)}
 </Primitive>;
}
const ring = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-switch-ring), 0 0 0 0 #0000';
const styles = stylex.create({
 base: {
 position:'relative', display:'inline-flex', alignItems:'center', flexShrink:0, borderRadius:'3.40282e38px', borderWidth:1, borderStyle:'solid', outlineStyle:'none',
 transitionProperty:'all',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',
 cursor:{default:null,':is([data-disabled])':'not-allowed'},opacity:{default:null,':is([data-disabled])':0.5},
 backgroundColor:{default:'var(--input)',':is(.dark *):not([data-selected])':'color-mix(in oklab, var(--input) 80%, transparent)',':is([data-selected])':'var(--primary)'},
 borderColor:{default:'transparent',':is([data-focus-visible])':'var(--ring)',':is([data-invalid], [aria-invalid="true"])':'var(--destructive)',':is(.dark *):is([data-invalid], [aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 50%, transparent)', ':is(:where(.group\\/field-label):has(:focus-visible) *):not([data-focus-visible])':'transparent'},
 '--ariax-switch-ring':{default:'color-mix(in oklab, var(--ring) 50%, transparent)',':is([data-invalid], [aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is(.dark *):is([data-invalid], [aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 40%, transparent)'},
 boxShadow:{default:null,':is([data-focus-visible])':ring,':is([data-invalid], [aria-invalid="true"])':ring, ':is(:where(.group\\/field-label):has(:focus-visible) *):not([data-focus-visible]):not([data-invalid]):not([aria-invalid="true"])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0px currentcolor, 0 0 0 0 #0000'},
 '::after':{content:'""',position:'absolute',insetInline:'-0.75rem',insetBlock:'-0.5rem'},
 },
 thumb:{pointerEvents:'none',display:'block',borderRadius:'3.40282e38px',backgroundColor:{default:'var(--background)',':is(.dark *):not([data-selected])':'var(--foreground)',':is(.dark *)[data-selected]':'var(--primary-foreground)'},
 boxShadow:'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0px currentcolor, 0 0 0 0 #0000',
 translate:{default:'0',':is([data-selected])':'calc(100% - 2px)'},transitionProperty:'transform, translate, scale, rotate',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)'},
});
const sizes=stylex.create({default:{height:'18.4px',width:'32px'},sm:{height:'14px',width:'24px'}});
const thumbs=stylex.create({default:{height:'1rem',width:'1rem'},sm:{height:'0.75rem',width:'0.75rem'}});
