import { nativeExample } from "@trace-code-block-example-customizations";

import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@code-block";

const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`;

const highlighted = [2, 3];

export function CodeBlockHighlightedLines() {
  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockContent lineNumbers>
          {code.split("\n").map((line, index) => (
            <CodeBlockLine
              key={index}
              variant={highlighted.includes(index) ? "highlighted" : "default"}
            >
              {line}
            </CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
