import { Textarea } from "../../src/ariax/ui/textarea";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ custom: { width: 200 } });
<Textarea xstyle={styles.custom} style={{ width: 240 }} />;
<Textarea style={({ isFocused }) => ({ opacity: isFocused ? 1 : 0.5 })} />;
// @ts-expect-error external CSS classes are not a customization API
<Textarea className="custom" />;
// @ts-expect-error xstyle requires compiled StyleX styles
<Textarea xstyle={{ width: 240 }} />;
