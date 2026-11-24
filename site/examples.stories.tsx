import type { Meta } from "@storybook/react-vite";
import ButtonRenderExample from "./examples/button-render";
import MessageScrollerDemoExample from "./examples/message-scroller-demo";
import MessageScrollerAnchoringExample from "./examples/message-scroller-anchoring";
import MessageScrollerPreviousContextExample from "./examples/message-scroller-previous-context";
import MessageScrollerStreamingExample from "./examples/message-scroller-streaming";
import MessageScrollerAnimationExample from "./examples/message-scroller-animation";
import MessageScrollerScrollableExample from "./examples/message-scroller-scrollable";

import TypographyBlockquoteExample from "./examples/typography-blockquote";

import TypographyDemoExample from "./examples/typography-demo";

import TypographyH1Example from "./examples/typography-h1";

import TypographyH2Example from "./examples/typography-h2";

import TypographyH3Example from "./examples/typography-h3";

import TypographyH4Example from "./examples/typography-h4";

import TypographyInlineCodeExample from "./examples/typography-inline-code";

import TypographyLargeExample from "./examples/typography-large";

import TypographyLeadExample from "./examples/typography-lead";

import TypographyListExample from "./examples/typography-list";

import TypographyMutedExample from "./examples/typography-muted";

import TypographyPExample from "./examples/typography-p";

import TypographyRtlExample from "./examples/typography-rtl";

import TypographySmallExample from "./examples/typography-small";

import TypographyTableExample from "./examples/typography-table";

import InputGroupBasicExample from "./examples/input-group-basic";

import InputGroupButtonGroupExample from "./examples/input-group-button-group";

import InputGroupInCardExample from "./examples/input-group-in-card";

import InputGroupLabelExample from "./examples/input-group-label";

import InputGroupTextareaExamplesExample from "./examples/input-group-textarea-examples";

import InputGroupTooltipExample from "./examples/input-group-tooltip";

import InputGroupWithAddonsExample from "./examples/input-group-with-addons";

import InputGroupWithButtonsExample from "./examples/input-group-with-buttons";

import InputGroupWithKbdExample from "./examples/input-group-with-kbd";

import InputGroupWithTooltipExample from "./examples/input-group-with-tooltip";

import BubbleMarkdownExample from "./examples/bubble-markdown";
import CalendarMultipleExample from "./examples/calendar-multiple";
import EmptyCardExample from "./examples/empty-card";
import DataPickerWithDropdownsExample from "./examples/data-picker-with-dropdowns";
import MessagePatternExample from "./examples/message-pattern";
import MessageScrollerStateExample from "./examples/message-scroller-state";
import MutedItemGroupExample from "./examples/muted-item-group";
import OutlineItemGroupExample from "./examples/outline-item-group";
import RadioFieldsExample from "./examples/radio-fields";

export default { title: "AriaX/Examples" } satisfies Meta;
export const ButtonRender = { render: () => <ButtonRenderExample /> };
export const MessageScrollerDemo = {
  render: () => <MessageScrollerDemoExample />,
};
export const MessageScrollerAnchoring = {
  render: () => <MessageScrollerAnchoringExample />,
};
export const MessageScrollerPreviousContext = {
  render: () => <MessageScrollerPreviousContextExample />,
};
export const MessageScrollerStreaming = {
  render: () => <MessageScrollerStreamingExample />,
};
export const MessageScrollerAnimation = {
  render: () => <MessageScrollerAnimationExample />,
};
export const MessageScrollerScrollable = {
  render: () => <MessageScrollerScrollableExample />,
};

export const TypographyBlockquote = {
  render: () => <TypographyBlockquoteExample />,
};

export const TypographyDemo = { render: () => <TypographyDemoExample /> };

export const TypographyH1 = { render: () => <TypographyH1Example /> };

export const TypographyH2 = { render: () => <TypographyH2Example /> };

export const TypographyH3 = { render: () => <TypographyH3Example /> };

export const TypographyH4 = { render: () => <TypographyH4Example /> };

export const TypographyInlineCode = {
  render: () => <TypographyInlineCodeExample />,
};

export const TypographyLarge = { render: () => <TypographyLargeExample /> };

export const TypographyLead = { render: () => <TypographyLeadExample /> };

export const TypographyList = { render: () => <TypographyListExample /> };

export const TypographyMuted = { render: () => <TypographyMutedExample /> };

export const TypographyP = { render: () => <TypographyPExample /> };

export const TypographyRtl = { render: () => <TypographyRtlExample /> };

export const TypographySmall = { render: () => <TypographySmallExample /> };

export const TypographyTable = { render: () => <TypographyTableExample /> };

export const InputGroupBasic = { render: () => <InputGroupBasicExample /> };

export const InputGroupButtonGroup = {
  render: () => <InputGroupButtonGroupExample />,
};

export const InputGroupInCard = { render: () => <InputGroupInCardExample /> };

export const InputGroupLabel = { render: () => <InputGroupLabelExample /> };

export const InputGroupTextareaExamples = {
  render: () => <InputGroupTextareaExamplesExample />,
};

export const InputGroupTooltip = { render: () => <InputGroupTooltipExample /> };

export const InputGroupWithAddons = {
  render: () => <InputGroupWithAddonsExample />,
};

export const InputGroupWithButtons = {
  render: () => <InputGroupWithButtonsExample />,
};

export const InputGroupWithKbd = { render: () => <InputGroupWithKbdExample /> };

export const InputGroupWithTooltip = {
  render: () => <InputGroupWithTooltipExample />,
};

export const BubbleMarkdown = { render: () => <BubbleMarkdownExample /> };
export const CalendarMultiple = { render: () => <CalendarMultipleExample /> };
export const EmptyCard = { render: () => <EmptyCardExample /> };
export const DataPickerWithDropdowns = { render: () => <DataPickerWithDropdownsExample /> };
export const MessagePattern = { render: () => <MessagePatternExample /> };
export const MessageScrollerState = { render: () => <MessageScrollerStateExample /> };
export const MutedItemGroup = { render: () => <MutedItemGroupExample /> };
export const OutlineItemGroup = { render: () => <OutlineItemGroupExample /> };
export const RadioFields = { render: () => <RadioFieldsExample /> };
