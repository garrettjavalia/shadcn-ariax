export const voice={className:'data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100'};
export const responsiveGroup={className:'hidden sm:flex'};
const widths:Record<number,string>={10:'w-[10px]',70:'w-[70px]',180:'w-[180px]',260:'w-[260px]',280:'w-[280px]',320:'w-[320px]'};
export const dynamic=(width:number)=>({className:widths[width]});
