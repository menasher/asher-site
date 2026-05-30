import { defineConfig, defineCollection, s } from "velite";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const POST_CATEGORIES = [
  "技术文章",
  "学习笔记",
  "行业观察",
  "随笔",
] as const;

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(120),
      description: s.string().max(280),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      category: s.enum(POST_CATEGORIES).default("随笔"),
      cover: s.image().optional(),
      tags: s.array(s.string()).default([]),
      readingMinutes: s.number().optional(),
      pullQuote: s.string().optional(),
      body: s.mdx(),
      toc: s.toc(),
      metadata: s.metadata(),
    })
    .transform(computedFields),
});

const PROJECT_KINDS = [
  "Web",
  "App",
  "Brand & System",
  "Writing",
] as const;

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(120),
      description: s.string().max(280),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      kind: s.enum(PROJECT_KINDS).default("Web"),
      role: s.string().optional(),
      tone: s
        .enum([
          "pink",
          "yellow-soft",
          "teal-soft",
          "sky-soft",
          "olive-soft",
          "lilac-soft",
          "cream",
        ])
        .optional(),
      cover: s.image().optional(),
      tags: s.array(s.string()).default([]),
      url: s.string().url().optional(),
      repo: s.string().url().optional(),
      body: s.mdx(),
      metadata: s.metadata(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
