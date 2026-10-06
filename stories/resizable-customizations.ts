import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({border:{borderRadius:'var(--radius)',borderWidth:1,borderStyle:'solid'},demo:{maxWidth:'24rem'},height:{minHeight:200},custom:{backgroundColor:'var(--muted)',borderColor:'var(--primary)',borderWidth:2,borderStyle:'solid',width:320,height:240},handle:{backgroundColor:'var(--primary)',width:8},panel:{padding:8}});
export const resizableDemo={xstyle:[styles.border,styles.demo]};
export const resizableHandle={xstyle:[styles.border,styles.height,styles.demo]};
export const resizableRegistry={xstyle:[styles.border,styles.height]};
export const resizableNested={xstyle:styles.border};
export const resizableCustom={xstyle:styles.custom};
export const resizableCustomHandle={xstyle:styles.handle};
export const resizableCustomPanel={xstyle:styles.panel};
