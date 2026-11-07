import { textareaCustomization } from '@textarea-customizations';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@textarea';
import { Button } from '@button';
import { TextField } from 'react-aria-components';
const meta = { title: 'Components/Textarea', component: Textarea, tags: ['parity', 'viewport-390'], decorators: [Story => <main id="parity-root" style={{ width: 320, display: 'grid', gap: 16 }}><Story /></main>] } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = { parameters: { originalExample: "textarea-demo" }, args: { placeholder: 'Type your message here.' } };
export const Usage: Story = {};
export const WithButton: Story = { parameters: { originalExample: "textarea-button" }, render: () => <div style={{display:'grid',width:'100%',gap:'0.5rem'}}><Textarea placeholder="Type your message here." /><Button>Send message</Button></div> };
export const States: Story = { render: () => <><Textarea aria-label="Disabled" placeholder="Message" disabled /><Textarea aria-label="Invalid" placeholder="Error" aria-invalid /><Textarea aria-label="Required" required /><Textarea aria-label="Read only" readOnly defaultValue="Readonly value" /><Textarea aria-label="RTL" dir="rtl" rows={4} placeholder="تعليقاتك تساعدنا على التحسين..." /></> };
export const Context: Story = { render: () => <TextField aria-label="Context textarea" isInvalid isRequired><Textarea placeholder="Context" /></TextField> };
export const InlineStyle: Story = { render: () => <Textarea aria-label="Styled" style={({ isFocused }) => ({ width: 240, color: isFocused ? 'rgb(255, 0, 0)' : 'rgb(0, 128, 0)' })} /> };
export const Customized: Story = { render: () => <Textarea aria-label="Customized" {...textareaCustomization} /> };

export const FontSizeOverride: Story = { args: { style: { fontSize: 20 }, defaultValue: 'Font size override\nSecond line' } };
