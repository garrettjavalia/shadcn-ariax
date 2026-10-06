import * as stylex from "@stylexjs/stylex";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldLegend,
} from "../../registry/ariax/ui/field";
const styles = stylex.create({
  wide: { width: "20rem" },
  dynamic: (gap: number) => ({ gap }),
});
<Field
  orientation="responsive"
  xstyle={[styles.wide, styles.dynamic(12)]}
  style={{ gap: 20 }}
/>;
<FieldLabel htmlFor="name" style={{ color: "red" }} xstyle={styles.wide} />;
<FieldError errors={[undefined, { message: "Error" }]} />;
<FieldLegend variant="label" />;
// @ts-expect-error external className is unsupported
<Field className="flex" />;
// @ts-expect-error external className is unsupported on Label wrapper
<FieldLabel className="flex" />;
// @ts-expect-error plain object is not compiled StyleX
<Field xstyle={{ width: 100 }} />;
// @ts-expect-error unsupported orientation
<Field orientation="diagonal" />;
