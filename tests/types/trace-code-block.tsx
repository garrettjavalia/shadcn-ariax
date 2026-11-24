import {
  Trace,
  TraceLine,
  TraceTitle,
  TraceCollapsible,
  TraceCollapsibleTrigger,
} from "@trace";
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@code-block";
// @ts-expect-error External Tailwind classes are not the customization API.
<Trace className="gap-4" />;
// @ts-expect-error External classes are not the customization API.
<TraceTitle className="font-bold" />;
// @ts-expect-error Controlled expansion requires a change handler.
<TraceCollapsible isExpanded />;
// @ts-expect-error Trigger children are nodes, not primitive render callbacks.
<TraceCollapsibleTrigger>{() => "Title"}</TraceCollapsibleTrigger>;
// @ts-expect-error Status is the upstream union.
<TraceLine status="complete" />;
// @ts-expect-error External classes are not the customization API.
<CodeBlock className="border" />;
// @ts-expect-error External classes are not the customization API.
<CodeBlockContent className="p-4" />;
<CodeBlock variant={null} size="sm">
  <CodeBlockContent startLine={5} lineNumbers wrap>
    <CodeBlockLine variant={null} />
  </CodeBlockContent>
</CodeBlock>;
