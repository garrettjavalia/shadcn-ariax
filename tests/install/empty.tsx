import * as stylex from '@stylexjs/stylex';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from '@empty';
const styles = stylex.create({ width: (width: number) => ({ width }) });
export default function Fixture() { return <Empty xstyle={styles.width(320)} style={{ width: 400 }}><EmptyHeader><EmptyMedia variant="icon"><svg /></EmptyMedia><EmptyTitle>Empty</EmptyTitle><EmptyDescription>Description <a href="#">link</a></EmptyDescription></EmptyHeader><EmptyContent>Content</EmptyContent></Empty>; }
