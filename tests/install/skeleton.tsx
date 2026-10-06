import { Skeleton } from '@skeleton';
import {Card,CardHeader,CardContent} from '@card';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function SkeletonInstallFixture() {
  return <><Skeleton xstyle={styles.dynamic(200)} style={{ height: 20 }} /><Card style={{width:'100%',maxWidth:320}}><CardHeader><Skeleton style={{height:16,width:'66.6666666667%'}}/><Skeleton style={{height:16,width:'50%'}}/></CardHeader><CardContent><Skeleton style={{aspectRatio:'16 / 9',width:'100%'}}/></CardContent></Card></>;
}
