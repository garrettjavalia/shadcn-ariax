import { Input } from "../../src/ariax/ui/input";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ custom: { width: 200 } });
<Input xstyle={styles.custom} style={{ width: 240 }} />;
<Input style={({ isFocused }) => ({ opacity: isFocused ? 1 : 0.5 })} />;
// @ts-expect-error external CSS classes are not a customization API
<Input className="custom" />;
// @ts-expect-error xstyle requires compiled StyleX styles
<Input xstyle={{ width: 240 }} />;
