import * as React from 'react';
import { HomeIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter, SidebarInput, SidebarInset, SidebarTrigger, SidebarRail, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuSkeleton, useSidebar } from '@sidebar';
import { Sidebar, SidebarMenuButton } from './portal';
import { sidebarCustomized, sidebarCustomizedButton } from '@sidebar-customizations';
function Content() {
  const [invalid, setInvalid] = React.useState(false);
  return <><Sidebar collapsible="icon"><SidebarHeader><SidebarInput aria-label="Search" placeholder="Search" aria-invalid={invalid} /><button onClick={() => setInvalid(!invalid)}>Invalid</button></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Navigation</SidebarGroupLabel><SidebarGroupAction aria-label="Add"><PlusIcon /></SidebarGroupAction><SidebarGroupContent><SidebarMenu>{(['default', 'outline'] as const).flatMap(variant => (['sm', 'default', 'lg', null] as const).map(size => <SidebarMenuItem key={variant + size}><SidebarMenuButton variant={variant} size={size} isActive={size === 'default'} tooltip={{
                  children: `${variant} ${size}`
                }}><HomeIcon /><span>{variant} {size ?? 'no size'}</span></SidebarMenuButton><SidebarMenuAction showOnHover aria-label={`More ${variant} ${size}`}><MoreHorizontalIcon /></SidebarMenuAction><SidebarMenuBadge>24</SidebarMenuBadge></SidebarMenuItem>))}<SidebarMenuItem><SidebarMenuButton isDisabled><HomeIcon />Disabled button</SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton href="#disabled" isDisabled><HomeIcon />Disabled link</SidebarMenuButton></SidebarMenuItem><SidebarMenuSub><SidebarMenuSubItem><SidebarMenuSubButton size="sm" href="#sm" isActive><HomeIcon />Small sub</SidebarMenuSubButton></SidebarMenuSubItem><SidebarMenuSubItem><SidebarMenuSubButton size="md"><HomeIcon />Medium sub</SidebarMenuSubButton></SidebarMenuSubItem><SidebarMenuSubItem><SidebarMenuSubButton isDisabled>Disabled sub</SidebarMenuSubButton></SidebarMenuSubItem></SidebarMenuSub></SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent><SidebarFooter>Footer</SidebarFooter><SidebarRail /></Sidebar><SidebarInset><SidebarTrigger /></SidebarInset></>;
}
export function States() {
  return <SidebarProvider><Content /></SidebarProvider>;
}
function CustomContents() {
  const [width, setWidth] = React.useState(240);
  const {
    state
  } = useSidebar();
  return <><Sidebar collapsible="icon" {...sidebarCustomized(width)} style={{
      width: width + 4
    }}><SidebarHeader><SidebarInput aria-label="Custom search" style={{
          fontSize: 20
        }} /></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel style={{
            fontSize: 20
          }}>Custom</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton {...sidebarCustomizedButton(width)} style={({
                isHovered
              }) => ({
                width: width + 4,
                fontSize: 20,
                opacity: isHovered ? .8 : 1
              })}><HomeIcon /><span>Custom button</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroup></SidebarContent><SidebarRail /></Sidebar><SidebarInset><SidebarTrigger /><button onClick={() => setWidth(width === 240 ? 300 : 240)}>Resize</button><output>{state}</output></SidebarInset></>;
}
export function Customized() {
  return <SidebarProvider style={{
    '--sidebar-width': '17rem',
    '--sidebar-width-icon': '3.5rem'
  } as React.CSSProperties}><CustomContents /></SidebarProvider>;
}
export function Skeletons() {
  return <SidebarProvider><Sidebar collapsible="none"><SidebarContent><SidebarMenu><SidebarMenuSkeleton /><SidebarMenuSkeleton showIcon /></SidebarMenu></SidebarContent></Sidebar></SidebarProvider>;
}
