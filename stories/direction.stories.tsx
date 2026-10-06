import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DirectionProvider, I18nProvider, useDirection, useLocale } from '@direction';
import { Button } from '@button';
import { Input } from '@input';
import { Label } from '@label';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@card';
import { fullWidthButton } from '@card-customizations';

const meta = { title: 'Components/Direction', component: DirectionProvider, args: { children: null }, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof DirectionProvider>;
export default meta;
type Story = StoryObj<typeof meta>;
function Probe({ id }: { id: string }) {
  const { locale, direction } = useLocale();
  return <section data-testid={id} data-locale={locale} data-direction={useDirection()} dir={direction}><p>{locale}: {direction}</p><Label htmlFor={id + '-input'}>Name</Label><Input id={id + '-input'} /><Button>Continue</Button></section>;
}
export const Usage: Story = { render: () => <DirectionProvider direction="rtl"><Probe id="usage" /></DirectionProvider> };
export const Locale: Story = { render: () => <><I18nProvider locale="he-IL"><Probe id="hebrew" /></I18nProvider><DirectionProvider locale="en-US" direction="rtl"><Probe id="explicit-locale" /></DirectionProvider></> };
export const Nested: Story = { render: () => <DirectionProvider locale="ar-EG"><Probe id="outer" /><DirectionProvider><Probe id="inherited" /></DirectionProvider><DirectionProvider direction="ltr"><Probe id="forced-ltr" /></DirectionProvider><DirectionProvider locale="en-US"><Probe id="nested-locale" /></DirectionProvider></DirectionProvider> };
function DynamicDirection() {
  const [locale, setLocale] = useState('en-US');
  return <><Button onPress={() => setLocale(locale === 'en-US' ? 'ar-EG' : 'en-US')}>Change locale</Button><DirectionProvider locale={locale}><Probe id="dynamic" /></DirectionProvider></>;
}
export const Dynamic: Story = { render: () => <DynamicDirection /> };
export const CardRtl: Story = { render: () => <DirectionProvider direction="rtl"><div dir="rtl"><Card style={{ width: '100%', maxWidth: '24rem' }}>
  <CardHeader><CardTitle>تسجيل الدخول إلى حسابك</CardTitle><CardDescription>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</CardDescription><CardAction><Button variant="link">إنشاء حساب</Button></CardAction></CardHeader>
  <CardContent><form><div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <div style={{ display: 'grid', gap: '.5rem' }}><Label htmlFor="direction-email">البريد الإلكتروني</Label><Input id="direction-email" type="email" placeholder="m@example.com" required /></div>
    <div style={{ display: 'grid', gap: '.5rem' }}><div style={{ display: 'flex', alignItems: 'center' }}><Label htmlFor="direction-password">كلمة المرور</Label><a href="#" style={{ marginInlineStart: 'auto', display: 'inline-block', fontSize: '.875rem', textUnderlineOffset: '.25rem' }}>نسيت كلمة المرور؟</a></div><Input id="direction-password" type="password" required /></div>
  </div></form></CardContent><CardFooter style={{ flexDirection: 'column', gap: '.5rem' }}><Button type="submit" {...fullWidthButton}>تسجيل الدخول</Button><Button variant="outline" {...fullWidthButton}>تسجيل الدخول باستخدام Google</Button></CardFooter>
</Card></div></DirectionProvider> };
