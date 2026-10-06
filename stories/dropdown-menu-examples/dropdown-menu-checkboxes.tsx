"use client"
// Pinned official example; only shared import and customization adapters differ.
import { dropdownCustom } from '@dropdown-menu-customizations';

import * as React from "react"
import type { Selection } from "react-aria-components"

import { Button } from "@button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dropdown-menu"

export function DropdownMenuCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["status-bar"])
  )

  return (
    <DropdownMenuTrigger>
      <Button variant="outline">Open</Button>
      <DropdownMenu {...dropdownCustom("w-40")}>
        <DropdownMenuGroup
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuItem id="status-bar">Status Bar</DropdownMenuItem>
          <DropdownMenuItem id="activity-bar" isDisabled>
            Activity Bar
          </DropdownMenuItem>
          <DropdownMenuItem id="panel">Panel</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}
