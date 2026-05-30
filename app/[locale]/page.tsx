import { getTranslations, setRequestLocale } from "next-intl/server";
import { posts, projects } from "#site/content";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GreetingBadge, NowStrip } from "@/components/decorations";

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const recentPosts = posts
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const recentProjects = projects
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className={pageWrap}>
      {/* HERO */}
      <section className="pt-14">
        <GreetingBadge>{t("greeting")}</GreetingBadge>
        <h1 className="mt-6 font-display text-[72px] font-bold leading-[0.95] tracking-[-0.045em] sm:text-[104px]">
          {t("headline1")} <span className="underline-orange">{t("headlineSmall")}</span>
          <br />
          <span className="y-mark">{t("headlineHonest")}</span> {t("headlineThings")}
          <br />
          {t("headlineForWeb")}{" "}
          <span
            aria-hidden
            className="inline-block text-orange"
            style={{
              transform: "rotate(8deg) translateY(-12px)",
              fontSize: "0.55em",
            }}
          >
            ♥
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-12 sm:grid-cols-[1fr_auto]">
          <p className="max-w-xl text-[19px] leading-relaxed text-[color:var(--ink-soft)]">
            <strong className="font-semibold text-ink">
              {t("introBold")}
            </strong>
            {t("introTail")}
          </p>
          <div className="flex flex-col items-end gap-3">
            <Button asChild>
              <Link href="/projects">
                {t("ctaWork")} <span className="ml-1 -rotate-45">↗</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">{t("ctaBlog")} →</Link>
            </Button>
          </div>
        </div>

        <NowStrip className="mt-8">{t("nowStatus")}</NowStrip>
      </section>

      {/* BENTO */}
      <section className="mt-24 grid auto-rows-[280px] grid-cols-3 gap-5">
        {/* Portfolio — large, spans 2 rows */}
        <Link
          href="/projects"
          className="group relative col-span-1 row-span-2 flex flex-col rounded-3xl border-[1.5px] border-ink p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, #ffe9d1 0%, var(--pink) 100%)",
          }}
        >
          <Badge
            variant="yellow"
            className="absolute right-7 top-7 rotate-[8deg]"
          >
            {t("bento.portfolioFresh", { count: recentProjects.length })}
          </Badge>
          <div
            className="br-label"
            style={{ "--dot": "var(--orange)" } as React.CSSProperties}
          >
            {t("bento.portfolioLabel")}
          </div>
          <h3 className="mt-3 font-display text-[44px] font-bold leading-[1.05] tracking-[-0.025em]">
            {t("bento.portfolioTitle")}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {t("bento.portfolioDesc")}
          </p>
          <div className="mt-auto">
            {recentProjects.slice(0, 4).map((project) => (
              <div
                key={project.slug}
                className="flex justify-between border-t border-dashed border-ink py-2.5 text-[13px]"
              >
                <span className="font-medium">{project.title}</span>
                <span className="text-[color:var(--mute)]">
                  {new Date(project.date).getFullYear()}
                </span>
              </div>
            ))}
          </div>
        </Link>

        {/* Blog */}
        <Link
          href="/blog"
          className="group relative flex flex-col rounded-3xl border-[1.5px] border-ink p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--teal-soft)" }}
        >
          <div
            className="br-label"
            style={{ "--dot": "var(--teal)" } as React.CSSProperties}
          >
            {t("bento.blogLabel", { count: recentPosts.length })}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.025em]">
            {t("bento.blogTitle")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {t("bento.blogDesc")}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {siteConfig.postCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-[11px]">
                {cat}
              </Badge>
            ))}
          </div>
        </Link>

        {/* About */}
        <Link
          href="/about"
          className="group relative flex flex-col rounded-3xl border-[1.5px] border-ink bg-paper-cream p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          <div
            className="br-label"
            style={{ "--dot": "var(--orange)" } as React.CSSProperties}
          >
            {t("bento.aboutLabel")}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.025em]">
            {t("bento.aboutTitle")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {t("bento.aboutDesc")}
          </p>
        </Link>

        {/* Resources */}
        <Link
          href="/resources"
          className="group relative flex flex-col rounded-3xl border-[1.5px] border-ink p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--sky-soft)" }}
        >
          <div
            className="br-label"
            style={{ "--dot": "var(--sky)" } as React.CSSProperties}
          >
            {t("bento.resourcesLabel")}
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em]">
            {t("bento.resourcesTitle")}
          </h3>
          <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
            {t("bento.resourcesDesc")}
          </p>
        </Link>

        {/* Say hi (Contact) */}
        <Link
          href="/contact"
          className="group relative flex flex-col justify-between rounded-3xl border-[1.5px] border-ink bg-yellow p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
        >
          <div>
            <div className="br-label">{t("bento.contactLabel")}</div>
            <h3 className="mt-3 font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em]">
              {t("bento.contactTitle")}
            </h3>
          </div>
          <div>
            <div className="font-display text-base font-bold">
              {siteConfig.author.email}
            </div>
            <div className="mt-1 text-[11px] text-[color:var(--ink-soft)]">
              {t("bento.contactCadence")}
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
