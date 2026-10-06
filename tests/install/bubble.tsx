import * as stylex from "@stylexjs/stylex";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@bubble";
const styles = stylex.create({ custom: { padding: 12 } });
export default function Fixture() {
  return (
    <BubbleGroup>
      <Bubble variant="tinted" align="end">
        <BubbleContent
          xstyle={styles.custom}
          style={{ padding: 8 }}
          render={(props) => <button {...props} type="button" />}
        >
          Hello
        </BubbleContent>
        <BubbleReactions side="top" align="start">
          👍
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  );
}
