import { TR } from "./translations";

export const LOCALES = ["ru", "uz", "en", "kk", "ky", "tg"];
export const LANG_DEFAULT = "ru";

// ✅ TO'G'RILANDI: Domen oxirida til prefiksi (/ru) bo'lmasligi kerak
export const SITE_ORIGIN = "https://ethno-logistics.com";

export const HTML_LANG = {
  ru: "ru",
  uz: "uz",
  en: "en",
  kk: "kk",
  ky: "ky",
  tg: "tg",
};

export const OG_LOCALE = {
  ru: "ru_RU",
  uz: "uz_UZ",
  en: "en_US",
  kk: "kk_KZ",
  ky: "ky_KG",
  tg: "tg_TJ",
};

export function normalizeLang(v) {
  return LOCALES.includes(v) ? v : LANG_DEFAULT;
}

export function href(lang, path = "/") {
  const L = normalizeLang(lang);
  if (!path || path === "/") return `/${L}`;
  if (path.startsWith("#")) return `/${L}${path}`;
  if (path.startsWith("/#")) return `/${L}${path.slice(1)}`;
  return `/${L}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absHref(lang, path = "/") {
  return `${SITE_ORIGIN}${href(lang, path)}`;
}

export function alternatesFor(path, lang) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, absHref(l, path)]),
  );
  return {
    canonical: absHref(lang, path),
    languages: { ...languages, "x-default": absHref(LANG_DEFAULT, path) },
  };
}

export function switchLangPath(pathname, lang) {
  const rest =
    String(pathname || "/").replace(/^\/(ru|uz|en|kk|ky|tg)(?=\/|$)/, "") ||
    "/";
  return href(lang, rest);
}

const norm = (x) =>
  String(x)
    .replace(/\\[nt]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function tr(s, lang) {
  const L = normalizeLang(lang);
  if (L === "ru" || s == null) return s;
  const hit = TR[norm(s)];
  return (hit && hit[L]) || s;
}
