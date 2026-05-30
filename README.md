# Asher — personal site

Personal portfolio + blog. Built with Next.js 15, Tailwind CSS v4, shadcn/ui,
and Velite for MDX content.

## Stack

- **[Next.js 15](https://nextjs.org/)** — App Router, SSG, RSC
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)** with CSS variables
- **[shadcn/ui](https://ui.shadcn.com/)** primitives
- **[lucide-react](https://lucide.dev/)** icons
- **[Velite](https://velite.js.org/)** for typed MDX content
- **[next-themes](https://github.com/pacocoursey/next-themes)** for dark mode
- **[geist](https://vercel.com/font)** — locally-bundled Geist Sans + Mono
- **[pnpm](https://pnpm.io/)** for package management

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The `predev` and `prebuild` hooks automatically run `velite build` so the
content layer is ready before Next starts. To watch content changes in a second
terminal:

```bash
pnpm content:watch
```

## Scripts

| Command                  | What it does                                              |
| ------------------------ | --------------------------------------------------------- |
| `pnpm dev`               | Build content once, then start the Next dev server        |
| `pnpm build`             | Build content + production bundle                         |
| `pnpm start`             | Start the production server (after `pnpm build`)          |
| `pnpm content`           | Build the MDX content layer once                          |
| `pnpm content:watch`     | Rebuild content on every MDX change                       |
| `pnpm lint`              | Run ESLint                                                |
| `pnpm format`            | Run Prettier on the project                               |

## Project structure

```
.
├── app/                    # Next App Router pages
│   ├── about/              # /about
│   ├── blog/               # /blog and /blog/[slug]
│   ├── contact/            # /contact
│   ├── og/                 # Dynamic Open Graph image route
│   ├── projects/           # /projects and /projects/[slug]
│   ├── globals.css         # Tailwind v4 entry + design tokens
│   ├── layout.tsx          # Root layout (fonts, theme, header, footer)
│   ├── page.tsx            # Home
│   ├── robots.ts           # /robots.txt
│   └── sitemap.ts          # /sitemap.xml
├── components/
│   ├── ui/                 # shadcn primitives
│   ├── icons.tsx           # Inline brand SVGs (GitHub, X, LinkedIn)
│   ├── mdx-components.tsx  # Renders Velite-compiled MDX
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── content/
│   ├── blog/               # Blog posts (.mdx)
│   └── projects/           # Project case studies (.mdx)
├── lib/
│   ├── site.ts             # Site metadata (name, urls, social links)
│   └── utils.ts            # cn(), date helpers
├── public/                 # Static assets
├── velite.config.ts        # Content schema (frontmatter)
└── next.config.ts          # Next config + Velite webpack hook
```

## Adding a blog post

1. Create `content/blog/my-post.mdx`.
2. Add the frontmatter:

   ```mdx
   ---
   title: My post
   description: One-sentence summary.
   date: 2026-05-30
   tags:
     - whatever
   published: true
   ---

   Write the post.
   ```

3. Save. `pnpm dev` will hot-reload (if you have `content:watch` running in
   another terminal). Otherwise restart the dev server to pick up new files.

The post will be available at `/blog/my-post`.

## Adding a project

Same as a blog post, but in `content/projects/`. Project frontmatter also
supports:

- `featured: true` — surfaces the project on the home page
- `url: https://...` — link to the live site
- `repo: https://...` — link to the source code

## Customizing

- **Site metadata** lives in [`lib/site.ts`](lib/site.ts). Update the name,
  URL, and social links here — every page reads from this single source.
- **Design tokens** (colors, radius, etc.) live in
  [`app/globals.css`](app/globals.css). Both light and dark variants are
  defined as CSS variables.
- **Components** in [`components/ui/`](components/ui/) follow the shadcn
  convention — they&apos;re plain TSX files you can edit directly.

## Deploying

Push to a Git repo and import it on [Vercel](https://vercel.com/). The default
settings (Next.js, `pnpm build`) work out of the box. Don&apos;t forget to set
`siteConfig.url` in [`lib/site.ts`](lib/site.ts) to your production domain so
sitemap, OG, and canonical URLs are correct.

## License

MIT.
