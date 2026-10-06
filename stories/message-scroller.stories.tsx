import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from '@message-scroller';
import { messageScrollerDynamic, messageScrollerCustom as custom } from '@message-scroller-customizations';
const meta = {
  title: 'Components/MessageScroller',
  component: MessageScroller,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof MessageScroller>;
export default meta;
type Story = StoryObj<typeof meta>;
function Commands() {
  const commands = useMessageScroller();
  const scrollable = useMessageScrollerScrollable();
  const visibility = useMessageScrollerVisibility();
  return <><button onClick={() => commands.scrollToStart()}>Start</button><button onClick={() => commands.scrollToEnd()}>End</button><button onClick={() => commands.scrollToMessage('message-2', {
      align: 'center'
    })}>Middle</button><output aria-label="Scroll state">{String(scrollable.start)} / {String(scrollable.end)}</output><output aria-label="Visibility">{visibility.currentAnchorId ?? 'none'} / {visibility.visibleMessageIds.join(',')}</output></>;
}
function State({
  position = 'end',
  rtl = false
}: {
  position?: 'start' | 'end' | 'last-anchor';
  rtl?: boolean;
}) {
  const [count, setCount] = React.useState(5);
  return <div dir={rtl ? 'rtl' : 'ltr'}><MessageScrollerProvider defaultScrollPosition={position}><Commands /><button onClick={() => setCount(count + 1)}>Append</button><MessageScroller {...custom.root()}><MessageScrollerViewport aria-label="Transcript"><MessageScrollerContent {...custom.content()}>{Array.from({
              length: count
            }, (_, index) => <MessageScrollerItem key={index} messageId={`message-${index}`} scrollAnchor={index % 2 === 0} {...custom.item()}>Message {index}</MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="start" /><MessageScrollerButton /></MessageScroller></MessageScrollerProvider></div>;
}
export const PrimitiveState: Story = {
  render: () => <State />
};
export const OpeningStart: Story = {
  render: () => <State position="start" />
};
export const LastAnchor: Story = {
  render: () => <State position="last-anchor" />
};
export const Rtl: Story = {
  render: () => <State rtl />
};
function Customized() {
  const [width, setWidth] = React.useState(320);
  const [native, setNative] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState('');
  return <MessageScrollerProvider><button onClick={() => setWidth(360)}>Resize</button><button onClick={() => setNative(false)}>Clear native width</button><button onClick={() => setState(ref.current?.dataset.slot ?? 'missing')}>Read ref</button><output>{state}</output><MessageScroller ref={ref} {...messageScrollerDynamic(width, {
      width: native ? width + 4 : undefined,
      fontSize: 20,
      opacity: .9
    })}><MessageScrollerViewport aria-label="Customized transcript"><MessageScrollerContent {...custom.content()}>{Array.from({
            length: 5
          }, (_, index) => <MessageScrollerItem key={index} messageId={`custom-${index}`} {...custom.item()}>Custom {index}</MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="start" render={(props, state) => <button {...props} aria-label="Custom start" data-render-active={state.active} data-render-direction={state.direction} />} /><MessageScrollerButton /></MessageScroller></MessageScrollerProvider>;
}
export const Customization: Story = {
  render: () => <Customized />
};
