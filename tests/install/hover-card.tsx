import * as stylex from '@stylexjs/stylex';
import {HoverCard,HoverCardTrigger,type HoverCardProps} from '@hover-card';
import {Button} from '@button';
const s=stylex.create({dynamic:(width:number)=>({width})});const props:HoverCardProps={placement:'end',xstyle:s.dynamic(320),style:({isEntering})=>({opacity:isEntering?.5:1,width:300})};
export default function InstalledHoverCard(){return <HoverCardTrigger delay={100} closeDelay={200}><Button>Preview</Button><HoverCard {...props}>{({placement})=><p>{placement}</p>}</HoverCard></HoverCardTrigger>;}
