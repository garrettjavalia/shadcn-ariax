import {commandDemo,commandFit,commandCard,commandZero} from "@command-customizations";
"use client"

import * as React from "react"

import { Button } from "@button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@command"

export function CommandBasic() {
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
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
