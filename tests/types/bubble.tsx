import{Bubble,BubbleContent}from'@bubble';
// @ts-expect-error Public Tailwind classes are unsupported.
const invalid=<Bubble className="p-2"/>;
const valid=<Bubble variant={null}><BubbleContent style={{padding:8}} render={props=><a {...props} href="#"/>}/></Bubble>;
void invalid;void valid;
