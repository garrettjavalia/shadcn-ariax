"use client";
import { applied, resolveStyle } from "./style-props.internal";
import { animationStyles } from "./animations.stylex";
import type { ComponentProps, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import {
  composeRenderProps,
  Header,
  MenuItem,
  Menu,
  MenuSection,
  MenuTrigger,
  Popover,
  Separator,
  SubmenuTrigger,
  type MenuItemProps,
  type MenuSectionProps,
} from "react-aria-components";

type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type ContextMenuProps = Styled<
  Omit<ComponentProps<typeof Menu<object>>, "children"> &
    Pick<
      ComponentProps<typeof Popover>,
      "placement" | "offset" | "crossOffset"
    > & { "data-slot"?: string; children?: ReactNode }
>;
const styles = stylex.create({
  content: {
    animationDuration: {
      default: null,
      ":is([data-entering], [data-exiting])": "100ms",
    },
    animationTimingFunction: {
      default: null,
      ":is([data-entering], [data-exiting])": "ease",
    },
    "--ariax-enter-opacity": { default: 1, ":is([data-entering])": 0 },
    "--ariax-enter-scale": { default: 1, ":is([data-entering])": 0.95 },
    "--ariax-exit-opacity": { default: 1, ":is([data-exiting])": 0 },
    "--ariax-exit-scale": { default: 1, ":is([data-exiting])": 0.95 },
    "--ariax-enter-x": {
      default: "0px",
      ':is([data-placement="left"])': "calc(var(--ariax-spacing, .25rem) * 2)",
      ':is([data-placement="right"])':
        "calc(var(--ariax-spacing, .25rem) * -2)",
    },
    "--ariax-enter-y": {
      default: "0px",
      ':is([data-placement="bottom"])':
        "calc(var(--ariax-spacing, .25rem) * -2)",
      ':is([data-placement="top"])': "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    zIndex: 50,
    width: "var(--trigger-width)",
    transformOrigin: "var(--trigger-anchor-point)",
    overflowX: "hidden",
    overflowY: { default: "auto", ":is([data-exiting])": "hidden" },
    outlineStyle: "none",
    minWidth: "calc(var(--ariax-spacing, .25rem) * 36)",
    borderRadius: "var(--radius)",
    padding: "calc(var(--ariax-spacing, .25rem) * 1)",
    backgroundColor: "var(--popover)",
    color: "var(--popover-foreground)",
    boxShadow:
      "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)",
    transitionDuration: "100ms",
  },
  subContent: {
    width: "auto",
    minWidth: "calc(var(--ariax-spacing, .25rem) * 32)",
    borderWidth: 1,
    borderStyle: "solid",
    boxShadow:
      "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)",
  },
  menu: {
    maxHeight: "inherit",
    overflowX: "hidden",
    overflowY: "auto",
    outlineStyle: {
      default: "none",
      "@media (forced-colors: active)": "solid",
    },
    outlineWidth: { default: null, "@media (forced-colors: active)": 2 },
    outlineColor: {
      default: null,
      "@media (forced-colors: active)": "transparent",
    },
    outlineOffset: { default: null, "@media (forced-colors: active)": 2 },
  },
  label: {
    color: "var(--muted-foreground)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1)",
    paddingInlineStart:
      "var(--ariax-context-inset, calc(var(--ariax-spacing, .25rem) * 1.5))",
    paddingInlineEnd: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
    fontWeight: 500,
    "--ariax-context-inset": {
      default: "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ":is([data-inset])": "calc(var(--ariax-spacing, .25rem) * 7)",
    },
  },
  item: {
    position: "relative",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    outlineStyle: {
      default: "none",
      "@media (forced-colors: active)": "solid",
    },
    outlineWidth: { default: null, "@media (forced-colors: active)": 2 },
    outlineColor: {
      default: null,
      "@media (forced-colors: active)": "transparent",
    },
    outlineOffset: { default: null, "@media (forced-colors: active)": 2 },
    userSelect: "none",
    pointerEvents: { default: null, ":is([data-disabled])": "none" },
    opacity: { default: null, ":is([data-disabled])": 0.5 },
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    borderRadius: "calc(var(--radius) * .8)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1)",
    paddingInlineStart:
      "var(--ariax-context-inset, calc(var(--ariax-spacing, .25rem) * 1.5))",
    paddingInlineEnd:
      "var(--ariax-context-end, calc(var(--ariax-spacing, .25rem) * 1.5))",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    "--ariax-context-inset": {
      default: "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ":is([data-inset])": "calc(var(--ariax-spacing, .25rem) * 7)",
    },
    backgroundColor: {
      default: null,
      ":focus": "var(--accent)",
      ":is(.ariax-context-content *)[data-focused]":
        "color-mix(in oklab, var(--foreground) 10%, transparent)",
    },
    color: { default: null, ":focus": "var(--accent-foreground)" },
  },
  destructive: {
    backgroundColor: {
      default: null,
      ':is(.ariax-context-content *)[data-focused]:not([data-variant="destructive"]:focus)':
        "color-mix(in oklab, var(--foreground) 10%, transparent)",
      ':is([data-variant="destructive"]):focus':
        "color-mix(in oklab, var(--destructive) 10%, transparent)",
      ':is(.dark *)[data-variant="destructive"]:focus':
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
    },
    color: {
      default: null,
      ':is([data-variant="destructive"])': "var(--destructive)",
      ':is([data-variant="destructive"]):focus': "var(--destructive)",
    },
  },
  selection: {
    "--ariax-context-end": "calc(var(--ariax-spacing, .25rem) * 8)",
  },
  subTrigger: {
    display: "flex",
    cursor: "default",
    alignItems: "center",
    outlineStyle: {
      default: "none",
      "@media (forced-colors: active)": "solid",
    },
    outlineWidth: { default: null, "@media (forced-colors: active)": 2 },
    outlineColor: {
      default: null,
      "@media (forced-colors: active)": "transparent",
    },
    outlineOffset: { default: null, "@media (forced-colors: active)": 2 },
    userSelect: "none",
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    borderRadius: "calc(var(--radius) * .8)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1)",
    paddingInlineStart:
      "var(--ariax-context-inset, calc(var(--ariax-spacing, .25rem) * 1.5))",
    paddingInlineEnd: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    "--ariax-context-inset": {
      default: "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ":is([data-inset])": "calc(var(--ariax-spacing, .25rem) * 7)",
    },
    backgroundColor: {
      default: null,
      ":focus": "var(--accent)",
      ":is([data-open])": "var(--accent)",
    },
    color: {
      default: null,
      ":focus": "var(--accent-foreground)",
      ":is([data-open])": "var(--accent-foreground)",
    },
  },
  indicator: {
    position: "absolute",
    insetInlineEnd: "calc(var(--ariax-spacing, .25rem) * 2)",
    pointerEvents: "none",
  },
  chevron: {
    marginInlineStart: "auto",
    rotate: {
      default: null,
      ':where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)': "180deg",
    },
  },
  separator: {
    backgroundColor: "var(--border)",
    marginInline: "calc(var(--ariax-spacing, .25rem) * -1)",
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 1)",
    height: 1,
  },
  shortcut: {
    color: {
      default: "var(--muted-foreground)",
      ":is(.ariax-context-item:focus *)": "var(--accent-foreground)",
    },
    marginInlineStart: "auto",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
    letterSpacing: ".1em",
  },
});

export function ContextMenuTrigger(
  props: Omit<ComponentProps<typeof MenuTrigger>, "trigger">,
) {
  return (
    <MenuTrigger data-slot="context-menu" trigger="contextMenu" {...props} />
  );
}
export function ContextMenu({
  "data-slot": dataSlot = "context-menu-content",
  placement = "bottom start",
  offset = 4,
  crossOffset = 0,
  xstyle,
  className: _,
  children,
  ...props
}: ContextMenuProps) {
  const sx = stylex.props(animationStyles.overlay, styles.content, xstyle);
  const menu = stylex.props(styles.menu);
  return (
    <Popover
      data-slot={dataSlot}
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      className={["ariax-context-content", sx.className]
        .filter(Boolean)
        .join(" ")}
      style={sx.style}
    >
      <Menu className={menu.className} {...props}>
        {children}
      </Menu>
    </Popover>
  );
}
export function ContextMenuGroup({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<
  Omit<MenuSectionProps<object>, "children"> & { children?: ReactNode }
>) {
  const sx = stylex.props(xstyle);
  return (
    <MenuSection
      data-slot="context-menu-group"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function ContextMenuLabel({
  className: _,
  xstyle,
  inset,
  style,
  ...props
}: Styled<ComponentProps<typeof Header>> & { inset?: boolean }) {
  return (
    <Header
      data-slot="context-menu-label"
      data-inset={inset}
      {...props}
      {...applied(styles.label, xstyle, style)}
    />
  );
}
export function ContextMenuItem({
  className: _,
  xstyle,
  inset,
  variant = "default",
  style,
  children,
  ...props
}: Styled<MenuItemProps<object>> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuItem
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      className={(state) => {
        const sx = stylex.props(
          styles.item,
          state.selectionMode === "none"
            ? variant === "destructive" && styles.destructive
            : styles.selection,
          xstyle,
        );
        return [
          "ariax-context-item",
          state.selectionMode === "none"
            ? "ariax-context-item-none"
            : "ariax-context-item-selection",
          sx.className,
        ]
          .filter(Boolean)
          .join(" ");
      }}
      style={(state) => ({
        ...stylex.props(
          styles.item,
          state.selectionMode === "none"
            ? variant === "destructive" && styles.destructive
            : styles.selection,
          xstyle,
        ).style,
        ...resolveStyle(style, state),
      })}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, selectionMode }) => (
          <>
            {selectionMode !== "none" && (
              <span
                data-slot={
                  selectionMode === "single"
                    ? "context-menu-radio-item-indicator"
                    : "context-menu-checkbox-item-indicator"
                }
                {...applied(styles.indicator, undefined, undefined)}
              >
                {isSelected ? <CheckIcon /> : null}
              </span>
            )}
            {children}
          </>
        ),
      )}
    </MenuItem>
  );
}
export function ContextMenuSub(props: ComponentProps<typeof SubmenuTrigger>) {
  return <SubmenuTrigger data-slot="context-menu-sub" {...props} />;
}
export function ContextMenuSubTrigger({
  className: _,
  xstyle,
  inset,
  children,
  style,
  ...props
}: Styled<MenuItemProps<object>> & { inset?: boolean }) {
  const sx = stylex.props(styles.subTrigger, xstyle);
  return (
    <MenuItem
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      textValue={typeof children === "string" ? children : props.textValue}
      {...props}
      className={["ariax-context-sub-trigger", sx.className]
        .filter(Boolean)
        .join(" ")}
      style={(state) => ({ ...sx.style, ...resolveStyle(style, state) })}
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <ChevronRightIcon
            {...applied(styles.chevron, undefined, undefined)}
          />
        </>
      ))}
    </MenuItem>
  );
}
export function ContextMenuSubContent({
  placement = "end top",
  crossOffset = -3,
  offset = 0,
  xstyle,
  className: _,
  ...props
}: ContextMenuProps) {
  return (
    <ContextMenu
      data-slot="context-menu-sub-content"
      placement={placement}
      crossOffset={crossOffset}
      offset={offset}
      {...props}
      xstyle={[styles.subContent, xstyle]}
    />
  );
}
export function ContextMenuSeparator({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<ComponentProps<typeof Separator>>) {
  const sx = stylex.props(styles.separator, xstyle);
  return (
    <Separator
      data-slot="context-menu-separator"
      {...props}
      className={sx.className}
      style={sx.style ? { ...sx.style, ...style } : style}
    />
  );
}
export function ContextMenuShortcut({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<ComponentProps<"span">>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      {...props}
      {...applied(styles.shortcut, xstyle, style)}
    />
  );
}
