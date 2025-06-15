import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
import translationDE from './locales/de.json';
import translationEN from './locales/en.json';

// Create a direct translation lookup object for fallback
export const translations = {
  de: translationDE,
  en: translationEN
};

// Create resources with translations
const resources = {
  de: {
    translation: translationDE
  },
  en: {
    translation: translationEN
  }
};

// Initialize i18next - using standard industry best practices
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'de', // Force German language
    fallbackLng: 'de',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    react: {
      useSuspense: false
    },
    debug: true
  });

// Type-safe helper function to get translations directly
export const getTranslation = (key: string): string => {
  const keys = key.split('.');
  
  // Get the translation object for German
  const translationObj = translationDE;
  
  // Navigate through the nested objects
  let current: any = translationObj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key if translation not found
    }
  }
  
  return typeof current === 'string' ? current : key;
};

export default i18n;
