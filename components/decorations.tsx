import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The orange-yellow gradient blob used in the logotype and as an avatar
 * placeholder. Inline SVG so it scales crisply and never needs a network
 * fetch. Reuse via `<Blob size={28} />` or pass a tailwind className.
 */
export function Blob({
  size = 28,
  className,
  withBorder = false,
}: {
  size?: number;
  className?: string;
  withBorder?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      style={{
        width: size,
        height: size,
        borderRadius: "50% 60% 55% 50% / 60% 50% 55% 50%",
        background:
          "linear-gradient(135deg, var(--orange) 0%, var(--yellow) 100%)",
        transform: "rotate(-6deg)",
        border: withBorder ? "1.5px solid var(--ink)" : undefined,
      }}
    />
  );
}

/**
 * Greeting label — handwritten Caveat, slight tilt, leading dot.
 *   <GreetingBadge>hi there ✿ welcome in</GreetingBadge>
 */
export function GreetingBadge({
  children,
  className,
  dotColor = "var(--yellow)",
}: {
  children: React.ReactNode;
  className?: string;
  dotColor?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 font-hand text-xl text-orange",
        className,
      )}
      style={{ transform: "rotate(-2deg)" }}
    >
      <span
        aria-hidden
        className="inline-block h-5 w-5 rounded-full border-[1.5px] border-ink"
        style={{ background: dotColor }}
      />
      {children}
    </div>
  );
}

/**
 * "Now —" status strip. Live pulse dot + handwritten note about what you're
 * currently doing. Put on the Home page just after the hero.
 */
export function NowStrip({
  children,
  className,
  tone = "olive",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "olive" | "orange" | "teal";
}) {
  const palette = {
    olive: "var(--olive)",
    orange: "var(--orange)",
    teal: "var(--teal)",
  }[tone];
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-hand text-lg leading-none",
        className,
      )}
      style={{
        color: palette,
        transform: "rotate(-1deg)",
      }}
    >
      <span
        aria-hidden
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{
          background: palette,
          boxShadow: `0 0 0 4px ${palette}33`,
        }}
      />
      {children}
    </div>
  );
}

/**
 * The "阿" square stamp. Used as an author signature on About,
 * Contact, and post detail. Renders as a tilted Card-style square.
 *   <StampSquare>阿</StampSquare>
 */
export function StampSquare({
  children = "阿",
  size = 48,
  className,
}: {
  children?: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-serif italic text-orange",
        className,
      )}
      style={{
        width: size,
        height: size,
        border: "1.5px solid var(--orange)",
        borderRadius: 2,
        fontSize: size * 0.46,
      }}
    >
      {children}
    </span>
  );
}

/**
 * A small handwritten arrow / aside, eg "freshly baked ↗" or "see you around ✿".
 * Use sparingly — once per page tops.
 */
export function HandwrittenAside({
  children,
  className,
  tilt = -3,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <span
      className={cn("inline-block font-hand text-xl text-orange", className)}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </span>
  );
}

/**
 * Yellow stuck-on note used to pull a quote out of long copy.
 * Tilted ~2°, rounded, with the characteristic 3px ink shadow.
 */
export function StickyPullQuote({
  children,
  attribution,
  className,
  tilt = 1.5,
}: {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border-[1.5px] border-ink p-4 shadow-[0_3px_0_var(--ink)]",
        className,
      )}
      style={{
        background: "var(--yellow-soft)",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div className="font-hand text-lg leading-snug text-orange">
        {children}
      </div>
      {attribution ? (
        <div className="mt-2 text-[10px] uppercase tracking-wider text-[color:var(--mute)]">
          {attribution}
        </div>
      ) : null}
    </div>
  );
}
