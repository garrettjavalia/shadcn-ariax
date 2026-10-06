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
const demo = <><KbdGroup><Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>⌥</Kbd><Kbd>⌃</Kbd></KbdGroup><KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup></>;
export const Demo: Story = { render: () => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>{demo}</div> };
export const Usage: Story = { args: { children: 'Ctrl' } };
export const Group: Story = { render: () => <p style={{ fontSize: 14, lineHeight: 'calc(1.25 / 0.875)', color: 'var(--muted-foreground)' }}>Use <KbdGroup><Kbd>Ctrl + B</Kbd><Kbd>Ctrl + K</Kbd></KbdGroup> to open the command palette</p> };
export const InButton: Story = { render: () => <Button variant="outline">Accept <Kbd data-icon="inline-end" {...translated}>⏎</Kbd></Button> };
export const InInputGroup: Story = { render: () => <InputGroup><InputGroupInput aria-label="Search" placeholder="Search..." /><InputGroupAddon><SearchIcon /></InputGroupAddon><InputGroupAddon align="inline-end"><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon></InputGroup> };
export const Rtl: Story = { render: () => <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>{demo}</div> };
export const Overrides: Story = { render: () => <><Kbd {...customized}>Ctrl</Kbd><Kbd style={{ fontSize: 20 }}>Alt</Kbd><KbdGroup style={{ gap: 12 }} aria-label="Shortcut"><Kbd>Shift</Kbd><Kbd>F</Kbd></KbdGroup></> };
export const Svg: Story = { render: () => <><Kbd><SearchIcon /></Kbd><Kbd><SearchIcon className="size-explicit" style={{ width: 22, height: 22 }} /></Kbd></> };
// A plain ancestor checks the upstream CSS selector contract; Tooltip itself is pending.
export const TooltipSelector: Story = { render: () => <div data-slot="tooltip-content"><Kbd>Ctrl</Kbd></div> };

export const RadiusToken: Story = { render: () => <div style={{ "--radius": "20px" } as CSSProperties}><Kbd>Ctrl</Kbd></div> };

export const FontTokens: Story = { render: () => <><div style={{fontFamily:"serif"}}><Kbd data-testid="sans-missing">Ctrl</Kbd><InputGroupText {...officialMono} data-testid="mono-missing">script.js</InputGroupText></div><div style={{fontFamily:"serif","--font-sans":"\"Courier New\", monospace","--font-mono":"\"Times New Roman\", serif"} as CSSProperties}><Kbd data-testid="sans-defined">Ctrl</Kbd><InputGroupText {...officialMono} data-testid="mono-defined">script.js</InputGroupText></div></> };

export const InTooltip: Story = {render:()=> <KbdTooltipComposition/>};
