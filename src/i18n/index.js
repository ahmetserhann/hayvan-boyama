import React, { createContext, useContext } from 'react';
import tr from './tr';
import en from './en';

const translations = { tr, en };

const LanguageContext = createContext({
  language: 'tr',
  setLanguage: () => {},
  t: (key) => key,
});

// i18n Provider - Zustand store'dan language okur, setLanguage store'a yazar
export function LanguageProvider({ children, language = 'tr', onSetLanguage }) {
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== 'string') return key;

    // Parametre interpolasyonu: {name}, {x}, {y}, {n}
    return value.replace(/\{(\w+)\}/g, (_, k) =>
      params[k] !== undefined ? String(params[k]) : `{${k}}`
    );
  };

  const setLanguage = (lang) => {
    if (onSetLanguage) onSetLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t } = useContext(LanguageContext);
  return t;
}
