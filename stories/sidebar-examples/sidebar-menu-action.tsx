import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { FrameIcon, LifeBuoyIcon, MapIcon, MoreHorizontalIcon, PieChartIcon, SendIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@dropdown-menu";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuItem, SidebarProvider } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
const projects = [{
  name: "Design Engineering",
  url: "#",
  icon: FrameIcon
}, {
  name: "Sales & Marketing",
  url: "#",
  icon: PieChartIcon
}, {
  name: "Travel",
  url: "#",
  icon: MapIcon
}, {
  name: "Support",
  url: "#",
  icon: LifeBuoyIcon
}, {
  name: "Feedback",
  url: "#",
  icon: SendIcon
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
                    <DropdownMenuTrigger>
                      <SidebarMenuAction>
                        <MoreHorizontalIcon />
                        <span {...sidebarNative("sr-only")}>More</span>
                      </SidebarMenuAction>
                      <DropdownMenu data-parity-portal placement="right top">
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </DropdownMenuTrigger>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
