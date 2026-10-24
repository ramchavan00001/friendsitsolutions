import "server-only";
import { getDb } from "@/lib/db";

export const adminTabs = [
  { key: "leads", label: "Leads" },
  { key: "quotes", label: "Quotes" },
  { key: "job_applications", label: "Applications" },
  { key: "support_tickets", label: "Tickets" },
  { key: "newsletter_subscribers", label: "Subscribers" },
] as const;

export type AdminTable = (typeof adminTabs)[number]["key"];
export const statuses = ["new", "contacted", "in_progress", "won", "lost", "closed"] as const;

export type Row = {
  id: string;
  created_at: string;
  reference?: string;
  name?: string;
  email: string;
  phone?: string | null;
  status?: string;
  details?: Record<string, unknown>;
  files?: string[];
};

export const isTable = (t: string | undefined): t is AdminTable => adminTabs.some((x) => x.key === t);

export async function listRows(table: AdminTable, q?: string, limit = 200) {
  const db = getDb();
  if (!db) return { rows: [] as Row[], configured: false };
  let query = db.from(table).select("*").order("created_at", { ascending: false }).limit(limit);
  if (q) {
    const term = q.replace(/[%,()]/g, " ").trim();
    query = table === "newsletter_subscribers" ? query.ilike("email", `%${term}%`) : query.or(`name.ilike.%${term}%,email.ilike.%${term}%,reference.ilike.%${term}%`);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return { rows: (data ?? []) as Row[], configured: true };
}

export async function counts() {
  const db = getDb();
  if (!db) return {} as Record<AdminTable, number>;
  const entries = await Promise.all(
    adminTabs.map(async (t) => {
      const { count } = await db.from(t.key).select("*", { count: "exact", head: true });
      return [t.key, count ?? 0] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<AdminTable, number>;
}
