import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@dropdown-menu";
import { SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
export default function AppSidebar() {
  return <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger>
                <SidebarMenuButton {...sidebarCustom("data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground")}>
                  Select Workspace
                  <ChevronDownIcon {...sidebarNative("ml-auto")} />
                </SidebarMenuButton>
                <DropdownMenu data-parity-portal {...sidebarCustom("w-(--radix-popper-anchor-width)")}>
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenu>
              </DropdownMenuTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header {...sidebarNative("flex h-12 items-center justify-between px-4")}>
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>;
}
