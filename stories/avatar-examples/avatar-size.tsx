// Fixed official example; imports and customization adapters are shared.
import {avatarCustom,avatarLayout} from "@avatar-customizations";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"

export function AvatarSizeExample() {
  return (
    <div {...avatarLayout("sizes")}>
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
