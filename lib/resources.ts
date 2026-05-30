/**
 * Static, untranslatable metadata for `/resources`.
 * Translated copy (`name`, `kicker`, `reason`) lives in
 * `messages/{locale}.json` under `resources.{tools|books|essays}[]` and is
 * merged with this list by array index in the page.
 */

export type ResourceTone =
  | "pink"
  | "yellow"
  | "teal"
  | "sky"
  | "olive"
  | "lilac"
  | "cream";

export type ResourceMeta = {
  href: string;
  domain: string;
  tone: ResourceTone;
  glyph: string;
};

export const tools: ResourceMeta[] = [
  { href: "https://linear.app", domain: "linear.app", tone: "pink", glyph: "L" },
  { href: "https://cursor.com", domain: "cursor.com", tone: "yellow", glyph: "C" },
  { href: "https://figma.com", domain: "figma.com", tone: "teal", glyph: "F" },
  { href: "https://velite.js.org", domain: "velite.js.org", tone: "sky", glyph: "V" },
];

export const books: ResourceMeta[] = [
  { href: "https://example.com/white", domain: "muji books", tone: "olive", glyph: "W" },
  { href: "https://example.com/grid", domain: "niggli press", tone: "lilac", glyph: "G" },
  { href: "https://refactoringui.com", domain: "refactoringui.com", tone: "pink", glyph: "R" },
  { href: "https://example.com/pattern", domain: "oxford press", tone: "yellow", glyph: "P" },
];

export const essays: ResourceMeta[] = [
  { href: "https://dreamsongs.com", domain: "dreamsongs", tone: "sky", glyph: "↻" },
  { href: "https://tylerxhobbs.com", domain: "tylerxhobbs", tone: "teal", glyph: "⌘" },
  { href: "https://rauno.me", domain: "rauno.me", tone: "pink", glyph: "★" },
  { href: "https://ndc.co.jp", domain: "ndc.co.jp", tone: "olive", glyph: "○" },
];

export const TONE_BG: Record<ResourceTone, string> = {
  pink: "var(--pink-soft)",
  yellow: "var(--yellow-soft)",
  teal: "var(--teal-soft)",
  sky: "var(--sky-soft)",
  olive: "var(--olive-soft)",
  lilac: "var(--lilac-soft)",
  cream: "var(--paper-cream)",
};
