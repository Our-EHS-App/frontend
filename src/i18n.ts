import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/locales/en/translation.json';
import ar from './assets/locales/ar/translation.json';

import LanguageDetector from 'i18next-browser-languagedetector';

const resources: Resource = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    keySeparator: '.',
    resources,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
