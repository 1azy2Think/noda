import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './assets/locales/en.json';
import cn from './assets/locales/cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: cn }
    },
    lng: localStorage.getItem("appLanguage") || "en",
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

// Whenever language changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("appLanguage", lng);
});

export default i18n;
