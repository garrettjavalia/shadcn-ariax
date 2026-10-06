import * as stylex from "@stylexjs/stylex";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
  type MessageProps,
} from "@message";
const styles = stylex.create({
  root: (gap: number) => ({ gap, width: "var(--message-width)" }),
});
const props: MessageProps = {
  align: "end",
  onClick: (event) => event.currentTarget.focus(),
};
export default function Fixture() {
  return (
    <MessageGroup xstyle={styles.root(16)}>
      <Message
        {...props}
        xstyle={styles.root(8)}
        style={{ gap: 12, "--message-width": "20rem" } as React.CSSProperties}
      >
        <MessageAvatar style={{ width: 32 }}>ME</MessageAvatar>
        <MessageContent>
          <MessageHeader xstyle={styles.root(4)}>Header</MessageHeader>
          <div>Content</div>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
