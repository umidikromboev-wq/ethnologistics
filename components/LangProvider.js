"use client";
import { createContext, useContext } from "react";

export const LANGS = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "uz", label: "UZ", name: "Oʻzbekcha" },
  { code: "en", label: "EN", name: "English" },
  { code: "kk", label: "KK", name: "Қазақша" },
  { code: "ky", label: "KY", name: "Кыргызча" },
  { code: "tg", label: "TG", name: "Тоҷикӣ" },
];

const LangContext = createContext({ lang: "ru" });

// Язык приходит из адреса страницы (сегмент /ru, /uz, …), а не из localStorage.
// Благодаря этому переведённый текст попадает уже в серверную разметку — его
// видит поисковик, и на любую языковую версию можно дать прямую ссылку.
export function LangProvider({ lang = "ru", children }) {
  return <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
