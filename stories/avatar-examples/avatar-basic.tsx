// Fixed official example; imports and customization adapters are shared.
import {avatarCustom,avatarLayout} from "@avatar-customizations";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        {...avatarCustom('grayscale')}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
