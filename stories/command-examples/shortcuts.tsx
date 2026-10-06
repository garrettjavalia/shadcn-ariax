import {commandDemo,commandFit,commandCard,commandZero} from "@command-customizations";
"use client"

import * as React from "react"
import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react"

import { Button } from "@button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@command"

export function CommandWithShortcuts() {
  const [open, setOpen] = React.useState(false)

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <Button onClick={() => setOpen(true)} variant="outline" {...commandFit}>
        Open Menu
      </Button>
      <CommandDialog data-parity-portal="" open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList
            renderEmptyState={() => (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          >
            <CommandGroup heading="Settings">
              <CommandItem textValue="Profile">
                <UserIcon />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem textValue="Billing">
                <CreditCardIcon />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem textValue="Settings">
                <SettingsIcon />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
