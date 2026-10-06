import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { FrameIcon, LifeBuoyIcon, MapIcon, PieChartIcon, SendIcon } from "lucide-react";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuItem, SidebarProvider } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
const projects = [{
  name: "Design Engineering",
  url: "#",
  icon: FrameIcon,
  badge: "24"
}, {
  name: "Sales & Marketing",
  url: "#",
  icon: PieChartIcon,
  badge: "12"
}, {
  name: "Travel",
  url: "#",
  icon: MapIcon,
  badge: "3"
}, {
  name: "Support",
  url: "#",
  icon: LifeBuoyIcon,
  badge: "21"
}, {
  name: "Feedback",
  url: "#",
  icon: SendIcon,
  badge: "8"
}];
export default function AppSidebar() {
  return <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map(project => <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton href={project.url} {...sidebarCustom("group-has-[[data-state=open]]/menu-item:bg-sidebar-accent")}>
                      <project.icon />
                      <span>{project.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{project.badge}</SidebarMenuBadge>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
