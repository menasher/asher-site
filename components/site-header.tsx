"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { Blob } from "@/components/decorations";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useTranslations("nav");
  const tLang = useTranslations("langSwitch");

  return (
    <header className="px-8 pt-8 sm:px-14 sm:pt-9">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-display text-xl font-bold tracking-[-0.02em]"
        >
          <Blob size={28} />
          <span>
            {siteConfig.name.toLowerCase()}
            <span
              className="font-hand text-orange"
              style={{ transform: "rotate(8deg)", display: "inline-block" }}
            >
              !
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="br-pill px-2 py-1.5">
            <ul className="flex items-center gap-1">
              {siteConfig.navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-ink text-[color:var(--bg)]"
                          : "text-ink hover:bg-[color:var(--bg-2)]",
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className="br-pill flex items-center gap-0.5 px-1.5 py-1.5"
            aria-label={tLang("label")}
          >
            {routing.locales.map((loc: Locale) => {
              const active = locale === loc;
              return (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={cn(
                    "inline-block rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors",
                    active
                      ? "bg-ink text-[color:var(--bg)]"
                      : "text-ink hover:bg-[color:var(--bg-2)]",
                  )}
                >
                  {tLang(loc)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
