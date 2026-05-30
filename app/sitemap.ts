import type { MetadataRoute } from "next";
import { posts, projects } from "#site/content";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";

/** Build a URL for the given path under a locale.
 *  Default locale gets no prefix (matches `localePrefix: "as-needed"`). */
function localizedUrl(path: string, locale: string) {
  const cleanPath = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) {
    return `${siteConfig.url}${cleanPath || "/"}`;
  }
  return `${siteConfig.url}/${locale}${cleanPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/blog",
    "/projects",
    "/resources",
    "/contact",
  ];

  const staticRoutes = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(path, l)]),
        ),
      },
    })),
  );

  const dynamicEntries: Array<{ slug: string; date: string }> = [
    ...posts.filter((p) => p.published).map((p) => ({ slug: p.slug, date: p.date })),
    ...projects
      .filter((p) => p.published)
      .map((p) => ({ slug: p.slug, date: p.date })),
  ];

  const dynamicRoutes = routing.locales.flatMap((locale) =>
    dynamicEntries.map((entry) => ({
      url: localizedUrl(`/${entry.slug}`, locale),
      lastModified: new Date(entry.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, localizedUrl(`/${entry.slug}`, l)]),
        ),
      },
    })),
  );

  return [...staticRoutes, ...dynamicRoutes];
}
