import { Skeleton } from '@skeleton';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function SkeletonInstallFixture() {
  return <Skeleton xstyle={styles.dynamic(200)} style={{ height: 20 }} />;
}
