import { buttonProps } from './button';
type Key = "aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground" | "p-0" | "text-sm" | "py-0" | "pl-8" | "pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" | "flex h-16 shrink-0 items-center gap-2 px-4" | "flex flex-1 flex-col gap-4 p-4" | "grid auto-rows-min gap-4 md:grid-cols-3" | "aspect-video rounded-xl bg-muted/50" | "min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" | "group-data-open/menu-item:rotate-90" | "mt-auto" | "flex h-16 shrink-0 items-center gap-2 border-b px-4" | "bg-background" | "-mx-2" | "w-full bg-sidebar-primary text-sidebar-primary-foreground" | "ml-auto transition-transform duration-100 group-data-expanded/collapsible:rotate-90" | "flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12" | "flex flex-1 flex-col gap-4 p-4 pt-0" | "flex h-12 items-center justify-between px-4" | "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" | "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" | "size-4" | "grid flex-1 text-left text-sm leading-tight" | "truncate font-medium" | "truncate text-xs" | "ml-auto" | "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" | "text-xs text-muted-foreground" | "gap-2 p-2" | "flex size-6 items-center justify-center rounded-md border" | "size-3.5 shrink-0" | "flex size-6 items-center justify-center rounded-md border bg-transparent" | "font-medium text-muted-foreground" | "group/collapsible" | "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" | "group-data-[collapsible=icon]:hidden" | "sr-only" | "w-48 rounded-lg" | "text-muted-foreground" | "text-sidebar-foreground/70" | "h-8 w-8 rounded-lg" | "rounded-lg" | "ml-auto size-4" | "p-0 font-normal" | "flex items-center gap-2 px-1 py-1.5 text-left text-sm" | "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12" | "flex items-center gap-2 px-4" | "-ml-1" | "w-(--radix-popper-anchor-width)" | "text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" | "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" | "group-has-[[data-state=open]]/menu-item:bg-sidebar-accent" | "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" | "relative" | "absolute top-4 right-4 z-10 rtl:right-auto rtl:left-4" | "flex flex-col gap-0.5 leading-none" | "font-medium" | "" | "ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90 rtl:rotate-180 rtl:group-data-open/collapsible:rotate-90" | "data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground" | "grid flex-1 text-start text-sm leading-tight" | "ms-auto size-4";
export function sidebarCustom(key: Key) {
  return {
    className: key
  };
}
export const sidebarNative = sidebarCustom;
export const sidebarToast = {
  className: 'ml-[160px]'
};
export const sidebarTeamButton = buttonProps({
  size: "icon-sm",
  className: "size-8"
});
export const sidebarCustomized = (width: number) => ({
  className: width === 240 ? 'w-[240px]' : 'w-[300px]'
});
export const sidebarCustomizedButton = (width: number) => ({
  className: width === 240 ? '[&&&]:w-[244px]!' : '[&&&]:w-[304px]!'
});
export const sidebarAvatar = sidebarCustom;
