import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-[1.5px] border-ink bg-ink px-3 py-0.5 text-[color:var(--bg)]",
        secondary:
          "border-[1.5px] border-ink bg-paper px-3 py-0.5 text-ink",
        yellow:
          "border-[1.5px] border-ink bg-yellow px-3 py-0.5 text-ink font-semibold",
        orange:
          "border-[1.5px] border-ink bg-orange px-3 py-0.5 text-paper",
        outline: "border-[1px] border-ink px-3 py-0.5 text-ink",
        destructive:
          "border-[1.5px] border-ink bg-destructive px-3 py-0.5 text-paper",
      },
      size: {
        default: "px-3 py-0.5",
        sm: "px-2.5 py-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
