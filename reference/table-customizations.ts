export const tableCustom={className:'min-w-[30rem] text-lg'};
export const cellCustom=(width:number)=>({className:'p-4 bg-muted',style:{height:width}});
export function tableExampleStyle(key:string){return {className:key};}
export const tableNativeExampleStyle=tableExampleStyle;
