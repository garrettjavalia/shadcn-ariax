import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({time:{appearance:{default:'none','::-webkit-calendar-picker-indicator':'none'},display:{default:null,'::-webkit-calendar-picker-indicator':'none'}},cellSize:{'--cell-size':{default:'2.5rem','@media (min-width:48rem)':'3rem'}},width:(width:number)=>({width,opacity:.8})});
export const calendarTimeInput={xstyle:styles.time};
export const calendarCellSize={xstyle:styles.cellSize as stylex.StyleXStyles};
export const calendarCustom=(width:number)=>({xstyle:styles.width(width),style:({isDisabled}:{isDisabled:boolean})=>({opacity:isDisabled?.5:.9,lineHeight:1.75})});
