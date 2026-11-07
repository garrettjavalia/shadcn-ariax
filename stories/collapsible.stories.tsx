import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@collapsible';
import { DirectionProvider } from '@direction';
import { Input } from '@input';
import CollapsibleDemo from './collapsible-examples/collapsible-demo';
import { CollapsibleBasic } from './collapsible-examples/collapsible-basic';
import { CollapsibleSettings } from './collapsible-examples/collapsible-settings';
import { CollapsibleFileTree } from './collapsible-examples/collapsible-file-tree';
import { CollapsibleRtl } from './collapsible-examples/collapsible-rtl';
import { dynamicRoot, basicRoot } from '@collapsible-customizations';
const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root" style={{
    width: 600,
    padding: 24
  }}><Story /></main>]
} satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <CollapsibleDemo />
};
export const Basic: Story = {
  render: () => <CollapsibleBasic />
};
export const Settings: Story = {
  render: () => <CollapsibleSettings />
};
export const FileTree: Story = {
  render: () => <CollapsibleFileTree />
};
export const Rtl: Story = {
  decorators: [Story => <DirectionProvider direction="rtl"><div dir="rtl"><Story /></div></DirectionProvider>], parameters: { originalExample: "collapsible-rtl" }, render: () => <CollapsibleRtl />
};
export const Usage: Story = {
  render: () => <Collapsible><CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger><CollapsibleContent>Yes. Free to use for personal and commercial projects. No attribution required.</CollapsibleContent></Collapsible>
};
function ControlledExample() {
  const [open, setOpen] = useState(false);
  return <Collapsible isExpanded={open} onExpandedChange={setOpen}><CollapsibleTrigger>Toggle</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>;
}
export const Controlled: Story = {
  render: () => <ControlledExample />
};
function NativeExample() {
  const [open, setOpen] = useState(false);
  return <><Collapsible {...dynamicRoot(200)} isExpanded={open} onExpandedChange={setOpen} style={({
      isExpanded
    }) => ({
      width: 240,
      opacity: isExpanded ? 1 : .8
    })}><CollapsibleTrigger style={({
        isHovered,
        isFocusVisible
      }) => ({
        opacity: isHovered ? .7 : 1,
        outlineWidth: isFocusVisible ? 2 : undefined
      })}>{({
          isPressed
        }) => isPressed ? 'Pressed' : 'Native trigger'}</CollapsibleTrigger><CollapsibleContent style={({
        isFocusVisibleWithin
      }) => ({
        opacity: isFocusVisibleWithin ? 1 : .75
      })}><Input aria-label="Panel input" defaultValue="Native" /></CollapsibleContent></Collapsible><output>{String(open)}</output><Collapsible isDisabled defaultExpanded><CollapsibleTrigger>Disabled trigger</CollapsibleTrigger><CollapsibleContent>Disabled open panel</CollapsibleContent></Collapsible></>;
}
export const Native: Story = {
  render: () => <NativeExample />
};
export const Flags: Story = {
  render: () => <div>{['empty', 'false', 'state'].map(flag => <Collapsible key={flag} {...basicRoot} {...flag === 'state' ? {
      'data-state': 'open'
    } : {
      'data-open': flag === 'false' ? 'false' : ''
    }}><CollapsibleTrigger>{flag}</CollapsibleTrigger><CollapsibleContent>Panel</CollapsibleContent></Collapsible>)}</div>
};
