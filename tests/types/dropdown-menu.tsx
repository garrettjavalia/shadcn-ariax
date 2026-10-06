import * as stylex from '@stylexjs/stylex';
import {DropdownMenuTrigger,DropdownMenu,DropdownMenuGroup,DropdownMenuLabel,DropdownMenuItem,DropdownMenuSub,DropdownMenuSubTrigger,DropdownMenuSubContent,DropdownMenuSeparator,DropdownMenuShortcut} from '../../registry/ariax/ui/dropdown-menu';
import {Button} from '../../registry/ariax/ui/button';
const styles=stylex.create({wide:{minWidth:'12rem'},dynamic:(width:number)=>({width})});
<DropdownMenuTrigger><Button>Actions</Button><DropdownMenu selectionMode="multiple" xstyle={[styles.wide,styles.dynamic(200)]} style={({defaultStyle})=>({...defaultStyle,opacity:.9})}><DropdownMenuGroup><DropdownMenuLabel inset style={{fontWeight:500}}>Actions</DropdownMenuLabel><DropdownMenuItem id="a" inset variant="destructive" xstyle={styles.dynamic(150)} style={({isSelected})=>({fontWeight:isSelected?600:400})}>{({isFocused})=><>Item {String(isFocused)}<DropdownMenuShortcut style={{letterSpacing:1}}>A</DropdownMenuShortcut></>}</DropdownMenuItem><DropdownMenuSub><DropdownMenuSubTrigger style={({isOpen})=>({opacity:isOpen?1:.8})}>More</DropdownMenuSubTrigger><DropdownMenuSubContent placement="end top" offset={0}><DropdownMenuItem>Nested</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub><DropdownMenuSeparator style={{height:2}}/></DropdownMenuGroup></DropdownMenu></DropdownMenuTrigger>;
// @ts-expect-error External className is unsupported.
<DropdownMenu className="w-40"/>;
// @ts-expect-error External className is unsupported.
<DropdownMenuItem className="p-2">Item</DropdownMenuItem>;
// @ts-expect-error Plain CSS objects are not StyleX objects.
<DropdownMenu xstyle={{width:200}}/>;
