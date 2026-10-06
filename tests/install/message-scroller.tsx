import * as stylex from "@stylexjs/stylex";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@message-scroller";
const styles = stylex.create({
  root: (height: number) => ({
    height,
  }),
  content: {
    gap: 12,
  },
  item: {
    padding: 8,
  },
});
function Commands() {
  const commands = useMessageScroller();
  const scrollable = useMessageScrollerScrollable();
  const visibility = useMessageScrollerVisibility();
  return (
    <>
      <button
        onClick={() =>
          commands.scrollToMessage("first", {
            align: "center",
            behavior: "auto",
          })
        }
      >
        First
      </button>
      <output>
        {String(scrollable.end)}:{visibility.currentAnchorId}:
        {visibility.visibleMessageIds.join(",")}
      </output>
    </>
  );
}
export default function Fixture() {
  return (
    <MessageScrollerProvider
      autoScroll
      defaultScrollPosition="last-anchor"
      scrollEdgeThreshold={8}
      scrollPreviousItemPeek={32}
      scrollMargin={4}
    >
      <MessageScroller
        xstyle={styles.root(240)}
        style={{
          width: 320,
        }}
      >
        <Commands />
        <MessageScrollerViewport preserveScrollOnPrepend>
          <MessageScrollerContent xstyle={styles.content}>
            <MessageScrollerItem
              messageId="first"
              scrollAnchor
              xstyle={styles.item}
              style={{
                height: 360,
              }}
            >
              Message
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton
          direction="start"
          style={{
            opacity: 0.7,
          }}
        />
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
