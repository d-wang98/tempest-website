import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://www.tempest-pay.com";

// Public, indexable routes (path relative to a locale root).
const PATHS = ["", "company", "trade-finance", "calculator"];

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const seg = path ? `/${path}` : "";
  return `${BASE}${prefix}${seg}` || BASE;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const languages: Record<string, string> = {};
    for (const loc of routing.locales) languages[loc] = urlFor(loc, path);

    for (const loc of routing.locales) {
      entries.push({
        url: urlFor(loc, path),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
