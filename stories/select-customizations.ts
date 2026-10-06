import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({initial:{width:160,opacity:.7},dynamic:(width:number)=>({width,opacity:.8})});
export const selectCustom=(width:number)=>({xstyle:[styles.initial,styles.dynamic(width)],style:({isDisabled}:{isDisabled:boolean})=>({opacity:isDisabled?.5:.9})});
