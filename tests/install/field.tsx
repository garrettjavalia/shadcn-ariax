import { Field, FieldLabel, FieldError, FieldSeparator } from '@field';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function FieldInstallFixture() {
  return <Field orientation="responsive" style={{ gap: 20 }} xstyle={styles.dynamic(200)}><FieldLabel htmlFor="field-input">Field label</FieldLabel><input id="field-input" /><FieldError errors={[{ message: 'Error' }]} /><FieldSeparator>or</FieldSeparator></Field>;
}
