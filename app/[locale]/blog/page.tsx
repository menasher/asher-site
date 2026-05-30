import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { posts } from "#site/content";

import { Link } from "@/i18n/navigation";
import { siteConfig, type PostCategory } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GreetingBadge,
  HandwrittenAside,
  StickyPullQuote,
} from "@/components/decorations";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

const CATEGORY_TONE: Record<PostCategory, { bg: string; dot: string }> = {
  技术文章: { bg: "var(--sky-soft)", dot: "var(--sky)" },
  学习笔记: { bg: "var(--teal-soft)", dot: "var(--teal)" },
  行业观察: { bg: "var(--lilac-soft)", dot: "var(--lilac)" },
  随笔: { bg: "var(--yellow-soft)", dot: "var(--yellow)" },
};

function isCategory(value: string | undefined): value is PostCategory {
  return (siteConfig.postCategories as readonly string[]).includes(value ?? "");
}

function formatDateLoc(date: string, locale: string) {
  return new Date(date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );
}

export default async function BlogPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const { category: catParam } = await searchParams;
  const activeCategory: PostCategory | null = isCategory(catParam)
    ? catParam
    : null;

  const allPublished = posts
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const filtered = activeCategory
    ? allPublished.filter((p) => p.category === activeCategory)
    : allPublished;

  const featured = allPublished.find((p) => p.featured) ?? allPublished[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  const categoryCounts = Object.fromEntries(
    siteConfig.postCategories.map((cat) => [
      cat,
      allPublished.filter((p) => p.category === cat).length,
    ]),
  ) as Record<PostCategory, number>;

  return (
    <div className={pageWrap}>
      <section className="pt-14">
        <GreetingBadge>
          {t("greeting", { count: allPublished.length })}
        </GreetingBadge>
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
            {t("headlineRants")}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-[20px] leading-[1.55] text-[color:var(--ink-soft)]">
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

      <nav className="mt-12 flex flex-wrap items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-6 py-3 shadow-[0_3px_0_var(--ink)]">
        <span className="mr-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--mute)]">
          {t("filterAll") === "全部" ? "筛选" : "Filter"}
        </span>
        <FilterPill
          href="/blog"
          active={!activeCategory}
          label={t("filterAll")}
          count={allPublished.length}
        />
        {siteConfig.postCategories.map((cat) => (
          <FilterPill
            key={cat}
            href={`/blog?category=${encodeURIComponent(cat)}`}
            active={activeCategory === cat}
            label={cat}
            count={categoryCounts[cat]}
          />
        ))}
        <HandwrittenAside tilt={-2} className="ml-auto text-base">
          {t("rssHand")}
        </HandwrittenAside>
      </nav>

      {featured && !activeCategory ? (
        <article
          className="mt-8 grid items-end gap-8 rounded-3xl border-[1.5px] border-ink p-8 shadow-[0_4px_0_var(--ink)] sm:grid-cols-[1fr_240px] sm:p-10"
          style={{
            background:
              "linear-gradient(135deg, var(--paper) 0%, var(--pink-soft) 100%)",
          }}
        >
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="yellow">{t("featured")}</Badge>
              <Badge variant="secondary">{featured.category}</Badge>
              {featured.readingMinutes ? (
                <Badge variant="secondary">
                  {locale === "zh"
                    ? `${featured.readingMinutes} 分钟`
                    : `${featured.readingMinutes} min read`}
                </Badge>
              ) : null}
            </div>
            <Link
              href={`/${featured.slug}`}
              className="mt-5 block font-display text-[40px] font-bold leading-[1.02] tracking-[-0.025em] hover:underline sm:text-[56px]"
            >
              {featured.title.split(" — ")[0]}
              {featured.title.includes(" — ") ? (
                <>
                  <br />
                  <em
                    className="not-italic font-bold text-orange"
                    style={{ fontStyle: "italic" }}
                  >
                    — {featured.title.split(" — ")[1]}
                  </em>
                </>
              ) : null}
            </Link>
            <p className="mt-4 max-w-2xl font-serif text-[17px] leading-[1.55] text-[color:var(--ink-soft)]">
              {featured.description}
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-[color:var(--mute)]">
              <span>{formatDateLoc(featured.date, locale)}</span>
              <span>·</span>
              <span>{siteConfig.author.name}</span>
              <Button asChild variant="primary" size="sm" className="ml-2">
                <Link href={`/${featured.slug}`}>
                  {t("readIt")}{" "}
                  <span className="ml-1 -rotate-45">↗</span>
                </Link>
              </Button>
            </div>
          </div>
          {featured.pullQuote ? (
            <div className="text-right">
              <HandwrittenAside tilt={-2} className="mb-3 text-lg">
                {t("freshlyBaked")}
              </HandwrittenAside>
              <StickyPullQuote
                attribution={t("fromThePost")}
                className="text-left"
                tilt={2}
              >
                &ldquo;{featured.pullQuote}&rdquo;
              </StickyPullQuote>
            </div>
          ) : null}
        </article>
      ) : null}

      <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => {
          const tone = CATEGORY_TONE[post.category];
          return (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="flex min-h-[220px] flex-col gap-3 rounded-3xl border-[1.5px] border-ink p-6 shadow-[0_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
              style={{ background: tone.bg }}
            >
              <div className="flex items-center justify-between text-[11px] text-[color:var(--mute)]">
                <span
                  className="br-label"
                  style={{ "--dot": tone.dot } as React.CSSProperties}
                >
                  {post.category}
                </span>
                <span>{formatDateLoc(post.date, locale)}</span>
              </div>
              <h3 className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.018em]">
                {post.title.split(" — ")[0]}
              </h3>
              <p className="flex-1 text-[13px] leading-[1.5] text-[color:var(--ink-soft)]">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[color:var(--mute)]">
                <span>
                  {post.readingMinutes
                    ? locale === "zh"
                      ? `${post.readingMinutes} 分钟`
                      : `${post.readingMinutes} min`
                    : "—"}
                </span>
                <span className="text-base text-ink">↗</span>
              </div>
            </Link>
          );
        })}
      </section>

      {rest.length === 0 ? (
        <div className="mt-10 rounded-3xl border-[1.5px] border-dashed border-ink bg-paper p-12 text-center">
          <div className="font-display text-2xl font-bold">
            {t("emptyTitle")}
          </div>
          <p className="mt-2 text-sm text-[color:var(--mute)]">
            {t("emptyBody")}
            <Link href="/blog" className="text-orange underline">
              {t("emptyLink")}
            </Link>
            {t("emptyTail")}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function FilterPill({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "bg-ink text-[color:var(--bg)]"
          : "text-ink hover:bg-[color:var(--bg-2)]"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-px text-[10px] ${
          active
            ? "bg-[rgba(255,255,255,0.25)]"
            : "bg-[color:var(--bg-2)] text-[color:var(--mute)]"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
