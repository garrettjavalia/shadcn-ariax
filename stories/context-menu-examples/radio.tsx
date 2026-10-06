import{custom0,custom1,custom2}from'@context-menu-customizations';
"use client"

import * as React from "react"
import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuRadio() {
  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

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
          selectionMode="single"
          selectedKeys={[user]}
          onSelectionChange={(keys) =>
            setUser(
              keys === "all" ? "pedro" : (keys.values().next().value as string)
            )
          }
        >
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuItem id="pedro">Pedro Duarte</ContextMenuItem>
          <ContextMenuItem id="colm">Colm Tuite</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup
          selectionMode="single"
          selectedKeys={[theme]}
          onSelectionChange={(keys) =>
            setTheme(
              keys === "all" ? "system" : (keys.values().next().value as string)
            )
          }
        >
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuItem id="light">Light</ContextMenuItem>
          <ContextMenuItem id="dark">Dark</ContextMenuItem>
          <ContextMenuItem id="system">System</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  )
}
