import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enGlobal from './locales/en.json';
import frGlobal from './locales/fr.json';
import bgGlobal from './locales/bg.json';
import viGlobal from './locales/vi.json';

export const defaultNS = 'global';

export const resources = {
   en: {
      global: enGlobal
   },
   fr: {
      global: frGlobal
   },
   bg: {
      global: bgGlobal
   },
   vi: {
      global: viGlobal
   }
}
export const languages = ["en", "fr", "bg", "vi"];

export function changeLanguage(langCode: string) {
   // if the selected language is different than the current one, then change it
   if (langCode !== i18next.language) {
      i18next.changeLanguage(langCode);
   }
}

export function getLanguage() {
   return i18next.language;
}

i18next
   .use(initReactI18next)
   .init({
      debug: true,
      resources,
      ns: ['global'],
      defaultNS,
      lng: "en"
   });

export default i18next;