import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors", {
  variants: {
    variant: {
      default: "border-transparent bg-sage text-forest dark:bg-forest dark:text-gold",
      accent: "border-transparent bg-gold/20 text-gold-dark dark:text-gold",
      outline: "text-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
