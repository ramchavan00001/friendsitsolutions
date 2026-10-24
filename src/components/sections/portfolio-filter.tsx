"use client";
import { useMemo, useState } from "react";
import { CaseStudyCard } from "./cards";
import { Select } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CaseStudy } from "@/content/types";

export function PortfolioFilter({
  items,
  services,
  industries,
  initialIndustry = "",
  initialService = "",
}: {
  items: CaseStudy[];
  services: { slug: string; title: string }[];
  industries: string[];
  initialIndustry?: string;
  initialService?: string;
}) {
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
      <div className="mb-10 grid gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:grid-cols-3 sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="filter-service">Service</Label>
          <Select id="filter-service" value={service} onChange={(e) => { setService(e.target.value); sync("service", e.target.value); }}>
            <option value="">All services</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="filter-industry">Industry</Label>
          <Select id="filter-industry" value={industry} onChange={(e) => { setIndustry(e.target.value); sync("industry", e.target.value); }}>
            <option value="">All industries</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </Select>
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {items.length} case studies
          {(industry || service) && (
            <button type="button" className="ml-2 font-semibold text-primary underline dark:text-accent" onClick={() => { setIndustry(""); setService(""); sync("industry", ""); sync("service", ""); }}>
              Clear
            </button>
          )}
        </p>
      </div>
      {filtered.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cs) => <CaseStudyCard key={cs.slug} cs={cs} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No case studies match these filters yet — but we&apos;ve likely done similar work. Ask us for relevant examples!
        </p>
      )}
    </div>
  );
}
