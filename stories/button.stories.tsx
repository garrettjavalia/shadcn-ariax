import OfficialGroup from './official-group';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, LinkButton, buttonProps } from '@button';
import { rounded, customized, dynamic } from '@customizations';

export const variants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const;
export const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const;
const meta = { title: 'Components/Button', tags: ['parity'], component: Button, excludeStories: ['variants', 'sizes'], args: { children: 'Button', variant: 'default', size: 'default' }, argTypes: { variant: { control: 'select', options: variants }, size: { control: 'select', options: sizes } } } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
function Icon({ end = false }: { end?: boolean }) {
  return <svg data-icon={end ? 'inline-end' : 'inline-start'} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>;
}
function Example(args: React.ComponentProps<typeof Button>) {
  const [count, setCount] = useState(0);
  return <main id="parity-root"><Button {...args} onPress={() => setCount(c => c + 1)} /><output aria-live="polite">Pressed: {count}</output></main>;
}
export const Playground: Story = { tags: ['!parity'], render: args => <Example {...args} /> };
const interactive = (variant: typeof variants[number]): Story => ({ args: { variant }, render: args => <Example {...args} /> });
export const InteractionDefault = interactive('default');
export const InteractionOutline = interactive('outline');
export const InteractionSecondary = interactive('secondary');
export const InteractionGhost = interactive('ghost');
export const InteractionDestructive = interactive('destructive');
export const InteractionLink = interactive('link');
export const Gallery: Story = { tags: ['!parity'], render: () => <main id="parity-root"><h1>Ariax / Button</h1><p>React Aria · StyleX · Nova / Neutral</p><h2>Variants</h2><div className="gallery">{variants.map(variant => <Button key={variant} variant={variant}>{variant}</Button>)}</div><h2>Sizes & icons</h2><div className="gallery">{sizes.map(size => <Button key={size} size={size} aria-label={size}><Icon />{!size.startsWith('icon') && size}</Button>)}</div><h2>States</h2><div className="gallery"><Button isDisabled>Disabled</Button><Button aria-expanded="true" variant="outline">Expanded</Button><Button isPending>Pending</Button><LinkButton href="#destination">Link button</LinkButton></div></main> };
export const Matrix: Story = { render: () => <main id="parity-root">{variants.map(variant => <section key={variant}><h2>{variant}</h2><div className="gallery">{sizes.map(size => <Button key={size} variant={variant} size={size} aria-label={`${variant}-${size}`}><Icon />{!size.startsWith('icon') && <span>{size}</span>}</Button>)}</div></section>)}</main> };
export const Disabled: Story = { args: { isDisabled: true }, render: args => <Example {...args} /> };
export const Pending: Story = { args: { isPending: true }, render: args => <Example {...args} /> };
export const Expanded: Story = { args: { variant: 'outline', 'aria-expanded': true, 'aria-haspopup': 'menu' }, render: args => <Example {...args} /> };
export const NestedIcons: Story = { render: () => <main id="parity-root"><div data-slot="button-group" className="gallery">{sizes.map(size => <Button key={size} size={size} aria-label={size}><span><Icon /></span>{!size.startsWith('icon') && <span>Nested <strong>label</strong></span>}<Icon end /></Button>)}</div></main> };
export const Links: Story = { render: () => <main id="parity-root"><div className="gallery">{variants.map(variant => <LinkButton key={variant} href="#destination" variant={variant}>{variant}</LinkButton>)}<LinkButton isDisabled href="#destination">Disabled link</LinkButton></div></main> };

export const TextMatrix: Story = { render: () => <main id="parity-root">{variants.map(variant => <div key={variant} className="gallery">{sizes.slice(0, 4).map(size => <Button key={size} variant={variant} size={size}>{variant} {size}</Button>)}</div>)}</main> };
export const RightIcons: Story = { render: () => <main id="parity-root">{variants.map(variant => <div key={variant} className="gallery">{sizes.slice(0, 4).map(size => <Button key={size} variant={variant} size={size}>{variant}<Icon end /></Button>)}</div>)}</main> };
export const Rounded: Story = { render: () => <main id="parity-root"><div className="gallery"><Button {...rounded}>Get Started</Button><Button variant="outline" size="icon" {...rounded} aria-label="Go up"><Icon /></Button></div></main> };
function Spinner() { return <svg role="status" aria-label="Loading" className="fixture-spinner" data-icon="inline-start" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 1 1-9 9" /></svg>; }
export const Loading: Story = { render: () => <main id="parity-root"><div className="gallery"><Button variant="outline" isDisabled><Spinner />Generating</Button><Button variant="secondary" isDisabled>Downloading<Spinner /></Button></div></main> };
export const AsLink: Story = { render: () => <main id="parity-root"><a href="#destination" {...buttonProps({ variant: 'secondary', size: 'sm' })}>Login</a></main> };
export const Rtl: Story = { render: () => <main id="parity-root" dir="rtl"><div className="gallery"><Button variant="outline">زر</Button><Button variant="destructive">حذف</Button><Button variant="outline">إرسال<Icon end /></Button><Button variant="outline" size="icon" aria-label="Add"><Icon /></Button><Button variant="secondary" isDisabled><Spinner />جاري التحميل</Button></div></main> };

export const Group: Story = { tags: ['viewport-390'], render: () => <main id="parity-root"><OfficialGroup /></main> };

export const Customized: Story = { render: () => <main id="parity-root"><div className="gallery"><Button {...customized}>Customized</Button><LinkButton {...customized} href="#destination">Customized link</LinkButton></div></main> };

function DynamicExample() { const [wide, setWide] = useState(false); return <main id="parity-root"><Button {...dynamic(wide ? 220 : 180)} onPress={() => setWide(v => !v)}>Dynamic width</Button></main>; }
export const Dynamic: Story = { render: () => <DynamicExample /> };

// Reuse the generic parity suite for all exported style combinations.
export const HelperMatrix: Story = { render: () => <main id="parity-root">{variants.map(variant => <section key={variant}><h2>{variant}</h2><div className="gallery">{sizes.map(size => <a key={size} href="#destination" aria-label={`${variant}-${size}`} {...buttonProps({variant, size})}><Icon />{!size.startsWith("icon") && <span>{size}</span>}</a>)}</div></section>)}</main> };
