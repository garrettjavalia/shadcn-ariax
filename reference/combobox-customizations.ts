export const comboboxCustom=(width:number)=>({style:({isDisabled}:{isDisabled:boolean})=>({width,opacity:isDisabled?.5:.9})});
export const comboboxItemCustom={style:({isSelected}:{isSelected:boolean})=>({fontWeight:isSelected?600:400})};
export const comboboxPopoverCustom=(width:number)=>({style:({isEntering}:{isEntering:boolean})=>({width,opacity:isEntering?.8:1})});
