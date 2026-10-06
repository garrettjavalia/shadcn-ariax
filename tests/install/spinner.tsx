import * as stylex from '@stylexjs/stylex';
import { Spinner } from '@spinner';
const styles = stylex.create({ size: (size: number) => ({ width: size, height: size }) });
export default function Fixture() { return <Spinner xstyle={styles.size(24)} style={{ color: 'red' }} aria-label="Processing" strokeWidth={3} />; }
