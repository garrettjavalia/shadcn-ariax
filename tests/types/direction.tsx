import { DirectionProvider, I18nProvider } from '../../registry/ariax/ui/direction';
<DirectionProvider direction="rtl"><I18nProvider locale="en-US">Content</I18nProvider></DirectionProvider>;
// @ts-expect-error unsupported direction
<DirectionProvider direction="vertical" />;
