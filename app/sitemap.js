import { allSlugs } from "../lib/articles";

export default function sitemap() {
  const base = "https://ethnologistics.com";
  const routes = ["", "/blog"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
  const posts = allSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...routes, ...posts];
}
