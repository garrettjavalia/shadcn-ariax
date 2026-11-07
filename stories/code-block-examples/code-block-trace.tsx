import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import { TerminalIcon } from "lucide-react";

import { CodeBlock, CodeBlockContent } from "@code-block";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@trace";

const output = `$ node --version
v24.18.0`;

const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`;

export function CodeBlockTrace() {
  return (
    <div {...nativeExample.s17}>
      <Trace>
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
                {output}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible defaultExpanded>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <TerminalIcon />
              </TraceIcon>
              <TraceTitle>Failed to run pnpm dev</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap {...componentExample.s1}>
                {error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </div>
  );
}
