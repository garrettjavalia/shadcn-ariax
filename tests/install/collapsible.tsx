import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@collapsible";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  dynamic: (width: number) => ({
    width,
  }),
});
export default function CollapsibleInstallFixture() {
  return (
    <Collapsible
      xstyle={styles.dynamic(200)}
      defaultExpanded
      style={({ isExpanded }) => ({
        opacity: isExpanded ? 1 : 0.8,
      })}
    >
      <CollapsibleTrigger
        style={({ isHovered }) => ({
          color: isHovered ? "red" : undefined,
        })}
      >
        Toggle
      </CollapsibleTrigger>
      <CollapsibleContent
        style={({ isFocusVisibleWithin }) => ({
          opacity: isFocusVisibleWithin ? 0.8 : 1,
        })}
      >
        Installed content
      </CollapsibleContent>
    </Collapsible>
  );
}
