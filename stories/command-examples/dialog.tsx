import {commandDemo,commandFit,commandCard,commandZero} from "@command-customizations";
"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@command"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p style={{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'}}>
        Press{" "}
        <kbd style={{pointerEvents:'none',display:'inline-flex',height:20,alignItems:'center',gap:4,borderRadius:'.25rem',borderWidth:1,borderStyle:'solid',backgroundColor:'var(--muted)',paddingInline:6,fontFamily:'var(--font-mono)',fontSize:10,fontWeight:500,color:'var(--muted-foreground)',opacity:1,userSelect:'none'}}>
          <span style={{fontSize:'.75rem',lineHeight:'calc(1 / .75)'}}>⌘</span>J
        </kbd>
      </p>
      <CommandDialog data-parity-portal="" open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList
          renderEmptyState={() => (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        >
          <CommandGroup heading="Suggestions">
            <CommandItem textValue="Calendar">
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem textValue="Search Emoji">
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem textValue="Calculator">
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem textValue="Profile">
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem textValue="Billing">
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem textValue="Settings">
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
