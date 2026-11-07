"use client";
import { nativeExample } from "@trace-code-block-example-customizations";

import { useHighlightedCode } from "@code-block";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";

const samples = [
  {
    language: "css",
    title: "app/globals.css",
    code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
  },
  {
    language: "python",
    title: "main.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
  },
  {
    language: "text",
    title: "notes.txt",
    code: "A language that is not in the list renders as plain text.",
  },
];

function Sample({ code, language }: { code: string; language: string }) {
  const lines = useHighlightedCode(code, language);

  return (
    <CodeBlockContent>
      {lines.map((line, index) => (
        <CodeBlockLine key={index}>{line}</CodeBlockLine>
      ))}
    </CodeBlockContent>
  );
}

export function CodeBlockLanguages() {
  return (
    <div {...nativeExample.s18}>
      {samples.map((sample) => (
        <CodeBlock key={sample.language}>
          <CodeBlockHeader>
            <CodeBlockTitle>{sample.title}</CodeBlockTitle>
          </CodeBlockHeader>
          <Sample code={sample.code} language={sample.language} />
        </CodeBlock>
      ))}
    </div>
  );
}
