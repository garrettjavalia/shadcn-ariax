import { SeparatorList as OfficialList } from './official-examples/separator-list';
import { SeparatorRtl as OfficialRtl } from './official-examples/separator-rtl';
import { SeparatorContext } from 'react-aria-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@separator';
import { separatorMenu, separatorCustom } from '@customizations';
import './separator-fixtures.css';
const meta = { title: 'Components/Separator', component: Separator, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
// Layout/text reproduce the five pinned documentation examples; fixture CSS is shared.
function Description({ rtl = false }: { rtl?: boolean }) {
  return <div className="separator-description" dir={rtl ? 'rtl' : undefined}><div className="separator-heading"><div style={{ lineHeight: 1, fontWeight: 500 }}>shadcn/ui</div><div style={{ color: 'var(--muted-foreground)' }}>{rtl ? 'الأساس لنظام التصميم الخاص بك' : 'The Foundation for your Design System'}</div></div><Separator /><div>{rtl ? 'مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.' : 'A set of beautifully designed components that you can customize, extend, and build on.'}</div></div>;
}
export const Demo: Story = { parameters: { originalExample: "separator-demo" }, render: () => <Description /> };
export const Rtl: Story = { parameters: { originalExample: 'separator-rtl' }, render: () => <OfficialRtl /> };
export const Vertical: Story = { parameters: { originalExample: "separator-vertical" }, render: () => <div className="separator-vertical"><div>Blog</div><Separator orientation="vertical" /><div>Docs</div><Separator orientation="vertical" /><div>Source</div></div> };
export const Menu: Story = { parameters: { originalExample: "separator-menu" }, tags: ['viewport-390'], render: () => <div className="separator-menu"><div><span>Settings</span><span>Manage preferences</span></div><Separator orientation="vertical" /><div><span>Account</span><span>Profile &amp; security</span></div><Separator orientation="vertical" {...separatorMenu} /><div className="separator-help"><span>Help</span><span>Support &amp; docs</span></div></div> };
export const List: Story = { parameters: { originalExample: "separator-list" }, render: () => <OfficialList /> };
export const Semantics: Story = { render: () => <div className="separator-semantics"><Separator id="default-separator" aria-label="Sections" /><Separator elementType="div" aria-label="Horizontal sections" /><Separator orientation="vertical" aria-label="Columns" /><Separator elementType="hr" orientation="vertical" aria-label="Explicit hr vertical" /><Separator elementType="div" slot="divider" /></div> };
export const Customized: Story = { render: () => <Separator {...separatorCustom} /> };

export const Context: Story = { render: () => <SeparatorContext.Provider value={{ elementType: 'div' }}><div className="separator-description"><div>First section</div><Separator /><div>Second section</div><Separator orientation="vertical" /></div></SeparatorContext.Provider> };
export const Render: Story = { render: () => <div className="separator-description"><Separator render={props => <div {...props} />} /><Separator orientation="vertical" render={({ ref: _ref, ...props }) => <hr {...props} />} /></div> };
