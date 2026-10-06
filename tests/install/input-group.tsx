import * as stylex from "@stylexjs/stylex";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@input-group";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function InputGroupInstallFixture() {
  return (
    <>
      <InputGroup xstyle={styles.dynamic(280)} style={{ width: 240 }}>
        <InputGroupInput aria-label="Installed grouped input" />
        <InputGroupAddon xstyle={styles.dynamic(80)} style={{ minWidth: 60 }}>
          <InputGroupButton
            xstyle={styles.dynamic(48)}
            style={({ isPressed }) => ({ opacity: isPressed ? 0.5 : 1 })}
          >
            Send
          </InputGroupButton>
          <InputGroupText style={{ fontSize: 16 }}>Text</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup
        xstyle={styles.dynamic(280)}
        style={({ isFocusWithin }) => ({ opacity: isFocusWithin ? 1 : 0.8 })}
      >
        <InputGroupTextarea
          aria-label="Installed grouped textarea"
          style={{ minHeight: 60 }}
        />
      </InputGroup>
    </>
  );
}
