import {Attachment,AttachmentMedia,AttachmentContent,AttachmentTitle,AttachmentDescription,AttachmentActions,AttachmentAction,AttachmentTrigger,AttachmentGroup} from '@attachment';
<Attachment size={null} orientation={null}><AttachmentMedia variant={null}/><AttachmentTrigger render={props=><a {...props} href="#preview"/>}/></Attachment>;
// @ts-expect-error External classes are not a customization API.
<Attachment className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentMedia className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentContent className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentTitle className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentDescription className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentActions className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentAction className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentTrigger className="x"/>;
// @ts-expect-error External classes are not a customization API.
<AttachmentGroup className="x"/>;
// @ts-expect-error Unknown upload state.
<Attachment state="success"/>;
