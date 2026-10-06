import { useState } from 'react';
import type { Key } from 'react-aria-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup, ToggleGroupItem } from '@toggle-group';
import { groupCustom, helperToggle } from '@toggle-group-customizations';
import { ToggleGroupDemo } from './toggle-group-examples/toggle-group-demo';
import { ToggleGroupOutline } from './toggle-group-examples/toggle-group-outline';
import { ToggleGroupSizes } from './toggle-group-examples/toggle-group-sizes';
import { ToggleGroupSpacing } from './toggle-group-examples/toggle-group-spacing';
import { ToggleGroupVertical } from './toggle-group-examples/toggle-group-vertical';
import { ToggleGroupDisabled } from './toggle-group-examples/toggle-group-disabled';
import { ToggleGroupFontWeightSelector } from './toggle-group-examples/toggle-group-font-weight-selector';
import { ToggleGroupRtl } from './toggle-group-examples/toggle-group-rtl';
const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof ToggleGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <ToggleGroupDemo />
};
export const Outline: Story = {
  render: () => <ToggleGroupOutline />
};
export const Sizes: Story = {
  render: () => <ToggleGroupSizes />
};
export const Spacing: Story = {
  render: () => <ToggleGroupSpacing />
};
export const Vertical: Story = {
  render: () => <ToggleGroupVertical />
};
export const Disabled: Story = {
  render: () => <ToggleGroupDisabled />
};
export const FontWeightSelector: Story = {
  render: () => <ToggleGroupFontWeightSelector />
};
export const Rtl: Story = {
  render: () => <ToggleGroupRtl />
};
export const Usage: Story = {
  render: () => <ToggleGroup selectionMode="single"><ToggleGroupItem id="a">A</ToggleGroupItem><ToggleGroupItem id="b">B</ToggleGroupItem><ToggleGroupItem id="c">C</ToggleGroupItem></ToggleGroup>
};
export const Joined: Story = {
  render: () => <>{(['horizontal', 'vertical'] as const).map(orientation => <ToggleGroup key={orientation} orientation={orientation} variant="outline" spacing={0} size="sm"><ToggleGroupItem id="a">First<svg data-icon="inline-end" /></ToggleGroupItem><ToggleGroupItem id="b">Middle</ToggleGroupItem><ToggleGroupItem id="c"><svg data-icon="inline-start" />Last</ToggleGroupItem></ToggleGroup>)}<ToggleGroup dir="rtl" variant="outline" spacing={0}><ToggleGroupItem id="a">First</ToggleGroupItem><ToggleGroupItem id="b">Middle</ToggleGroupItem><ToggleGroupItem id="c">Last</ToggleGroupItem></ToggleGroup></>
};
function Customized() {
  const [width, setWidth] = useState(240);
  const [keys, setKeys] = useState<Set<Key>>(new Set(['a']));
  return <><button onClick={() => setWidth(300)}>Resize</button><ToggleGroup variant="outline" selectionMode="multiple" selectedKeys={keys} onSelectionChange={setKeys} {...groupCustom(width)}><ToggleGroupItem id="a" style={({
        isSelected
      }) => ({
        fontSize: 20,
        opacity: isSelected ? .8 : 1
      })}>{({
          isSelected
        }) => isSelected ? 'A selected' : 'A'}</ToggleGroupItem><ToggleGroupItem id="b">B</ToggleGroupItem><ToggleGroupItem id="c" isDisabled>C</ToggleGroupItem></ToggleGroup></>;
}
export const Customization: Story = {
  render: () => <Customized />
};
export const Aliases: Story = {
  render: () => <><button {...helperToggle} data-selected="">Empty</button><button {...helperToggle} data-selected="false">False</button><button {...helperToggle} data-selected="true">True</button><button {...helperToggle} data-state="on">On</button><button {...helperToggle} data-state="off">Off</button></>
};
