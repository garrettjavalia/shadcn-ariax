import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from '@avatar';
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from '@dropdown-menu';
import { Button } from '@button';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function AvatarInstallFixture() {
  return <><DropdownMenuTrigger><Button aria-label="Avatar actions"><Avatar size="sm" xstyle={styles.dynamic(24)} style={{ height: 24 }}><AvatarImage src="/avatar-controlled.svg" alt="Installed avatar" /><AvatarFallback>A</AvatarFallback><AvatarBadge /></Avatar></Button><DropdownMenu><DropdownMenuItem>Profile</DropdownMenuItem></DropdownMenu></DropdownMenuTrigger><AvatarGroup><Avatar><AvatarFallback>A</AvatarFallback></Avatar><AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup></>;
}
