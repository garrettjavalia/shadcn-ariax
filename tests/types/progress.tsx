import * as stylex from '@stylexjs/stylex';
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from '@progress';
const styles = stylex.create({
  width: (width: number) => ({
    width
  })
});
<Progress value={40} xstyle={styles.width(240)} style={({
  percentage,
  isIndeterminate
}) => ({
  opacity: isIndeterminate ? .5 : percentage! / 100
})}><ProgressLabel>Upload</ProgressLabel><ProgressValue>{value => value.toUpperCase()}</ProgressValue><ProgressTrack><ProgressIndicator style={{
      width: 80
    }} /></ProgressTrack></Progress>;
// @ts-expect-error static children source contract
<Progress>{() => null}</Progress>;
// @ts-expect-error value render callback source contract
<ProgressValue>value</ProgressValue>;
// @ts-expect-error external class unsupported
<Progress className="foo" />;
// @ts-expect-error external class unsupported
<ProgressLabel className="foo" />;
// @ts-expect-error external class unsupported
<ProgressValue className="foo" />;
// @ts-expect-error external class unsupported
<ProgressTrack className="foo" />;
// @ts-expect-error external class unsupported
<ProgressIndicator className="foo" />;
