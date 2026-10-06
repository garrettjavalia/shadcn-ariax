import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@checkbox';
import { OfficialFieldCheckbox } from './field-checkbox-example';
import { OfficialFieldGroup } from './field-group-example';
import { Label } from '@label';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle, FieldLegend, FieldSet } from '@field';

const meta = { title: 'Compositions/FieldCheckbox', tags: ['parity'], decorators: [Story => <main id="parity-root" style={{ padding: 24 }}><Story /></main>] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const FieldCheckbox: Story = { render: () => <OfficialFieldCheckbox /> };
export const FieldGroupExample: Story = { render: () => <OfficialFieldGroup /> };

// Official checkbox-demo composition, with layout utilities expressed as shared native styles.
export const Demo: Story = { render: () => <FieldGroup style={{ maxWidth: '24rem' }}>
  <Field orientation="horizontal"><Checkbox id="terms-checkbox" name="terms-checkbox" /><Label htmlFor="terms-checkbox">Accept terms and conditions</Label></Field>
  <Field orientation="horizontal"><Checkbox id="terms-checkbox-2" name="terms-checkbox-2" defaultSelected /><FieldContent><FieldLabel htmlFor="terms-checkbox-2">Accept terms and conditions</FieldLabel><FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription></FieldContent></Field>
  <Field orientation="horizontal" data-disabled><Checkbox id="toggle-checkbox" name="toggle-checkbox" isDisabled /><FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel></Field>
  <FieldLabel><Field orientation="horizontal"><Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" /><FieldContent><FieldTitle>Enable notifications</FieldTitle><FieldDescription>You can enable or disable notifications at any time.</FieldDescription></FieldContent></Field></FieldLabel>
</FieldGroup> };

export const Basic: Story = { render: () => <FieldGroup style={{ marginInline: 'auto', width: '14rem' }}><Field orientation="horizontal"><Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" /><FieldLabel htmlFor="terms-checkbox-basic">Accept terms and conditions</FieldLabel></Field></FieldGroup> };

export const Description: Story = { render: () => <FieldGroup style={{ marginInline: 'auto', width: '18rem' }}><Field orientation="horizontal"><Checkbox id="terms-checkbox-desc" name="terms-checkbox-desc" defaultSelected /><FieldContent><FieldLabel htmlFor="terms-checkbox-desc">Accept terms and conditions</FieldLabel><FieldDescription>By clicking this checkbox, you agree to the terms and conditions.</FieldDescription></FieldContent></Field></FieldGroup> };
export const Disabled: Story = { render: () => <FieldGroup style={{ marginInline: 'auto', width: '14rem' }}><Field orientation="horizontal" data-disabled><Checkbox id="toggle-checkbox-disabled" name="toggle-checkbox-disabled" isDisabled /><FieldLabel htmlFor="toggle-checkbox-disabled">Enable notifications</FieldLabel></Field></FieldGroup> };
export const Invalid: Story = { render: () => <FieldGroup style={{ marginInline: 'auto', width: '14rem' }}><Field orientation="horizontal" data-invalid><Checkbox id="terms-checkbox-invalid" name="terms-checkbox-invalid" isInvalid /><FieldLabel htmlFor="terms-checkbox-invalid">Accept terms and conditions</FieldLabel></Field></FieldGroup> };
export const Group: Story = { render: () => <FieldSet><FieldLegend variant="label">Show these items on the desktop:</FieldLegend><FieldDescription>Select the items you want to show on the desktop.</FieldDescription><FieldGroup style={{ gap: '0.75rem' }}>{[
  ['finder-pref-9k2-hard-disks-ljj-checkbox', 'Hard disks'],
  ['finder-pref-9k2-external-disks-1yg-checkbox', 'External disks'],
  ['finder-pref-9k2-cds-dvds-fzt-checkbox', 'CDs, DVDs, and iPods'],
  ['finder-pref-9k2-connected-servers-6l2-checkbox', 'Connected servers'],
].map(([id, text], index) => <Field key={id} orientation="horizontal"><Checkbox id={id} name={id} defaultSelected={index < 2} /><FieldLabel htmlFor={id} style={{ fontWeight: 400 }}>{text}</FieldLabel></Field>)}</FieldGroup></FieldSet> };
