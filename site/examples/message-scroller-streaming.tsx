import { useState, useEffect } from "react";
import { Button } from "@button";
import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@message-scroller";

const reply =
  "Open the catalog, choose a component, and explore its examples. You can switch between the live preview and code, install the source in your project, and edit the component to match your design.".split(
    " ",
  );

export default function MessageScrollerStreaming() {
  const [visible, setVisible] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || visible === reply.length) return;
    const timer = window.setTimeout(() => setVisible(visible + 1), 90);
    return () => window.clearTimeout(timer);
  }, [running, visible]);
  return (
    <MessageScrollerProvider autoScroll>
      <div style={{ width: "min(100%, 24rem)", display: "grid", gap: "1rem" }}>
        <MessageScroller
          style={{
            height: "13rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <MessageScrollerViewport aria-label="Conversation" tabIndex={0}>
            <MessageScrollerContent
              aria-busy={running && visible < reply.length}
              style={{ padding: "1rem" }}
            >
              <MessageScrollerItem messageId="question">
                <strong>User</strong>
                <p>How do I try a component?</p>
              </MessageScrollerItem>
              <MessageScrollerItem messageId="reply">
                <strong>Assistant</strong>
                <p>{reply.slice(0, visible).join(" ")}</p>
              </MessageScrollerItem>
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
            onPress={() => {
              if (visible === reply.length) {
                setVisible(0);
                setRunning(true);
              } else setRunning(!running);
            }}
          >
            {visible === reply.length
              ? "Replay reply"
              : running
                ? "Pause"
                : visible
                  ? "Resume"
                  : "Stream reply"}
          </Button>
        </div>
      </div>
    </MessageScrollerProvider>
  );
}
