import * as stylex from "@stylexjs/stylex";
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
  useHighlightedCode,
  highlightCode,
} from "@code-block";
const styles = stylex.create({
  content: (size: number) => ({ maxHeight: size }),
  title: { color: "var(--primary)" },
});
export default function Fixture() {
  const lines = useHighlightedCode("const value = 42\n\n", "ts");
  return (
    <CodeBlock size="sm" variant="destructive">
      <CodeBlockHeader>
        <CodeBlockTitle xstyle={styles.title}>example.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton
            value="const value = 42"
            onPress={() => {
              void highlightCode("echo ready", "bash");
            }}
          />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent
        xstyle={styles.content(180)}
        style={{ maxHeight: 200 }}
        wrap
        lineNumbers
        startLine={10}
      >
        {lines.map((line, i) => (
          <CodeBlockLine key={i} variant={i === 0 ? "added" : "highlighted"}>
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
      <CodeBlockFooter>Output</CodeBlockFooter>
    </CodeBlock>
  );
}
