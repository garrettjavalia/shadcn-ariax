import * as stylex from '@stylexjs/stylex';
import { ToggleGroup, ToggleGroupItem } from '@toggle-group';
const styles = stylex.create({
  dynamic: (width: number) => ({
    width
  })
});
<ToggleGroup xstyle={[styles.dynamic(200)]} style={({
  isDisabled
}) => ({
  opacity: isDisabled ? 1 : .5
})}><ToggleGroupItem id="a" xstyle={[styles.dynamic(80)]} style={({
    isSelected
  }) => ({
    opacity: isSelected ? .5 : 1
  })}>{({
      isSelected
    }) => String(isSelected)}</ToggleGroupItem></ToggleGroup>;
// @ts-expect-error external classes unsupported
<ToggleGroup className="foo" />;
// @ts-expect-error external classes unsupported
<ToggleGroupItem className="foo" />;
// @ts-expect-error group original only permits static children
<ToggleGroup>{() => null}</ToggleGroup>;
