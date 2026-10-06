import * as stylex from '@stylexjs/stylex';
import {Sheet,SheetContent,SheetTrigger,SheetClose,SheetHeader,SheetFooter,SheetTitle,SheetDescription,type SheetProps} from '@sheet';
import {Button} from '@button';
const styles=stylex.create({dynamic:(width:number)=>({width})});const props:SheetProps={children:null,side:'left',xstyle:styles.dynamic(320),style:({isEntering})=>({opacity:isEntering?.5:1})};
export const installedSheet=<><SheetTrigger><Button>Open</Button><Sheet {...props}><SheetHeader><SheetTitle>Confirm</SheetTitle><SheetDescription>Description</SheetDescription></SheetHeader><SheetFooter><SheetClose style={({isPressed})=>({opacity:isPressed?.5:1})}>Close</SheetClose></SheetFooter></Sheet></SheetTrigger><SheetContent isOpen={false} showCloseButton={false}>Content</SheetContent></>;

export default function InstalledSheet(){return installedSheet;}
