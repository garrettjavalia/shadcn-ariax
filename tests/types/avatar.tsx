import * as stylex from "@stylexjs/stylex";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "../../registry/ariax/ui/avatar";
const styles = stylex.create({
  round: { borderRadius: 12 },
  dynamic: (size: number) => ({ width: size, height: size }),
});
<AvatarGroup style={{ gap: 10 }} xstyle={styles.round}>
  <Avatar
    size="sm"
    style={{ height: 20 }}
    xstyle={[styles.round, styles.dynamic(48)]}
  >
    <AvatarImage
      alt="A"
      src="/image.svg"
      onLoad={(event) => event.currentTarget.focus()}
      style={{ opacity: 0.5 }}
    />
    <AvatarFallback style={{ fontWeight: 500 }}>A</AvatarFallback>
    <AvatarBadge style={{ background: "red" }} />
  </Avatar>
  <AvatarGroupCount xstyle={styles.dynamic(20)}>+3</AvatarGroupCount>
</AvatarGroup>;
// @ts-expect-error External className is unsupported.
<Avatar className="size-12" />;
// @ts-expect-error External className is unsupported.
<AvatarImage className="grayscale" />;
// @ts-expect-error Plain CSS objects are not StyleX objects.
<AvatarFallback xstyle={{ width: 100 }} />;
