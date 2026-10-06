import * as stylex from "@stylexjs/stylex";
import { Sheet, SheetClose, SheetTitle } from "@sheet";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export const object = (
  <Sheet style={{ opacity: 0.8 }} xstyle={styles.dynamic(200)} side="bottom">
    <SheetTitle style={{ fontSize: 20 }}>Title</SheetTitle>
    <SheetClose style={({ isPressed }) => ({ opacity: isPressed ? 0.5 : 1 })}>
      Close
    </SheetClose>
  </Sheet>
);
export const callback = (
  <Sheet style={({ isEntering }) => ({ opacity: isEntering ? 0.5 : 1 })}>
    Content
  </Sheet>
);
// @ts-expect-error external className is unsupported
export const classes = <Sheet className="custom">Content</Sheet>;
// @ts-expect-error only official sides are accepted
export const invalid = <Sheet side="center">Content</Sheet>;
