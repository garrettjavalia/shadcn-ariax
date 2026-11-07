import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@code-block";

const logs = Array.from(
  { length: 40 },
  (_, index) =>
    `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`,
).join("\n");

export function CodeBlockHeight() {
  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Logs</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={logs} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent {...componentExample.s19}>{logs}</CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
