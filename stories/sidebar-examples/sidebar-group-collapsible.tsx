import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { ChevronDownIcon, LifeBuoyIcon, SendIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@collapsible";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarProvider } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
export default function AppSidebar() {
  return <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Collapsible defaultExpanded {...sidebarCustom("group/collapsible")}>
            <SidebarGroup>
              <SidebarGroupLabel elementType={CollapsibleTrigger} {...sidebarCustom("text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                Help
                <ChevronDownIcon {...sidebarNative("ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180")} />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <LifeBuoyIcon />
                        Support
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SendIcon />
                        Feedback
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
