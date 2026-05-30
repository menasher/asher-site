import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/lib/site";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons";
import {
  GreetingBadge,
  HandwrittenAside,
  StampSquare,
} from "@/components/decorations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

type ChannelTone = "primary" | "sky" | "cream" | "olive";

const TONE: Record<
  ChannelTone,
  { bg: string; text: string; glyphBg: string; glyphFg: string }
> = {
  primary: {
    bg: "var(--orange)",
    text: "var(--paper)",
    glyphBg: "var(--paper)",
    glyphFg: "var(--orange)",
  },
  sky: {
    bg: "var(--sky-soft)",
    text: "var(--ink)",
    glyphBg: "var(--ink)",
    glyphFg: "var(--paper)",
  },
  cream: {
    bg: "var(--paper-cream)",
    text: "var(--ink)",
    glyphBg: "var(--ink)",
    glyphFg: "var(--paper)",
  },
  olive: {
    bg: "var(--olive-soft)",
    text: "var(--ink)",
    glyphBg: "var(--ink)",
    glyphFg: "var(--paper)",
  },
};

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const channels: Array<{
    label: string;
    href: string;
    addr: string;
    body: React.ReactNode;
    cadence: string;
    glyph: React.ReactNode;
    tone: ChannelTone;
  }> = [
    {
      label: t("email"),
      href: siteConfig.social.email,
      addr: siteConfig.author.email,
      body: (
        <>
          {t("emailBody")}
          <em
            className="font-semibold text-yellow"
            style={{ fontStyle: "italic" }}
          >
            {t("emailBodyEm")}
          </em>
        </>
      ),
      cadence: t("emailCadence"),
      glyph: <Mail className="h-5 w-5" />,
      tone: "primary",
    },
    {
      label: t("twitter"),
      href: siteConfig.social.twitter,
      addr: siteConfig.author.twitter,
      body: (
        <>
          {t("twitterBody")}
          <em
            className="font-semibold text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("twitterBodyEm")}
          </em>
          {t("twitterTail")}
        </>
      ),
      cadence: t("twitterCadence"),
      glyph: <TwitterIcon className="h-5 w-5" />,
      tone: "sky",
    },
    {
      label: t("github"),
      href: siteConfig.social.github,
      addr: "github.com/asher",
      body: (
        <>
          {t("githubBody")}
          <em
            className="font-semibold text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("githubBodyEm")}
          </em>
          {t("githubTail")}
        </>
      ),
      cadence: t("githubCadence"),
      glyph: <GitHubIcon className="h-5 w-5" />,
      tone: "cream",
    },
    {
      label: t("linkedin"),
      href: siteConfig.social.linkedin,
      addr: "/in/asher",
      body: (
        <>
          {t("linkedinBody")}
          <em
            className="font-semibold text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("linkedinBodyEm")}
          </em>
          {t("linkedinTail")}
        </>
      ),
      cadence: t("linkedinCadence"),
      glyph: <LinkedInIcon className="h-5 w-5" />,
      tone: "olive",
    },
  ];

  return (
    <div className={pageWrap}>
      <section className="pt-20">
        <GreetingBadge>{t("greeting")}</GreetingBadge>
        <h1 className="mt-6 font-display text-[88px] font-bold leading-[0.92] tracking-[-0.045em] sm:text-[124px]">
          {t("headline1")}{" "}
          <span
            className="font-hand font-normal text-orange"
            style={{
              fontSize: "0.55em",
              display: "inline-block",
              transform: "rotate(-3deg)",
              verticalAlign: "0.4em",
            }}
          >
            {t("headlineLine")}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-[22px] leading-[1.55] text-[color:var(--ink-soft)]">
          {t("lede")}
          <em
            className="not-italic font-medium text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("ledeEm")}
          </em>
          {t("ledeTail")}
        </p>
      </section>

      <section className="mt-20 grid gap-5 sm:grid-cols-2">
        {channels.map((ch) => {
          const tone = TONE[ch.tone];
          return (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group relative flex min-h-[200px] flex-col justify-between rounded-3xl border-[1.5px] border-ink p-8 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              style={{ background: tone.bg, color: tone.text }}
            >
              {ch.tone === "primary" ? (
                <span className="absolute right-5 top-5 rotate-[8deg] rounded-full border-[1.5px] border-ink bg-yellow px-3 py-0.5 text-xs font-bold text-ink">
                  {t("primary")}
                </span>
              ) : null}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold"
                    style={{ background: tone.glyphBg, color: tone.glyphFg }}
                  >
                    {ch.glyph}
                  </span>
                  <span className="font-display text-[28px] font-bold tracking-[-0.02em]">
                    {ch.label}
                  </span>
                </div>
                <p className="mt-4 max-w-md text-sm leading-[1.55]">
                  {ch.body}
                </p>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-display text-lg font-bold">
                  {ch.addr}
                </span>
                {ch.tone === "primary" ? (
                  <HandwrittenAside
                    tilt={-3}
                    className="text-base text-paper"
                  >
                    {ch.cadence}
                  </HandwrittenAside>
                ) : (
                  <span className="text-[11px] opacity-70">{ch.cadence}</span>
                )}
              </div>
            </a>
          );
        })}
      </section>

      <section className="relative mt-20 rounded-3xl border-[1.5px] border-ink bg-yellow p-12 shadow-[0_4px_0_var(--ink)]">
        <HandwrittenAside tilt={-2} className="text-2xl">
          {t("promiseHand")}
        </HandwrittenAside>
        <p className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.3] tracking-[-0.01em]">
          {t("promise1")}
          <em
            className="not-italic font-bold text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("promiseEm")}
          </em>
          {t("promise2")}
        </p>
        <div
          className="absolute bottom-6 right-8"
          style={{ transform: "rotate(-8deg)" }}
        >
          <div className="rounded-full border-[1.5px] border-ink bg-paper p-2 shadow-[0_3px_0_var(--ink)]">
            <StampSquare size={56} />
          </div>
        </div>
      </section>
    </div>
  );
}
