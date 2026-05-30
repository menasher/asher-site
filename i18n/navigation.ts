import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 * Use these instead of `next/link` and `next/navigation` so that all
 * link `href`s are automatically prefixed with the current locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
