import RegistryIconExample from "./sidebar-examples/registry-icon-example";
import RegistryFloatingExample from "./sidebar-examples/registry-floating-example";
import RegistryInsetExample from "./sidebar-examples/registry-inset-example";
import RegistryExample from "./sidebar-examples/registry-example";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from '@sidebar';
import DemoExample from './sidebar-examples/sidebar-demo';
import ControlledExample from './sidebar-examples/sidebar-controlled';
import HeaderExample from './sidebar-examples/sidebar-header';
import FooterExample from './sidebar-examples/sidebar-footer';
import GroupExample from './sidebar-examples/sidebar-group';
import GroupActionExample from './sidebar-examples/sidebar-group-action';
import GroupCollapsibleExample from './sidebar-examples/sidebar-group-collapsible';
import MenuExample from './sidebar-examples/sidebar-menu';
import MenuActionExample from './sidebar-examples/sidebar-menu-action';
import MenuBadgeExample from './sidebar-examples/sidebar-menu-badge';
import MenuCollapsibleExample from './sidebar-examples/sidebar-menu-collapsible';
import MenuSubExample from './sidebar-examples/sidebar-menu-sub';
import { SidebarRtl as RtlExample } from './sidebar-examples/sidebar-rtl';
import RscExample from './sidebar-examples/sidebar-rsc';
const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <DemoExample />
};
export const Controlled: Story = {
  render: () => <ControlledExample />
};
export const Header: Story = {
  render: () => <HeaderExample />
};
export const Footer: Story = {
  render: () => <FooterExample />
};
export const Group: Story = {
  render: () => <GroupExample />
};
export const GroupAction: Story = {
  render: () => <GroupActionExample />
};
export const GroupCollapsible: Story = {
  render: () => <GroupCollapsibleExample />
};
export const Menu: Story = {
  render: () => <MenuExample />
};
export const MenuAction: Story = {
  render: () => <MenuActionExample />
};
export const MenuBadge: Story = {
  render: () => <MenuBadgeExample />
};
export const MenuCollapsible: Story = {
  render: () => <MenuCollapsibleExample />
};
export const MenuSub: Story = {
  render: () => <MenuSubExample />
};
export const Rtl: Story = {
  render: () => <RtlExample />
};
export const Rsc: Story = {
  tags: ["!parity"],
  render: () => <RscExample />
};
export const Registry: Story = {
  render: () => <RegistryExample />
};
export const RegistryInset: Story = {
  render: () => <RegistryInsetExample />
};
export const RegistryFloating: Story = {
  render: () => <RegistryFloatingExample />
};
export const RegistryIcon: Story = {
  render: () => <RegistryIconExample />
};
import { States as StateExample, Customized as CustomExample, Skeletons as SkeletonExample } from './sidebar-examples/states';
export const States: Story = {
  render: () => <StateExample />
};
export const Customization: Story = {
  render: () => <CustomExample />
};
export const Skeletons: Story = {
  tags: ['!parity'],
  render: () => <SkeletonExample />
};
