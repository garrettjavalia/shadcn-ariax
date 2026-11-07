"use client";
import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";
import "../code-block-markdown.css";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import {
  Streamdown,
  useIsCodeFenceIncomplete,
  type ExtraProps,
} from "streamdown";

import {
  createChat,
  getMessageText,
} from "../../generated/upstream/shadcn/apps/v4/lib/ai";
import { useHighlightedCode } from "@code-block";
import { Bubble, BubbleContent } from "@bubble";
import { Button } from "@button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";
import { Message, MessageContent } from "@message";

const response = `Wrap the value in a \`useDebounce\` hook. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`;

const chat = createChat()
  .user("How do I debounce a search input in React?")
  .assistant(({ writer }) => {
    writer.text(response);
  });

const transcript = chat.get();
const [question] = chat.get(1);
const transport = chat.transport({ delayMs: 30 });

function MarkdownCodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  // True while the closing fence has not arrived yet.
  const incomplete = useIsCodeFenceIncomplete();
  const lines = useHighlightedCode(code, language);

  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{language || "text"}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} isDisabled={incomplete} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  );
}

function MarkdownCode({
  node,
  className,
  children,
  ...props
}: React.ComponentProps<"code"> & ExtraProps) {
  // Streamdown marks fenced code with data-block. Everything else is inline.
  if (!("data-block" in props)) {
    return (
      <code {...nativeExample.s28} {...props}>
        {children}
      </code>
    );
  }

  return (
    <MarkdownCodeBlock
      code={typeof children === "string" ? children : ""}
      language={/language-(\S+)/.exec(className ?? "")?.[1] ?? ""}
    />
  );
}

const components = { code: MarkdownCode };

export function CodeBlockMarkdown() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: transcript,
    transport,
  });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div {...nativeExample.s29}>
      {messages.map((message) =>
        message.role === "user" ? (
          <Message key={message.id} align="end">
            <MessageContent>
              <Bubble align="end" variant="muted">
                <BubbleContent>{getMessageText(message)}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        ) : (
          <Message key={message.id}>
            <MessageContent>
              <Streamdown
                className="ariax-code-markdown"
                controls={false}
                components={components}
                isAnimating={busy && message === messages.at(-1)}
              >
                {getMessageText(message)}
              </Streamdown>
            </MessageContent>
          </Message>
        ),
      )}
      {!busy && (
        <Button
          variant="outline"
          size="sm"
          {...componentExample.s5}
          onPress={() => {
            setMessages([]);
            sendMessage(question);
          }}
        >
          Replay
        </Button>
      )}
    </div>
  );
}
