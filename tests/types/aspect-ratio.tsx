import * as stylex from "@stylexjs/stylex";
import { AspectRatio } from "../../registry/ariax/ui/aspect-ratio";
const styles = stylex.create({ width: (width: number) => ({ width }) });
<AspectRatio
  ratio={1}
  xstyle={styles.width(200)}
  style={{ maxWidth: 300 }}
  ref={() => {}}
/>;
// @ts-expect-error Ratio is required.
<AspectRatio />;
// @ts-expect-error External class names are not the styling API.
<AspectRatio ratio={1} className="rounded" />;
// @ts-expect-error xstyle requires compiled StyleX objects.
<AspectRatio ratio={1} xstyle={{ width: 200 }} />;
