import * as stylex from '@stylexjs/stylex';
import { Slider } from '@slider';
const styles = stylex.create({
  dynamic: (width: number) => ({
    width
  })
});
<Slider<number> defaultValue={30} onChange={value => {
  const numberValue: number = value;
}} xstyle={[styles.dynamic(240)]} style={({
  state
}) => ({
  opacity: state.values[0] > .5 ? 1 : .5
})} />;
<Slider<number[]> defaultValue={[20, 60]} onChange={value => {
  const arrayValue: number[] = value;
}} />;
// @ts-expect-error external class unsupported
<Slider className="foo" />;
// @ts-expect-error explicit numeric contract
<Slider<number> value={[30]} />;
// @ts-expect-error explicit array contract
<Slider<number[]> onChange={(value: number) => {}} />;
