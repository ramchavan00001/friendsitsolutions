import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Server-side Supabase client using the service-role key (never expose it to the browser).
 * Returns null when Supabase isn't configured so the site still works in local dev.
 */
export function getDb() {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

export const tables = {
  contact: "leads",
  quote: "quotes",
  career: "job_applications",
  support: "support_tickets",
  newsletter: "newsletter_subscribers",
} as const;

export const UPLOAD_BUCKET = process.env.SUPABASE_UPLOAD_BUCKET ?? "uploads";
