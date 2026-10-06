'use client';
import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {ToggleButtonGroup,ToggleButton,composeRenderProps,type ToggleButtonGroupProps,type ToggleButtonProps} from 'react-aria-components';
import {toggleProps,type ToggleProps} from './toggle';
type Variants=Pick<ToggleProps,'variant'|'size'>;
type Context=Variants&{spacing?:number;orientation?:'horizontal'|'vertical'};
const ToggleGroupContext=React.createContext<Context>({size:'default',variant:'default',spacing:2,orientation:'horizontal'});
export type ToggleGroupProps=Omit<ToggleButtonGroupProps,'className'|'children'>&Variants&{className?:never;xstyle?:stylex.StyleXStyles;spacing?:number;orientation?:'horizontal'|'vertical';children?:React.ReactNode};
export type ToggleGroupItemProps=Omit<ToggleButtonProps,'className'>&Variants&{className?:never;xstyle?:stylex.StyleXStyles};
export function ToggleGroup({className:_className,variant,size,spacing=2,orientation='horizontal',children,xstyle,style,...props}:ToggleGroupProps){
 const applied=stylex.props(styles.group,styles.spacing(spacing),xstyle);
 return <ToggleButtonGroup data-slot="toggle-group" data-variant={variant} data-size={size} data-spacing={spacing} orientation={orientation} {...props} className={['ariax-toggle-group',applied.className].filter(Boolean).join(' ')} style={composeRenderProps(style,value=>({...applied.style,...value}))}><ToggleGroupContext.Provider value={{variant,size,spacing,orientation}}>{children}</ToggleGroupContext.Provider></ToggleButtonGroup>;
}
export function ToggleGroupItem({className:_className,children,variant='default',size='default',xstyle,style,...props}:ToggleGroupItemProps){
 const context=React.useContext(ToggleGroupContext);
 const applied=toggleProps({variant:context.variant||variant,size:context.size||size,xstyle:[styles.item,styles.corners((context.size||size)==='sm'?'min(calc(var(--radius) * .8), 12px)':'var(--radius)'),styles.borders((context.variant||variant)==='outline'?1:0),styles.padding((context.size||size)===null?'0px':'0.625rem',(context.size||size)==='sm'?'0.375rem':'0.5rem'),xstyle]});
 return <ToggleButton data-slot="toggle-group-item" data-variant={context.variant||variant} data-size={context.size||size} data-spacing={context.spacing} {...props} {...applied} style={composeRenderProps(style,value=>({...applied.style,...value}))}>{children}</ToggleButton>;
}
const styles=stylex.create({
 group:{display:'flex',width:'fit-content',borderRadius:{default:'var(--radius)',':is([data-size="sm"])':'min(calc(var(--radius) * .8), 10px)'},flexDirection:{default:'row',':where([data-orientation="vertical"])':'column'},alignItems:{default:'center',':where([data-orientation="vertical"])':'stretch'},gap:'var(--gap)'},
 spacing:(spacing:number)=>({'--gap':`calc(var(--spacing) * ${spacing})`}),
 item:{flexShrink:0,zIndex:{default:null,':focus':10,':focus-visible':10}},
 borders:(width:number)=>({borderInlineStartWidth:{default:width,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"][data-variant="outline"]':0,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"][data-variant="outline"]:first-child':1},borderTopWidth:{default:width,':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"][data-variant="outline"]':0,':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"][data-variant="outline"]:first-child':1}}),
 padding:(normal:string,icon:string)=>({paddingInlineStart:{default:normal,':has([data-icon="inline-start"])':icon,':is(.ariax-toggle-group[data-spacing="0"] *)':'0.5rem',':is(.ariax-toggle-group[data-spacing="0"] *):has([data-icon="inline-start"])':'0.375rem'},paddingInlineEnd:{default:normal,':has([data-icon="inline-end"])':icon,':is(.ariax-toggle-group[data-spacing="0"] *)':'0.5rem',':is(.ariax-toggle-group[data-spacing="0"] *):has([data-icon="inline-end"])':'0.375rem'}}),
 corners:(radius:string)=>({
 borderStartStartRadius:{default:radius,':is(.ariax-toggle-group[data-spacing="0"] *)':0,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"]:first-child':'var(--radius)',':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"]:first-child':'var(--radius)'},
 borderEndStartRadius:{default:radius,':is(.ariax-toggle-group[data-spacing="0"] *)':0,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"]:first-child':'var(--radius)',':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"]:last-child':'var(--radius)'},
 borderStartEndRadius:{default:radius,':is(.ariax-toggle-group[data-spacing="0"] *)':0,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"]:last-child':'var(--radius)',':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"]:first-child':'var(--radius)'},
 borderEndEndRadius:{default:radius,':is(.ariax-toggle-group[data-spacing="0"] *)':0,':is(.ariax-toggle-group[data-orientation="horizontal"] *)[data-spacing="0"]:last-child':'var(--radius)',':is(.ariax-toggle-group[data-orientation="vertical"] *)[data-spacing="0"]:last-child':'var(--radius)'},
 }),
});
