import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfficialFieldCheckbox } from './field-checkbox-example';
import { OfficialFieldGroup } from './field-group-example';

const meta = { title: 'Compositions/FieldCheckbox', tags: ['parity'], decorators: [Story => <main id="parity-root" style={{ padding: 24 }}><Story /></main>] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const FieldCheckbox: Story = { parameters: { originalExample: "field-checkbox" }, render: () => <OfficialFieldCheckbox /> };
export const FieldGroupExample: Story = { parameters: { originalExample: "field-group" }, render: () => <OfficialFieldGroup /> };
