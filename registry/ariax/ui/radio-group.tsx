'use client';
import * as stylex from '@stylexjs/stylex';
import { RadioGroup as GroupPrimitive, Radio as RadioPrimitive, composeRenderProps, type RadioGroupProps as GroupProps, type RadioProps } from 'react-aria-components';
export type RadioGroupProps = Omit<GroupProps, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type RadioGroupItemProps = Omit<RadioProps, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export function RadioGroup({className: _className, xstyle, style, ...props}: RadioGroupProps) {
 const applied=stylex.props(styles.group,xstyle);
 return <GroupPrimitive data-slot="radio-group" {...props} className={applied.className} style={state=>({...applied.style,...(typeof style==='function'?style(state):style)})}/>;
}
export function RadioGroupItem({className: _className, xstyle, style, children, ...props}: RadioGroupItemProps) {
 const applied=stylex.props(styles.base,xstyle); const indicator=stylex.props(styles.indicator);const icon=stylex.props(styles.icon);
 return <RadioPrimitive data-slot="radio-group-item" {...props} className={['group/radio-group-item peer',applied.className].filter(Boolean).join(' ')} style={state=>({...applied.style,...(typeof style==='function'?style(state):style)})}>
 {composeRenderProps(children,(children,{isSelected})=><><span data-slot="radio-group-indicator" className={indicator.className} style={indicator.style}>{isSelected&&<span className={icon.className} style={icon.style}/>}</span>{children}</>)}
 </RadioPrimitive>;
}
const styles=stylex.create({
 group:{display:'grid',gap:'0.5rem',width:'100%'},
  base: {
    position: { default:'relative', '::after':'absolute' },
    content: {default:null,'::after':'""'},
    left:{default:null,'::after':'-0.75rem'},right:{default:null,'::after':'-0.75rem'},
    top:{default:null,'::after':'-0.5rem'},bottom:{default:null,'::after':'-0.5rem'},
    flexShrink:0, outlineStyle:'none', display:'flex', width:'1rem',height:'1rem',aspectRatio:1,
    borderRadius:'calc(infinity * 1px)',borderWidth:1,borderStyle:'solid',
    borderColor:{default:'var(--input)',':is(:where(.group\\/field-label):has(:focus-visible) *):not([data-checked]):not([data-focus-visible]):not(:focus-visible)':'var(--input)',':is(:where(.group\\/field-label):has(:focus-visible) *)[data-checked]:not([data-focus-visible]):not(:focus-visible)':'var(--primary)',':is([data-checked])':'var(--primary)',':is([data-selected])':'var(--primary)',':focus-visible':'var(--ring)',':is([data-focus-visible])':'var(--ring)',':is([aria-invalid="true"])':'var(--destructive)',':is([aria-invalid="true"][aria-checked="true"])':'var(--primary)',':is([data-invalid])':'var(--destructive)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 50%, transparent)',':is(.dark *)[data-invalid]':'color-mix(in oklab, var(--destructive) 50%, transparent)',':is([data-invalid][data-selected])':'var(--primary)',':is(.dark *)[data-invalid][data-selected]':'color-mix(in oklab, var(--destructive) 50%, transparent)'},
    backgroundColor:{default:null,':is(.dark *)':'color-mix(in oklab, var(--input) 30%, transparent)',':is([data-checked])':'var(--primary)',':is([data-selected])':'var(--primary)',':is(.dark *)[data-checked]':'var(--primary)',':is(.dark *)[data-selected]':'var(--primary)'},
    color:{default:null,':is([data-checked])':'var(--primary-foreground)',':is([data-selected])':'var(--primary-foreground)'},
    cursor:{default:null,':is([data-disabled])':'not-allowed'},
    opacity:{default:null,':is([data-disabled])':0.5},
    '--ariax-radio-ring':{default:'currentColor',':focus-visible':'color-mix(in oklab, var(--ring) 50%, transparent)',':is([data-focus-visible])':'color-mix(in oklab, var(--ring) 50%, transparent)',':is([aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is([data-invalid])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 40%, transparent)',':is(.dark *)[data-invalid]':'color-mix(in oklab, var(--destructive) 40%, transparent)'},
    boxShadow:{default:null,':is(:where(.group\\/field-label):has(:focus-visible) *)':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0px var(--ariax-radio-ring), 0 0 0 0 #0000',':is(:where(.group\\/field-label):has(:focus-visible) *)[data-focus-visible]':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-radio-ring), 0 0 0 0 #0000',':focus-visible':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-radio-ring), 0 0 0 0 #0000',':is([data-focus-visible])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-radio-ring), 0 0 0 0 #0000',':is([aria-invalid="true"])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-radio-ring), 0 0 0 0 #0000',':is([data-invalid])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-radio-ring), 0 0 0 0 #0000'},
  },
 indicator:{display:'flex',width:'1rem',height:'1rem',alignItems:'center',justifyContent:'center'},
 icon:{backgroundColor:'var(--primary-foreground)',position:'absolute',top:'50%',insetInlineStart:'50%',width:'0.5rem',height:'0.5rem',translate:{default:'-50% -50%',':is([dir="rtl"], [dir="rtl"] *)':'50% -50%'},borderRadius:'calc(infinity * 1px)'},
});
