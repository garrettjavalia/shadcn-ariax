import { inputCustomization } from '@input-customizations';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@input';
import { TextField } from 'react-aria-components';
const meta = { title: 'Components/Input', component: Input, tags: ['parity', 'viewport-390'], decorators: [Story => <main id="parity-root" style={{ width: 320, display: 'grid', gap: 16 }}><Story /></main>] } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = { args: { placeholder: 'Enter text', 'aria-label': 'Enter text' } };
export const States: Story = { render: () => <><Input aria-label="Disabled" placeholder="Email" disabled /><Input aria-label="Invalid" placeholder="Error" aria-invalid /><Input aria-label="Required" placeholder="This field is required" required /><Input aria-label="Read only" readOnly defaultValue="Readonly value" /><Input aria-label="Password" type="password" placeholder="sk-..." /><Input aria-label="RTL" dir="rtl" placeholder="أدخل النص" /></> };
export const File: Story = { args: { type: 'file', 'aria-label': 'Picture' } };
export const Context: Story = { render: () => <TextField aria-label="Context input" isInvalid isRequired><Input placeholder="Context" /></TextField> };
export const InlineStyle: Story = { render: () => <Input aria-label="Styled" style={({ isFocused }) => ({ width: 240, color: isFocused ? 'rgb(255, 0, 0)' : 'rgb(0, 128, 0)' })} /> };

export const Customized: Story = { render: () => <Input aria-label="Customized" {...inputCustomization} /> };

export const FontSizeOverride: Story = { render: () => <><Input aria-label="Larger text" defaultValue="Custom font size" style={{ fontSize: 20 }} /><Input type="file" aria-label="Larger file control" style={{ fontSize: 20 }} /></> };
