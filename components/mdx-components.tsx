import Image from "next/image";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";

import { cn } from "@/lib/utils";

/**
 * Browser-Company-flavoured MDX renderer. Body copy is set in the
 * serif stack (Newsreader → Iowan Old Style → Georgia); inline emphasis
 * picks up the warm orange accent so it reads like a stylised journal.
 */
const sharedComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 font-display text-4xl font-bold tracking-[-0.025em]",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.02em] first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 font-display text-2xl font-semibold tracking-[-0.02em]",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "font-serif text-[19px] leading-[1.65] text-[color:var(--ink-soft)] [&:not(:first-child)]:mt-5",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "my-5 ml-6 list-disc space-y-2 font-serif text-[18px] leading-[1.55] text-[color:var(--ink-soft)] marker:text-orange",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-5 ml-6 list-decimal space-y-2 font-serif text-[18px] leading-[1.55] text-[color:var(--ink-soft)] marker:text-orange marker:font-bold",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-1", className)} {...props} />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em
      className={cn(
        "font-medium not-italic text-orange",
        className,
      )}
      style={{ fontStyle: "italic" }}
      {...props}
    />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn("font-semibold text-ink", className)}
      {...props}
    />
  ),
  blockquote: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-7 rounded-3xl border-[1.5px] border-ink bg-[color:var(--yellow-soft)] p-7 font-display text-[22px] font-medium leading-[1.35] tracking-[-0.01em] shadow-[0_3px_0_var(--ink)]",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="-mb-2 -ml-1 mr-1 inline-block align-[-0.4em] font-serif text-[44px] leading-none text-orange">
        &ldquo;
      </span>
      {children}
    </blockquote>
  ),
  a: ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    props.href?.startsWith("/") ? (
      <Link
        href={props.href}
        className={cn(
          "font-medium text-orange underline decoration-[1.5px] underline-offset-3",
          className,
        )}
      >
        {props.children}
      </Link>
    ) : (
      <a
        className={cn(
          "font-medium text-orange underline decoration-[1.5px] underline-offset-3",
          className,
        )}
        target="_blank"
        rel="noreferrer"
        {...props}
      />
    ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "rounded-md border border-[color:var(--line)] bg-[color:var(--paper-cream)] px-1.5 py-0.5 font-mono text-[0.88em] text-ink",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-2xl border-[1.5px] border-ink bg-paper-cream p-5 font-mono text-[13px] leading-relaxed shadow-[0_3px_0_var(--ink)]",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-t-[1.5px] border-dashed border-[color:var(--line)]" {...props} />
  ),
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className="my-6 rounded-3xl border-[1.5px] border-ink shadow-[0_4px_0_var(--ink)]"
      {...props}
    />
  ),
  Image,
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
