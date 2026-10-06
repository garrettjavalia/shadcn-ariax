import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({vertical:{height:'18rem',width:'12rem',borderRadius:'calc(var(--radius) * .8)',borderWidth:1,borderStyle:'solid'},horizontal:{width:'24rem',borderRadius:'calc(var(--radius) * .8)',borderWidth:1,borderStyle:'solid',whiteSpace:'nowrap'},separator:{marginBlock:'.5rem'},registryVertical:{marginInline:'auto'},registryHorizontal:{marginInline:'auto',width:'100%',maxWidth:'24rem',borderRadius:'calc(var(--radius) * .8)',borderWidth:1,borderStyle:'solid',padding:'1rem'},usage:{height:200,width:350,borderRadius:'calc(var(--radius) * .8)',borderWidth:1,borderStyle:'solid',padding:'1rem'},custom:(width:number)=>({height:100,width,scrollbarColor:'var(--primary) transparent'})});
export const scrollVertical={xstyle:styles.vertical};
export const scrollHorizontal={xstyle:styles.horizontal};
export const scrollSeparator={xstyle:styles.separator};
export const scrollRegistryVertical={xstyle:[styles.vertical,styles.registryVertical]};
export const scrollRegistryHorizontal={xstyle:styles.registryHorizontal};
export const scrollUsage={xstyle:styles.usage};
export const scrollCustom=(width:number)=>({xstyle:styles.custom(width)});
