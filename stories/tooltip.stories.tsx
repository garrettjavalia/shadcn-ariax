import { TooltipRtl as OfficialRtl } from './official-examples/tooltip-rtl';
import { KbdTooltipComposition } from './kbd-tooltip';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipTrigger } from '@tooltip';
import { Button } from '@button';
import { Kbd, KbdGroup } from '@kbd';
import { SaveIcon } from 'lucide-react';
import { customized, sideButton } from '@tooltip-customizations';
const meta = { title: 'Components/Tooltip', component: Tooltip, tags: ['parity'], decorators: [Story => <main id="parity-root" style={{ width: 600, minHeight: 320, padding: 100, display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}><Story /></main>] } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = { parameters: { originalExample: "tooltip-demo" }, render: () => <TooltipTrigger><Button variant="outline">Hover</Button><Tooltip data-parity-portal><p>Add to library</p></Tooltip></TooltipTrigger> };
export const Usage: Story = { render: Demo.render };
export const Sides: Story = { parameters: { originalExample: "tooltip-sides" }, render: () => <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{(['left', 'top', 'bottom', 'right'] as const).map(side => <TooltipTrigger key={side}><Button variant="outline" {...sideButton}>{side}</Button><Tooltip placement={side} data-parity-portal><p>Add to library</p></Tooltip></TooltipTrigger>)}</div> };
export const Keyboard: Story = { parameters: { originalExample: "tooltip-keyboard" }, render: () => <TooltipTrigger><Button variant="outline" size="icon-sm"><SaveIcon/></Button><Tooltip data-parity-portal>Save Changes <Kbd>S</Kbd></Tooltip></TooltipTrigger> };
export const Disabled: Story = { parameters: { originalExample: "tooltip-disabled" }, render: () => <TooltipTrigger><span style={{ display: 'inline-block', width: 'fit-content' }}><Button variant="outline" isDisabled>Disabled</Button></span><Tooltip data-parity-portal><p>This feature is currently unavailable</p></Tooltip></TooltipTrigger> };
export const Rtl: Story = { parameters: { originalExample: 'tooltip-rtl' }, render: () => <OfficialRtl /> };
export const Open: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">Open</Button><Tooltip data-parity-portal><p>Add to library</p></Tooltip></TooltipTrigger> };
export const KbdComposition: Story = { render: () => <KbdTooltipComposition/> };
export const Customized: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">Custom</Button><Tooltip data-parity-portal {...customized}>Custom tooltip</Tooltip></TooltipTrigger> };
export const CallbackStyle: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">Callback</Button><Tooltip data-parity-portal style={({ placement, defaultStyle }) => ({ ...defaultStyle, color: placement === 'top' ? 'rgb(255, 0, 0)' : 'rgb(0, 128, 0)', fontSize: 20 })}>Callback tooltip</Tooltip></TooltipTrigger> };
function DelayedTooltip() { const [open,setOpen]=useState(false); return <><TooltipTrigger delay={250} closeDelay={250} onOpenChange={setOpen}><Button variant="outline">Delayed</Button><Tooltip data-parity-portal>Delayed tooltip</Tooltip></TooltipTrigger><output data-open={open}>{open ? "open" : "closed"}</output></>; }
export const Delay: Story = { render: () => <DelayedTooltip/> };
export const DisabledTrigger: Story = { render: () => <TooltipTrigger isDisabled><Button variant="outline">Disabled trigger</Button><Tooltip data-parity-portal>Unavailable</Tooltip></TooltipTrigger> };
export const Offset: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">Offset</Button><Tooltip data-parity-portal placement="bottom start" offset={12} crossOffset={8}>Offset tooltip</Tooltip></TooltipTrigger> };

export const DomProps: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">DOM props</Button><Tooltip data-parity-portal data-slot="custom-tooltip" lang="en" aria-label="Custom description"><Kbd>S</Kbd></Tooltip></TooltipTrigger> };
export const CustomizedKbd: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">Custom keys</Button><Tooltip data-parity-portal {...customized}>Shortcut <Kbd>S</Kbd></Tooltip></TooltipTrigger> };

export const KbdRtl: Story = { render: () => <TooltipTrigger defaultOpen><Button variant="outline">RTL keys</Button><Tooltip data-parity-portal dir="rtl">Save Changes <Kbd>S</Kbd></Tooltip></TooltipTrigger> };
