import{custom0,custom1,custom2,custom3,custom4}from'@context-menu-customizations';
"use client"

import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenuTrigger>
      <Pressable>
        <div data-parity-trigger
          role="button"
          {...custom0}
        >
          <span {...custom1}>
            Right click here
          </span>
          <span {...custom2}>
            Long press here
          </span>
        </div>
      </Pressable>
      <ContextMenu data-parity-portal {...custom3}>
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
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent data-parity-portal {...custom4}>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup
          selectionMode="multiple"
          defaultSelectedKeys={["bookmarks"]}
        >
          <ContextMenuItem id="bookmarks">Show Bookmarks</ContextMenuItem>
          <ContextMenuItem id="urls">Show Full URLs</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup
          selectionMode="single"
          defaultSelectedKeys={["pedro"]}
        >
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuItem id="pedro">Pedro Duarte</ContextMenuItem>
          <ContextMenuItem id="colm">Colm Tuite</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
