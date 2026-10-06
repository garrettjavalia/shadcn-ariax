import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({initial:{width:160,opacity:.7},dynamic:(width:number)=>({width,opacity:.8}),item:{fontWeight:500},popover:(width:number)=>({width})});
export const comboboxCustom=(width:number)=>({xstyle:[styles.initial,styles.dynamic(width)],style:({isDisabled}:{isDisabled:boolean})=>({opacity:isDisabled?.5:.9})});
export const comboboxItemCustom={xstyle:styles.item,style:({isSelected}:{isSelected:boolean})=>({fontWeight:isSelected?600:400})};
export const comboboxPopoverCustom=(width:number)=>({xstyle:styles.popover(width),style:({isEntering}:{isEntering:boolean})=>({opacity:isEntering?.8:1})});
