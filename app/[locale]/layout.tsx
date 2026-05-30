import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Caveat, Ma_Shan_Zheng } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import "../globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Bradley Hand", "Snell Roundhand", "cursive"],
});

// Ma Shan Zheng is a Chinese handwriting font from Google Fonts. The
// next/font type currently only declares the "latin" subset even though
// Google ships both `latin` and `chinese-simplified` — cast to bypass the
// stale typing so the Chinese glyphs actually load.
const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-ma-shan-zheng",
  subsets: ["latin", "chinese-simplified" as "latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["STKaiti", "PingFang SC", "cursive"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s — ${t("name")}`,
    },
    description: t("description"),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? "/" : `/${l}`,
        ]),
      ),
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url:
        locale === routing.defaultLocale
          ? siteConfig.url
          : `${siteConfig.url}/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: t("name"),
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: siteConfig.author.twitter,
      images: [siteConfig.ogImage],
    },
    icons: { icon: "/favicon.ico" },
  };
}

export const viewport: Viewport = {
  themeColor: "#fff8ee",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering for this locale.
  setRequestLocale(locale);

  return (
    <html
      lang={locale === "zh" ? "zh-Hans" : locale}
      className={`${GeistSans.variable} ${caveat.variable} ${maShanZheng.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans antialiased">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
