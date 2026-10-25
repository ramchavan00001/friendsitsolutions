"use client";
import { useMemo, useState } from "react";
import { CaseStudyCardView } from "./case-study-card";
import { Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CaseStudy } from "@/content/types";
import { useI18n } from "@/i18n/provider";
import { fmt } from "@/i18n/format";

export function PortfolioFilter({
  items,
  services,
  industries,
  initialIndustry = "",
  initialService = "",
  cardLabel,
}: {
  items: CaseStudy[];
  services: { slug: string; title: string }[];
  industries: string[];
  initialIndustry?: string;
  initialService?: string;
  cardLabel: string;
}) {
  const t = useI18n().t.portfolio;
  const [industry, setIndustry] = useState(initialIndustry);
  const [service, setService] = useState(initialService);

  const filtered = useMemo(
    () => items.filter((c) => (!industry || c.industry === industry) && (!service || c.services.includes(service))),
    [items, industry, service],
  );

  const sync = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <div className="mb-10 grid gap-4 rounded-sm border bg-card p-5 sm:grid-cols-3 sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="filter-service">{t.service}</Label>
          <Select id="filter-service" value={service} onChange={(e) => { setService(e.target.value); sync("service", e.target.value); }}>
            <option value="">{t.allServices}</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="filter-industry">{t.industry}</Label>
          <Select id="filter-industry" value={industry} onChange={(e) => { setIndustry(e.target.value); sync("industry", e.target.value); }}>
            <option value="">{t.allIndustries}</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </Select>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {fmt(t.showing, { n: filtered.length, total: items.length })}
          {(industry || service) && (
            <button type="button" className="ml-2 font-semibold text-primary underline dark:text-accent" onClick={() => { setIndustry(""); setService(""); sync("industry", ""); sync("service", ""); }}>
              {t.clear}
            </button>
          )}
        </p>
      </div>
      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => <CaseStudyCardView key={cs.slug} cs={cs} label={cardLabel} />)}
        </div>
      ) : (
        <p className="rounded-sm border border-dashed p-10 text-center text-muted-foreground">
          {t.empty}
        </p>
      )}
    </div>
  );
}
