import {dropdownExampleStyle,dropdownNativeExampleStyle} from '@dropdown-menu-customizations';
"use client"

import * as React from "react"
import type { Selection } from "react-aria-components"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"
import { Button } from "@button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import { UserIcon, CreditCardIcon, SettingsIcon, LogOutIcon, LayoutIcon, ActivityIcon, PanelLeftIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, MailIcon, MessageSquareIcon, BellIcon, WalletIcon, Building2Icon, PencilIcon, ShareIcon, ArchiveIcon, TrashIcon, BadgeCheckIcon, ChevronsUpDownIcon, CopyIcon, ScissorsIcon, ClipboardPasteIcon, UsersIcon, PlusCircleIcon, HelpCircleIcon } from "lucide-react"


export function DropdownMenuBasic() {
  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem isDisabled>API</DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuSides() {
  return (
    <section>
      <div {...dropdownNativeExampleStyle("flex flex-wrap justify-center gap-2")}>
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
          <DropdownMenuTrigger key={placement}>
            <Button variant="outline" {...dropdownExampleStyle("w-fit capitalize")}>
              {label}
            </Button>
            <DropdownMenu placement={placement}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        ))}
      </div>
    </section>
  )
}

export function DropdownMenuWithIcons() {
  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuItem>
            <UserIcon
            />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon
            />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon
            />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOutIcon
            />
            Log out
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithShortcuts() {
  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithSubmenu() {
  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Open
        </Button>
        <DropdownMenu>
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithCheckboxes() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["status-bar"])
  )

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Checkboxes
        </Button>
        <DropdownMenu {...dropdownExampleStyle("min-w-40")}>
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuItem id="status-bar">
              <LayoutIcon
              />
              Status Bar
            </DropdownMenuItem>
            <DropdownMenuItem id="activity-bar" isDisabled>
              <ActivityIcon
              />
              Activity Bar
            </DropdownMenuItem>
            <DropdownMenuItem id="panel">
              <PanelLeftIcon
              />
              Panel
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithRadio() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Radio Group
        </Button>
        <DropdownMenu>
          <DropdownMenuGroup
            selectionMode="single"
            selectedKeys={[position]}
            onSelectionChange={(keys) =>
              setPosition(
                keys === "all"
                  ? "bottom"
                  : (keys.values().next().value as string)
              )
            }
          >
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuItem id="top">
              <ArrowUpIcon
              />
              Top
            </DropdownMenuItem>
            <DropdownMenuItem id="bottom">
              <ArrowDownIcon
              />
              Bottom
            </DropdownMenuItem>
            <DropdownMenuItem id="right" isDisabled>
              <ArrowRightIcon
              />
              Right
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithCheckboxesIcons() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["email", "push"])
  )

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Notifications
        </Button>
        <DropdownMenu {...dropdownExampleStyle("min-w-56")}>
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuItem id="email">
              <MailIcon
              />
              Email notifications
            </DropdownMenuItem>
            <DropdownMenuItem id="sms">
              <MessageSquareIcon
              />
              SMS notifications
            </DropdownMenuItem>
            <DropdownMenuItem id="push">
              <BellIcon
              />
              Push notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithRadioIcons() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Payment Method
        </Button>
        <DropdownMenu {...dropdownExampleStyle("min-w-56")}>
          <DropdownMenuGroup
            selectionMode="single"
            selectedKeys={[paymentMethod]}
            onSelectionChange={(keys) =>
              setPaymentMethod(
                keys === "all" ? "card" : (keys.values().next().value as string)
              )
            }
          >
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuItem id="card">
              <CreditCardIcon
              />
              Credit Card
            </DropdownMenuItem>
            <DropdownMenuItem id="paypal">
              <WalletIcon
              />
              PayPal
            </DropdownMenuItem>
            <DropdownMenuItem id="bank">
              <Building2Icon
              />
              Bank Transfer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithDestructive() {
  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Actions
        </Button>
        <DropdownMenu>
          <DropdownMenuItem>
            <PencilIcon
            />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon
            />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ArchiveIcon
            />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <TrashIcon
            />
            Delete
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuWithAvatar() {
  const menuContent = (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheckIcon
          />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon
          />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BellIcon
          />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOutIcon
        />
        Sign Out
      </DropdownMenuItem>
    </>
  )

  return (
    <section>
      <div {...dropdownNativeExampleStyle("flex items-center justify-between gap-4")}>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            {...dropdownExampleStyle("h-12 justify-start px-2 md:max-w-[200px] style-sera:font-normal style-sera:tracking-normal style-sera:normal-case")}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback {...dropdownExampleStyle("rounded-lg")}>CN</AvatarFallback>
            </Avatar>
            <div {...dropdownNativeExampleStyle("grid flex-1 text-left text-sm leading-tight")}>
              <span {...dropdownNativeExampleStyle("truncate font-semibold")}>shadcn</span>
              <span {...dropdownNativeExampleStyle("truncate text-xs text-muted-foreground")}>
                shadcn@example.com
              </span>
            </div>
            <ChevronsUpDownIcon {...dropdownNativeExampleStyle("ml-auto text-muted-foreground")} />
          </Button>
          <DropdownMenu {...dropdownExampleStyle("w-(--anchor-width) min-w-56")}>
            {menuContent}
          </DropdownMenu>
        </DropdownMenuTrigger>

        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" {...dropdownExampleStyle("rounded-full")}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
          <DropdownMenu placement="top end">{menuContent}</DropdownMenu>
        </DropdownMenuTrigger>
      </div>
    </section>
  )
}

export function DropdownMenuInDialog() {
  return (
    <section>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Dropdown Menu Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the dropdown menu.
            </DialogDescription>
          </DialogHeader>

          <DropdownMenuTrigger>
            <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
              Open Menu
            </Button>
            <DropdownMenu>
              <DropdownMenuItem>
                <CopyIcon
                />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ScissorsIcon
                />
                Cut
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardPasteIcon
                />
                Paste
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  <DropdownMenuItem>Save Page...</DropdownMenuItem>
                  <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                  <DropdownMenuItem>Name Window...</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Developer Tools</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <TrashIcon
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </Dialog>
      </DialogTrigger>
    </section>
  )
}

export function DropdownMenuWithInset() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["bookmarks"])
  )
  const [theme, setTheme] = React.useState("system")

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Open
        </Button>
        <DropdownMenu {...dropdownExampleStyle("w-44")}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <CopyIcon
              />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ScissorsIcon
              />
              Cut
            </DropdownMenuItem>
            <DropdownMenuItem inset>Paste</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
            <DropdownMenuItem inset id="bookmarks">
              Bookmarks
            </DropdownMenuItem>
            <DropdownMenuItem inset id="urls">
              Full URLs
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup
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
            <DropdownMenuLabel inset>Theme</DropdownMenuLabel>
            <DropdownMenuItem inset id="light">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem inset id="dark">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem inset id="system">
              System
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>More Options</DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Save Page...</DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}

export function DropdownMenuComplex() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["sidebar"])
  )

  return (
    <section>
      <DropdownMenuTrigger>
        <Button variant="outline" {...dropdownExampleStyle("w-fit")}>
          Complex Menu
        </Button>
        <DropdownMenu {...dropdownExampleStyle("w-56")}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <UserIcon
              />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon
              />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon
              />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuItem id="sidebar">
              <PanelLeftIcon
              />
              Sidebar
            </DropdownMenuItem>
            <DropdownMenuItem id="status-bar">
              <LayoutIcon
              />
              Status Bar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UsersIcon
                />
                Invite Users
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <MailIcon
                    />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquareIcon
                    />
                    Message
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <PlusCircleIcon
                    />
                    More...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HelpCircleIcon
              />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOutIcon
              />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </section>
  )
}
