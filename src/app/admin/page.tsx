import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Download, Paperclip } from "lucide-react";
import { getDb, UPLOAD_BUCKET } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { adminTabs, counts, isTable, listRows, statuses, type AdminTable } from "./data";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Dashboard", robots: { index: false, follow: false } };

async function updateStatus(formData: FormData) {
  "use server";
  const table = String(formData.get("table"));
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!isTable(table) || table === "newsletter_subscribers" || !statuses.includes(status as (typeof statuses)[number])) return;
  await getDb()?.from(table).update({ status }).eq("id", id);
  revalidatePath("/admin");
}

async function signedUrl(path: string) {
  const { data } = (await getDb()?.storage.from(UPLOAD_BUCKET).createSignedUrl(path, 60 * 10)) ?? {};
  return data?.signedUrl;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string; q?: string }> }) {
  const { tab, q } = await searchParams;
  const table: AdminTable = isTable(tab) ? tab : "leads";
  const [{ rows, configured }, totals] = await Promise.all([listRows(table, q), counts()]);
  const rowsWithFiles = await Promise.all(
    rows.map(async (r) => ({ ...r, links: await Promise.all((r.files ?? []).map(async (p) => ({ name: p.split("/").pop()!, url: await signedUrl(p) }))) })),
  );

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
          <p className="text-sm text-muted-foreground">Leads, quotes, job applications, support tickets and subscribers.</p>
        </div>
        <Button asChild variant="outline"><a href={`/admin/export?table=${table}`}><Download /> Export CSV</a></Button>
      </div>

      {!configured && (
        <p className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
          Supabase isn&apos;t configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and run <code>supabase/schema.sql</code> to start storing submissions.
        </p>
      )}

      <nav aria-label="Admin sections" className="mb-6 flex flex-wrap gap-2">
        {adminTabs.map((t) => (
          <Link key={t.key} href={`/admin?tab=${t.key}`} aria-current={t.key === table ? "page" : undefined} className={cn("rounded-full border px-4 py-1.5 text-sm font-medium", t.key === table ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary")}>
            {t.label} {totals[t.key] !== undefined && <span className="ml-1 opacity-80">({totals[t.key]})</span>}
          </Link>
        ))}
      </nav>

      <form className="mb-6 flex max-w-md gap-2" role="search">
        <input type="hidden" name="tab" value={table} />
        <label htmlFor="admin-q" className="sr-only">Search</label>
        <input id="admin-q" name="q" defaultValue={q} placeholder="Search name, email or reference" className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm" />
        <Button type="submit">Search</Button>
      </form>

      <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3">Date</th>
              {table !== "newsletter_subscribers" && <th scope="col" className="px-4 py-3">Reference</th>}
              {table !== "newsletter_subscribers" && <th scope="col" className="px-4 py-3">Name</th>}
              <th scope="col" className="px-4 py-3">Contact</th>
              {table !== "newsletter_subscribers" && <th scope="col" className="px-4 py-3">Details</th>}
              {table !== "newsletter_subscribers" && <th scope="col" className="px-4 py-3">Status</th>}
            </tr>
          </thead>
          <tbody>
            {rowsWithFiles.map((r) => (
              <tr key={r.id} className="border-t align-top">
                <td className="whitespace-nowrap px-4 py-3">{formatDate(r.created_at)}</td>
                {table !== "newsletter_subscribers" && <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{r.reference}</td>}
                {table !== "newsletter_subscribers" && <td className="px-4 py-3 font-medium">{r.name}</td>}
                <td className="px-4 py-3">
                  <a href={`mailto:${r.email}`} className="block hover:underline">{r.email}</a>
                  {r.phone && <a href={`tel:${r.phone}`} className="block text-muted-foreground hover:underline">{r.phone}</a>}
                </td>
                {table !== "newsletter_subscribers" && (
                  <td className="max-w-md px-4 py-3">
                    <dl className="space-y-1 text-xs">
                      {Object.entries(r.details ?? {}).map(([k, v]) => (
                        <div key={k}><dt className="inline font-semibold">{k}: </dt><dd className="inline whitespace-pre-wrap text-muted-foreground">{Array.isArray(v) ? v.join(", ") : String(v ?? "").slice(0, 400)}</dd></div>
                      ))}
                    </dl>
                    {r.links.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {r.links.map((f) => <li key={f.name}><a href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline dark:text-accent"><Paperclip className="h-3 w-3" aria-hidden="true" />{f.name}</a></li>)}
                      </ul>
                    )}
                  </td>
                )}
                {table !== "newsletter_subscribers" && (
                  <td className="px-4 py-3">
                    <form action={updateStatus} className="flex gap-1">
                      <input type="hidden" name="table" value={table} />
                      <input type="hidden" name="id" value={r.id} />
                      <label htmlFor={`st-${r.id}`} className="sr-only">Status</label>
                      <select id={`st-${r.id}`} name="status" defaultValue={r.status ?? "new"} className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                        {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                      <Button type="submit" size="sm" variant="outline" className="h-8 px-2 text-xs">Save</Button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
