import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({first:{minWidth:'30rem',fontSize:'1rem'},last:{fontSize:'1.125rem',lineHeight:'calc(1.75 / 1.125)'},dynamic:(height:number)=>({height}),cell:{padding:'1rem',backgroundColor:'var(--muted)'}});
export const tableCustom={xstyle:[styles.first,styles.last]};
export const cellCustom=(width:number)=>({xstyle:[styles.cell,styles.dynamic(width)]});
