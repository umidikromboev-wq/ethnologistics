import { allSlugs } from "../lib/articles";
import { DIRECTIONS } from "../lib/content";
import { LOCALES, LANG_DEFAULT, absHref } from "../lib/locales";

function entry(path, changeFrequency, priority) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, absHref(l, path)]),
  );

  const alternates = {
    languages: {
      ...languages,
      "x-default": absHref(LANG_DEFAULT, path),
    },
  };

  const currentDate = new Date().toISOString();

  return LOCALES.map((lang) => ({
    url: absHref(lang, path),
    lastModified: currentDate,
    changeFrequency,
    priority,
    alternates,
  }));
}

const PAGES = [
  ["/", "weekly", 1.0],
  ["/how-it-works", "monthly", 0.8],
  ["/stores", "monthly", 0.7],
  ["/business", "monthly", 0.7],
  ["/company", "monthly", 0.6],
  ["/contact", "monthly", 0.6],
  ["/blog", "weekly", 0.7],
];

export default function sitemap() {
  return [
    ...PAGES.flatMap(([path, freq, priority]) => entry(path, freq, priority)),
    ...DIRECTIONS.flatMap((d) => entry(`/dostavka/${d.slug}`, "monthly", 0.9)),
    ...allSlugs().flatMap((slug) => entry(`/blog/${slug}`, "monthly", 0.6)),
  ];
}
