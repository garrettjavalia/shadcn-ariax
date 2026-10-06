import{custom0,custom1,custom2}from'@context-menu-customizations';
"use client"

import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuShortcuts() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <div data-parity-trigger {...custom0}>
          <span {...custom1}>
            Right click here
          </span>
          <span {...custom2}>
            Long press here
          </span>
        </div>
      </Pressable>
      <ContextMenu data-parity-portal>
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem isDisabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
