import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { posts } from "#site/content";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StickyPullQuote, HandwrittenAside } from "@/components/decorations";
import { MDXContent } from "@/components/mdx-components";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

async function getPostFromParams(params: PageProps["params"]) {
  const { slug } = await params;
  const post = posts.find((p) => p.slugAsParams === slug);
  if (!post || !post.published) return null;
  return post;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slugAsParams }));
}

function formatDateLoc(date: string, locale: string) {
  return new Date(date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );
}

export default async function PostPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const post = await getPostFromParams(params);
  if (!post) notFound();
  const t = await getTranslations("post");

  const sorted = posts
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const currentIdx = sorted.findIndex((p) => p.slug === post.slug);
  const nextPost = sorted[(currentIdx + 1) % sorted.length];

  const [head, tail] = post.title.split(" — ");
  const minLabel = (n: number) =>
    locale === "zh" ? `${n} 分钟` : `${n} min read`;

  return (
    <article className={pageWrap}>
      <header className="pt-14">
        <nav className="flex items-center gap-2 text-sm text-[color:var(--mute)]">
          <Link href="/blog" className="hover:text-ink">
            {locale === "zh" ? "博客" : "Blog"}
          </Link>
          <span aria-hidden>→</span>
          <span>{post.category}</span>
          <span aria-hidden>→</span>
          <span className="truncate">{head}</span>
        </nav>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.featured ? (
            <Badge variant="yellow">{t("featured")}</Badge>
          ) : null}
          <Badge variant="secondary">{post.category}</Badge>
          {post.readingMinutes ? (
            <Badge variant="secondary">{minLabel(post.readingMinutes)}</Badge>
          ) : null}
        </div>

        <h1 className="mt-5 font-display text-[52px] font-bold leading-[0.95] tracking-[-0.03em] sm:text-[76px]">
          {head}
          {tail ? (
            <>
              <br />
              <span
                className="font-hand font-normal text-orange"
                style={{
                  fontSize: "0.7em",
                  display: "inline-block",
                  transform: "rotate(-2deg)",
                  verticalAlign: "0.4em",
                  marginLeft: 4,
                }}
              >
                — {tail}
              </span>
            </>
          ) : null}
        </h1>

        <p className="mt-6 max-w-2xl font-serif text-[22px] leading-[1.55] italic text-[color:var(--ink-soft)]">
          {post.description}
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-full border-[1.5px] border-ink bg-paper px-5 py-2.5 shadow-[0_3px_0_var(--ink)]">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-ink font-serif text-base font-semibold italic text-paper"
            style={{
              background:
                "linear-gradient(135deg, var(--orange) 0%, var(--yellow) 100%)",
            }}
          >
            阿
          </span>
          <span className="font-display text-sm font-bold">
            {siteConfig.author.name}
          </span>
          <span className="text-[color:var(--mute-soft)]">·</span>
          <span className="text-xs text-[color:var(--mute)]">
            {formatDateLoc(post.date, locale)}
          </span>
          {post.readingMinutes ? (
            <>
              <span className="text-[color:var(--mute-soft)]">·</span>
              <span className="text-xs text-[color:var(--mute)]">
                {minLabel(post.readingMinutes)}
              </span>
            </>
          ) : null}
        </div>
      </header>

      <div className="mt-16 grid gap-10 lg:grid-cols-[200px_1fr_220px]">
        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <HandwrittenAside tilt={-2} className="text-lg">
              {t("contentsHand")}
            </HandwrittenAside>
            <ol className="mt-4 space-y-1">
              {post.toc.length > 0 ? (
                post.toc.map((entry, idx) => (
                  <li key={entry.url}>
                    <a
                      href={entry.url}
                      className={`block rounded-lg px-3 py-1.5 text-[13px] leading-tight transition-colors hover:bg-[color:var(--bg-2)] ${
                        idx === 0
                          ? "bg-[color:var(--yellow-soft)] font-medium text-ink"
                          : "text-[color:var(--mute)]"
                      }`}
                    >
                      <span className="mr-1.5 font-display font-bold text-orange">
                        {idx + 1}.
                      </span>
                      {entry.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="px-3 py-1.5 text-[13px] text-[color:var(--mute-soft)]">
                  {t("noContents")}
                </li>
              )}
            </ol>
          </div>
        </aside>

        <div className="rounded-3xl border-[1.5px] border-ink bg-paper p-8 shadow-[0_4px_0_var(--ink)] sm:p-12">
          <MDXContent code={post.body} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-4">
            {post.pullQuote ? (
              <StickyPullQuote attribution={t("marginPullAttribution")}>
                &ldquo;{post.pullQuote}&rdquo;
              </StickyPullQuote>
            ) : null}
            <div className="space-y-1.5 text-[11px] text-[color:var(--mute)]">
              <div>
                {t("postedBy")}{" "}
                <strong className="font-display text-ink">
                  {siteConfig.author.name}
                </strong>
              </div>
              {post.readingMinutes ? (
                <div>{t("wordsAt", { min: post.readingMinutes })}</div>
              ) : null}
              <div>
                {t("tagged")}{" "}
                <strong className="font-display text-ink">
                  {post.category}
                </strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {nextPost ? (
        <section
          className="mt-20 grid items-center gap-8 rounded-3xl border-[1.5px] border-ink p-8 shadow-[0_4px_0_var(--ink)] sm:grid-cols-[1fr_auto]"
          style={{
            background:
              "linear-gradient(135deg, var(--pink-soft) 0%, var(--yellow-soft) 100%)",
          }}
        >
          <div>
            <HandwrittenAside tilt={-2} className="text-lg">
              {t("nextPostHand")}
            </HandwrittenAside>
            <h3 className="mt-1 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.02em]">
              {nextPost.title.split(" — ")[0]}
            </h3>
            <div className="mt-1 text-xs text-[color:var(--mute)]">
              {nextPost.category}
              {nextPost.readingMinutes
                ? ` · ${minLabel(nextPost.readingMinutes)}`
                : ""}{" "}
              · {formatDateLoc(nextPost.date, locale)}
            </div>
          </div>
          <Button asChild>
            <Link href={`/${nextPost.slug}`}>
              {t("keepReading")}{" "}
              <span className="ml-1 -rotate-45">↗</span>
            </Link>
          </Button>
        </section>
      ) : null}
    </article>
  );
}
