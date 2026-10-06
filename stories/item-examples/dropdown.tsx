import { itemCustom } from "@item-customizations";
import { nativeItem } from "./native";
"use client"

import { ChevronDownIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"
import { Button } from "@button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@item"

const people = [
  {
    username: "alex",
    avatar: "/avatars/01.png",
    email: "alex@example.com",
  },
  {
    username: "jamie",
    avatar: "/avatars/02.png",
    email: "jamie@example.com",
  },
  {
    username: "taylor",
    avatar: "/avatars/03.png",
    email: "taylor@example.com",
  },
]

export function ItemDropdown() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline">
        Select <ChevronDownIcon />
      </Button>
      <DropdownMenu data-parity-portal {...itemCustom("w-48")} placement="bottom end">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item size="xs" {...itemCustom("w-full p-2")}>
                <ItemMedia>
                  <Avatar {...itemCustom("size-(--avatar-size) [--avatar-size:--spacing(6.5)]")}>
                    <AvatarImage src={person.avatar} {...itemCustom("grayscale")} />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent {...itemCustom("gap-0")}>
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription {...itemCustom("leading-none")}>
                    {person.email}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}
