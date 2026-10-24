"use client";
import { useState } from "react";
import { ServiceCard } from "./cards";
import type { MenuGroup } from "@/components/layout/header";
import { cn } from "@/lib/utils";

/** Accessible tabbed grid of services grouped by category. */
export function ServicesTabs({ groups }: { groups: (MenuGroup & { description: string })[] }) {
  const [active, setActive] = useState(0);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (i + dir + groups.length) % groups.length;
    setActive(next);
    document.getElementById(`svc-tab-${next}`)?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label="Service categories" className="mb-8 flex flex-wrap justify-center gap-2">
        {groups.map((g, i) => (
          <button
            key={g.key}
            id={`svc-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`svc-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={(e) => onKey(e, i)}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              active === i ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
      {groups.map((g, i) => (
        <div key={g.key} id={`svc-panel-${i}`} role="tabpanel" aria-labelledby={`svc-tab-${i}`} hidden={active !== i}>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">{g.description}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.services.map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
