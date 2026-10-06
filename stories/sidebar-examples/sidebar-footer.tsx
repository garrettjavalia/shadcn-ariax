import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { ChevronUpIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@dropdown-menu";
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
export default function AppSidebar() {
  return <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger>
                <SidebarMenuButton {...sidebarCustom("data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground")}>
                  Username
                  <ChevronUpIcon {...sidebarNative("ml-auto")} />
                </SidebarMenuButton>
                <DropdownMenu data-parity-portal placement="top start" {...sidebarCustom("w-(--radix-popper-anchor-width)")}>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenu>
              </DropdownMenuTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header {...sidebarNative("flex h-12 items-center justify-between px-4")}>
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>;
}
