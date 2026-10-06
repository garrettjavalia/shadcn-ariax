import type { ComponentProps } from 'react';
import { Sidebar as Primitive, SidebarMenuButton as MenuButton, useSidebar } from '@sidebar';
export function Sidebar(props: ComponentProps<typeof Primitive>) {
  const {
    isMobile
  } = useSidebar();
  return <Primitive {...props} data-parity-portal={isMobile || undefined} />;
}
export function SidebarMenuButton({
  tooltip,
  ...props
}: ComponentProps<typeof MenuButton>) {
  const content = typeof tooltip === 'string' ? {
    children: tooltip
  } : tooltip;
  const next = content ? {
    ...content,
    'data-parity-portal': true
  } : undefined;
  return <MenuButton {...props} tooltip={next} />;
}
