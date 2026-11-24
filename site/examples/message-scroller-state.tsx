"use client";

import { Bubble, BubbleContent } from "@bubble";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@card";
import { Message, MessageContent } from "@message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@message-scroller";

const messages = Array.from({ length: 12 }, (_, index) => ({
  id: `state-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Check section ${index + 1} of the transcript.`
      : `Section ${index + 1} is ready. Scroll state updates without rerendering the rows.`,
})) satisfies Array<{
  id: string;
  role: "user" | "assistant";
  text: string;
}>;

export default function MessageScrollerState() {
  return (
    <Card
      style={{
        marginInline: "auto",
        height: "28rem",
        width: "100%",
        maxWidth: "28rem",
        gap: 0,
      }}
    >
      <CardHeader style={{ borderBottom: "1px solid var(--border)" }}>
        <CardTitle>Scroll State</CardTitle>
        <CardDescription>
          Read scroll state in JavaScript with the state hook.
        </CardDescription>
      </CardHeader>
      <CardContent style={{ minHeight: 0, flex: 1, padding: 0 }}>
        <MessageScrollerProvider defaultScrollPosition="start">
          <MessageScroller>
            <StatusBar />
            <MessageScrollerViewport>
              <MessageScrollerContent
                style={{ gap: "1rem", padding: "3rem 1rem 1rem" }}
              >
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble
                          variant={
                            message.role === "user" ? "default" : "muted"
                          }
                        >
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
    </Card>
  );
}

function StatusBar() {
  const { start, end } = useMessageScrollerScrollable();
  const states = [
    { label: "At top", on: !start },
    { label: "At bottom", on: !end },
    { label: "Older above", on: start },
    { label: "Newer below", on: end },
  ];

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        insetInline: "0.75rem",
        top: "0.75rem",
        zIndex: 10,
        display: "flex",
        flexWrap: "wrap",
        gap: "0.375rem",
      }}
    >
      {states.map((state) => (
        <span
          key={state.label}
          data-on={state.on}
          style={{
            borderRadius: "999px",
            border: "1px solid var(--border)",
            padding: "0.125rem 0.5rem",
            fontSize: "0.75rem",
            background: state.on ? "var(--primary)" : "var(--background)",
            color: state.on
              ? "var(--primary-foreground)"
              : "var(--muted-foreground)",
          }}
        >
          {state.label}
        </span>
      ))}
    </div>
  );
}
