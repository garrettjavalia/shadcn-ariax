import{custom0,custom1,custom2}from'@context-menu-customizations';
"use client"

import { useState } from "react"
import { Pressable, type Selection } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuCheckboxes() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["bookmarks-bar", "developer-tools"])
  )

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
        <ContextMenuGroup
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <ContextMenuItem id="bookmarks-bar">
            Show Bookmarks Bar
          </ContextMenuItem>
          <ContextMenuItem>Show Full URLs</ContextMenuItem>
          <ContextMenuItem id="developer-tools">
            Show Developer Tools
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
