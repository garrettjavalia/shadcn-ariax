import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({full:{width:'100%'},card:(width:number)=>({width,borderRadius:0,'--card-spacing':'1.5rem'}),part:{padding:'0.75rem',color:'var(--primary)'}});
export const fullWidthButton={xstyle:styles.full};
export const customCard={xstyle:styles.card(280)};
export const customPart={xstyle:styles.part};
const dynamic=stylex.create({card:(value:number)=>({minWidth:value,width:280})});
export const dynamicCard=(value:number)=>({xstyle:dynamic.card(value),style:{}});
