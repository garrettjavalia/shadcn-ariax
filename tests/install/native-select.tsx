import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from '@native-select';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }), option: { fontWeight: 500 } });
export default function NativeSelectInstallFixture() {
  return <NativeSelect aria-label="Installed native select" size="sm" defaultValue="one" style={{ width: 180 }} xstyle={styles.dynamic(200)}>
    <NativeSelectOptGroup label="Group" xstyle={styles.option} style={{ fontWeight: 400 }}>
      <NativeSelectOption value="one" xstyle={styles.option} style={{ color: 'blue' }}>One</NativeSelectOption>
      <NativeSelectOption value="two" disabled>Two</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>;
}
