"use client";
import type { ComponentProps } from "react";
import { I18nProvider, useLocale } from "react-aria-components";

export function DirectionProvider(
  props: ComponentProps<typeof I18nProvider> & { direction?: "ltr" | "rtl" },
) {
  const { locale: currentLocale } = useLocale();
  let locale = props.locale;
  if (!locale && props.direction)
    locale = new Intl.Locale(currentLocale, {
      script: props.direction === "rtl" ? "Arab" : "Latn",
    }).toString();
  return <I18nProvider {...props} locale={locale} />;
}
export function useDirection() {
  return useLocale().direction;
}
export { I18nProvider, useLocale };
