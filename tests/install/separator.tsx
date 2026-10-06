import { Separator } from '@separator';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ custom: { minWidth: 160 } });
export default function SeparatorInstallFixture() {
  return <Separator orientation="vertical" xstyle={styles.custom} style={{ height: 40 }} />;
}
