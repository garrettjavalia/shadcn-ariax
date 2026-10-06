import {messageClasses} from "@message-customizations";
import {markerShimmer} from "@marker-customizations";
import {
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@bubble"
import { Button } from "@button"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@message"

export function MessageActionsDemo() {
  return (
    <div {...messageClasses.doc8}>
      <Message>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <Button variant="ghost" size="icon" aria-label="Copy">
              <CopyIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Like">
              <ThumbsUpIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Dislike">
              <ThumbsDownIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter {...messageClasses.gap2}>
            <span {...messageClasses.error}>Failed to send</span>
            <Button variant="ghost" size="icon-xs" aria-label="Retry">
              <RefreshCcwIcon />
            </Button>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}
