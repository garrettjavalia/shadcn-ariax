import { nativeExample } from "@trace-code-block-example-customizations";

import { CodeBlock, CodeBlockContent } from "@code-block";

const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`;

export function CodeBlockLineNumbers() {
  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockContent lineNumbers>{code}</CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
