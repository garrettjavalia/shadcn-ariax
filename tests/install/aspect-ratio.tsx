import { AspectRatio } from '@aspect-ratio';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function AspectRatioInstallFixture() {
  return <AspectRatio ratio={16 / 9} xstyle={styles.dynamic(200)} style={{ maxWidth: 300 }}>Image</AspectRatio>;
}
