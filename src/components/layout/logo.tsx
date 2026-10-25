import { Link } from "@/i18n/link";
import { cn } from "@/lib/utils";

/**
 * Placeholder text logo — swap for the real logo (e.g. next/image of /logo.svg) when supplied.
 * `inverted` is for dark green surfaces (header, footer).
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 rounded-sm font-heading text-xl font-medium tracking-[0.02em]", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full border-[1.5px] text-sm",
          inverted ? "border-gold text-gold" : "border-gold-icon text-gold-dark dark:border-gold dark:text-gold",
        )}
      >
        F
      </span>
      <span className={cn("whitespace-nowrap", inverted ? "text-cream" : "text-deep dark:text-cream")}>
        FriendsIT<span className="hidden sm:inline"> Solutions</span>
        <span className="sr-only"> home</span>
      </span>
    </Link>
  );
}
