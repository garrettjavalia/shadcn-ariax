import * as stylex from "@stylexjs/stylex";
import { Separator } from "../../src/ariax/ui/separator";
const styles = stylex.create({ thick: { height: 4 } });
<Separator orientation="vertical" xstyle={[false, styles.thick]} />;
// @ts-expect-error StyleX only.
<Separator className="h-1" />;
<Separator style={{ height: 4 }} />;
// @ts-expect-error Raw CSS is not a StyleX object.
<Separator xstyle={{ height: 4 }} />;
