import { NextResponse } from "next/server";
import { isTable, listRows } from "../data";

export const dynamic = "force-dynamic";

const cell = (v: unknown) => {
  const s = typeof v === "object" && v !== null ? JSON.stringify(v) : String(v ?? "");
  // Prefix formula-like values so spreadsheets don't execute them (CSV injection).
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET(request: Request) {
  const table = new URL(request.url).searchParams.get("table") ?? "";
  if (!isTable(table)) return NextResponse.json({ error: "Unknown table" }, { status: 400 });
  const { rows } = await listRows(table, undefined, 5000);
  const cols = rows.length ? Object.keys(rows[0]) : ["id"];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => cell((r as Record<string, unknown>)[c])).join(","))].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${table}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
