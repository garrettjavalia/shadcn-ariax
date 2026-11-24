import { toId, storyNameFromExport } from "storybook/internal/csf";

type Override = {
  stylexStoryId: string;
  metaSource: string;
  exportName: string;
};
const examples: Record<string, string> = {
  "bubble-markdown": "BubbleMarkdown",
  "calendar-multiple": "CalendarMultiple",
  "empty-card": "EmptyCard",
  "data-picker-with-dropdowns": "DataPickerWithDropdowns",
  "message-pattern": "MessagePattern",
  "message-scroller-state": "MessageScrollerState",
  "muted-item-group": "MutedItemGroup",
  "outline-item-group": "OutlineItemGroup",
  "radio-fields": "RadioFields",

  "input-group-with-tooltip": "InputGroupWithTooltip",
  "input-group-with-kbd": "InputGroupWithKbd",
  "input-group-with-buttons": "InputGroupWithButtons",
  "input-group-with-addons": "InputGroupWithAddons",
  "input-group-tooltip": "InputGroupTooltip",
  "input-group-textarea-examples": "InputGroupTextareaExamples",
  "input-group-label": "InputGroupLabel",
  "input-group-in-card": "InputGroupInCard",
  "input-group-button-group": "InputGroupButtonGroup",
  "input-group-basic": "InputGroupBasic",
  "typography-table": "TypographyTable",
  "typography-small": "TypographySmall",
  "typography-rtl": "TypographyRtl",
  "typography-p": "TypographyP",
  "typography-muted": "TypographyMuted",
  "typography-list": "TypographyList",
  "typography-lead": "TypographyLead",
  "typography-large": "TypographyLarge",
  "typography-inline-code": "TypographyInlineCode",
  "typography-h4": "TypographyH4",
  "typography-h3": "TypographyH3",
  "typography-h2": "TypographyH2",
  "typography-h1": "TypographyH1",
  "typography-demo": "TypographyDemo",
  "typography-blockquote": "TypographyBlockquote",
  "button-render": "ButtonRender",
  "message-scroller-demo": "MessageScrollerDemo",
  "message-scroller-anchoring": "MessageScrollerAnchoring",
  "message-scroller-previous-context": "MessageScrollerPreviousContext",
  "message-scroller-streaming": "MessageScrollerStreaming",
  "message-scroller-animation": "MessageScrollerAnimation",
  "message-scroller-scrollable": "MessageScrollerScrollable",
};
export const previewOverrides: Record<string, Override> = Object.fromEntries(
  Object.entries(examples).map(([name, exportName]) => [
    name,
    {
      stylexStoryId: toId("AriaX/Examples", storyNameFromExport(exportName)),
      metaSource: "site/examples.stories.tsx",
      exportName,
    },
  ]),
);
