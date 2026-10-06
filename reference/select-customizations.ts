export const selectCustom=(width:number)=>({style:({isDisabled}:{isDisabled:boolean})=>({width,opacity:isDisabled?.5:.9})});
