import { Link } from "@/i18n/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { getT } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/request";
import { localizePath } from "@/i18n/config";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = getT().common;
  const locale = getLocale();
  const all = [{ name: t.home, path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all.map((c) => ({ ...c, path: localizePath(locale, c.path) })))} />
      <nav aria-label={t.breadcrumb} className="mb-8 text-sm font-light">
        <ol className="flex flex-wrap items-center gap-1 text-[#B9C7BE]">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-cream">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-gold">{c.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
