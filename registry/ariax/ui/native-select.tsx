'use client';
import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { ChevronDownIcon } from 'lucide-react';
type CustomProps = { className?: never; xstyle?: stylex.StyleXStyles };
export type NativeSelectProps = Omit<ComponentProps<'select'>, 'size' | 'className'> & CustomProps & { size?: 'sm' | 'default' };
export type NativeSelectOptionProps = Omit<ComponentProps<'option'>, 'className'> & CustomProps;
export type NativeSelectOptGroupProps = Omit<ComponentProps<'optgroup'>, 'className'> & CustomProps;
export function NativeSelect({ size = 'default', xstyle, style, className: _className, ...props }: NativeSelectProps) {
 const wrapper = stylex.props(styles.wrapper, xstyle);
 const select = stylex.props(styles.select);
 const icon = stylex.props(styles.icon);
 return <div data-slot="native-select-wrapper" data-size={size} className={['group/native-select',wrapper.className].filter(Boolean).join(' ')} style={wrapper.style}><select data-slot="native-select" data-size={size} {...props} className={select.className} style={{...select.style,...style}}/><ChevronDownIcon data-slot="native-select-icon" aria-hidden="true" className={icon.className} style={icon.style}/></div>;
}
export function NativeSelectOption({xstyle,style,className: _className,...props}: NativeSelectOptionProps) { const applied=stylex.props(styles.option,xstyle); return <option data-slot="native-select-option" {...props} className={applied.className} style={{...applied.style,...style}}/>; }
export function NativeSelectOptGroup({xstyle,style,className: _className,...props}: NativeSelectOptGroupProps) { const applied=stylex.props(styles.option,xstyle); return <optgroup data-slot="native-select-optgroup" {...props} className={applied.className} style={{...applied.style,...style}}/>; }
const styles=stylex.create({
 wrapper:{position:'relative',width:{default:'fit-content',':is(.ariax-field[data-orientation="vertical"] > *)':'100%',':is(.ariax-field[data-orientation="responsive"] > *)':{default:'100%','@container field-group (min-width: 28rem)':'auto'}},opacity:{default:null,':has(select:disabled)':0.5}},
 select:{
 height:{default:'2rem',':is([data-size="sm"])':'1.75rem'},width:'100%',minWidth:0,appearance:'none',borderRadius:{default:'var(--radius)',':is([data-size="sm"])':'min(calc(var(--radius) * 0.8), 10px)'},borderWidth:1,borderStyle:'solid',
 borderColor:{default:'var(--input)',':focus-visible':'var(--ring)',':is([aria-invalid="true"])':'var(--destructive)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 50%, transparent)'},
 backgroundColor:{default:'transparent','::selection':'var(--primary)',':is(.dark *)':'color-mix(in oklab, var(--input) 30%, transparent)',':is(.dark *):hover':{default:null,'@media (hover: hover)':'color-mix(in oklab, var(--input) 50%, transparent)'}},
 color:{default:null,'::placeholder':'var(--muted-foreground)','::selection':'var(--primary-foreground)'},
 paddingTop:{default:'0.25rem',':is([data-size="sm"])':'0.125rem'},paddingBottom:{default:'0.25rem',':is([data-size="sm"])':'0.125rem'},paddingLeft:'0.625rem',paddingRight:'2rem',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)',
 outlineStyle:'none',userSelect:'none',pointerEvents:{default:null,':disabled':'none'},cursor:{default:null,':disabled':'not-allowed'},
 transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transitionDuration:'150ms',
 '--ariax-native-select-ring':{default:'color-mix(in oklab, var(--ring) 50%, transparent)',':is([aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 40%, transparent)'},
 boxShadow:{default:null,':focus-visible':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-native-select-ring), 0 0 0 0 #0000',':is([aria-invalid="true"])':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-native-select-ring), 0 0 0 0 #0000'},
 },
 icon:{position:'absolute',top:'50%',right:'0.625rem',width:'1rem',height:'1rem',translate:'0 -50%',color:'var(--muted-foreground)',pointerEvents:'none',userSelect:'none'},
 option:{backgroundColor:'Canvas',color:'CanvasText'},
});
