import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = { title: 'Harness/Reference utilities', tags: ['!parity'] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

// Reference-only probes keep Tailwind scanning and animation checks independent of any widget.
export const Animations: Story = { render: () => <main id="parity-root">
  <div data-probe="enter" className="animate-in fade-in-0 zoom-in-95 duration-200">Enter</div>
  <div data-probe="exit" className="animate-out fade-out-0 zoom-out-95 duration-200">Exit</div>
  <div data-probe="selected" data-selected="true" className="data-selected:bg-primary">Selected</div>
  <div data-probe="unselected" data-selected="false" className="data-selected:bg-primary">Unselected</div>
</main> };
