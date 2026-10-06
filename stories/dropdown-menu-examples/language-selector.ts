export type Translations=Record<string,{dir:string;values:Record<string,string>}>;
export function useTranslation(translations:Translations,language='ar'){return {dir:translations[language].dir,t:translations[language].values,language};}
