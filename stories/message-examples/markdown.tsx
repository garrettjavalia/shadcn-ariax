import {messageClasses} from "@message-customizations";
import {markerShimmer} from "@marker-customizations";
import { Markdown } from "../bubble-examples/markdown"
import { Bubble, BubbleContent } from "@bubble"
import { Message, MessageContent } from "@message"

const response = `Here's how to render markdown in a message:

1. Render assistant text through **Markdown**.
2. Keep user messages as plain text.
3. Use a \`ghost\` bubble so the response is unframed.
`

export function MessageMarkdownDemo() {
  return (
    <div {...messageClasses.doc8}>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>
              How do I render markdown in a message?
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble variant="ghost">
            <BubbleContent>
              <Markdown>{response}</Markdown>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}
