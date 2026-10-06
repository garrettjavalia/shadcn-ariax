import {messageClasses} from "@message-customizations";
import {markerShimmer} from "@marker-customizations";
import { Bubble, BubbleContent } from "@bubble"
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@message"

export function MessageHeaderFooterDemo() {
  return (
    <div {...messageClasses.doc8}>
      <Message>
        <MessageContent>
          <MessageHeader>Olivia</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>I already checked the logs.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              Send the report to the team. Ping @shadcn if you need help.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <div>
              Read <span {...messageClasses.normal}>Yesterday</span>
            </div>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
