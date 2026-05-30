import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate the locale from the URL; fall back to default if invalid.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (
    (await import(`../messages/${locale}.json`)) as { default: unknown }
  ).default as Record<string, unknown>;

  return {
    locale,
    messages,
  };
});
