import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "../../src/ariax/ui/alert";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
<Alert
  style={{ width: 300 }}
  xstyle={styles.dynamic(200)}
  variant="destructive"
/>;
<AlertTitle style={{ color: "red" }} />;
<AlertDescription style={{ color: "red" }} />;
<AlertAction style={{ top: 4 }} />;
// @ts-expect-error External class strings are not part of the StyleX API.
<Alert className="custom" />;
// @ts-expect-error Only the pinned Nova variants are supported.
<Alert variant="warning" />;
