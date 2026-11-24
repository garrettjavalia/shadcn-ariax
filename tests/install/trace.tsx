import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceDescription,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "@trace";
const styles = stylex.create({
  custom: (gap: number) => ({ gap }),
  title: { color: "var(--primary)" },
});
export default function Fixture() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Trace xstyle={styles.custom(12)} style={{ gap: 16 }}>
      <TraceCollapsible isExpanded={expanded} onExpandedChange={setExpanded}>
        <TraceCollapsibleTrigger
          style={(state) => ({ opacity: state.isDisabled ? 0.5 : 1 })}
        >
          <TraceLine status="running">
            <TraceIcon>↗</TraceIcon>
            <TraceTitle xstyle={styles.title}>Running</TraceTitle>
            <TraceDescription>2s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent
          xstyle={styles.custom(8)}
          style={() => ({ opacity: 1 })}
        >
          Output
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}
