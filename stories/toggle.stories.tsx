import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from '@toggle';
import { customToggle, toggleRow } from '@toggle-customizations';
import { ToggleDemo } from './toggle-examples/toggle-demo';
import { ToggleOutline } from './toggle-examples/toggle-outline';
import { ToggleText } from './toggle-examples/toggle-text';
import { ToggleSizes } from './toggle-examples/toggle-sizes';
import { ToggleDisabled } from './toggle-examples/toggle-disabled';
import { ToggleRtl } from './toggle-examples/toggle-rtl';
const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <ToggleDemo />
};
export const Outline: Story = {
  render: () => <ToggleOutline />
};
export const Text: Story = {
  render: () => <ToggleText />
};
export const Sizes: Story = {
  render: () => <ToggleSizes />
};
export const Disabled: Story = {
  render: () => <ToggleDisabled />
};
export const Rtl: Story = {
  render: () => <ToggleRtl />
};
export const Usage: Story = {
  render: () => <Toggle>Toggle</Toggle>
};
function Customized() {
  const [selected, setSelected] = useState(false);
  return <Toggle aria-label="Custom toggle" isSelected={selected} onChange={setSelected} {...customToggle(180)} style={({
    isSelected
  }) => ({
    width: 200,
    fontSize: 20,
    opacity: isSelected ? .8 : 1
  })}>{({
      isSelected
    }) => isSelected ? 'Selected' : 'Unselected'}</Toggle>;
}
export const Customization: Story = {
  render: () => <Customized />
};
export const Conditions: Story = {
  render: () => <div {...toggleRow}><Toggle aria-label="Invalid toggle" variant="outline" aria-invalid="true">Invalid</Toggle><Toggle aria-label="Explicit selected" data-selected="">Data selected</Toggle><Toggle aria-label="Explicit off" data-selected="false">Data off</Toggle><Toggle aria-label="Explicit on" data-state="on">Data state</Toggle><Toggle aria-label="No variants" variant={null} size={null}>Null</Toggle><Toggle aria-label="Start icon"><svg data-icon="inline-start" />Start</Toggle><Toggle aria-label="End icon" size="sm" dir="rtl">End<svg data-icon="inline-end" /></Toggle></div>
};
