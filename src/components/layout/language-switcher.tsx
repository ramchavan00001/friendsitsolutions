"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { LOCALE_COOKIE, localeNames, locales, localizePath, stripLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/** Language menu: native names, keeps the current page, remembers the choice in a cookie. */
export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "sheet" }) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const hrefFor = (l: Locale) => localizePath(l, stripLocale(pathname));
  const remember = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  const list = (
    <ul className={cn(variant === "header" ? "py-2" : "grid grid-cols-2 gap-1")} aria-label={t.header.chooseLanguage}>
      {locales.map((l) => (
        <li key={l}>
          <a
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            onClick={() => remember(l)}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "flex items-center justify-between gap-3 rounded-sm px-4 py-2 text-sm hover:bg-secondary",
              l === locale && "text-gold-dark dark:text-gold",
            )}
          >
            <span>{localeNames[l].native}</span>
            {l === locale && <Check className="h-4 w-4" aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "sheet") {
    return (
      <div>
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold">{t.header.language}</p>
        {list}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-sm px-2.5 text-sm text-cream hover:bg-cream/10 hover:text-gold"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {/* Visible code stays part of the accessible name (WCAG 2.5.3). */}
        <span className="uppercase tracking-wider">{locale}</span>
        <span className="sr-only">, {t.header.language}: {localeNames[locale].native}</span>
      </button>
      {open && <div className="absolute right-0 top-full z-50 mt-2 min-w-48 border bg-card text-foreground shadow-2xl">{list}</div>}
    </div>
  );
}
