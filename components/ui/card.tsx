import * as React from "react";

import { cn } from "@/lib/utils";

type CardTone =
  | "default"
  | "cream"
  | "pink"
  | "yellow"
  | "yellow-soft"
  | "teal-soft"
  | "olive-soft"
  | "sky-soft"
  | "lilac-soft"
  | "orange";

const toneClass: Record<CardTone, string> = {
  default: "bg-paper",
  cream: "bg-paper-cream",
  pink: "bg-[color:var(--pink-soft)]",
  yellow: "bg-yellow",
  "yellow-soft": "bg-[color:var(--yellow-soft)]",
  "teal-soft": "bg-[color:var(--teal-soft)]",
  "olive-soft": "bg-[color:var(--olive-soft)]",
  "sky-soft": "bg-[color:var(--sky-soft)]",
  "lilac-soft": "bg-[color:var(--lilac-soft)]",
  orange: "bg-orange text-paper",
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border-[1.5px] border-ink shadow-[0_4px_0_var(--ink)]",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-7 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em]",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed text-[color:var(--ink-soft)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-7 pt-3", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-7 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
export type { CardTone };
