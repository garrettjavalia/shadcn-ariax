import * as stylex from "@stylexjs/stylex";
import { ToggleGroup, ToggleGroupItem } from "@toggle-group";
const styles = stylex.create({
  dynamic: (width: number) => ({
    width,
  }),
});
export default function Fixture() {
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      xstyle={styles.dynamic(240)}
      style={({ isDisabled }) => ({
        opacity: isDisabled ? 1 : 0.8,
      })}
    >
      <ToggleGroupItem
        id="a"
        style={({ isSelected }) => ({
          width: 80,
          opacity: isSelected ? 0.5 : 1,
        })}
      >
        {({ isSelected }) => (isSelected ? "On" : "Off")}
      </ToggleGroupItem>
      <ToggleGroupItem id="b">B</ToggleGroupItem>
    </ToggleGroup>
  );
}
