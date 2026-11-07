import { componentExample } from "@trace-code-block-example-customizations";

import { FileTextIcon, SearchIcon, TerminalIcon } from "lucide-react";

import { Trace, TraceIcon, TraceLine, TraceTitle } from "@trace";

export function TraceGroupDemo() {
  return (
    <Trace {...componentExample.s6}>
      <TraceLine>
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searched for minimumReleaseAge</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <FileTextIcon />
        </TraceIcon>
        <TraceTitle>Read pnpm-workspace.yaml</TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran pnpm install</TraceTitle>
      </TraceLine>
    </Trace>
  );
}
