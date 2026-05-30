import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "#site/content";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GreetingBadge, HandwrittenAside } from "@/components/decorations";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

const KIND_DOT: Record<string, string> = {
  Web: "var(--orange)",
  App: "var(--teal)",
  "Brand & System": "var(--lilac)",
  Writing: "var(--sky)",
};

const TONE_BG: Record<string, string> = {
  pink: "var(--pink-soft)",
  "yellow-soft": "var(--yellow-soft)",
  "teal-soft": "var(--teal-soft)",
  "sky-soft": "var(--sky-soft)",
  "olive-soft": "var(--olive-soft)",
  "lilac-soft": "var(--lilac-soft)",
  cream: "var(--paper-cream)",
};

const FILTERS = ["All", "Web", "App", "Brand & System", "Writing"] as const;

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  const published = projects
    .filter((p) => p.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const featured = published.find((p) => p.featured) ?? published[0];
  const rest = published.filter((p) => p.slug !== featured?.slug);

  const kindLabel = (k: string) => {
    try {
      return t(`kinds.${k}` as never) as string;
    } catch {
      return k;
    }
  };

  return (
    <div className={pageWrap}>
      <section className="pt-14">
        <GreetingBadge>{t("greeting")}</GreetingBadge>
        <h1 className="mt-6 font-display text-[68px] font-bold leading-[0.95] tracking-[-0.04em] sm:text-[92px]">
          {t("headline1")} <span className="y-mark">{t("headlineCatalogue")}</span>
          <br />
          {t("headlineOf")}{" "}
          <span className="underline-orange">{t("headlineMade")}</span>
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-[20px] leading-[1.55] text-[color:var(--ink-soft)]">
          {t("lede", { count: published.length })}
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
          {t("filterLabel")}
        </span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
              f === "All"
                ? "bg-ink text-[color:var(--bg)]"
                : "text-ink hover:bg-[color:var(--bg-2)]"
            }`}
          >
            {f === "All" ? t("filterAll") : kindLabel(f)}
          </button>
        ))}
        <span className="ml-auto text-xs text-[color:var(--mute)]">
          {t("filterCount", { n: published.length, total: published.length })}
        </span>
      </nav>

      <section className="mt-6 grid auto-rows-[240px] grid-cols-3 gap-5">
        {featured ? (
          <Link
            href={`/${featured.slug}`}
            className="group relative col-span-2 row-span-2 flex flex-col justify-between rounded-3xl border-[1.5px] border-ink p-8 text-paper shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--orange) 0%, #ff8b42 60%, var(--yellow) 100%)",
            }}
          >
            <div>
              <div
                className="br-label !text-[rgba(255,255,255,0.85)]"
                style={{ "--dot": "var(--paper)" } as React.CSSProperties}
              >
                {kindLabel(featured.kind)}
                {featured.role ? ` · ${featured.role.split(" · ")[0]}` : ""}
                <Badge
                  variant="default"
                  className="ml-3 rotate-[8deg] !bg-ink !text-paper"
                >
                  {t("current")}
                </Badge>
              </div>
            </div>
            <div>
              <h2 className="font-display text-[56px] font-bold leading-[0.95] tracking-[-0.03em]">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[rgba(255,255,255,0.95)]">
                {featured.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-[12px] text-[rgba(255,255,255,0.85)]">
              <span>
                {new Date(featured.date).toLocaleDateString(
                  locale === "zh" ? "zh-CN" : "en-US",
                  { month: "long", year: "numeric" },
                )}
              </span>
              <span className="text-xl">↗</span>
            </div>
          </Link>
        ) : null}

        {rest.slice(0, 5).map((project) => (
          <Link
            key={project.slug}
            href={`/${project.slug}`}
            className="group flex flex-col justify-between rounded-3xl border-[1.5px] border-ink p-7 shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5"
            style={{
              background:
                TONE_BG[project.tone ?? "cream"] ?? "var(--paper-cream)",
            }}
          >
            <div
              className="br-label"
              style={
                {
                  "--dot": KIND_DOT[project.kind] ?? "var(--orange)",
                } as React.CSSProperties
              }
            >
              {kindLabel(project.kind)}
              {project.role ? ` · ${project.role.split(" · ")[0]}` : ""}
            </div>
            <div>
              <h3 className="font-display text-[24px] font-bold leading-[1.1] tracking-[-0.02em]">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center justify-between text-xs text-[color:var(--mute)]">
              <span>{new Date(project.date).getFullYear()}</span>
              <span className="text-base text-ink">↗</span>
            </div>
          </Link>
        ))}
      </section>

      <div className="mt-8 flex items-center justify-between rounded-3xl border-[1.5px] border-dashed border-ink bg-paper px-8 py-7">
        <div className="font-display text-lg font-semibold">
          {t("archive")}{" "}
          <HandwrittenAside tilt={-2}>{t("archiveHand")}</HandwrittenAside>
        </div>
        <Button asChild variant="outline">
          <Link href="/contact">{t("ctaContact")}</Link>
        </Button>
      </div>
    </div>
  );
}
