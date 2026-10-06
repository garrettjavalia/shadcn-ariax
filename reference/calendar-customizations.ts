export const calendarTimeInput={className:'appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'};
export const calendarCellSize={className:'[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]'};
export const calendarCustom=(width:number)=>({style:({isDisabled}:{isDisabled:boolean})=>({width,opacity:isDisabled?.5:.9,lineHeight:1.75})});
