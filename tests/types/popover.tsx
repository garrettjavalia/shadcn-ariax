import * as stylex from "@stylexjs/stylex";
import { Popover, PopoverTitle } from "@popover";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export const callback = (
  <Popover
    style={({ isEntering }) => ({ opacity: isEntering ? 0.5 : 1 })}
    xstyle={styles.dynamic(200)}
  >
    {({ placement }) => <PopoverTitle>{placement}</PopoverTitle>}
  </Popover>
);
export const native = <Popover style={{ width: 400 }} placement="end" />;
// @ts-expect-error external className is unsupported
export const classes = <Popover className="custom" />;
