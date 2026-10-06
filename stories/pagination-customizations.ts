import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({fit:{width:'fit-content'},trigger:{width:'5rem'},compact:{marginInline:0,width:'auto'},gap:{gap:12},color:{color:'var(--destructive)'},size:(width:number)=>({width})});
export const paginationFit={xstyle:styles.fit};
export const paginationTrigger={xstyle:styles.trigger};
export const paginationCompact={xstyle:styles.compact};
export const paginationGap={xstyle:styles.gap};
export const paginationColor={xstyle:styles.color};
export const paginationSize=(size:number)=>({xstyle:styles.size(size)});
