"use client";
import { nativeExample } from "@trace-code-block-example-customizations";

import { TerminalIcon } from "lucide-react";

import { useHighlightedCode } from "@code-block";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";

const code = `pnpm add ai @ai-sdk/react zod
pnpm dev`;

export function CodeBlockRtl() {
  const lines = useHighlightedCode(code, "bash");

  return (
    <div {...nativeExample.s26} dir="rtl">
      <p>ثبّت الحزم، ثم شغّل خادم التطوير.</p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <TerminalIcon />
            الطرفية
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>
          {lines.map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
