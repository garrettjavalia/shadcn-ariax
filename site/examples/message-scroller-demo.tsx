import { useState } from "react";
import { Button } from "@button";
import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@message-scroller";

const messages = [
  { role: "User", text: "Where should we start?" },
  {
    role: "Assistant",
    text: "Start with the component you want to try. You can explore its examples and read the code next to each one.",
  },
  { role: "User", text: "Can I change the styles?" },
  {
    role: "Assistant",
    text: "Yes. Install the source in your project, then change the styles or pass a customization to the component.",
  },
  { role: "User", text: "How do I verify keyboard navigation?" },
  {
    role: "Assistant",
    text: "Move through the controls with Tab and activate them with the keyboard. Check that focus returns to the trigger when a dialog closes.",
  },
];

export default function MessageScrollerDemo() {
  const [count, setCount] = useState(2);
  return (
    <MessageScrollerProvider>
      <div style={{ width: "min(100%, 24rem)", display: "grid", gap: "1rem" }}>
        <MessageScroller
          style={{
            height: "13rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <MessageScrollerViewport aria-label="Conversation" tabIndex={0}>
            <MessageScrollerContent style={{ padding: "1rem" }}>
              {messages.slice(0, count).map((message, index) => (
                <MessageScrollerItem
                  key={index}
                  messageId={String(index)}
                  scrollAnchor={message.role === "User"}
                >
                  <strong>{message.role}</strong>
                  <p>{message.text}</p>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: ".5rem",
          }}
        >
          <Button
            size="sm"
            isDisabled={count === messages.length}
            onPress={() => setCount(count + 1)}
          >
            Next message
          </Button>
          <Button size="sm" variant="outline" onPress={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>
    </MessageScrollerProvider>
  );
}
