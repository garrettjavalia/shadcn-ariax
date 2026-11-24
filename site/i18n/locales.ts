export const localeNames = {
  "en-US": "English",
  "ko-KR": "한국어",
  "ja-JP": "日本語",
  "es-ES": "Español",
  "pt-BR": "Português (Brasil)",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
} as const;
export type Locale = keyof typeof localeNames;
export const locales = Object.keys(localeNames) as Locale[];
export const defaultLocale: Locale = "en-US";
export function localePrefix(locale: Locale) {
  return locale === defaultLocale ? "" : locale.split("-")[0] + "/";
}
