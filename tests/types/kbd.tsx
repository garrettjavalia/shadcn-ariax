import * as stylex from "@stylexjs/stylex";
import { Kbd, KbdGroup } from "../../registry/ariax/ui/kbd";
const styles = stylex.create({ width: (width: number) => ({ width }) });
<Kbd xstyle={[styles.width(40), false]} style={{ fontSize: 20 }} id="key">
  Ctrl
</Kbd>;
<KbdGroup xstyle={styles.width(80)} style={{ gap: 8 }}>
  Keys
</KbdGroup>;
// @ts-expect-error External utility classes are unsupported.
<Kbd className="text-lg" />;
// @ts-expect-error External utility classes are unsupported.
<KbdGroup className="gap-4" />;
// @ts-expect-error xstyle requires a compiled StyleX object.
<Kbd xstyle={{ width: 40 }} />;
