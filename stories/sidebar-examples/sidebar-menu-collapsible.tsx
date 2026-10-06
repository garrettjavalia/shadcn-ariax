import { sidebarCustom, sidebarNative } from "@sidebar-customizations";
"use client";
import { ChevronRightIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@collapsible";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@sidebar";
import { Sidebar, SidebarMenuButton } from "./portal";
const items = [{
  title: "Getting Started",
  url: "#",
  items: [{
    title: "Installation",
    url: "#"
  }, {
    title: "Project Structure",
    url: "#"
  }]
}, {
  title: "Build Your Application",
  url: "#",
  items: [{
    title: "Routing",
    url: "#"
  }, {
    title: "Data Fetching",
    url: "#",
    isActive: true
  }, {
    title: "Rendering",
    url: "#"
  }, {
    title: "Caching",
    url: "#"
  }, {
    title: "Styling",
    url: "#"
  }, {
    title: "Optimizing",
    url: "#"
  }, {
    title: "Configuring",
    url: "#"
  }, {
    title: "Testing",
    url: "#"
  }, {
    title: "Authentication",
    url: "#"
  }, {
    title: "Deploying",
    url: "#"
  }, {
    title: "Upgrading",
    url: "#"
  }, {
    title: "Examples",
    url: "#"
  }]
}, {
  title: "API Reference",
  url: "#",
  items: [{
    title: "Components",
    url: "#"
  }, {
    title: "File Conventions",
    url: "#"
  }, {
    title: "Functions",
    url: "#"
  }, {
    title: "next.config.js Options",
    url: "#"
  }, {
    title: "CLI",
    url: "#"
  }, {
    title: "Edge Runtime",
    url: "#"
  }]
}, {
  title: "Architecture",
  url: "#",
  items: [{
    title: "Accessibility",
    url: "#"
  }, {
    title: "Fast Refresh",
    url: "#"
  }, {
    title: "Next.js Compiler",
    url: "#"
  }, {
    title: "Supported Browsers",
    url: "#"
  }, {
    title: "Turbopack",
    url: "#"
  }]
}];
export default function AppSidebar() {
  return <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => <Collapsible key={index} {...sidebarCustom("group/collapsible")} defaultExpanded={index === 0}>
                    <SidebarMenuItem>
                      <SidebarMenuButton slot="trigger">
                        <span>{item.title}</span>
                        <ChevronRightIcon {...sidebarNative("ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90")} />
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, subIndex) => <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton href={subItem.url}>
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>)}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>;
}
