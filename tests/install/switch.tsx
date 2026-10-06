import * as stylex from '@stylexjs/stylex';
import { Switch } from '@switch';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function Fixture() {
  return <><Switch aria-label="Switch" size="sm" xstyle={styles.dynamic(32)} style={{ width: 28 }} /><Switch aria-label="Selected switch" defaultSelected xstyle={styles.dynamic(48)} style={({ isSelected }) => ({ opacity: isSelected ? 0.8 : 1 })}>{({ isSelected }) => isSelected ? 'On' : 'Off'}</Switch></>;
}
