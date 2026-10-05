// Test-only adapters for the Button documentation's composed menu example.
// These are shared by BOTH implementations; they are not distributed Ariax components.
import type { ComponentProps, ReactNode } from 'react';
import { MenuTrigger, Popover, Menu, MenuItem, MenuSection, Separator, SubmenuTrigger } from 'react-aria-components';
export function ButtonGroup({ className = '', ...props }: ComponentProps<'div'>) { return <div role="group" data-slot="button-group" className={`fixture-group ${className}`} {...props} />; }
export const DropdownMenuTrigger = MenuTrigger;
export const DropdownMenuSub = SubmenuTrigger;
export function DropdownMenu({ className = '', placement = 'bottom start', ...props }: ComponentProps<typeof Menu<object>> & { placement?: ComponentProps<typeof Popover>['placement'] }) {
  return <Popover placement={placement} offset={4} data-parity-portal="menu" className="fixture-popover"><Menu className={`fixture-menu ${className}`} {...props} /></Popover>;
}
export const DropdownMenuSubContent = DropdownMenu;
export const DropdownMenuGroup = MenuSection;
export function DropdownMenuItem({ variant, ...props }: ComponentProps<typeof MenuItem> & { variant?: string }) { return <MenuItem data-variant={variant} className="fixture-menu-item" {...props} />; }
export const DropdownMenuSubTrigger = DropdownMenuItem;
export function DropdownMenuSeparator() { return <Separator className="fixture-separator" />; }
