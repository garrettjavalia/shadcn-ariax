import OfficialDemo from './official-examples/aspect-ratio-demo';
import { AspectRatioSquare as OfficialSquare } from './official-examples/aspect-ratio-square';
import { AspectRatioPortrait as OfficialPortrait } from './official-examples/aspect-ratio-portrait';
import { AspectRatioRtl as OfficialRtl } from './official-examples/aspect-ratio-rtl';
import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from '@aspect-ratio';
import { frame, square, portrait, bare, customized } from '@aspect-customizations';
import './aspect-fixtures.css';
const meta = { title: 'Components/AspectRatio', component: AspectRatio, args: { ratio: 16 / 9 }, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof AspectRatio>;
export default meta;
type Story = StoryObj<typeof meta>;
// Deterministic local image replaces next/image + remote avatar in official examples.
const source = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="#6798ba"/><path d="M0 480L220 100L430 480M260 480L450 220L640 480" fill="#3c6a44"/></svg>');
function Photo() { return <img className="aspect-photo" src={source} alt="Photo" />; }
export const Demo: Story = { parameters: { originalExample: 'aspect-ratio-demo' }, render: () => <OfficialDemo /> };
export const Square: Story = { parameters: { originalExample: 'aspect-ratio-square' }, render: () => <OfficialSquare /> };
export const Portrait: Story = { parameters: { originalExample: 'aspect-ratio-portrait' }, render: () => <OfficialPortrait /> };
export const Rtl: Story = { parameters: { originalExample: 'aspect-ratio-rtl' }, render: () => <OfficialRtl /> };
function ChangingRatio() {
  const [ratio, setRatio] = useState(16 / 9);
  const [width, setWidth] = useState(200);
  return <><button onClick={() => { setRatio(1); setWidth(320); }}>Change ratio</button><AspectRatio ratio={ratio} {...customized(ratio, width)} id="custom-ratio" aria-label="Preview" data-example="dynamic" title="Image preview"><Photo /></AspectRatio></>;
}
export const Customized: Story = { render: () => <ChangingRatio /> };
export const InlineOverride: Story = { render: () => <AspectRatio ratio={16 / 9} style={{ aspectRatio: '2', width: 200 }} aria-label="Inline override"><Photo /></AspectRatio> };

export const CssVariable: Story = { render: () => <AspectRatio ratio={16 / 9} style={{ "--ratio": 1, width: 200 } as CSSProperties}><Photo /></AspectRatio> };
