import * as stylex from '@stylexjs/stylex';
import { Checkbox } from '@checkbox';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function CheckboxInstallFixture() {
  return <>
    <Checkbox aria-label="Installed checkbox" defaultSelected xstyle={styles.dynamic(24)} style={({ isSelected }) => ({ opacity: isSelected ? 1 : 0.5 })} />
    <Checkbox aria-label="Installed native style" xstyle={styles.dynamic(24)} style={{ height: 24, width: 28 }}>{({ isIndeterminate }) => isIndeterminate ? 'Mixed' : null}</Checkbox>
  </>;
}
