import { Skeleton } from "../../src/ariax/ui/skeleton";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ size: { height: 16, width: 100 } });
<Skeleton xstyle={[styles.size, false]} aria-label="Loading" />;
// @ts-expect-error External classes are not supported.
<Skeleton className="h-4" />;
<Skeleton style={{ height: 16 }} />;
// @ts-expect-error Raw CSS objects are not StyleX styles.
<Skeleton xstyle={{ height: 16 }} />;
