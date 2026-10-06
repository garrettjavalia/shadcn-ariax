"use client";

import * as React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@select";
export type Language = "en" | "ar" | "he";
export type Direction = "ltr" | "rtl";
export type Translations<T extends Record<string, string> = Record<string, string>> = Record<Language, {
  dir: Direction;
  locale?: string;
  values: T;
}>;
export const languageOptions = [{
  value: "en",
  label: "English"
}, {
  value: "ar",
  label: "Arabic (العربية)"
}, {
  value: "he",
  label: "Hebrew (עברית)"
}] as const;
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};
const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({
  children,
  defaultLanguage = "ar"
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);
  return <LanguageContext.Provider value={{
    language,
    setLanguage
  }}>
      {children}
    </LanguageContext.Provider>;
}
export function useLanguageContext() {
  const context = React.useContext(LanguageContext);
  return context;
}
export function useTranslation<T extends Record<string, string>>(translations: Translations<T>, defaultLanguage: Language = "ar") {
  const context = useLanguageContext();
  const [localLanguage, setLocalLanguage] = React.useState<Language>(defaultLanguage);
  const language = context?.language ?? localLanguage;
  const setLanguage = context?.setLanguage ?? setLocalLanguage;
  const {
    dir,
    locale,
    values: t
  } = translations[language];
  return {
    language,
    setLanguage,
    dir,
    locale,
    t
  };
}
export interface LanguageSelectorProps {
  value: Language;
  onValueChange: (value: Language) => void;
}
export function LanguageSelector({
  value,
  onValueChange,
  ...props
}: LanguageSelectorProps & Omit<React.ComponentProps<typeof SelectTrigger>, 'children'>) {
  return <Select aria-label="Language" selectedKey={value} onSelectionChange={value => onValueChange(value as Language)}><SelectTrigger size="sm" style={{
      width: 144
    }} dir="ltr" data-name="language-selector" {...props}><SelectValue /></SelectTrigger><SelectContent dir="ltr" style={{
      animationName: 'none'
    }}><SelectGroup>{languageOptions.map(option => <SelectItem key={option.value} id={option.value}>{option.label}</SelectItem>)}</SelectGroup></SelectContent></Select>;
}
