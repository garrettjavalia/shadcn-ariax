import {
  DirectionProvider,
  I18nProvider,
  useDirection,
  useLocale,
} from "@direction";
function Probe() {
  return <span dir={useDirection()}>{useLocale().locale}</span>;
}
export default function Fixture() {
  return (
    <DirectionProvider direction="rtl">
      <Probe />
      <I18nProvider locale="en-US">
        <Probe />
      </I18nProvider>
    </DirectionProvider>
  );
}
