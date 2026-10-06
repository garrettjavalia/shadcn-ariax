import{custom0,custom1,custom2}from'@context-menu-customizations';
"use client"

import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuBasic() {
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
      <ContextMenu data-parity-portal>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem isDisabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
