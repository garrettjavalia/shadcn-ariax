import * as stylex from "@stylexjs/stylex";
import { Checkbox } from "../../src/ariax/ui/checkbox";
const styles = stylex.create({
  custom: { width: 24 },
  dynamic: (height: number) => ({ height }),
});
<Checkbox
  aria-label="Allowed"
  xstyle={[styles.custom, styles.dynamic(24)]}
  style={({ isSelected }) => ({ opacity: isSelected ? 1 : 0.5 })}
>
  {({ isIndeterminate }) => (isIndeterminate ? "Mixed" : null)}
</Checkbox>;
<Checkbox style={{ height: 24 }} />;
// @ts-expect-error External utility classes are not supported.
<Checkbox className="w-8" />;
// @ts-expect-error Raw CSS objects are not StyleX styles.
<Checkbox xstyle={{ width: 24 }} />;
