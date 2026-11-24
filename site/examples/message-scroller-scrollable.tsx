import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScrollerScrollable,
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

function ScrollStatus() {
  const { start, end } = useMessageScrollerScrollable();
  return (
    <p role="status">
      {start && end
        ? "Scroll up or down."
        : end
          ? "At the start."
          : start
            ? "At the end."
            : "All messages are visible."}
    </p>
  );
}

export default function MessageScrollerScrollable() {
  return (
    <MessageScrollerProvider defaultScrollPosition="start">
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
              {messages.map((message, index) => (
                <MessageScrollerItem key={index} messageId={String(index)}>
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
          <ScrollStatus />
        </div>
      </div>
    </MessageScrollerProvider>
  );
}
