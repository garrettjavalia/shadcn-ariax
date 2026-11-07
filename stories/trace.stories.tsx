import type { Meta } from "@storybook/react-vite";
import { TraceDemo } from "./trace-examples/trace-demo";
import { TraceStatic } from "./trace-examples/trace-static";
import { TraceStatus } from "./trace-examples/trace-status";
import { TraceDescriptionDemo } from "./trace-examples/trace-description";
import { TraceCollapsibleDemo } from "./trace-examples/trace-collapsible";
import { TraceOpen } from "./trace-examples/trace-open";
import { TraceLink } from "./trace-examples/trace-link";
import { TraceDialog } from "./trace-examples/trace-dialog";
import { TraceSheet } from "./trace-examples/trace-sheet";
import { TraceGroupDemo } from "./trace-examples/trace-group";
import { TraceSources } from "./trace-examples/trace-sources";
import { TraceSteps } from "./trace-examples/trace-steps";
import { TraceCommit } from "./trace-examples/trace-commit";
import { TraceTurn } from "./trace-examples/trace-turn";
import { TraceThinking } from "./trace-examples/trace-thinking";
import { TraceToolCalls } from "./trace-examples/trace-tool-calls";
export default {
  title: "Components/Trace",
  tags: ["parity"],
  decorators: [
    (Story) => (
      <main id="parity-root">
        <Story />
      </main>
    ),
  ],
} satisfies Meta;
export const Demo = { tags: ["viewport-390"], render: () => <TraceDemo /> };
export const Static = { render: () => <TraceStatic /> };
export const Status = { render: () => <TraceStatus /> };
export const Description = { render: () => <TraceDescriptionDemo /> };
export const Collapsible = { render: () => <TraceCollapsibleDemo /> };
export const Open = { render: () => <TraceOpen /> };
export const Link = { render: () => <TraceLink /> };
export const Dialog = { render: () => <TraceDialog /> };
export const Sheet = { render: () => <TraceSheet /> };
export const Group = { render: () => <TraceGroupDemo /> };
export const Sources = { render: () => <TraceSources /> };
export const Steps = { render: () => <TraceSteps /> };
export const Commit = { render: () => <TraceCommit /> };
export const Turn = { render: () => <TraceTurn /> };
export const Thinking = { render: () => <TraceThinking /> };
export const ToolCalls = { render: () => <TraceToolCalls /> };
import { TraceContracts } from "./trace-code-block-contracts";
export const Contracts = { render: () => <TraceContracts /> };
