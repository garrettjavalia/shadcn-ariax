import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tabs';
import { DirectionProvider } from '@direction';
import { width, rootOverride, triggerOverride, listHelper } from '@tabs-customizations';
import { useState } from 'react';
import { TabList } from 'react-aria-components';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { TabsDemo } from './tabs-examples/tabs-demo';
import { TabsLine } from './tabs-examples/tabs-line';
import { TabsVertical } from './tabs-examples/tabs-vertical';
import { TabsDisabled } from './tabs-examples/tabs-disabled';
import { TabsIcons } from './tabs-examples/tabs-icons';
import { TabsRtl } from './tabs-examples/tabs-rtl';
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root" style={{
    width: 600,
    padding: 24
  }}><Story /></main>]
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <TabsDemo />
};
export const Line: Story = {
  render: () => <TabsLine />
};
export const Vertical: Story = {
  render: () => <TabsVertical />
};
export const Disabled: Story = {
  render: () => <TabsDisabled />
};
export const Icons: Story = {
  render: () => <TabsIcons />
};
export const Rtl: Story = {
  render: () => <DirectionProvider direction="rtl"><div dir="rtl"><TabsRtl /></div></DirectionProvider>
};
export const Usage: Story = {
  render: () => <Tabs {...width} defaultSelectedKey="account"><TabsList><TabsTrigger id="account">Account</TabsTrigger><TabsTrigger id="password">Password</TabsTrigger></TabsList><TabsContent id="account">Make changes to your account here.</TabsContent><TabsContent id="password">Change your password here.</TabsContent></Tabs>
};
function ControlledTabs() {
  const [selected, setSelected] = useState<string | number>('one');
  return <><Tabs selectedKey={selected} onSelectionChange={setSelected} keyboardActivation="manual" orientation="vertical" disabledKeys={['blocked']} {...rootOverride(200)} style={({
      orientation
    }) => ({
      width: 260,
      opacity: orientation === 'vertical' ? 1 : .5
    })}><TabsList variant="line" aria-label="Controlled tabs" style={({
        orientation
      }) => ({
        opacity: orientation === 'vertical' ? .9 : 1
      })}><TabsTrigger id="one" {...triggerOverride} style={({
          isSelected
        }) => ({
          paddingInline: 12,
          opacity: isSelected ? 1 : .6
        })}>{({
            isSelected
          }) => <><ArrowLeftIcon data-icon="inline-start" />{isSelected ? 'One selected' : 'One'}</>}</TabsTrigger><TabsTrigger id="two" {...triggerOverride} style={({
          isSelected
        }) => ({
          paddingInline: 12,
          opacity: isSelected ? 1 : .6
        })}><ArrowRightIcon data-icon="inline-end" />Two</TabsTrigger><TabsTrigger id="blocked">Blocked</TabsTrigger></TabsList><TabsContent id="one" style={({
        isFocusVisible
      }) => ({
        opacity: isFocusVisible ? 1 : .8
      })}>One panel</TabsContent><TabsContent id="two">Two panel</TabsContent></Tabs><output>{String(selected)}</output></>;
}
export const Controlled: Story = {
  render: () => <ControlledTabs />
};
export const Conditions: Story = {
  render: () => <div>{(['default', 'line', null] as const).map((variant, index) => <Tabs key={String(variant)} defaultSelectedKey="selected" orientation={index === 1 ? 'vertical' : 'horizontal'}><TabsList variant={variant} aria-label={String(variant)}><TabsTrigger id="active" data-active="">Active</TabsTrigger><TabsTrigger id="inactive" data-active="false">Inactive</TabsTrigger><TabsTrigger id="selected">Selected</TabsTrigger></TabsList></Tabs>)}</div>
};
export const Helpers: Story = {
  render: () => <Tabs defaultSelectedKey="one"><TabList data-variant="line" aria-label="External styled list" {...listHelper}><TabsTrigger id="one">One</TabsTrigger><TabsTrigger id="two">Two</TabsTrigger></TabList><TabsContent id="one">Helper panel one</TabsContent><TabsContent id="two">Helper panel two</TabsContent></Tabs>
};
