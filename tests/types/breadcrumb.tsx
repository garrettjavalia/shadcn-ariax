import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from '@breadcrumb';
<Breadcrumb><BreadcrumbList items={[{id:'one',name:'One'}]}>{item=><BreadcrumbItem id={item.id}>{state=><BreadcrumbLink href="#" style={({isFocused})=>({opacity:isFocused?.5:1})}>{state.isCurrent?item.name:'Ancestor'}</BreadcrumbLink>}</BreadcrumbItem>}</BreadcrumbList></Breadcrumb>;
// @ts-expect-error external Tailwind classes are unsupported
<Breadcrumb className="p-4" />;
// @ts-expect-error separator styling uses separatorXstyle
<BreadcrumbItem separatorClassName="text-primary">Text</BreadcrumbItem>;
