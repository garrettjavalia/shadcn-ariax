import { Tooltip, TooltipTrigger } from "@tooltip";
import { Button } from "@button";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function TooltipInstallFixture() {
  return (
    <TooltipTrigger>
      <Button>Tooltip</Button>
      <Tooltip
        xstyle={styles.dynamic(200)}
        style={({ placement }) => ({ opacity: placement === "top" ? 0.8 : 1 })}
      >
        Installed Tooltip
      </Tooltip>
    </TooltipTrigger>
  );
}
