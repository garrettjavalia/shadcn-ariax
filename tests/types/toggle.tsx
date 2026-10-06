import * as stylex from "@stylexjs/stylex";
import { Toggle, toggleVariants, toggleProps } from "@toggle";
const styles = stylex.create({
  dynamic: (width: number) => ({
    width,
  }),
});
<Toggle
  xstyle={[styles.dynamic(200)]}
  style={({ isSelected }) => ({
    opacity: isSelected ? 0.5 : 1,
  })}
>
  {({ isSelected }) => String(isSelected)}
</Toggle>;
<button
  {...toggleProps({
    variant: "outline",
    size: "sm",
    xstyle: styles.dynamic(150),
  })}
/>;
stylex.props(
  ...toggleVariants({
    variant: null,
    size: null,
  }),
);
// @ts-expect-error external className unsupported
<Toggle className="foo" />;
// @ts-expect-error invalid variant
<Toggle variant="ghost" />;
// @ts-expect-error invalid size
<Toggle size="xl" />;
