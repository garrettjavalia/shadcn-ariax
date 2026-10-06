import * as stylex from "@stylexjs/stylex";
import { ScrollArea } from "@scroll-area";
const styles = stylex.create({
  size: (height: number) => ({ height, width: 200 }),
});
export default function Fixture() {
  return (
    <ScrollArea
      xstyle={styles.size(100)}
      style={{ scrollbarColor: "red transparent" }}
      tabIndex={0}
    >
      <div style={{ height: 400 }}>Scrollable</div>
    </ScrollArea>
  );
}
