import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import {MessageScroller,MessageScrollerViewport,MessageScrollerContent,MessageScrollerItem,MessageScrollerButton,MessageScrollerProvider} from '../../registry/ariax/ui/message-scroller';
const styles=stylex.create({root:(height:number)=>({height})});
const ref=React.createRef<HTMLDivElement>();
<MessageScroller ref={ref} xstyle={styles.root(220)} style={{height:240}}/>;
<MessageScrollerViewport ref={ref} preserveScrollOnPrepend onScroll={event=>event.currentTarget.scrollTop}/>;
<MessageScrollerContent ref={ref}/>;
<MessageScrollerItem ref={ref} messageId="test" scrollAnchor/>;
<MessageScrollerProvider defaultScrollPosition="last-anchor" scrollMargin={10}/>;
<MessageScrollerButton ref={React.createRef<HTMLButtonElement>()} direction="start" behavior="smooth" render={(props,state)=><button {...props} disabled={!state.active}>{state.direction}</button>}/>;
// @ts-expect-error Public styling uses xstyle/native style.
<MessageScroller className="tailwind"/>;
// @ts-expect-error Public styling uses xstyle/native style.
<MessageScrollerViewport className="tailwind"/>;
// @ts-expect-error Public styling uses xstyle/native style.
<MessageScrollerContent spacerClassName="tailwind"/>;
// @ts-expect-error Public styling uses xstyle/native style.
<MessageScrollerItem className="tailwind"/>;
// @ts-expect-error Public styling uses xstyle/native style.
<MessageScrollerButton className="tailwind"/>;
