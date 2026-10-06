import * as stylex from "@stylexjs/stylex";
import { Toggle, toggleVariants } from "@toggle";
const styles = stylex.create({
  dynamic: (width: number) => ({
    width,
  }),
});
export default function Fixture() {
  return (
    <>
      <Toggle
        variant="outline"
        size="sm"
        xstyle={styles.dynamic(180)}
        style={({ isSelected }) => ({
          width: 200,
          opacity: isSelected ? 0.8 : 1,
        })}
      >
        {({ isSelected }) => (isSelected ? "On" : "Off")}
      </Toggle>
      <button
        {...stylex.props(
          ...toggleVariants({
            variant: "outline",
            size: "lg",
          }),
        )}
      >
        Helper
      </button>
    </>
  );
}
