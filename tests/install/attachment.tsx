import * as stylex from "@stylexjs/stylex";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  type AttachmentProps,
  type AttachmentTriggerProps,
} from "@attachment";
const styles = stylex.create({
  root: (gap: number) => ({ gap, width: "var(--attachment-width)" }),
  media: { width: "2rem" },
});
const props: AttachmentProps = {
  state: "processing",
  orientation: "vertical",
  size: "sm",
};
const trigger: AttachmentTriggerProps = {
  render: (props) => <a {...props} href="#fixture" />,
};
export default function Fixture() {
  return (
    <AttachmentGroup xstyle={styles.root(16)} style={{ gap: 12 }}>
      <Attachment
        {...props}
        xstyle={styles.root(8)}
        style={
          { "--attachment-width": "12rem", padding: 6 } as React.CSSProperties
        }
      >
        <AttachmentMedia xstyle={styles.media}>File</AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle style={{ color: "red" }}>File.pdf</AttachmentTitle>
          <AttachmentDescription>PDF</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction
            onPress={() => {}}
            xstyle={styles.root(8)}
            style={({ isHovered }) => ({ color: isHovered ? "red" : "blue" })}
          >
            Remove
          </AttachmentAction>
        </AttachmentActions>
        <AttachmentTrigger {...trigger} />
      </Attachment>
    </AttachmentGroup>
  );
}
