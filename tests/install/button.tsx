import { Button, LinkButton, buttonProps } from "@button";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  custom: { minWidth: 160 },
  dynamic: (width: number) => ({ width }),
});
export default function ButtonInstallFixture() {
  return (
    <>
      <Button
        xstyle={[styles.custom, styles.dynamic(200)]}
        style={({ isPressed }) => ({ opacity: isPressed ? 0.5 : 1 })}
      >
        Installed
      </Button>
      <a {...buttonProps({ xstyle: styles.custom, style: { height: 40 } })}>
        Link
      </a>
      <LinkButton
        href="#installed"
        xstyle={styles.dynamic(200)}
        style={({ isHovered }) => ({ opacity: isHovered ? 0.5 : 1 })}
      >
        Installed link
      </LinkButton>
    </>
  );
}
