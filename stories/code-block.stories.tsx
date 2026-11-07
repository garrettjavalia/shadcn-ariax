import type { Meta } from "@storybook/react-vite";
import { CodeBlockDemo } from "./code-block-examples/code-block-demo";
import { CodeBlockBasic } from "./code-block-examples/code-block-basic";
import { CodeBlockHeaderExample } from "./code-block-examples/code-block-header";
import { CodeBlockActionsExample } from "./code-block-examples/code-block-actions";
import { CodeBlockFloatingActions } from "./code-block-examples/code-block-floating-actions";
import { CodeBlockLineNumbers } from "./code-block-examples/code-block-line-numbers";
import { CodeBlockStartLine } from "./code-block-examples/code-block-start-line";
import { CodeBlockWrap } from "./code-block-examples/code-block-wrap";
import { CodeBlockHighlightedLines } from "./code-block-examples/code-block-highlighted-lines";
import { CodeBlockDiff } from "./code-block-examples/code-block-diff";
import { CodeBlockHeight } from "./code-block-examples/code-block-height";
import { CodeBlockShowMore } from "./code-block-examples/code-block-show-more";
import { CodeBlockShowMoreScroll } from "./code-block-examples/code-block-show-more-scroll";
import { CodeBlockSize } from "./code-block-examples/code-block-size";
import { CodeBlockDestructive } from "./code-block-examples/code-block-destructive";
import { CodeBlockTrace } from "./code-block-examples/code-block-trace";
import { CodeBlockTabs } from "./code-block-examples/code-block-tabs";
import { CodeBlockChat } from "./code-block-examples/code-block-chat";
import { CodeBlockTypeset } from "./code-block-examples/code-block-typeset";
import { CodeBlockRtl } from "./code-block-examples/code-block-rtl";
import { CodeBlockHighlighting } from "./code-block-examples/code-block-highlighting";
import { CodeBlockLanguages } from "./code-block-examples/code-block-languages";
import { CodeBlockAnsi } from "./code-block-examples/code-block-ansi";
import { CodeBlockStreaming } from "./code-block-examples/code-block-streaming";
import { CodeBlockMarkdown } from "./code-block-examples/code-block-markdown";
export default {
  title: "Components/Code Block",
  tags: ["parity"],
  decorators: [
    (Story) => (
      <main id="parity-root">
        <Story />
      </main>
    ),
  ],
} satisfies Meta;
export const Demo = { tags: ["viewport-390"], render: () => <CodeBlockDemo /> };
export const Basic = { render: () => <CodeBlockBasic /> };
export const Header = { render: () => <CodeBlockHeaderExample /> };
export const Actions = { render: () => <CodeBlockActionsExample /> };
export const FloatingActions = { render: () => <CodeBlockFloatingActions /> };
export const LineNumbers = { render: () => <CodeBlockLineNumbers /> };
export const StartLine = { render: () => <CodeBlockStartLine /> };
export const Wrap = { render: () => <CodeBlockWrap /> };
export const HighlightedLines = { render: () => <CodeBlockHighlightedLines /> };
export const Diff = { render: () => <CodeBlockDiff /> };
export const Height = { render: () => <CodeBlockHeight /> };
export const ShowMore = {
  tags: ["viewport-390"],
  render: () => <CodeBlockShowMore />,
};
export const ShowMoreScroll = {
  tags: ["viewport-390"],
  render: () => <CodeBlockShowMoreScroll />,
};
export const Size = { render: () => <CodeBlockSize /> };
export const Destructive = { render: () => <CodeBlockDestructive /> };
export const Trace = { render: () => <CodeBlockTrace /> };
export const Tabs = { render: () => <CodeBlockTabs /> };
export const Chat = { tags: ["viewport-390"], render: () => <CodeBlockChat /> };
export const Typeset = { render: () => <CodeBlockTypeset /> };
export const Rtl = { render: () => <CodeBlockRtl /> };
export const Highlighting = { render: () => <CodeBlockHighlighting /> };
export const Languages = { render: () => <CodeBlockLanguages /> };
export const Ansi = { render: () => <CodeBlockAnsi /> };
export const Streaming = { render: () => <CodeBlockStreaming /> };
export const Markdown = {
  tags: ["viewport-390"],
  render: () => <CodeBlockMarkdown />,
};
import { CodeBlockContracts } from "./trace-code-block-contracts";
export const Contracts = { render: () => <CodeBlockContracts /> };
