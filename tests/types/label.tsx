import { Label } from "../../src/ariax/ui/label";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
<Label htmlFor="field" xstyle={styles.dynamic(100)} style={{ width: 120 }}>
  Label
</Label>;
// @ts-expect-error arbitrary className is not the styling API
<Label className="custom" />;
