import { Languages } from "lucide-react";
import { getT } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/request";
import { cn } from "@/lib/utils";

/** Shown on non-English pages whose long-form content has not been translated yet. */
export function EnglishOnlyNote({ className }: { className?: string }) {
  if (getLocale() === "en") return null;
  return (
    <div className={cn("container", className)}>
      <p lang={getLocale()} className="mt-8 flex items-center gap-3 border-l-2 border-gold bg-secondary px-4 py-3 text-sm font-light">
        <Languages className="h-4 w-4 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />
        {getT().common.englishOnly}
      </p>
    </div>
  );
}
