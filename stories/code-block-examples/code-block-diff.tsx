import { nativeExample } from "@trace-code-block-example-customizations";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";

const patch = ` export function Greeting({ name }: { name: string }) {
-  return <p>Hello, {name}</p>
+  return <p className="text-sm text-muted-foreground">
+    Hello, {name}!
+  </p>
 }`;

function getVariant(line: string) {
  if (line.startsWith("+")) {
    return "added";
  }

  if (line.startsWith("-")) {
    return "removed";
  }

  return "default";
}

export function CodeBlockDiff() {
  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>components/greeting.tsx</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={patch} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>
          {patch.split("\n").map((line, index) => (
            <CodeBlockLine key={index} variant={getVariant(line)}>
              {line.slice(1)}
            </CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
