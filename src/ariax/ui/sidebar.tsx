"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Button as ButtonPrimitive,
  Link as LinkPrimitive,
  composeRenderProps,
  type ButtonProps,
  type LinkProps,
} from "react-aria-components";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipTrigger } from "./tooltip";
import { attrs, styles, useIsMobile } from "./sidebar.internal";
type Custom = {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
type Native<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentProps<T>,
  "className"
> &
  Custom;
export type SidebarProviderProps = Native<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export type SidebarProps = Native<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};
type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextProps | null>(null);
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className: _,
  xstyle,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) setOpenProp(openState);
      else _setOpen(openState);
      document.cookie = `sidebar_state=${openState}; path=/; max-age=${60 * 60 * 24 * 7}`;
    },
    [setOpenProp, open],
  );
  const toggleSidebar = React.useCallback(
    () =>
      isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open),
    [isMobile, setOpen],
  );
  React.useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const value = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );
  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        {...props}
        {...attrs(
          [styles.provider, xstyle],
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3rem",
            ...style,
          } as React.CSSProperties,
          "ariax-sidebar-wrapper",
        )}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className: _,
  xstyle,
  children,
  dir,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none")
    return (
      <div
        data-slot="sidebar"
        {...props}
        {...attrs([styles.plain, xstyle], props.style)}
      >
        {children}
      </div>
    );
  if (isMobile)
    return (
      <Sheet
        isOpen={openMobile}
        onOpenChange={setOpenMobile}
        dir={dir}
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        xstyle={[styles.mobile, xstyle]}
        style={
          {
            "--sidebar-width": "18rem",
          } as React.CSSProperties
        }
        side={side}
        {...props}
      >
        <SheetHeader xstyle={[styles.sr, styles.mobileHeader]}>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div {...attrs(styles.column)}>{children}</div>
      </Sheet>
    );
  return (
    <div
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      {...attrs(styles.shell, undefined, "ariax-sidebar")}
    >
      <div data-slot="sidebar-gap" {...attrs(styles.gap)} />
      <div
        data-slot="sidebar-container"
        data-side={side}
        {...props}
        {...attrs(
          [
            styles.container,
            (variant === "floating" || variant === "inset") &&
              styles.floatingContainer,
            xstyle,
          ],
          props.style,
        )}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          {...attrs(styles.inner)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
export function SidebarTrigger({
  className: _,
  xstyle,
  onPress,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      xstyle={xstyle}
      onPress={(event) => {
        onPress?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon {...attrs(styles.flip)} />
      <span {...attrs(styles.sr)}>Toggle Sidebar</span>
    </Button>
  );
}
export function SidebarRail({
  className: _,
  xstyle,
  style,
  ...props
}: Native<"button">) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
      {...attrs([styles.rail, xstyle], style)}
    />
  );
}
export function SidebarInset({
  className: _,
  xstyle,
  style,
  ...props
}: Native<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      {...props}
      {...attrs([styles.inset, xstyle], style)}
    />
  );
}
export function SidebarInput({
  className: _,
  xstyle,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      xstyle={[styles.input, xstyle]}
      {...props}
    />
  );
}
export function SidebarSeparator({
  className: _,
  xstyle,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      xstyle={[styles.separator, xstyle]}
      {...props}
    />
  );
}
function div(slot: string, base: stylex.StyleXStyles, marker?: string) {
  return function SidebarDiv({
    className: _,
    xstyle,
    style,
    ...props
  }: Native<"div">) {
    return (
      <div
        data-slot={"sidebar-" + slot}
        data-sidebar={slot}
        {...props}
        {...attrs([base, xstyle], style, marker)}
      />
    );
  };
}
export const SidebarHeader = div("header", styles.header);
export const SidebarFooter = div("footer", styles.header);
export const SidebarContent = div("content", styles.content);
export const SidebarGroup = div("group", styles.group);
export const SidebarGroupContent = div("group-content", styles.groupContent);
export const SidebarMenu = div("menu", styles.menu);
export const SidebarMenuItem = div(
  "menu-item",
  styles.item,
  "ariax-sidebar-menu-item",
);
export const SidebarMenuSubItem = function ({
  className: _,
  xstyle,
  style,
  ...props
}: Native<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...props}
      {...attrs([styles.item, xstyle], style)}
    />
  );
};
export function SidebarGroupLabel({
  className: _,
  xstyle,
  style,
  elementType: Element = "div",
  ...props
}: Omit<React.HTMLAttributes<HTMLElement>, "className"> &
  Custom & {
    elementType?: React.ElementType;
  }) {
  return (
    <Element
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      {...props}
      {...attrs([styles.label, xstyle], style, "ariax-sidebar-group-label")}
      {...(typeof Element === "string"
        ? {}
        : {
            xstyle: [styles.label, xstyle],
          })}
    />
  );
}
export function SidebarGroupAction({
  className: _,
  xstyle,
  style,
  ...props
}: Native<"button">) {
  return (
    <button
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      {...props}
      {...attrs(
        [styles.groupAction, xstyle],
        style,
        "ariax-sidebar-group-action",
      )}
    />
  );
}
export type SidebarMenuButtonProps = (
  | (Omit<LinkProps, "className"> & {
      href: string;
    })
  | (Omit<ButtonProps, "className"> & {
      href?: never;
    })
) &
  Custom & {
    isActive?: boolean;
    variant?: "default" | "outline" | null;
    size?: "default" | "sm" | "lg" | null;
    tooltip?: string | React.ComponentProps<typeof Tooltip>;
  };
export function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className: _,
  xstyle,
  style,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const applied = attrs(
    [
      styles.button,
      variant === "outline" && styles.outline,
      size === "default" && styles.normal,
      size === "sm" && styles.small,
      size === "lg" && styles.large,
      xstyle,
    ],
    undefined,
    "ariax-sidebar-menu-button",
  );
  const shared = {
    "data-slot": "sidebar-menu-button",
    "data-sidebar": "menu-button",
    "data-size": size,
    "data-active": isActive,
    ...applied,
  };
  const comp =
    props.href !== undefined ? (
      <LinkPrimitive
        {...shared}
        {...props}
        style={composeRenderProps(style as LinkProps["style"], (value) => ({
          ...applied.style,
          ...value,
        }))}
      />
    ) : (
      <ButtonPrimitive
        {...shared}
        {...props}
        style={composeRenderProps(style as ButtonProps["style"], (value) => ({
          ...applied.style,
          ...value,
        }))}
      />
    );
  if (!tooltip) return comp;
  return (
    <TooltipTrigger isDisabled={state !== "collapsed" || isMobile}>
      {comp}
      <Tooltip
        placement="right"
        {...(typeof tooltip === "string"
          ? {
              children: tooltip,
            }
          : tooltip)}
      />
    </TooltipTrigger>
  );
}
export function SidebarMenuAction({
  className: _,
  xstyle,
  style,
  showOnHover = false,
  ...props
}: Omit<ButtonProps, "className"> &
  Custom & {
    showOnHover?: boolean;
  }) {
  const applied = attrs(
    [styles.action, showOnHover && styles.hoverAction, xstyle],
    undefined,
    "ariax-sidebar-menu-action",
  );
  return (
    <ButtonPrimitive
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      {...props}
      {...applied}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  );
}
export const SidebarMenuBadge = div("menu-badge", styles.badge);
export function SidebarMenuSkeleton({
  className: _,
  xstyle,
  style,
  showIcon = false,
  ...props
}: Native<"div"> & {
  showIcon?: boolean;
}) {
  const [width] = React.useState(
    () => `${Math.floor(Math.random() * 40) + 50}%`,
  );
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...props}
      {...attrs([styles.skeleton, xstyle], style)}
    >
      {showIcon && (
        <Skeleton
          xstyle={styles.skeletonIcon}
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        xstyle={styles.skeletonText}
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
export function SidebarMenuSub({
  className: _,
  xstyle,
  style,
  ...props
}: Native<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...props}
      {...attrs([styles.sub, xstyle], style)}
    />
  );
}
export type SidebarMenuSubButtonProps = (
  | (Omit<LinkProps, "className"> & {
      href: string;
    })
  | (Omit<ButtonProps, "className"> & {
      href?: never;
    })
) &
  Custom & {
    size?: "sm" | "md";
    isActive?: boolean;
  };
export function SidebarMenuSubButton({
  size = "md",
  isActive = false,
  className: _,
  xstyle,
  style,
  ...props
}: SidebarMenuSubButtonProps) {
  const applied = attrs(
    [styles.subButton, xstyle],
    undefined,
    "ariax-sidebar-menu-sub-button",
  );
  const shared = {
    "data-slot": "sidebar-menu-sub-button",
    "data-sidebar": "menu-sub-button",
    "data-size": size,
    "data-active": isActive,
    ...applied,
  };
  return props.href !== undefined ? (
    <LinkPrimitive
      {...shared}
      {...props}
      style={composeRenderProps(style as LinkProps["style"], (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  ) : (
    <ButtonPrimitive
      {...shared}
      {...props}
      style={composeRenderProps(style as ButtonProps["style"], (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  );
}
