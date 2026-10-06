import{custom5,custom0,custom1,custom2}from'@context-menu-customizations';
"use client"

import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@context-menu"

export function ContextMenuSides() {
  return (
    <div {...custom5}>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom0}
          >
            <span {...custom1}>
              Right click (top)
            </span>
            <span {...custom2}>
              Long press (top)
            </span>
          </div>
        </Pressable>
        <ContextMenu data-parity-portal placement="top start">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom0}
          >
            <span {...custom1}>
              Right click (right)
            </span>
            <span {...custom2}>
              Long press (right)
            </span>
          </div>
        </Pressable>
        <ContextMenu data-parity-portal placement="right top">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom0}
          >
            <span {...custom1}>
              Right click (bottom)
            </span>
            <span {...custom2}>
              Long press (bottom)
            </span>
          </div>
        </Pressable>
        <ContextMenu data-parity-portal placement="bottom start">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom0}
          >
            <span {...custom1}>
              Right click (left)
            </span>
            <span {...custom2}>
              Long press (left)
            </span>
          </div>
        </Pressable>
        <ContextMenu data-parity-portal placement="left top">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </div>
  )
}
