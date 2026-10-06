import {Message,MessageGroup,MessageAvatar,MessageContent,MessageHeader,MessageFooter} from '@message';
<Message align="end" ref={element=>{element?.focus();}} style={{gap:8}} onClick={event=>event.currentTarget.focus()}/>;
// @ts-expect-error Unknown message direction.
<Message align="center"/>;
// @ts-expect-error External classes are not a customization API.
<Message className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MessageGroup className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MessageAvatar className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MessageContent className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MessageHeader className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MessageFooter className="x"/>;
