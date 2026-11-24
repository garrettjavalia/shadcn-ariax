import { Streamdown } from "streamdown";
import { Bubble, BubbleContent } from "@bubble";

export default function BubbleMarkdownDemo() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "24rem",
        flexDirection: "column",
        gap: "2rem",
        paddingBlock: "3rem",
      }}
    >
      <Bubble align="end" variant="muted">
        <BubbleContent>
          <Streamdown
            controls={false}
          >{`Hello! Are you actually **thinking**?`}</Streamdown>
        </BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          <Streamdown
            controls={false}
          >{`Ghost bubbles work for assistant text, **markdown**, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render \`code\` in it.

Ghost bubbles are full width and can take the full width of the container.
`}</Streamdown>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
