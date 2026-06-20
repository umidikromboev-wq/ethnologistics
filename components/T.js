"use client";
import { useLang } from "./LangProvider";
import { TR } from "../lib/translations";

// Normalize whitespace (real newlines from JSX indentation, or escaped \n/\t)
// so multi-line source text nodes match their dictionary keys.
const norm = (x) => String(x).replace(/\\[nt]/g, " ").replace(/\s+/g, " ").trim();

/**
 * Translate by Russian source string (the RU text itself is the key).
 * Returns a bare string — no wrapper element — so the design never changes.
 * On the server (and for RU) it renders the original RU text, keeping SSR/SEO intact.
 *
 *   <T s="Услуги" />
 *   <T s={item.title} />
 */
export default function T({ s }) {
  const { lang } = useLang();
  if (lang === "ru" || s == null) return s ?? null;
  const hit = TR[norm(s)];
  return (hit && hit[lang]) || s;
}

/** Hook returning a translate function for attributes / client logic. */
export function useT() {
  const { lang } = useLang();
  return (s) => {
    if (lang === "ru" || s == null) return s;
    const hit = TR[norm(s)];
    return (hit && hit[lang]) || s;
  };
}
