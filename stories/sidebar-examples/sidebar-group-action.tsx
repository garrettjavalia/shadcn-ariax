import { sidebarToast, sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { FrameIcon, MapIcon, PieChartIcon, PlusIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import { SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
export default function AppSidebar() {
  return <SidebarProvider>
      <Toaster position="bottom-left" toastOptions={sidebarToast} />
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction title="Add Project" onClick={() => toast("You clicked the group action!")}>
              <PlusIcon /> <span {...sidebarNative("sr-only")}>Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <FrameIcon />
                    <span>Design Engineering</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <PieChartIcon />
                    <span>Sales & Marketing</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <MapIcon />
                    <span>Travel</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
