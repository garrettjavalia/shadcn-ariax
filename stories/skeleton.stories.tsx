import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@skeleton';
import { shapes, skeletonCardStyle } from '@skeleton-customizations';
import {Card as SkeletonCard,CardHeader,CardContent} from '@card';
import './skeleton-fixtures.css';

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
const grid = { display: 'grid', gap: 8 };
const column = { display: 'flex', flexDirection: 'column' as const, gap: 8 };

export const Demo: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Skeleton xstyle={shapes.demoCircle} />
      <div className="skeleton-demo-lines">
        <Skeleton xstyle={shapes.line250} />
        <Skeleton xstyle={shapes.line200} />
      </div>
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: 16 }}>
      <Skeleton xstyle={shapes.circle} />
      <div style={grid}>
        <Skeleton xstyle={shapes.line150} /><Skeleton xstyle={shapes.line100} />
      </div>
    </div>
  ),
};
export const Usage: Story = { args: { xstyle: shapes.usage } };

export const Card: Story = {
  render: () => (
    <SkeletonCard {...skeletonCardStyle}>
      <CardHeader>
        <Skeleton xstyle={shapes.twoThird} /><Skeleton xstyle={shapes.half} />
      </CardHeader>
      <CardContent><Skeleton xstyle={shapes.video} /></CardContent>
    </SkeletonCard>
  ),
};
export const Text: Story = {
  render: () => (
    <div style={{ ...column, width: '100%', maxWidth: 320 }}>
      <Skeleton xstyle={shapes.full} /><Skeleton xstyle={shapes.full} />
      <Skeleton xstyle={shapes.threeQuarter} />
    </div>
  ),
};
export const Form: Story = {
  render: () => (
    <div style={{ ...column, gap: 28, width: '100%', maxWidth: 320 }}>
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
    <div style={{ ...column, width: '100%', maxWidth: 384 }}>
      {Array.from({ length: 5 }, (_, i) => (
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
      <Skeleton xstyle={shapes.demoCircle} />
      <div className="skeleton-demo-lines">
        <Skeleton xstyle={shapes.line250} />
        <Skeleton xstyle={shapes.line200} />
      </div>
    </div>
  ),
};
