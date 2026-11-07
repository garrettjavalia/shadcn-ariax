"use client";
import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import * as React from "react";
import { TerminalIcon } from "lucide-react";

import { Button } from "@button";
import { CodeBlock, CodeBlockContent } from "@code-block";
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@trace";

export function TraceOpen() {
  const [open, setOpen] = React.useState(false);

  return (
    <div {...nativeExample.s9}>
      <TraceCollapsible defaultExpanded>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>Ran node --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap {...componentExample.s1}>
              {"$ node --version\nv24.18.0"}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible isExpanded={open} onExpandedChange={setOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <TerminalIcon />
            </TraceIcon>
            <TraceTitle>Ran pnpm --version</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap {...componentExample.s1}>
              {"$ pnpm --version\n10.33.4"}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <Button variant="outline" size="sm" onPress={() => setOpen(!open)}>
        {open ? "Hide" : "Show"} the pnpm output
      </Button>
    </div>
  );
}
