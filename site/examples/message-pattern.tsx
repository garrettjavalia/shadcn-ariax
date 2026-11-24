"use client";

import * as React from "react";
import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";

import { Streamdown } from "streamdown";
import { Bubble, BubbleContent } from "@bubble";
import { Button } from "@button";
import { Message, MessageContent, MessageFooter } from "@message";
import { Tooltip, TooltipTrigger } from "@tooltip";

const reply = `Install Dialog, then open it from the gear button in \`site-header.tsx\`.

\`\`\`bash
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`Dialog\`. Focus moves into the dialog when it opens, and **Esc** closes it.`;

export default function MessagePattern() {
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"like" | "dislike" | null>(
    null,
  );

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div
      style={{
        marginInline: "auto",
        display: "flex",
        width: "100%",
        maxWidth: "28rem",
        flexDirection: "column",
        gap: "2rem",
        paddingBlock: "1.5rem",
        fontSize: "0.875rem",
      }}
    >
      <Message align="end">
        <MessageContent style={{ gap: "0.5rem" }}>
          <Bubble align="end" variant="muted">
            <BubbleContent>
              How do I add a settings dialog? It should open from the gear icon
              in the header.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <MessageAction label="Copy">
              <CopyIcon />
            </MessageAction>
            <MessageAction label="Edit">
              <PencilIcon />
            </MessageAction>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent style={{ gap: "0.5rem" }}>
          <div style={{ minWidth: 0, maxWidth: "100%", overflowX: "auto" }}>
            <Streamdown controls={false}>{reply}</Streamdown>
          </div>
          <MessageFooter style={{ paddingInline: 0 }}>
            <MessageAction
              label={copied ? "Copied" : "Copy"}
              onPress={() => {
                navigator.clipboard.writeText(reply);
                setCopied(true);
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </MessageAction>
            <MessageAction
              label="Good response"
              aria-pressed={feedback === "like"}
              onPress={() => setFeedback(feedback === "like" ? null : "like")}
            >
              <ThumbsUpIcon
                fill={feedback === "like" ? "currentColor" : "none"}
              />
            </MessageAction>
            <MessageAction
              label="Bad response"
              aria-pressed={feedback === "dislike"}
              onPress={() =>
                setFeedback(feedback === "dislike" ? null : "dislike")
              }
            >
              <ThumbsDownIcon
                fill={feedback === "dislike" ? "currentColor" : "none"}
              />
            </MessageAction>
            <MessageAction label="Retry">
              <RefreshCcwIcon />
            </MessageAction>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}

function MessageAction({
  label,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <TooltipTrigger>
      <Button variant="ghost" size="icon-sm" aria-label={label} {...props}>
        {children}
      </Button>
      <Tooltip>
        <p>{label}</p>
      </Tooltip>
    </TooltipTrigger>
  );
}
