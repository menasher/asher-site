import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { GreetingBadge, StampSquare } from "@/components/decorations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

interface TimelineEntry {
  when: string;
  role: string;
  where: string;
  note: string;
}
interface ValueEntry {
  n: string;
  title: string;
  body: string;
}

// renders single asterisk-wrapped tokens as orange italic emphasis
function emphasize(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em
        key={i}
        className="font-semibold not-italic text-orange"
        style={{ fontStyle: "italic" }}
      >
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const timeline = t.raw("timeline") as TimelineEntry[];
  const values = t.raw("values") as ValueEntry[];
  const tagsRaw = t.raw("avatarTags") as string[];

  const valueBgs = [
    "var(--pink-soft)",
    "var(--yellow-soft)",
    "var(--teal-soft)",
    "var(--olive-soft)",
  ];

  return (
    <div className={pageWrap}>
      <section className="grid items-end gap-16 pt-14 sm:grid-cols-[1fr_320px]">
        <div>
          <GreetingBadge>{t("greeting")}</GreetingBadge>
          <h1 className="mt-6 font-display text-[60px] font-bold leading-[0.95] tracking-[-0.04em] sm:text-[80px]">
            {t("headlinePart1")}{" "}
            <span className="underline-orange">{t("headlineDesign")}</span>
            <br />
            {t("headlineSmall")}{" "}
            <span className="y-mark">{t("headlineCareful")}</span>
            {t("headlineThings")}
          </h1>
          <p className="mt-8 max-w-xl font-serif text-[22px] leading-[1.5] text-[color:var(--ink-soft)]">
            {t("lede")}
            <em
              className="not-italic font-medium text-orange"
              style={{ fontStyle: "italic" }}
            >
              {t("ledeEm")}
            </em>
            {t("ledeTail")}
          </p>
        </div>
        <div
          className="br-card p-6"
          style={{ transform: "rotate(2deg)" }}
          aria-hidden
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: "1",
              background:
                "radial-gradient(circle at 35% 30%, var(--yellow) 0%, var(--orange) 35%, var(--pink) 75%, var(--paper) 100%)",
              borderRadius: "60% 40% 55% 45% / 55% 50% 50% 45%",
            }}
          >
            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper font-serif text-[18px] italic">
              阿
            </span>
          </div>
          <div className="mt-4 font-display text-lg font-bold">
            {siteConfig.author.name}
          </div>
          <div className="text-xs text-[color:var(--mute)]">
            {t("avatarRole")}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tagsRaw.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-16 sm:grid-cols-[200px_1fr]">
        <div
          className="font-hand text-2xl leading-tight text-orange whitespace-pre-line"
          style={{ transform: "rotate(-2deg)" }}
        >
          {t("longerNote")}
        </div>
        <div className="max-w-2xl font-serif text-[19px] leading-[1.65] text-[color:var(--ink-soft)]">
          <p>
            {t("longerBody1")}
            <em
              className="not-italic font-medium text-orange"
              style={{ fontStyle: "italic" }}
            >
              {t("longerKerning")}
            </em>
            {t("longerBody2")}
            <em
              className="not-italic font-medium text-orange"
              style={{ fontStyle: "italic" }}
            >
              {t("longerTs")}
            </em>
            {t("longerBody3")}
          </p>
          <p className="mt-5">{t("longerBody4")}</p>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-4xl font-bold tracking-[-0.025em]">
            {t("timelineHead")}{" "}
            <span
              className="ml-2 inline-block font-hand text-[26px] text-orange"
              style={{ transform: "rotate(-2deg)" }}
            >
              {t("timelineHand")}
            </span>
          </h2>
          <span className="text-xs text-[color:var(--mute)]">
            {t("timelineMeta")}
          </span>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {timeline.map((stop, idx) => (
            <li
              key={stop.role + stop.when}
              className="grid grid-cols-[100px_1fr] items-start gap-4 rounded-3xl border-[1.5px] border-ink p-6 shadow-[0_3px_0_var(--ink)]"
              style={{
                background:
                  idx === 0 ? "var(--yellow-soft)" : "var(--paper)",
              }}
            >
              <div className="font-display text-[16px] font-bold leading-tight text-orange whitespace-pre-line">
                {stop.when}
              </div>
              <div>
                <div className="font-display text-[18px] font-bold leading-[1.2]">
                  {stop.role}
                </div>
                <div className="mt-1 text-xs text-[color:var(--mute)]">
                  {stop.where}
                </div>
                <div className="mt-2 text-[12.5px] leading-relaxed text-[color:var(--ink-soft)]">
                  {stop.note}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-4xl font-bold tracking-[-0.025em]">
            {t("valuesHead")}{" "}
            <span
              className="ml-2 inline-block font-hand text-[26px] text-orange"
              style={{ transform: "rotate(-2deg)" }}
            >
              {t("valuesHand")}
            </span>
          </h2>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {values.map((v, idx) => (
            <li
              key={v.n}
              className="rounded-3xl border-[1.5px] border-ink p-7 shadow-[0_3px_0_var(--ink)]"
              style={{ background: valueBgs[idx % valueBgs.length] }}
            >
              <div className="font-display text-3xl font-bold text-orange">
                {v.n}
              </div>
              <h4 className="mt-2 font-display text-[21px] font-bold">
                {v.title}
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--ink-soft)]">
                {emphasize(v.body)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 flex items-center gap-4 text-sm text-[color:var(--mute)]">
        <StampSquare size={40} />
        <span>
          {t("ctaSentence")}
          <Link
            href="/contact"
            className="text-orange underline decoration-[1.5px] underline-offset-4"
          >
            {t("ctaLink")}
          </Link>
          {t("ctaTail")}
        </span>
      </div>
    </div>
  );
}
