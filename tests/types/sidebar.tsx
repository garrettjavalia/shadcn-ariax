import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Sidebar,
  SidebarProvider,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarGroupLabel,
} from "@sidebar";
import { CollapsibleTrigger } from "@collapsible";
const styles = stylex.create({
  width: (width: number) => ({
    width,
  }),
});
<SidebarProvider
  open={true}
  onOpenChange={(value) => {
    const open: boolean = value;
  }}
  xstyle={styles.width(500)}
>
  <Sidebar
    ref={React.createRef<HTMLDivElement>()}
    variant="inset"
    side="right"
    collapsible="icon"
    xstyle={styles.width(260)}
  />
</SidebarProvider>;
<SidebarMenuButton
  onPress={() => {}}
  style={({ isPending }) => ({
    opacity: isPending ? 0.5 : 1,
  })}
/>;
<SidebarMenuButton
  href="#"
  style={({ isCurrent }) => ({
    opacity: isCurrent ? 1 : 0.5,
  })}
/>;
<SidebarMenuSubButton
  href="#"
  size="sm"
  style={({ isCurrent }) => ({
    opacity: isCurrent ? 1 : 0.5,
  })}
/>;
<SidebarGroupLabel elementType={CollapsibleTrigger}>Group</SidebarGroupLabel>;
// @ts-expect-error external class unsupported
<Sidebar className="x" />;
// @ts-expect-error external class unsupported
<SidebarProvider className="x" />;
// @ts-expect-error external class unsupported
<SidebarMenuButton className="x" />;
// @ts-expect-error source variant contract
<Sidebar variant="overlay" />;
// @ts-expect-error source size contract
<SidebarMenuSubButton size="lg" />;
// @ts-expect-error original trigger callback uses PressEvent
<SidebarTrigger onPress={(event: MouseEvent) => {}} />;
