import * as stylex from '@stylexjs/stylex';
import { Slider } from '@slider';
const styles = stylex.create({
  dynamic: (width: number) => ({
    width
  })
});
export default function Fixture() {
  return <><Slider<number> aria-label="Number slider" defaultValue={40} xstyle={[styles.dynamic(240)]} style={({
      isDisabled,
      state
    }) => ({
      width: 244,
      opacity: isDisabled ? .5 : 1,
      fontSize: state.values[0] > 50 ? 20 : 16
    })} /><Slider<number[]> aria-label="Array slider" defaultValue={[20, 60]} orientation="vertical" minValue={0} maxValue={100} /></>;
}
