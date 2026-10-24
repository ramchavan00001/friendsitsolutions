import "server-only";
import { NextResponse } from "next/server";
import { formSchemas, uploadRules, type FormType } from "./schemas";
import { sanitize } from "./sanitize";
import { clientIp, rateLimit } from "./rate-limit";
import { verifyTurnstile } from "./turnstile";
import { getDb, tables, UPLOAD_BUCKET } from "@/lib/db";
import { adminEmail, adminRecipients, autoReplyEmail, sendEmail } from "@/lib/email";

const prefixes: Record<FormType, string> = { contact: "LEAD", quote: "QT", career: "APP", support: "TKT", newsletter: "NL" };

const reference = (type: FormType) =>
  `${prefixes[type]}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

const fail = (status: number, error: string, issues?: unknown) => NextResponse.json({ ok: false, error, issues }, { status });

/**
 * Shared pipeline for every form: rate limit → honeypot → Turnstile → Zod validation →
 * sanitisation → file checks → store in Supabase → admin email + client auto-reply.
 *
 * The client sends multipart/form-data with a JSON `payload` field, a `turnstileToken`,
 * a `website` honeypot and optional files.
 */
export async function handleForm(request: Request, type: FormType) {
  const ip = clientIp(request.headers);
  if (!rateLimit(`${type}:${ip}`, type === "newsletter" ? 3 : 5, 60_000).ok) {
    return fail(429, "Too many submissions. Please wait a minute and try again.");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Invalid form submission.");
  }

  // Bots fill every field; humans never see this one.
  if (form.get("website")) return NextResponse.json({ ok: true, reference: reference(type) });

  if (!(await verifyTurnstile(form.get("turnstileToken")?.toString() ?? null, ip))) {
    return fail(400, "Spam check failed. Please refresh the page and try again.");
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("payload") ?? "{}"));
  } catch {
    return fail(400, "Invalid form data.");
  }
  const parsed = formSchemas[type].safeParse(sanitize(raw));
  if (!parsed.success) return fail(422, "Please check the highlighted fields.", parsed.error.flatten().fieldErrors);
  const data = parsed.data as Record<string, unknown>;

  // Files
  const rule = uploadRules[type];
  const files = rule ? form.getAll(rule.field).filter((f): f is File => f instanceof File && f.size > 0) : [];
  if (rule) {
    if (files.length > rule.maxFiles) return fail(400, `You can upload up to ${rule.maxFiles} file(s).`);
    for (const f of files) {
      if (f.size > rule.maxBytes) return fail(400, `${f.name} is larger than ${rule.maxBytes / 1024 / 1024} MB.`);
      if (!rule.types.includes(f.type)) return fail(400, `${f.name} is not an allowed file type.`);
    }
    if (type === "career" && files.length === 0) return fail(400, "Please attach your resume.");
  }

  const ref = reference(type);
  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await f.arrayBuffer()), type: f.type })),
  );

  const db = getDb();
  if (db) {
    const paths: string[] = [];
    for (const a of attachments) {
      const path = `${type}/${ref}/${a.filename}`;
      const { error } = await db.storage.from(UPLOAD_BUCKET).upload(path, a.content, { contentType: a.type, upsert: false });
      if (!error) paths.push(path);
      else console.error("[forms] upload failed", error.message);
    }
    const { name, email, phone, consent, ...details } = data;
    const row: Record<string, unknown> =
      type === "newsletter"
        ? { email, source: "website" }
        : { reference: ref, name, email, phone: phone || null, details, files: paths, consent_at: consent ? new Date().toISOString() : null, ip_hash: await hashIp(ip) };
    const { error } = await db.from(tables[type]).upsert(row, type === "newsletter" ? { onConflict: "email", ignoreDuplicates: true } : undefined);
    if (error) {
      console.error("[forms] db insert failed", error.message);
      return fail(500, "We couldn't save your submission. Please try again or contact us directly.");
    }
  } else {
    console.info(`[forms:dev] ${type} ${ref}`, data, attachments.map((a) => a.filename));
  }

  // Emails are best-effort: a mail outage shouldn't lose a lead that was already stored.
  const admin = adminEmail(type, ref, data);
  const reply = autoReplyEmail(type, String(data.name ?? ""), ref);
  const results = await Promise.allSettled([
    sendEmail({ to: adminRecipients, subject: admin.subject, html: admin.html, replyTo: String(data.email), attachments: attachments.map(({ filename, content }) => ({ filename, content })) }),
    sendEmail({ to: String(data.email), subject: reply.subject, html: reply.html }),
  ]);
  for (const r of results) if (r.status === "rejected") console.error("[forms] email failed", r.reason);

  return NextResponse.json({ ok: true, reference: ref });
}

/** Store a salted hash rather than the raw IP (data minimisation under the DPDP Act). */
async function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "fit";
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ip));
  return Buffer.from(buf).toString("hex").slice(0, 32);
}
