import {CalendarIcon,SmileIcon,CalculatorIcon,UserIcon,CreditCardIcon,SettingsIcon,HomeIcon,InboxIcon,FileTextIcon,FolderIcon,PlusIcon,FolderPlusIcon,CopyIcon,ScissorsIcon,ClipboardPasteIcon,TrashIcon,LayoutGridIcon,ListIcon,ZoomInIcon,ZoomOutIcon,BellIcon,HelpCircleIcon,ImageIcon,CodeIcon} from "lucide-react";
import {commandDemo,commandFit,commandCard,commandZero} from "@command-customizations";
"use client"

import * as React from "react"

import { Button } from "@button"
import { Card, CardContent } from "@card"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@command"
export function CommandInline() {
  return (
    <>
      <Card {...commandCard}>
        <CardContent {...commandZero}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList
              renderEmptyState={() => (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            >
              <CommandGroup heading="Suggestions">
                <CommandItem textValue="Calendar">
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem textValue="Search Emoji">
                  <SmileIcon />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem textValue="Calculator">
                  <CalculatorIcon />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
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
        </CardContent>
      </Card>
    </>
  )
}

export function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Button
          onPress={() => setOpen(true)}
          variant="outline"
          {...commandFit}
        >
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
    </>
  )
}

export function CommandWithShortcuts() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Button
          onPress={() => setOpen(true)}
          variant="outline"
          {...commandFit}
        >
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
    </>
  )
}

export function CommandWithGroups() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Button
          onPress={() => setOpen(true)}
          variant="outline"
          {...commandFit}
        >
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
                <CommandItem textValue="Calendar">
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem textValue="Search Emoji">
                  <SmileIcon />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem textValue="Calculator">
                  <CalculatorIcon />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
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
    </>
  )
}

export function CommandManyItems() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Button
          onPress={() => setOpen(true)}
          variant="outline"
          {...commandFit}
        >
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
              <CommandGroup heading="Navigation">
                <CommandItem textValue="Home">
                  <HomeIcon />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Inbox">
                  <InboxIcon />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Documents">
                  <FileTextIcon />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Folders">
                  <FolderIcon />
                  <span>Folders</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem textValue="New File">
                  <PlusIcon />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="New Folder">
                  <FolderPlusIcon />
                  <span>New Folder</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Copy">
                  <CopyIcon />
                  <span>Copy</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Cut">
                  <ScissorsIcon />
                  <span>Cut</span>
                  <CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Paste">
                  <ClipboardPasteIcon />
                  <span>Paste</span>
                  <CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Delete">
                  <TrashIcon />
                  <span>Delete</span>
                  <CommandShortcut>⌫</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <CommandItem textValue="Grid View">
                  <LayoutGridIcon />
                  <span>Grid View</span>
                </CommandItem>
                <CommandItem textValue="List View">
                  <ListIcon />
                  <span>List View</span>
                </CommandItem>
                <CommandItem textValue="Zoom In">
                  <ZoomInIcon />
                  <span>Zoom In</span>
                  <CommandShortcut>⌘+</CommandShortcut>
                </CommandItem>
                <CommandItem textValue="Zoom Out">
                  <ZoomOutIcon />
                  <span>Zoom Out</span>
                  <CommandShortcut>⌘-</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
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
                <CommandItem textValue="Notifications">
                  <BellIcon />
                  <span>Notifications</span>
                </CommandItem>
                <CommandItem textValue="Help & Support">
                  <HelpCircleIcon />
                  <span>Help & Support</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem textValue="Calculator">
                  <CalculatorIcon />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem textValue="Calendar">
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem textValue="Image Editor">
                  <ImageIcon />
                  <span>Image Editor</span>
                </CommandItem>
                <CommandItem textValue="Code Editor">
                  <CodeIcon />
                  <span>Code Editor</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </>
  )
}
