import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@skeleton';
import { shapes } from '@skeleton-customizations';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['parity'],
  decorators: [(Story: () => React.ReactNode) => (
    <div id="parity-root" style={{ padding: 24, width: 400 }}><Story /></div>
  )],
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
const column = { display: 'flex', flexDirection: 'column' as const, gap: 8 };

export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Skeleton xstyle={shapes.circle} />
      <div style={column}>
        <Skeleton xstyle={shapes.line150} /><Skeleton xstyle={shapes.line100} />
      </div>
    </div>
  ),
};
export const Usage: Story = { args: { xstyle: shapes.usage } };

// Shared card layout fixture; the Card component itself is not implemented here.
export const Card: Story = {
  render: () => (
    <div style={{ ...column, gap: 24 }}>
      <div style={column}>
        <Skeleton xstyle={shapes.twoThird} /><Skeleton xstyle={shapes.half} />
      </div>
      <Skeleton xstyle={shapes.square} />
    </div>
  ),
};
export const Text: Story = {
  render: () => (
    <div style={column}>
      <Skeleton xstyle={shapes.full} /><Skeleton xstyle={shapes.full} />
      <Skeleton xstyle={shapes.threeQuarter} />
    </div>
  ),
};
export const Form: Story = {
  render: () => (
    <div style={{ ...column, gap: 28 }}>
      {[shapes.label80, shapes.label96].map((shape, i) => (
        <div key={i} style={{ ...column, gap: 12 }}>
          <Skeleton xstyle={shape} /><Skeleton xstyle={shapes.input} />
        </div>
      ))}
      <Skeleton xstyle={shapes.submit} />
    </div>
  ),
};
export const Table: Story = {
  render: () => (
    <div style={column}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ display: 'flex', gap: 16 }}>
          <Skeleton xstyle={shapes.flex} />
          <Skeleton xstyle={shapes.label96} /><Skeleton xstyle={shapes.label80} />
        </div>
      ))}
    </div>
  ),
};
export const Rtl: Story = {
  render: () => (
    <div dir="rtl" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Skeleton xstyle={shapes.circle} />
      <div style={column}>
        <Skeleton xstyle={shapes.line150} /><Skeleton xstyle={shapes.line100} />
      </div>
    </div>
  ),
};
