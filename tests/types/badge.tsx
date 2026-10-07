import { Badge, badgeProps } from "../../src/ariax/ui/badge";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  custom: { color: "red" },
  dynamic: (width: number) => ({ width }),
});
<Badge
  style={{ width: 160 }}
  xstyle={[styles.custom, styles.dynamic(120)]}
  render={(props) => <a {...props} href="/" />}
>
  Badge
</Badge>;
<span
  {...badgeProps({
    variant: "secondary",
    style: { opacity: 0.5 },
    xstyle: styles.custom,
  })}
/>;
// @ts-expect-error external class names are not the customization API
<Badge className="bg-red-500" />;
// @ts-expect-error invalid variant
<Badge variant="unknown" />;
