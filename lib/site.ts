export const siteConfig = {
  name: "Asher",
  title: "Asher — small, honest things for the web",
  description:
    "Designer & engineer based in Shanghai. A journal of projects, half-thoughts, and the occasional rant.",
  url: "https://example.com",
  ogImage: "/og",
  author: {
    name: "Asher",
    email: "hi@example.com",
    twitter: "@asher",
  },
  /** Site navigation. `key` resolves against the `nav.*` translation
   *  namespace so labels stay in sync with `messages/{locale}.json`. */
  navLinks: [
    { href: "/", key: "home" },
    { href: "/about", key: "about" },
    { href: "/projects", key: "portfolio" },
    { href: "/blog", key: "blog" },
    { href: "/resources", key: "resources" },
    { href: "/contact", key: "contact" },
  ] as const,
  social: {
    github: "https://github.com/asher",
    twitter: "https://twitter.com/asher",
    linkedin: "https://linkedin.com/in/asher",
    email: "mailto:hi@example.com",
  },
  /** Categories for blog posts. Used in frontmatter (`category` field) and as
   *  filter pills on the /blog index. Order matters for filter UI. */
  postCategories: ["技术文章", "学习笔记", "行业观察", "随笔"] as const,
} as const;

export type SiteConfig = typeof siteConfig;
export type PostCategory = (typeof siteConfig.postCategories)[number];
