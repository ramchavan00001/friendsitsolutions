import "server-only";
import { serviceCategories, services as baseServices } from "@/content/services";
import { industries as baseIndustries } from "@/content/company";
import { engagementModels } from "@/content/misc";
import type { Service, ServiceCategory } from "@/content/types";
import { getT } from "./dictionaries";

/** Service with translated title and summary (long-form fields stay in English). */
export function localizeService<T extends Pick<Service, "slug" | "title" | "summary">>(s: T): T {
  const tr = getT().content.services[s.slug];
  return tr ? { ...s, title: tr.title, summary: tr.summary } : s;
}

export const localizedServices = () => baseServices.map(localizeService);

export function categoryLabel(key: ServiceCategory) {
  return getT().content.categories[key];
}

export function localizedServicesByCategory() {
  const t = getT();
  return (Object.keys(serviceCategories) as ServiceCategory[]).map((key) => ({
    key,
    ...serviceCategories[key],
    label: t.content.categories[key].label,
    description: t.content.categories[key].description,
    services: baseServices.filter((s) => s.category === key).map(localizeService),
  }));
}

export function localizedIndustries() {
  const tr = getT().content.industries;
  return baseIndustries.map((i) => ({ ...i, name: tr[i.slug]?.name ?? i.name, description: tr[i.slug]?.description ?? i.description }));
}

export function localizedEngagementModels() {
  const tr = getT().content.engagement;
  return engagementModels.map((m, i) => ({
    ...m,
    ...tr[i],
    featured: "featured" in m && m.featured === true,
  }));
}
