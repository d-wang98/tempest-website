import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.tempest-pay.com";
export const OG_IMAGE = "/og.png";

/** Locale-aware path honoring next-intl's "as-needed" prefix (default locale has no prefix). */
export function localizedPath(locale: string, path: string): string {
  const clean = path.replace(/^\/+/, "");
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const seg = clean ? `/${clean}` : "";
  return `${prefix}${seg}` || "/";
}

/**
 * Build per-page Metadata with canonical URL, hreflang alternates, and
 * Open Graph + Twitter card tags. Relative URLs resolve against metadataBase
 * (set in the root layout).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = localizedPath(locale, path);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) languages[loc] = localizedPath(loc, path);
  languages["x-default"] = localizedPath(routing.defaultLocale, path);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: "Tempest",
      url: canonical,
      title,
      description,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Tempest" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@Tempest_Pay",
      images: [OG_IMAGE],
    },
  };
}
