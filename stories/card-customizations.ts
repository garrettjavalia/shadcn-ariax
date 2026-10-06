import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({full:{width:'100%'},card:(width:number)=>({width,borderRadius:0,'--card-spacing':'1.5rem'}),part:{padding:'0.75rem',color:'var(--primary)'}});
export const fullWidthButton={xstyle:styles.full};
export const customCard={xstyle:styles.card(280)};
export const customPart={xstyle:styles.part};
const dynamic=stylex.create({card:(value:number)=>({minWidth:value,width:280})});
export const dynamicCard=(value:number)=>({xstyle:dynamic.card(value),style:{}});
const spacingExampleStyles=stylex.create({root:{marginInline:'auto',display:'grid',width:'100%',maxWidth:'24rem',gap:'calc(var(--spacing, .25rem) * 4)'},center:{justifyContent:'center'},form:{display:'flex',flexDirection:'column',gap:'calc(var(--spacing, .25rem) * 6)'},field:{display:'grid',gap:'calc(var(--spacing, .25rem) * 2)'},row:{display:'flex',alignItems:'center'},forgot:{marginLeft:'auto',display:'inline-block',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',textUnderlineOffset:'4px',textDecorationLine:{default:'none',':hover':'underline'}},footer:{flexDirection:'column',gap:'calc(var(--spacing, .25rem) * 2)'},full:{width:'100%'}});
const spacingExampleMap={'mx-auto grid w-full max-w-sm gap-4':spacingExampleStyles.root,'justify-center':spacingExampleStyles.center,'flex flex-col gap-6':spacingExampleStyles.form,'grid gap-2':spacingExampleStyles.field,'flex items-center':spacingExampleStyles.row,'ml-auto inline-block text-sm underline-offset-4 hover:underline':spacingExampleStyles.forgot,'flex-col gap-2':spacingExampleStyles.footer,'w-full':spacingExampleStyles.full};
export function cardSpacingExampleStyle(key:keyof typeof spacingExampleMap){return {xstyle:spacingExampleMap[key]};}
export function cardSpacingNativeStyle(key:keyof typeof spacingExampleMap){const {className,style}=stylex.props(spacingExampleMap[key]);return {className,style};}
