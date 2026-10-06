import { Textarea, type TextareaProps } from "@textarea";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  dynamic: (width: number) => ({ width, minHeight: width / 4 }),
});
const props: TextareaProps = { rows: 4, required: true, "aria-invalid": true };
export default function TextareaInstallFixture() {
  return (
    <>
      <Textarea aria-label="Installed textarea" style={{ width: 200 }} />
      <Textarea
        {...props}
        id="installed-textarea"
        aria-label="Styled textarea"
        defaultValue="value"
        xstyle={styles.dynamic(280)}
        style={({ isFocused }) => ({
          width: 240,
          opacity: isFocused ? 1 : 0.5,
        })}
      />
      <Textarea disabled aria-label="Disabled textarea" />
    </>
  );
}
