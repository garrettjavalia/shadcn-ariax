export const scrollVertical={className:'h-72 w-48 rounded-md border'};
export const scrollHorizontal={className:'w-96 rounded-md border whitespace-nowrap'};
export const scrollSeparator={className:'my-2'};
export const scrollRegistryVertical={className:'mx-auto h-72 w-48 rounded-md border style-luma:rounded-2xl style-rhea:rounded-2xl'};
export const scrollRegistryHorizontal={className:'mx-auto w-full max-w-96 rounded-md border p-4 style-luma:rounded-2xl style-rhea:rounded-2xl'};
export const scrollUsage={className:'h-[200px] w-[350px] rounded-md border p-4'};
export const scrollCustom=(width:number)=>({className:(width===240?'w-60':'w-80')+' h-[100px] [scrollbar-color:var(--primary)_transparent]'});
