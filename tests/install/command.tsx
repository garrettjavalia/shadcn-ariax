import * as stylex from '@stylexjs/stylex';
import {Command,CommandDialog,CommandInput,CommandList,CommandEmpty,CommandGroup,CommandItem,CommandSeparator,CommandShortcut} from '@command';
const styles=stylex.create({size:{width:300}});
export default function Fixture(){return <CommandDialog open={false}><Command xstyle={styles.size}><CommandInput placeholder="Search" style={({isFocused})=>({opacity:isFocused?1:.8})}/><CommandList renderEmptyState={()=> <CommandEmpty>Empty</CommandEmpty>}><CommandGroup heading="Commands"><CommandItem>Open<CommandShortcut>⌘O</CommandShortcut></CommandItem></CommandGroup><CommandSeparator/></CommandList></Command></CommandDialog>;}
