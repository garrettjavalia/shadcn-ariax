'use client';
import { useMemo, type ComponentProps, type CSSProperties } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Label, type LabelProps } from './label';
import { Separator } from './separator';

type Props<T extends 'div' | 'fieldset' | 'legend' | 'p'> = Omit<ComponentProps<T>, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type FieldProps = Props<'div'> & { orientation?: 'vertical' | 'horizontal' | 'responsive' | null };
export type FieldLegendProps = Props<'legend'> & { variant?: 'legend' | 'label' };
export type FieldErrorProps = Props<'div'> & { errors?: Array<{ message?: string } | undefined> };
const styles = stylex.create({
  set: { display: 'flex', flexDirection: 'column', gap: { default: '1rem', ':has(>[data-slot="checkbox-group"])': '0.75rem', ':has(>[data-slot="radio-group"])': '0.75rem' } },
  legend: { marginBottom: '0.375rem', fontWeight: 500, fontSize: {default:null, ':is([data-variant="legend"])':'1rem', ':is([data-variant="label"])':'0.875rem'}, lineHeight: {default:null, ':is([data-variant="legend"])':1.5, ':is([data-variant="label"])':'calc(1.25 / 0.875)'} },
  group: { display: 'flex', flexDirection: 'column', width: '100%', containerName: 'field-group', containerType: 'inline-size', gap: {default:'1.25rem', ':is([data-slot="checkbox-group"])':'0.75rem', ':is(.ariax-field-group > [data-slot="field-group"])':'1rem'} },
  field: { display:'flex', width:'100%', gap:'0.5rem', color:{default:null, ':is([data-invalid="true"])':'var(--destructive)'}, '--ariax-field-full':'100%', '--ariax-field-auto':'auto', '--ariax-field-label-flex':'1 1 auto', '--ariax-field-check-offset':'1px' },
  vertical: { flexDirection:'column' },
  horizontal: {flexDirection:'row', alignItems:{default:'center', ':has(>[data-slot="field-content"])':'flex-start'}},
  responsive: {flexDirection:{default:'column','@container field-group (min-width: 28rem)':'row'}, '--ariax-field-center':'center', '--ariax-field-start':'flex-start', alignItems:'var(--ariax-field-responsive-align, normal)'},
  content:{display:'flex', flex:'1', flexDirection:'column', lineHeight:1.375, gap:'0.125rem'},
  label:{
    display:'flex', '--ariax-field-label-width':{default:'fit-content', ':has(>[data-slot="field"])':'100%', ':is(.ariax-field[data-orientation="vertical"] > *)':'100%', ':is(.ariax-field[data-orientation="responsive"] > *)':{default:'100%','@container field-group (min-width: 28rem)':'auto'}}, width:'var(--ariax-field-label-width)', flexDirection:{default:null, ':has(>[data-slot="field"])':'column'}, gap:'0.5rem', lineHeight:1.375,
    opacity:{default:null, ':is(.ariax-field[data-disabled="true"] *)':0.5, ':is(:where(.group)[data-disabled="true"] *)':0.5, ':is(:where(.peer):disabled ~ *)':0.5, ':is(:where(.peer)[data-disabled] ~ *)':0.5},
    borderRadius:{default:null, ':has(>[data-slot="field"])':'var(--radius)'}, borderWidth:{default:null, ':has(>[data-slot="field"])':'1px'},
    backgroundColor:{default:null, ':has(:where([data-state="checked"], [data-checked]:not([data-checked="false"]), [data-selected="true"]))':'color-mix(in oklab, var(--primary) 5%, transparent)', ':is(.dark *):has(:where([data-state="checked"], [data-checked]:not([data-checked="false"]), [data-selected="true"]))':'color-mix(in oklab, var(--primary) 10%, transparent)', ':has(>[data-slot="field"]):not(:has(:disabled,[data-disabled])):hover':{'default':null,'@media (hover: hover)':'color-mix(in oklab, var(--muted) 50%, transparent)'}},
    borderColor:{default:null,  ':has(:where([data-state="checked"], [data-checked]:not([data-checked="false"]), [data-selected="true"]))':'color-mix(in oklab, var(--primary) 30%, transparent)', ':is(.dark *):has(:where([data-state="checked"], [data-checked]:not([data-checked="false"]), [data-selected="true"]))':'color-mix(in oklab, var(--primary) 20%, transparent)', ':has(>[data-slot="field"]):has(:focus-visible)':'var(--ring)'},
    boxShadow:{default:null, ':has(>[data-slot="field"]):has(:focus-visible)':'0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 #0000'},
    '--ariax-field-padding':'0.625rem',
  },
  title:{display:'flex', '--ariax-field-title-width':{default:'fit-content', ':is(.ariax-field[data-orientation="vertical"] > *)':'100%', ':is(.ariax-field[data-orientation="responsive"] > *)':{default:'100%','@container field-group (min-width: 28rem)':'auto'}}, width:'var(--ariax-field-title-width)',alignItems:'center',gap:'0.5rem',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)',fontWeight:500,opacity:{default:null, ':is(.ariax-field[data-disabled="true"] *)':0.5}},
  description:{color:'var(--muted-foreground)',textAlign:'left',fontSize:'0.875rem',lineHeight:1.5,fontWeight:400, marginTop:{default:null, ':last-child:not([data-variant="legend"] + *)':'0px', ':nth-last-child(2):not([data-variant="legend"] + *)':'-0.25rem', ':is([data-variant="legend"] + *)':'-0.375rem'},textWrap:{default:null, ':is(.ariax-field:has(:where([data-orientation="horizontal"])) *)':'balance'}, '--ariax-field-link-offset':'4px', '--ariax-field-link-hover':'var(--primary)'},
  separator:{position:'relative',marginBlock:'-0.5rem',height:'1.25rem',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)'},
  separatorLine:{position:'absolute',inset:'0px',top:'50%'},
  separatorContent:{position:'relative',marginInline:'auto',display:'block',width:'fit-content',backgroundColor:'var(--background)',color:'var(--muted-foreground)',paddingInline:'0.5rem'},
  error:{color:'var(--destructive)',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)',fontWeight:400},
  errorList:{marginLeft:'1rem',display:'flex',listStyleType:'disc',flexDirection:'column',gap:'0.25rem'},
});
function applied(base: (typeof styles)[keyof typeof styles] | readonly ((typeof styles)[keyof typeof styles] | null)[], xstyle: stylex.StyleXStyles, style?: CSSProperties, marker?: string) {
  const result=stylex.props(base,xstyle);
  return {className:[marker,result.className].filter(Boolean).join(' '),style:{...result.style,...style}};
}
export function FieldSet({xstyle,style,className:_className,...props}:Props<'fieldset'>) {return <fieldset data-slot="field-set" {...props} {...applied(styles.set,xstyle,style)} />;}
export function FieldLegend({variant='legend',xstyle,style,className:_className,...props}:FieldLegendProps) {return <legend data-slot="field-legend" data-variant={variant} {...props} {...applied(styles.legend,xstyle,style)} />;}
export function FieldGroup({xstyle,style,className:_className,...props}:Props<'div'>) {return <div data-slot="field-group" {...props} {...applied(styles.group,xstyle,style,'ariax-field-group')} />;}
export function Field({orientation='vertical',xstyle,style,className:_className,...props}:FieldProps) {return <div role="group" data-slot="field" data-orientation={orientation} {...props} {...applied([styles.field,orientation && styles[orientation]],xstyle,style,'ariax-field group/field')} />;}
export function FieldContent({xstyle,style,className:_className,...props}:Props<'div'>) {return <div data-slot="field-content" {...props} {...applied(styles.content,xstyle,style)} />;}
export function FieldLabel({xstyle,...props}:LabelProps) {return <Label data-slot="field-label" {...props} xstyle={[styles.label,xstyle]} />;}
export function FieldTitle({xstyle,style,className:_className,...props}:Props<'div'>) {return <div data-slot="field-label" {...props} {...applied(styles.title,xstyle,style)} />;}
export function FieldDescription({xstyle,style,className:_className,...props}:Props<'p'>) {return <p data-slot="field-description" {...props} {...applied(styles.description,xstyle,style,'ariax-field-description')} />;}
export function FieldSeparator({children,xstyle,style,className:_className,...props}:Props<'div'>) {return <div data-slot="field-separator" data-content={!!children} {...props} {...applied(styles.separator,xstyle,style)}><Separator xstyle={styles.separatorLine}/>{children && <span data-slot="field-separator-content" {...applied(styles.separatorContent,undefined)}>{children}</span>}</div>;}
export function FieldError({children,errors,xstyle,style,className:_className,...props}:FieldErrorProps) {
  const content=useMemo(()=>{if(children)return children;if(!errors?.length)return null;const unique=[...new Map(errors.map(error=>[error?.message,error])).values()];if(unique.length===1)return unique[0]?.message;return <ul {...applied(styles.errorList,undefined)}>{unique.map((error,index)=>error?.message && <li key={index}>{error.message}</li>)}</ul>;},[children,errors]);
  return content ? <div role="alert" data-slot="field-error" {...props} {...applied(styles.error,xstyle,style)}>{content}</div> : null;
}
