import { nativeExample } from "@trace-code-block-example-customizations";

import { CodeBlock, CodeBlockContent } from "@code-block";

const output = `$ pnpm build
> next build

 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`;

export function CodeBlockBasic() {
  return (
    <div {...nativeExample.s17}>
      <CodeBlock>
        <CodeBlockContent>{output}</CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
