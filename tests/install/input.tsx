import { Input, type InputProps } from '@input';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width, height: width / 7 }) });
const type: InputProps['type'] = 'password';
export default function InputInstallFixture() {
  return <><Input style={{ width: 200 }} aria-label="Installed input" /><Input type={type} id="installed-input" aria-label="Styled input" aria-invalid required defaultValue="value" xstyle={styles.dynamic(280)} style={({ isFocused }) => ({ width: 240, opacity: isFocused ? 1 : 0.5 })} /><Input type="file" aria-label="Installed file input" disabled /></>;
}
