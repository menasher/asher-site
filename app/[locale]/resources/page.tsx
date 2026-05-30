import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  books,
  essays,
  tools,
  TONE_BG,
  type ResourceMeta,
} from "@/lib/resources";
import { GreetingBadge } from "@/components/decorations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

interface ResourceCopy {
  name: string;
  kicker?: string;
  reason: string;
}

function ResourceList({
  items,
  meta,
}: {
  items: ResourceCopy[];
  meta: ResourceMeta[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((r, idx) => {
        const m = meta[idx];
        if (!m) return null;
        return (
          <li
            key={r.name}
            className="grid grid-cols-[36px_1fr_auto] items-center gap-4 rounded-2xl border-[1.5px] border-ink p-5 shadow-[0_3px_0_var(--ink)]"
            style={{ background: TONE_BG[m.tone] }}
          >
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper"
            >
              {m.glyph}
            </span>
            <div>
              <div className="font-display text-[17px] font-bold leading-[1.25]">
                {r.name}{" "}
                {r.kicker ? (
                  <span className="ml-1 font-serif text-[13px] italic text-[color:var(--mute)]">
                    {r.kicker}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[color:var(--ink-soft)]">
                {r.reason}
              </p>
            </div>
            <a
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="self-start font-hand text-base text-orange transition-transform hover:-translate-y-0.5"
              style={{ transform: "rotate(-3deg)" }}
            >
              {m.domain} ↗
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Section({
  num,
  title,
  blurb,
  items,
  meta,
}: {
  num: string;
  title: string;
  blurb: string;
  items: ResourceCopy[];
  meta: ResourceMeta[];
}) {
  return (
    <section className="mt-20">
      <div className="mb-6 flex items-baseline justify-between">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[28px] font-bold text-orange">
            {num}
          </span>
          <h2 className="font-display text-[32px] font-bold tracking-[-0.02em]">
            {title}
          </h2>
        </div>
        <div className="font-serif text-[15px] italic text-[color:var(--mute)]">
          — {blurb}
        </div>
      </div>
      <ResourceList items={items} meta={meta} />
    </section>
  );
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");

  const toolsCopy = t.raw("tools") as ResourceCopy[];
  const booksCopy = t.raw("books") as ResourceCopy[];
  const essaysCopy = t.raw("essays") as ResourceCopy[];

  return (
    <div className={pageWrap}>
      <section className="pt-14">
        <GreetingBadge>{t("greeting")}</GreetingBadge>
        <h1 className="mt-6 font-display text-[60px] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[80px]">
          {t("headline1")}{" "}
          <span className="underline-orange">{t("headlineRead")}</span>
          <br />
          {t("headlineUseRec")}{" "}
          <span className="y-mark">{t("headlineRecommend")}</span>
          {t("headlineThe")}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-[19px] leading-[1.55] text-[color:var(--ink-soft)]">
          {t("lede")}
          <em
            className="not-italic font-medium text-orange"
            style={{ fontStyle: "italic" }}
          >
            {t("ledeEm")}
          </em>
        </p>
      </section>

      <Section
        num="01."
        title={t("sectionTools")}
        blurb={t("sectionToolsBlurb")}
        items={toolsCopy}
        meta={tools}
      />
      <Section
        num="02."
        title={t("sectionBooks")}
        blurb={t("sectionBooksBlurb")}
        items={booksCopy}
        meta={books}
      />
      <Section
        num="03."
        title={t("sectionEssays")}
        blurb={t("sectionEssaysBlurb")}
        items={essaysCopy}
        meta={essays}
      />
    </div>
  );
}
