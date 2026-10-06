'use client';
import type { ComponentProps, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, Header, ListBoxItem, ListBox, ListBoxSection, Popover, SearchField, Select as SelectPrimitive, SelectValue as SelectValuePrimitive, Separator, composeRenderProps, type ListBoxProps, type SearchFieldProps, type ListBoxSectionProps, type SelectProps as PrimitiveSelectProps, type SelectValueProps } from 'react-aria-components';
import { ChevronDownIcon, CheckIcon, SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import { animationStyles } from './animations.stylex';
type Styled<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type SelectProps<T extends object, M extends 'single' | 'multiple' = 'single'> = Styled<PrimitiveSelectProps<T, M>>;
export function Select<T extends object, M extends 'single' | 'multiple' = 'single'>({ className: _, xstyle, style, ...props }: SelectProps<T, M>) {
 const sx = stylex.props(styles.root, xstyle);
 return <SelectPrimitive data-slot="select" {...props} className={sx.className} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}/>;
}
export function SelectGroup<T extends object>({ className: _, xstyle, style, ...props }: Styled<ListBoxSectionProps<T>>) {
 const sx = stylex.props(styles.group, xstyle); return <ListBoxSection data-slot="select-group" {...props} className={sx.className} style={{ ...sx.style, ...style }}/>;
}
export function SelectValue<T extends object>({ className: _, xstyle, style, children, ...props }: Styled<SelectValueProps<T>>) {
 const sx = stylex.props(styles.value, xstyle);
 return <SelectValuePrimitive data-slot="select-value" {...props} className={sx.className} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}>{typeof children === 'function' ? children : ({ selectedItems, selectedText, defaultChildren }) => selectedItems.length > 1 ? selectedText : defaultChildren}</SelectValuePrimitive>;
}
export function SelectTrigger({ className: _, xstyle, style, size = 'default', children, ...props }: Styled<Omit<ComponentProps<typeof Button>, 'children'>> & { children?: ReactNode; size?: 'sm' | 'default' }) {
 const sx = stylex.props(styles.trigger, xstyle);
 return <Button data-slot="select-trigger" data-size={size} {...props} className={['ariax-select-trigger', sx.className].join(' ')} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}>{children}<ChevronDownIcon {...elementStyle(styles.triggerIcon)}/></Button>;
}
type ContentProps = Styled<Omit<ComponentProps<typeof Popover>, 'children'>> & { children?: ReactNode };
export function SelectContent({ children, placement = 'bottom', offset = 4, crossOffset = 0, ...props }: ContentProps) {
 return <SelectPopover placement={placement} offset={offset} crossOffset={crossOffset} {...props}><SelectList>{children}</SelectList></SelectPopover>;
}
export function SelectPopover({ className: _, xstyle, style, children, placement = 'bottom start', offset = 4, crossOffset = 0, ...props }: ContentProps) {
 const sx = stylex.props(animationStyles.overlay, styles.content, xstyle);
 return <Popover data-slot="select-content" placement={placement} offset={offset} crossOffset={crossOffset} {...props} className={['ariax-select-content',sx.className].join(' ')} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}>{children}</Popover>;
}
export function SelectList<T extends object>({ className: _, xstyle, style, ...props }: Styled<ListBoxProps<T>>) {
 const sx = stylex.props(styles.list,xstyle); return <ListBox data-slot="select-list" {...props} className={sx.className} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}/>;
}
export function SelectInput({ className: _, xstyle, style, ...props }: Styled<SearchFieldProps>) {
 const sx = stylex.props(styles.inputWrapper,xstyle);
 return <SearchField {...props} autoFocus data-slot="select-input-wrapper" className={sx.className} style={composeRenderProps(style, value => ({ ...sx.style, ...value }))}><InputGroup><InputGroupInput data-slot="select-input" xstyle={styles.input}/><InputGroupAddon><SearchIcon {...elementStyle(styles.searchIcon)}/></InputGroupAddon></InputGroup></SearchField>;
}
export function SelectLabel({ className: _, xstyle, style, ...props }: Styled<ComponentProps<typeof Header>>) {
 const sx=stylex.props(styles.label,xstyle); return <Header data-slot="select-label" {...props} className={sx.className} style={{...sx.style,...style}}/>;
}
export function SelectItem({ className: _, xstyle, style, children, ...props }: Styled<ComponentProps<typeof ListBoxItem>>) {
 const sx=stylex.props(styles.item,xstyle);
 return <ListBoxItem data-slot="select-item" textValue={typeof children==='string'?children:undefined} {...props} className={['ariax-select-item',sx.className].join(' ')} style={composeRenderProps(style,value=>({...sx.style,...value}))}>{composeRenderProps(children,(children,{isSelected})=><><span {...elementStyle(styles.itemText)}>{children}</span><span {...elementStyle(styles.indicator)}>{isSelected?<CheckIcon {...elementStyle(styles.checkIcon)}/>:null}</span></>)}</ListBoxItem>;
}
export function SelectSeparator({ className: _, xstyle, style, ...props }: Styled<ComponentProps<typeof Separator>>) {
 const sx=stylex.props(styles.separator,xstyle); return <Separator data-slot="select-separator" {...props} className={sx.className} style={{...sx.style,...style}}/>;
}
export function SelectEmpty({ className: _, xstyle, style, ...props }: Styled<ComponentProps<'div'>>) {
 const sx=stylex.props(styles.empty,xstyle); return <div data-slot="select-empty" {...props} className={sx.className} style={{...sx.style,...style}}/>;
}
function elementStyle(value:stylex.StyleXStyles){const {className,style}=stylex.props(value);return {className,style};}
const ring='0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-select-ring), 0 0 0 0 #0000';
const styles=stylex.create({
 root:{width:'var(--ariax-select-width, fit-content)'},
 group:{scrollMarginBlock:'.25rem',padding:'.25rem'},
 value:{display:'flex',flex:'1 1 0%',textAlign:'start',color:{default:null,':is([data-placeholder])':'var(--muted-foreground)'}},
 trigger:{display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between',whiteSpace:'nowrap',outlineStyle:'none',gap:'.375rem',borderRadius:{default:'var(--radius)',':is([data-size="sm"])':'min(calc(var(--radius) - 2px), 10px)'},borderWidth:'1px',borderStyle:'solid',borderColor:{default:'var(--input)',':focus-visible':'var(--ring)',':is([aria-invalid="true"])':'var(--destructive)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 50%, transparent)'},backgroundColor:{default:'transparent',':is(.dark *)':'color-mix(in oklab, var(--input) 30%, transparent)',':is(.dark *):hover':{default:null,'@media (hover: hover)':'color-mix(in oklab, var(--input) 50%, transparent)'}},color:{default:null,':is([data-placeholder])':'var(--muted-foreground)'},paddingBlock:'.5rem',paddingInlineStart:'.625rem',paddingInlineEnd:'.5rem',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',height:{default:null,':is([data-size="default"])':'2rem',':is([data-size="sm"])':'1.75rem'},cursor:{default:null,':disabled':'not-allowed'},opacity:{default:null,':disabled':.5},userSelect:'none',transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)','--ariax-select-ring':{default:'color-mix(in oklab, var(--ring) 50%, transparent)',':is([aria-invalid="true"])':'color-mix(in oklab, var(--destructive) 20%, transparent)',':is(.dark *)[aria-invalid="true"]':'color-mix(in oklab, var(--destructive) 40%, transparent)'},boxShadow:{default:null,':focus-visible':ring,':is([aria-invalid="true"])':ring}},
 triggerIcon:{color:'var(--muted-foreground)',width:'1rem',height:'1rem',pointerEvents:'none'},
 content:{position:'relative',isolation:'isolate',zIndex:50,width:'var(--trigger-width)',transformOrigin:'var(--trigger-anchor-point)',overflow:'hidden',backgroundColor:'var(--popover)',color:'var(--popover-foreground)',minWidth:'9rem',borderRadius:'var(--radius)',boxShadow:'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',transitionDuration:'100ms',animationDuration:{default:null,':is([data-entering], [data-exiting])':'100ms'},animationTimingFunction:{default:null,':is([data-entering], [data-exiting])':'ease'},'--ariax-enter-opacity':{default:1,':is([data-entering])':0},'--ariax-enter-scale':{default:1,':is([data-entering])':.95},'--ariax-exit-opacity':{default:1,':is([data-exiting])':0},'--ariax-exit-scale':{default:1,':is([data-exiting])':.95},'--ariax-enter-x':{default:'0px',':is([data-placement="left"])':'.5rem',':is([data-placement="right"])':'-.5rem'},'--ariax-enter-y':{default:'0px',':is([data-placement="bottom"])':'-.5rem',':is([data-placement="top"])':'.5rem'}},
 list:{maxHeight:'inherit',overflowX:'hidden',overflowY:'auto',padding:0,outlineStyle:{default:'none','@media (forced-colors: active)':'solid'},outlineWidth:{default:null,'@media (forced-colors: active)':2},outlineColor:{default:null,'@media (forced-colors: active)':'transparent'},outlineOffset:{default:null,'@media (forced-colors: active)':2}},
 inputWrapper:{padding:'.25rem',paddingBottom:0},input:{display:{default:null,'::-webkit-search-cancel-button':'none'}},searchIcon:{flexShrink:0,width:'1rem',height:'1rem',opacity:.5},
 label:{color:'var(--muted-foreground)',paddingInline:'.375rem',paddingBlock:'.25rem',fontSize:'.75rem',lineHeight:'calc(1 / .75)'},
 item:{position:'relative',display:'flex',width:'100%',cursor:'default',alignItems:'center',outlineStyle:{default:'none','@media (forced-colors: active)':'solid'},outlineWidth:{default:null,'@media (forced-colors: active)':2},outlineColor:{default:null,'@media (forced-colors: active)':'transparent'},outlineOffset:{default:null,'@media (forced-colors: active)':2},userSelect:'none',gap:'.375rem',borderRadius:'calc(var(--radius) - 2px)',paddingBlock:'.25rem',paddingInlineEnd:'2rem',paddingInlineStart:'.375rem',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',backgroundColor:{default:null,':focus':'var(--accent)',':is(.ariax-select-content *)[data-focused]':'color-mix(in oklab, var(--foreground) 10%, transparent)'},color:{default:null,':focus':'var(--accent-foreground)',':is([data-focused])':'var(--accent-foreground)'},pointerEvents:{default:null,':is([data-disabled])':'none'},opacity:{default:null,':is([data-disabled])':.5}},
 itemText:{display:'flex',flex:'1 1 0%',gap:'.5rem',flexShrink:0,whiteSpace:'nowrap'},indicator:{pointerEvents:'none',position:'absolute',insetInlineEnd:'.5rem',display:'flex',width:'1rem',height:'1rem',alignItems:'center',justifyContent:'center'},checkIcon:{pointerEvents:'none'},
 separator:{backgroundColor:'var(--border)',marginInline:'-.25rem',marginBlock:'.25rem',height:'1px',pointerEvents:'none'},
 empty:{color:'var(--muted-foreground)',display:{default:'none',':is([data-slot="select-list"][data-empty] *)':'flex'},width:'100%',justifyContent:'center',paddingBlock:'.5rem',textAlign:'center',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'},
});
