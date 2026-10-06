import { Kbd, KbdGroup } from '@kbd';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function KbdInstallFixture() {
  return <KbdGroup style={{ gap: 8 }}><Kbd xstyle={styles.dynamic(40)} style={{ height: 24 }}>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>;
}
