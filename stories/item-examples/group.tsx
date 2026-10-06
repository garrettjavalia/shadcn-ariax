import { itemCustom } from "@item-customizations";
import { nativeItem } from "./native";
import * as React from "react"
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"
import { Button } from "@button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@item"

const people = [
  {
    username: "alex",
    avatar: "/avatar-controlled.svg",
    email: "alex@example.com",
  },
  {
    username: "jamie",
    avatar: "/avatar-controlled.svg",
    email: "jamie@example.com",
  },
  {
    username: "taylor",
    avatar: "/avatar-controlled.svg",
    email: "taylor@example.com",
  },
]

export function ItemGroupExample() {
  return (
    <ItemGroup {...itemCustom("max-w-sm")}>
      {people.map((person, index) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={person.avatar} {...itemCustom("grayscale")} />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent {...itemCustom("gap-1")}>
            <ItemTitle>{person.username}</ItemTitle>
            <ItemDescription>{person.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" {...itemCustom("rounded-full")}>
              <PlusIcon />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
