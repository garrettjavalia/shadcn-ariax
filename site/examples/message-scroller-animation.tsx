import { useState, useRef, useEffect } from "react";
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

function AnimatedMessage({
  preset,
  children,
}: {
  preset: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entrance = useRef(preset);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const from =
      entrance.current === "slide"
        ? "translateY(1.5rem)"
        : entrance.current === "pop"
          ? "scale(.8)"
          : "none";
    const animation = ref.current?.animate(
      [
        { opacity: 0, transform: from },
        { opacity: 1, transform: "none" },
      ],
      { duration: 320, easing: "ease-out" },
    );
    return () => animation?.cancel();
  }, []);
  return <div ref={ref}>{children}</div>;
}

export default function MessageScrollerAnimation() {
  const [count, setCount] = useState(2);
  const [preset, setPreset] = useState("fade");
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
                <MessageScrollerItem key={index} messageId={String(index)}>
                  <AnimatedMessage preset={preset}>
                    <strong>{message.role}</strong>
                    <p>{message.text}</p>
                  </AnimatedMessage>
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
          <label>
            Entrance{" "}
            <select
              value={preset}
              onChange={(event) => setPreset(event.target.value)}
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="pop">Pop</option>
            </select>
          </label>
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
