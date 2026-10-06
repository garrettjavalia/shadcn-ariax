import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import * as React from "react";
import { FrameIcon, LifeBuoyIcon, MapIcon, PanelLeftCloseIcon, PanelLeftOpenIcon, PieChartIcon, SendIcon } from "lucide-react";
import { Button } from "@button";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@sidebar";
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
  const [open, setOpen] = React.useState(true);
  return <SidebarProvider open={open} onOpenChange={setOpen}>
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
      <SidebarInset>
        <header {...sidebarNative("flex h-12 items-center justify-between px-4")}>
          <Button onClick={() => setOpen(open => !open)} size="sm" variant="ghost">
            {open ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
            <span>{open ? "Close" : "Open"} Sidebar</span>
          </Button>
        </header>
      </SidebarInset>
    </SidebarProvider>;
}
