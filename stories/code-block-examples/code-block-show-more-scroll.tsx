"use client";
import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { useHighlightedCode } from "@code-block";
import { Button } from "@button";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";

const code = `"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) =>
            part.type === "text" ? <p key={index}>{part.text}</p> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`;

export function CodeBlockShowMoreScroll() {
  const [expanded, setExpanded] = React.useState(false);
  const lines = useHighlightedCode(code, "tsx");
  const id = React.useId();

  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>components/chat.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent
          id={id}
          lineNumbers
          {...(expanded ? componentExample.s22 : componentExample.s21)}
        >
          {lines.map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))}
        </CodeBlockContent>
        <CodeBlockFooter {...componentExample.s20}>
          <Button
            variant="ghost"
            size="xs"
            aria-expanded={expanded}
            aria-controls={id}
            onPress={() => setExpanded(!expanded)}
          >
            <ChevronDownIcon {...nativeExample.s30} />
            {expanded ? "Show less" : "Show more"}
          </Button>
        </CodeBlockFooter>
      </CodeBlock>
    </div>
  );
}
