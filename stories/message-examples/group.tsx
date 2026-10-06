import {messageClasses} from "@message-customizations";
import {markerShimmer} from "@marker-customizations";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"
import { Bubble, BubbleContent } from "@bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@message"

export function MessageGroupDemo() {
  return (
    <div {...messageClasses.doc6}>
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>I checked the registry addresses.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/02.png" alt="@avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The component and example JSON now live under the UI registry.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </MessageGroup>
    </div>
  )
}
