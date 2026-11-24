import { SeparatorList as OfficialList } from './official-examples/separator-list';
import { SeparatorRtl as OfficialRtl } from './official-examples/separator-rtl';
import { SeparatorContext } from 'react-aria-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@separator';
import { separatorMenu, separatorCustom } from '@customizations';
import { separatorLayout } from '@customizations';
const meta = { title: 'Components/Separator', component: Separator, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
// Layout and text follow the pinned documentation examples.
function Description({ rtl = false }: { rtl?: boolean }) {
  return <div {...separatorLayout.description} dir={rtl ? 'rtl' : undefined}><div {...separatorLayout.heading}><div style={{ lineHeight: 1, fontWeight: 500 }}>shadcn/ui</div><div style={{ color: 'var(--muted-foreground)' }}>{rtl ? 'الأساس لنظام التصميم الخاص بك' : 'The Foundation for your Design System'}</div></div><Separator /><div>{rtl ? 'مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.' : 'A set of beautifully designed components that you can customize, extend, and build on.'}</div></div>;
}
export const Demo: Story = { parameters: { originalExample: "separator-demo" }, render: () => <Description /> };
export const Rtl: Story = { parameters: { originalExample: 'separator-rtl' }, render: () => <OfficialRtl /> };
export const Vertical: Story = { parameters: { originalExample: "separator-vertical" }, render: () => <div {...separatorLayout.vertical}><div>Blog</div><Separator orientation="vertical" /><div>Docs</div><Separator orientation="vertical" /><div>Source</div></div> };
export const Menu: Story = { parameters: { originalExample: "separator-menu" }, tags: ['viewport-390'], render: () => <div {...separatorLayout.menu}><div {...separatorLayout.group}><span {...separatorLayout.label}>Settings</span><span {...separatorLayout.summary}>Manage preferences</span></div><Separator orientation="vertical" /><div {...separatorLayout.group}><span {...separatorLayout.label}>Account</span><span {...separatorLayout.summary}>Profile &amp; security</span></div><Separator orientation="vertical" {...separatorMenu} /><div {...separatorLayout.help}><span {...separatorLayout.label}>Help</span><span {...separatorLayout.summary}>Support &amp; docs</span></div></div> };
export const List: Story = { parameters: { originalExample: "separator-list" }, render: () => <OfficialList /> };
export const Semantics: Story = { render: () => <div {...separatorLayout.semantics}><Separator id="default-separator" aria-label="Sections" /><Separator elementType="div" aria-label="Horizontal sections" /><Separator orientation="vertical" aria-label="Columns" /><Separator elementType="hr" orientation="vertical" aria-label="Explicit hr vertical" /><Separator elementType="div" slot="divider" /></div> };
export const Customized: Story = { render: () => <Separator {...separatorCustom} /> };

export const Context: Story = { render: () => <SeparatorContext.Provider value={{ elementType: 'div' }}><div {...separatorLayout.description}><div>First section</div><Separator /><div>Second section</div><Separator orientation="vertical" /></div></SeparatorContext.Provider> };
export const Render: Story = { render: () => <div {...separatorLayout.description}><Separator render={props => <div {...props} />} /><Separator orientation="vertical" render={({ ref: _ref, ...props }) => <hr {...props} />} /></div> };
