"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const LANGS = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "uz", label: "UZ", name: "Oʻzbekcha" },
  { code: "en", label: "EN", name: "English" },
  { code: "kk", label: "KK", name: "Қазақша" },
  { code: "ky", label: "KY", name: "Кыргызча" },
  { code: "tg", label: "TG", name: "Тоҷикӣ" },
];

const STORAGE_KEY = "ethno_lang";
const LangContext = createContext({ lang: "ru", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("ru");

  // Hydrate from storage on the client (server renders RU for SSR/SEO).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
    } catch {}
  }, []);

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (code) => {
    if (!LANGS.some((l) => l.code === code)) return;
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
