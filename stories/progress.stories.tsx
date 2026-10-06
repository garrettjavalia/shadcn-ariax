import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from '@progress';
import { progressCustom } from '@progress-customizations';
import ProgressDemo from './progress-examples/progress-demo';
import { awaitStoryState } from './story-readiness';
import { ProgressWithLabel } from './progress-examples/progress-label';
import { ProgressControlled } from './progress-examples/progress-controlled';
import { ProgressRtl } from './progress-examples/progress-rtl';
import { ProgressValues, ProgressWithLabel as RegistryLabelExample, ProgressControlled as RegistryControlledExample, FileUploadList } from './progress-examples/registry';
const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['parity'],
  decorators: [Story => <main id="parity-root"><Story /></main>]
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = {
  decorators: [awaitStoryState(() => document.querySelector('#parity-root [role="progressbar"]')?.getAttribute('aria-valuenow') === '66')],
  render: () => <ProgressDemo />
};
export const Label: Story = {
  render: () => <ProgressWithLabel />
};
export const Controlled: Story = {
  render: () => <ProgressControlled />
};
export const Rtl: Story = {
  render: () => <ProgressRtl />
};
export const Usage: Story = {
  render: () => <Progress aria-label="Loading" value={33} />
};
export const Values: Story = {
  render: () => <ProgressValues />
};
export const RegistryLabel: Story = {
  render: () => <RegistryLabelExample />
};
export const RegistryControlled: Story = {
  render: () => <RegistryControlledExample />
};
export const Files: Story = {
  render: () => <FileUploadList />
};
export const Indeterminate: Story = {
  render: () => <Progress aria-label="Loading" isIndeterminate><ProgressLabel>Loading</ProgressLabel><ProgressValue /></Progress>
};
export const Bounds: Story = {
  render: () => <Progress aria-label="Bounded" minValue={10} maxValue={110} value={60} formatOptions={{
    style: 'decimal',
    maximumFractionDigits: 1
  }}><ProgressLabel>Bounded</ProgressLabel><ProgressValue>{value => <strong>{value}</strong>}</ProgressValue></Progress>
};
function Customized() {
  const [value, setValue] = useState(20);
  return <><button onClick={() => setValue(value === 20 ? 80 : 20)}>Update</button><Progress aria-label="Custom" value={value} {...progressCustom('custom')} style={({
      percentage
    }) => ({
      width: 244,
      fontSize: 20,
      opacity: percentage! > 50 ? .8 : 1
    })}><ProgressLabel style={{
        fontSize: 20
      }}>Custom</ProgressLabel><ProgressValue style={{
        fontSize: 20
      }} /><ProgressTrack style={{
        height: 8
      }}><ProgressIndicator {...progressCustom('indicator')} style={{
          height: 8
        }} /></ProgressTrack><ProgressTrack style={{
        height: 8
      }}><ProgressIndicator {...progressCustom("nativeIndicator")} style={{
          width: 90,
          height: 8
        }} /></ProgressTrack></Progress></>;
}
export const Customization: Story = {
  render: () => <Customized />
};
