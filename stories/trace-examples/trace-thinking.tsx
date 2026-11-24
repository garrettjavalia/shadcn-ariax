"use client";
import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { BrainIcon } from "lucide-react";

import {
  createChat,
  getMessageText,
} from "../../generated/upstream/shadcn/apps/v4/lib/ai";
import { Bubble, BubbleContent } from "@bubble";
import { Button } from "@button";
import { Message, MessageContent } from "@message";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@trace";

const chat = createChat()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
      { delayMs: 60 },
    );
    writer.sleep(400);
    writer.text(
      "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash.",
    );
  });

const initialMessages = chat.get(0);
const transport = chat.transport({ delayMs: 20 });

function ThinkingTrace({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>();

  const line = (
    <TraceLine status={running ? "running" : undefined}>
      <TraceIcon>
        <BrainIcon />
      </TraceIcon>
      <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
    </TraceLine>
  );

  if (text.length === 0) {
    return line;
  }

  return (
    <TraceCollapsible isExpanded={open ?? running} onExpandedChange={setOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent {...componentExample.s0}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  );
}

function groupParts(parts: UIMessage["parts"]) {
  const runs: { trace: boolean; parts: UIMessage["parts"] }[] = [];

  for (const part of parts) {
    const trace = part.type === "reasoning";

    if (!trace && part.type !== "text") {
      continue;
    }

    const last = runs.at(-1);

    if (last?.trace === trace) {
      last.parts.push(part);
    } else {
      runs.push({ trace, parts: [part] });
    }
  }

  return runs;
}

export function TraceThinking() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  });
  const nextMessage = chat.next(messages);
  const busy = status === "submitted" || status === "streaming";

  return (
    <div {...nativeExample.s3}>
      {messages.map((message) => {
        if (message.role === "user") {
          return (
            <Message key={message.id} align="end">
              <MessageContent>
                <Bubble align="end" variant="muted">
                  <BubbleContent>{getMessageText(message)}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          );
        }

        const live = status === "streaming" && message === messages.at(-1);

        return (
          <Message key={message.id}>
            <MessageContent {...componentExample.s4}>
              {groupParts(message.parts).map((run, runIndex) =>
                run.trace ? (
                  <Trace key={runIndex}>
                    {run.parts.map((part, index) =>
                      part.type === "reasoning" ? (
                        <ThinkingTrace
                          key={index}
                          text={part.text}
                          running={live && part.state === "streaming"}
                        />
                      ) : null,
                    )}
                  </Trace>
                ) : (
                  run.parts.map((part, index) =>
                    part.type === "text" ? (
                      <p key={`${runIndex}-${index}`}>{part.text}</p>
                    ) : null,
                  )
                ),
              )}
            </MessageContent>
          </Message>
        );
      })}
      {!busy && (
        <Button
          variant="outline"
          size="sm"
          {...componentExample.s5}
          onPress={() =>
            nextMessage
              ? sendMessage(nextMessage)
              : setMessages(initialMessages)
          }
        >
          {nextMessage ? "Send message" : "Reset"}
        </Button>
      )}
    </div>
  );
}
