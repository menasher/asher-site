import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "#site/content";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { StampSquare, HandwrittenAside } from "@/components/decorations";
import { MDXContent } from "@/components/mdx-components";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const pageWrap = "mx-auto max-w-[1280px] px-8 sm:px-14";

async function getProjectFromParams(params: PageProps["params"]) {
  const { slug } = await params;
  const project = projects.find((p) => p.slugAsParams === slug);
  if (!project || !project.published) return null;
  return project;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${siteConfig.url}/${project.slug}`,
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slugAsParams }));
}

function formatDateLoc(date: string, locale: string) {
  return new Date(date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const project = await getProjectFromParams(params);
  if (!project) notFound();
  const t = await getTranslations("project");
  const tPort = await getTranslations("portfolio");

  const kindLabel = (() => {
    try {
      return tPort(`kinds.${project.kind}` as never) as string;
    } catch {
      return project.kind;
    }
  })();

  return (
    <article className={pageWrap}>
      <div className="pt-14">
        <Link
          href="/projects"
          className="text-sm text-[color:var(--mute)] hover:text-ink"
        >
          {t("allProjects")}
        </Link>
      </div>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{kindLabel}</Badge>
          {project.featured ? (
            <Badge variant="yellow">{t("featured")}</Badge>
          ) : null}
          <span className="text-xs text-[color:var(--mute)]">
            {formatDateLoc(project.date, locale)}
          </span>
          {project.role ? (
            <span className="text-xs text-[color:var(--mute)]">
              · {project.role}
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 font-display text-[56px] font-bold leading-[0.95] tracking-[-0.03em] sm:text-[80px]">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-[22px] leading-[1.5] italic text-[color:var(--ink-soft)]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {project.url ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.url} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                {t("visit")}
              </a>
            </Button>
          ) : null}
          {project.repo ? (
            <Button asChild variant="outline" size="sm">
              <a href={project.repo} target="_blank" rel="noreferrer">
                <GitHubIcon className="mr-1 h-4 w-4" />
                {t("source")}
              </a>
            </Button>
          ) : null}
        </div>
      </header>

      <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_240px]">
        <div className="rounded-3xl border-[1.5px] border-ink bg-paper p-8 shadow-[0_4px_0_var(--ink)] sm:p-12">
          <MDXContent code={project.body} />
        </div>
        <aside className="space-y-4">
          <div
            className="br-card-sm bg-[color:var(--yellow-soft)] p-4"
            style={{ transform: "rotate(1.5deg)" }}
          >
            <HandwrittenAside tilt={-2} className="text-base">
              {t("onTheBench")}
            </HandwrittenAside>
            <p className="mt-2 text-xs leading-relaxed text-[color:var(--ink-soft)]">
              {t("onTheBenchBody")}
            </p>
          </div>
          <div className="space-y-2 text-xs text-[color:var(--mute)]">
            <div>
              {t("kind")} · <strong className="text-ink">{kindLabel}</strong>
            </div>
            {project.role ? (
              <div>
                {t("role")} ·{" "}
                <strong className="text-ink">{project.role}</strong>
              </div>
            ) : null}
            <div>
              {t("year")} ·{" "}
              <strong className="text-ink">
                {new Date(project.date).getFullYear()}
              </strong>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <StampSquare size={36} />
            <span className="font-hand text-base text-orange">
              — {siteConfig.author.name}
            </span>
          </div>
        </aside>
      </div>
    </article>
  );
}
