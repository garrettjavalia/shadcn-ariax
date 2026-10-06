import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '@slider';
import { sliderCustom } from '@slider-customizations';
import { SliderDemo } from './slider-examples/slider-demo';
import { SliderRange } from './slider-examples/slider-range';
import { SliderMultiple } from './slider-examples/slider-multiple';
import { SliderVertical } from './slider-examples/slider-vertical';
import { SliderControlled } from './slider-examples/slider-controlled';
import { SliderDisabled } from './slider-examples/slider-disabled';
import { SliderRtl } from './slider-examples/slider-rtl';
const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  render: () => <SliderDemo />
};
export const Range: Story = {
  render: () => <SliderRange />
};
export const Multiple: Story = {
  render: () => <SliderMultiple />
};
export const Vertical: Story = {
  render: () => <SliderVertical />
};
export const Controlled: Story = {
  render: () => <SliderControlled />
};
export const Disabled: Story = {
  render: () => <SliderDisabled />
};
export const Rtl: Story = {
  render: () => <SliderRtl />
};
export const Usage: Story = {
  render: () => <Slider aria-label="Usage slider" defaultValue={[33]} maxValue={100} step={1} />
};
function Customized() {
  const [width, setWidth] = useState(240);
  const [value, setValue] = useState(40);
  const [disabled, setDisabled] = useState(false);
  return <><button onClick={() => setWidth(300)}>Resize</button><button onClick={() => setDisabled(!disabled)}>Disable</button><Slider aria-label="Custom slider" value={value} onChange={setValue} {...sliderCustom(width)} isDisabled={disabled} style={({
      isDisabled
    }) => ({
      width: width + 4,
      fontSize: 20,
      opacity: isDisabled ? .6 : 1
    })} /><output>{value}</output></>;
}
export const Customization: Story = {
  render: () => <Customized />
};
export const Empty: Story = {
  render: () => <Slider aria-label="Empty slider" defaultValue={[]} />
};
