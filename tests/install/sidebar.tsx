import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail, SidebarHeader, SidebarFooter, SidebarContent, SidebarInput, SidebarSeparator, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarMenuSkeleton, useSidebar } from '@sidebar';
const styles = stylex.create({
  width: (width: number) => ({
    width
  }),
  height: {
    height: 36
  }
});
function Contents() {
  const {
    state,
    toggleSidebar
  } = useSidebar();
  return <><Sidebar collapsible="icon" ref={React.useRef<HTMLDivElement>(null)} xstyle={styles.width(260)} style={{
      width: 264
    }}><SidebarHeader><SidebarInput aria-label="Search" xstyle={styles.height} style={{
          height: 40
        }} /></SidebarHeader><SidebarSeparator /><SidebarContent><SidebarGroup><SidebarGroupLabel>Navigation</SidebarGroupLabel><SidebarGroupAction aria-label="Add" /><SidebarGroupContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton tooltip="Home" isActive style={({
                  isHovered
                }) => ({
                  opacity: isHovered ? .8 : 1
                })}>Home</SidebarMenuButton><SidebarMenuAction showOnHover aria-label="More" /><SidebarMenuBadge>2</SidebarMenuBadge><SidebarMenuSub><SidebarMenuSubItem><SidebarMenuSubButton href="#child" size="sm" style={({
                      isCurrent
                    }) => ({
                      opacity: isCurrent ? 1 : .8
                    })}>Child</SidebarMenuSubButton></SidebarMenuSubItem></SidebarMenuSub></SidebarMenuItem><SidebarMenuSkeleton showIcon /></SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent><SidebarFooter><button onClick={toggleSidebar}>{state}</button></SidebarFooter><SidebarRail /></Sidebar><SidebarInset><SidebarTrigger /></SidebarInset></>;
}
export default function Fixture() {
  const [open, setOpen] = React.useState(true);
  return <SidebarProvider open={open} onOpenChange={setOpen} style={{
    '--sidebar-width': '17rem'
  } as React.CSSProperties}><Contents /></SidebarProvider>;
}
