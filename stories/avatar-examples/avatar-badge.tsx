// Fixed official example; imports and customization adapters are shared.
import {avatarCustom,avatarLayout} from "@avatar-customizations";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@avatar"

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge {...avatarCustom('bg-green-600 dark:bg-green-800')} />
    </Avatar>
  )
}
