import type * as React from "react";
import { Streamdown, type ExtraProps } from "streamdown";
import { markdown } from "@bubble-customizations";
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
const components = {
  code: InlineCode,
  p: ({ node, ...props }: React.ComponentProps<"p"> & ExtraProps) => (
    <p {...props} {...markdown.block} />
  ),
  strong: ({ node, ...props }: React.ComponentProps<"strong"> & ExtraProps) => (
    <span data-streamdown="strong" {...props} {...markdown.strong} />
  ),
  ol: ({ node, ...props }: React.ComponentProps<"ol"> & ExtraProps) => (
    <ol data-streamdown="ordered-list" {...props} {...markdown.list} />
  ),
  li: ({ node, ...props }: React.ComponentProps<"li"> & ExtraProps) => (
    <li data-streamdown="list-item" {...props} {...markdown.item} />
  ),
};
export function Markdown(props: React.ComponentProps<typeof Streamdown>) {
  return (
    <Streamdown
      data-slot="markdown"
      components={components}
      controls={false}
      {...markdown.root}
      {...props}
    />
  );
}
