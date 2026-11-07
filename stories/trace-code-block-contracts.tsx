import * as React from "react";
import {
  Trace,
  TraceLine,
  TraceTitle,
  TraceIcon,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "@trace";
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
} from "@code-block";
import {
  customRoot,
  customTitle,
  customContent,
  narrow,
  tall,
} from "@trace-code-block-customizations";
import { CircleCheckIcon } from "lucide-react";

export function TraceContracts() {
  const [open, setOpen] = React.useState(false),
    [status, setStatus] = React.useState<"running" | "error" | "pending">(
      "running",
    );
  return (
    <div dir="rtl">
      <button
        onClick={() =>
          setStatus(
            status === "running"
              ? "error"
              : status === "error"
                ? "pending"
                : "running",
          )
        }
      >
        Change status
      </button>
      <output aria-live="polite">{String(open)}</output>
      <Trace {...customRoot(12)} style={{ gap: 16 }}>
        <TraceCollapsible isExpanded={open} onExpandedChange={setOpen}>
          <TraceCollapsibleTrigger
            style={(state) => ({ opacity: state.isDisabled ? 0.5 : 1 })}
          >
            <TraceLine status={status}>
              <TraceIcon>
                <CircleCheckIcon />
              </TraceIcon>
              <TraceTitle {...customTitle}>Controlled step</TraceTitle>
              <TraceDescription>2s</TraceDescription>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent {...customContent} style={{ opacity: 0.8 }}>
            <label>
              Result
              <input defaultValue="ready" />
            </label>
          </TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceCollapsible isDisabled>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceTitle>Disabled step</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>Hidden</TraceCollapsibleContent>
        </TraceCollapsible>
        <TraceLine status="running">
          <span>
            <TraceTitle>Nested title does not shimmer</TraceTitle>
          </span>
        </TraceLine>
      </Trace>
    </div>
  );
}
export function CodeBlockContracts() {
  const [presses, setPresses] = React.useState(0);
  return (
    <div dir="rtl">
      <output aria-live="polite">{presses}</output>
      <CodeBlock {...narrow} size="sm">
        <CodeBlockHeader>
          <CodeBlockTitle {...customTitle}>
            <CircleCheckIcon />
            example.ts
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton
              value={"first\n\nthird\n"}
              onPress={() => setPresses((n) => n + 1)}
            />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent
          {...customContent}
          style={{ maxHeight: 140, padding: 12 }}
          lineNumbers
          startLine={5}
        >
          {"first\n\nthird\n"}
        </CodeBlockContent>
        <CodeBlockFooter>Footer</CodeBlockFooter>
      </CodeBlock>
      <CodeBlock variant={null}>
        <CodeBlockActions>
          <CodeBlockCopyButton isDisabled value="disabled" />
        </CodeBlockActions>
        <CodeBlockContent {...tall} lineNumbers>
          {Array.from({ length: 30 }, (_, i) => (
            <CodeBlockLine
              key={i}
              variant={i % 2 ? "removed" : "added"}
            >{`line ${i}: ${"x".repeat(100)}`}</CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
