import OfficialButton from './official-examples/kbd-button';
import OfficialGroup from './official-examples/kbd-group';
import OfficialDemo from './official-examples/kbd-demo';
import OfficialInInputGroup from './official-examples/kbd-input-group';
import { KbdRtl as OfficialRtl } from './official-examples/kbd-rtl';
import {KbdTooltipComposition} from './kbd-tooltip';
import {officialMono} from '@input-group-customizations';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from '@kbd';
import { Button } from '@button';
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText } from '@input-group';
import { SearchIcon } from 'lucide-react';
import { translated, customized } from '@kbd-customizations';
const meta = { title: 'Components/Kbd', component: Kbd, tags: ['parity'], decorators: [Story => <main id="parity-root" style={{ display: 'grid', gap: 16, width: 320 }}><Story /></main>] } satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = { parameters: { originalExample: 'kbd-demo' }, render: () => <OfficialDemo /> };
export const Usage: Story = { args: { children: 'Ctrl' } };
export const Group: Story = { parameters: { originalExample: "kbd-group" }, render: () => <OfficialGroup /> };
export const InButton: Story = { parameters: { originalExample: "kbd-button" }, render: () => <OfficialButton /> };
export const InInputGroup: Story = { parameters: { originalExample: 'kbd-input-group' }, render: () => <OfficialInInputGroup /> };
export const Rtl: Story = { parameters: { originalExample: 'kbd-rtl' }, render: () => <OfficialRtl /> };
export const Overrides: Story = { render: () => <><Kbd {...customized}>Ctrl</Kbd><Kbd style={{ fontSize: 20 }}>Alt</Kbd><KbdGroup style={{ gap: 12 }} aria-label="Shortcut"><Kbd>Shift</Kbd><Kbd>F</Kbd></KbdGroup></> };
export const Svg: Story = { render: () => <><Kbd><SearchIcon /></Kbd><Kbd><SearchIcon className="size-explicit" style={{ width: 22, height: 22 }} /></Kbd></> };
// This plain ancestor isolates the selector; InTooltip covers the actual Tooltip composition.
export const TooltipSelector: Story = { render: () => <div data-slot="tooltip-content"><Kbd>Ctrl</Kbd></div> };

export const RadiusToken: Story = { render: () => <div style={{ "--radius": "20px" } as CSSProperties}><Kbd>Ctrl</Kbd></div> };

export const FontTokens: Story = { render: () => <><div style={{fontFamily:"serif"}}><Kbd data-testid="sans-missing">Ctrl</Kbd><InputGroupText {...officialMono} data-testid="mono-missing">script.js</InputGroupText></div><div style={{fontFamily:"serif","--font-sans":"\"Courier New\", monospace","--font-mono":"\"Times New Roman\", serif"} as CSSProperties}><Kbd data-testid="sans-defined">Ctrl</Kbd><InputGroupText {...officialMono} data-testid="mono-defined">script.js</InputGroupText></div></> };

export const InTooltip: Story = {render:()=> <KbdTooltipComposition/>};
