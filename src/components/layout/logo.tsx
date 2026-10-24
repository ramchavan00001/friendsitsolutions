import Link from "next/link";
import { cn } from "@/lib/utils";

/** Placeholder text logo — swap for the real logo (e.g. next/image of /logo.svg) when supplied. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 rounded-md font-heading text-xl font-bold", className)}>
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal text-sm font-extrabold text-white shadow-sm">
        F
      </span>
      <span className={cn(inverted ? "text-white" : "text-brand-blue dark:text-white")}>
        Friends<span className={inverted ? "text-brand-teal" : "text-teal-600 dark:text-brand-teal"}>IT</span>
        <span className="hidden font-semibold sm:inline">Solutions</span>
        <span className="sr-only"> home</span>
      </span>
    </Link>
  );
}
