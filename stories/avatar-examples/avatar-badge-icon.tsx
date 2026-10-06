// Fixed official example; imports and customization adapters are shared.
import {avatarCustom,avatarLayout} from "@avatar-customizations";
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@avatar"

export function AvatarBadgeIconExample() {
  return (
    <Avatar {...avatarCustom('grayscale')}>
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
