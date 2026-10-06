import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { FrameIcon, LifeBuoyIcon, MapIcon, PieChartIcon, SendIcon } from "lucide-react";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@sidebar";
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
                    <SidebarMenuButton href={project.url}>
                      <project.icon />
                      <span>{project.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
