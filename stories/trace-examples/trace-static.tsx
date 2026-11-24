import { componentExample } from "@trace-code-block-example-customizations";

import { GitBranchIcon } from "lucide-react";

import { Trace, TraceIcon, TraceLine, TraceTitle } from "@trace";

export function TraceStatic() {
  return (
    <Trace {...componentExample.s6}>
      <TraceLine>
        <TraceIcon>
          <GitBranchIcon />
        </TraceIcon>
        <TraceTitle>Created branch fix/frozen-lockfile</TraceTitle>
      </TraceLine>
    </Trace>
  );
}
