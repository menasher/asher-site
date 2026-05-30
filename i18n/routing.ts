import { defineRouting } from "next-intl/routing";

/**
 * i18n routing config.
 *
 * - `en` is the default locale; visiting `/blog` shows English.
 * - `zh` is prefixed: `/zh/blog` shows Chinese.
 * - All other locales fall back to `en`.
 */
export const routing = defineRouting({
  locales: ["en", "zh"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
