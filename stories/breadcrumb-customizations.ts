import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({ list: {gap:20}, separator:{color:'var(--primary)'}, link:{color:'var(--destructive)'}, size:(size:number)=>({fontSize:size}) });
export const breadcrumbList={xstyle:styles.list};
export const breadcrumbSeparator={separatorXstyle:styles.separator};
export const breadcrumbLink={xstyle:styles.link};
export const breadcrumbSize=(size:number)=>({xstyle:styles.size(size)});
