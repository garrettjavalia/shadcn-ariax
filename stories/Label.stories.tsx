import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabelContext, TextField, Input } from 'react-aria-components';
import { labelCustomized } from '@customizations';
import { Checkbox } from '@checkbox';
import { Label } from '@label';
const meta = { title: 'Components/Label', component: Label, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
function Example({ rtl = false }: { rtl?: boolean }) { return <div style={{ display: 'flex', gap: '0.5rem' }} dir={rtl ? 'rtl' : undefined}><Checkbox id={rtl ? 'terms-rtl' : 'terms'} /><Label htmlFor={rtl ? 'terms-rtl' : 'terms'}>{rtl ? 'قبول الشروط والأحكام' : 'Accept terms and conditions'}</Label></div>; }
export const Demo: Story = { render: () => <Example /> };
export const Rtl: Story = { render: () => <Example rtl /> };
export const Usage: Story = { render: () => <><Label htmlFor="email">Your email address</Label><input id="email" /></> };
export const Disabled: Story = { render: () => <div style={{ display:'grid', gap:'1rem' }}><div className="group" data-disabled="true"><Label>Disabled group</Label></div><div><input className="peer" disabled /><Label>Disabled peer</Label></div><div><span className="peer" data-disabled="" /><Label>Data disabled peer</Label></div><div className="group" data-disabled="false"><Label>Enabled group</Label></div></div> };
export const Context: Story = { render: () => <><TextField><Label>Context field</Label><Input /></TextField><LabelContext.Provider value={{ id:'context-label', htmlFor:'context-input', style:{color:'red'} }}><Label htmlFor="explicit-input">Explicit clears context</Label><Label slot="label" htmlFor="slotted-input">Slot retains context</Label></LabelContext.Provider><input id="explicit-input" /><input id="slotted-input" /></> };
export const Inline: Story = { render: () => <Label style={{fontSize:'1.25rem',opacity:0.7,gap:'1rem'}}>Inline customization <span>child</span></Label> };

export const Customized: Story = { render: () => <Label {...labelCustomized}>Custom Label</Label> };
export const Render: Story = { render: () => <div style={{cursor:'crosshair'}}><Label elementType="span">Span Label</Label><Label render={props => <label {...props} data-custom="render" />}>Rendered Label</Label></div> };
