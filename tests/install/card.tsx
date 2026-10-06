import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@card';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function CardInstallFixture() {
  return <Card style={{ width: 300 }} xstyle={styles.dynamic(320)}><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription><CardAction>Action</CardAction></CardHeader><CardContent>Content</CardContent><CardFooter>Footer</CardFooter></Card>;
}
