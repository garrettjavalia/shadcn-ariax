import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import { ChevronDownIcon, MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group"

export function InputGroupDropdown() {
  return (
    <div {...demoProps('inputStack')}>
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenuTrigger>
            <InputGroupButton variant="ghost" aria-label="More" size="icon-xs">
              <MoreHorizontal />
            </InputGroupButton>
            <DropdownMenu placement="bottom end" offset={8} crossOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenuTrigger>
            <InputGroupButton variant="ghost" {...demoStyle('dropdown')}>
              Search In... <ChevronDownIcon {...demoProps('smallIcon')} />
            </InputGroupButton>
            <DropdownMenu placement="bottom end" offset={8} crossOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
