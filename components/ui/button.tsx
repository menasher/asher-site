import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px] active:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-[1.5px] border-ink bg-ink text-[color:var(--bg)] shadow-[0_3px_0_var(--ink)] hover:bg-[color:var(--ink-soft)]",
        primary:
          "rounded-full border-[1.5px] border-ink bg-orange text-paper shadow-[0_3px_0_var(--ink)] hover:bg-[color:var(--orange-soft)]",
        secondary:
          "rounded-full border-[1.5px] border-ink bg-paper text-ink shadow-[0_3px_0_var(--ink)] hover:bg-[color:var(--bg-2)]",
        yellow:
          "rounded-full border-[1.5px] border-ink bg-yellow text-ink shadow-[0_3px_0_var(--ink)] hover:bg-[color:var(--yellow-soft)]",
        outline:
          "rounded-full border-[1.5px] border-ink bg-paper text-ink shadow-[0_3px_0_var(--ink)] hover:bg-[color:var(--bg-2)]",
        ghost:
          "rounded-full text-ink hover:bg-[color:var(--bg-2)] active:translate-y-0 active:shadow-none",
        destructive:
          "rounded-full border-[1.5px] border-ink bg-destructive text-paper shadow-[0_3px_0_var(--ink)]",
        link: "text-orange underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        default: "h-11 px-5 py-2 text-[14px]",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
