export const tableCustom={className:'min-w-[30rem] text-lg'};
export const cellCustom=(width:number)=>({className:'p-4 bg-muted',style:{height:width}});
export function tableExampleStyle(key:typeof exampleClasses[number]){return {className:key};}
export const tableNativeExampleStyle=tableExampleStyle;

const exampleClasses=["text-right","font-medium","size-8","sr-only","w-full","w-[100px]","inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400","inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400","inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400","inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400","w-40","h-8 w-20","text-end"] as const;
