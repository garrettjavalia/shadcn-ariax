import type * as React from "react";
import { Streamdown, type ExtraProps } from "streamdown";
import { bubbleMarkdown } from "@bubble-customizations";
import { nativeExample } from "@trace-code-block-example-customizations";
// These Bubble/Message examples contain inline code only. Match the current
// official Markdown renderer; fenced-code examples live with Code Block.
function InlineCode({
  node,
  className,
  ...props
}: React.ComponentProps<"code"> & ExtraProps) {
  return <code {...nativeExample.s28} {...props} />;
}
const components = { code: InlineCode };
export function Markdown(props: React.ComponentProps<typeof Streamdown>) {
  return (
    <Streamdown
      data-slot="markdown"
      components={components}
      controls={false}
      {...bubbleMarkdown}
      {...props}
    />
  );
}
