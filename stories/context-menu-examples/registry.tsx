import{custom6,custom7,custom8,custom4}from'@context-menu-customizations';
"use client"

import * as React from "react"
import { Pressable, type Selection } from "react-aria-components"

import { Button } from "@button"
import {
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@context-menu"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import{CopyIcon,ScissorsIcon,ClipboardPasteIcon,TrashIcon,PencilIcon,ShareIcon,ArchiveIcon}from'lucide-react'


export function ContextMenuBasic() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
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
    </>
  )
}

export function ContextMenuWithIcons() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuItem>
              <CopyIcon/>
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <ScissorsIcon/>
              Cut
            </ContextMenuItem>
            <ContextMenuItem>
              <ClipboardPasteIcon/>
              Paste
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem variant="destructive">
              <TrashIcon/>
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithShortcuts() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem isDisabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Save
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Save As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithSubmenu() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent data-parity-portal>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithGroups() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuLabel>File</ContextMenuLabel>
            <ContextMenuItem>
              New File
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Open File
              <ContextMenuShortcut>⌘O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Save
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Edit</ContextMenuLabel>
            <ContextMenuItem>
              Undo
              <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Redo
              <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Paste
              <ContextMenuShortcut>⌘V</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem variant="destructive">
              Delete
              <ContextMenuShortcut>⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["bookmarks-bar", "developer-tools"])
  )

  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
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
    </>
  )
}

export function ContextMenuWithRadio() {
  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuGroup
              selectionMode="single"
              selectedKeys={[user]}
              onSelectionChange={(keys) =>
                setUser(
                  keys === "all"
                    ? "pedro"
                    : (keys.values().next().value as string)
                )
              }
            >
              <ContextMenuItem id="pedro">Pedro Duarte</ContextMenuItem>
              <ContextMenuItem id="colm">Colm Tuite</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Theme</ContextMenuLabel>
            <ContextMenuGroup
              selectionMode="single"
              selectedKeys={theme}
              onSelectionChange={(keys) =>
                setTheme(
                  keys === "all"
                    ? "light"
                    : (keys.values().next().value as string)
                )
              }
            >
              <ContextMenuItem id="light">Light</ContextMenuItem>
              <ContextMenuItem id="dark">Dark</ContextMenuItem>
              <ContextMenuItem id="system">System</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithDestructive() {
  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal>
          <ContextMenuGroup>
            <ContextMenuItem>
              <PencilIcon/>
              Edit
            </ContextMenuItem>
            <ContextMenuItem>
              <ShareIcon/>
              Share
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <ArchiveIcon/>
              Archive
            </ContextMenuItem>
            <ContextMenuItem variant="destructive">
              <TrashIcon/>
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}

export function ContextMenuWithSides() {
  return (
    <>
      <div {...custom7}>
        {(
          [
            { label: "start", placement: "start top" },
            { label: "left", placement: "left top" },
            { label: "top", placement: "top start" },
            { label: "bottom", placement: "bottom start" },
            { label: "right", placement: "right top" },
            { label: "end", placement: "end top" },
          ] as const
        ).map(({ label, placement }) => (
          <ContextMenuTrigger key={placement}>
            <Pressable>
              <div data-parity-trigger
                role="button"
                {...custom8}
              >
                {label}
              </div>
            </Pressable>
            <ContextMenu data-parity-portal placement={placement}>
              <ContextMenuGroup>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuItem>Reload</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenu>
          </ContextMenuTrigger>
        ))}
      </div>
    </>
  )
}

export function ContextMenuInDialog() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Context Menu Example</DialogTitle>
            <DialogDescription>
              Right click on the area below to see the context menu.
            </DialogDescription>
          </DialogHeader>
          <ContextMenuTrigger>
            <Pressable>
              <div data-parity-trigger
                role="button"
                {...custom6}
              >
                Right click here
              </div>
            </Pressable>
            <ContextMenu data-parity-portal>
              <ContextMenuGroup>
                <ContextMenuItem>
                  <CopyIcon/>
                  Copy
                </ContextMenuItem>
                <ContextMenuItem>
                  <ScissorsIcon/>
                  Cut
                </ContextMenuItem>
                <ContextMenuItem>
                  <ClipboardPasteIcon/>
                  Paste
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
                <ContextMenuSubContent data-parity-portal>
                  <ContextMenuGroup>
                    <ContextMenuItem>Save Page...</ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuItem>Name Window...</ContextMenuItem>
                  </ContextMenuGroup>
                  <ContextMenuSeparator />
                  <ContextMenuGroup>
                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                  </ContextMenuGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  <TrashIcon/>
                  Delete
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenu>
          </ContextMenuTrigger>
        </Dialog>
      </DialogTrigger>
    </>
  )
}

export function ContextMenuWithInset() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["bookmarks"])
  )
  const [theme, setTheme] = React.useState("system")

  return (
    <>
      <ContextMenuTrigger>
        <Pressable>
          <div data-parity-trigger
            role="button"
            {...custom6}
          >
            Right click here
          </div>
        </Pressable>
        <ContextMenu data-parity-portal {...custom4}>
          <ContextMenuGroup>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem>
              <CopyIcon/>
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <ScissorsIcon/>
              Cut
            </ContextMenuItem>
            <ContextMenuItem inset>Paste</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <ContextMenuLabel inset>Appearance</ContextMenuLabel>
            <ContextMenuItem inset id="bookmarks">
              Bookmarks
            </ContextMenuItem>
            <ContextMenuItem inset id="urls">
              Full URLs
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup
            selectionMode="single"
            selectedKeys={[theme]}
            onSelectionChange={(keys) =>
              setTheme(
                keys === "all"
                  ? "system"
                  : (keys.values().next().value as string)
              )
            }
          >
            <ContextMenuLabel inset>Theme</ContextMenuLabel>
            <ContextMenuItem inset id="light">
              Light
            </ContextMenuItem>
            <ContextMenuItem inset id="dark">
              Dark
            </ContextMenuItem>
            <ContextMenuItem inset id="system">
              System
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Options</ContextMenuSubTrigger>
            <ContextMenuSubContent data-parity-portal>
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenu>
      </ContextMenuTrigger>
    </>
  )
}
