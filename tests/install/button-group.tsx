import * as stylex from '@stylexjs/stylex';
import {ButtonGroup,ButtonGroupText,ButtonGroupSeparator,buttonGroupProps} from '@button-group';
const styles=stylex.create({dynamic:(width:number)=>({width})});
export default function Fixture(){return <><Compositions/><ButtonGroup orientation="vertical" xstyle={styles.dynamic(240)} style={{width:280}}><ButtonGroupText xstyle={styles.dynamic(80)} style={{width:90}}>Text</ButtonGroupText><ButtonGroupSeparator orientation="horizontal" xstyle={styles.dynamic(120)} style={{width:140}}/></ButtonGroup><div {...buttonGroupProps({xstyle:styles.dynamic(200),style:{width:220}})}>Helper</div></>;}
import {Button} from '@button';
import {Label} from '@label';
import {Input} from '@input';
import {Field} from '@field';
import {Select,SelectTrigger,SelectList,SelectItem} from '@select';
import {Popover,PopoverTrigger} from '@popover';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuItem} from '@dropdown-menu';
export function Compositions(){return <><ButtonGroup><ButtonGroupText render={props=><Label {...props} htmlFor="installed-input"/>}>Name</ButtonGroupText><Input id="installed-input"/></ButtonGroup><Field><ButtonGroup><Select defaultValue="one"><SelectTrigger/><SelectList><SelectItem id="one" textValue="One">One</SelectItem></SelectList></Select><Input/></ButtonGroup></Field><ButtonGroup><PopoverTrigger><Button>Open popover</Button><Popover>Content</Popover></PopoverTrigger><DropdownMenuTrigger><Button>Open menu</Button><DropdownMenu><DropdownMenuItem>Action</DropdownMenuItem></DropdownMenu></DropdownMenuTrigger></ButtonGroup></>}
