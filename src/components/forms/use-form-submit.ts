"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormType } from "@/lib/forms/schemas";

type Options = { redirect?: boolean };

/** Posts a validated form (plus files, honeypot and Turnstile token) to /api/forms/[type]. */
export function useFormSubmit(type: FormType, { redirect = true }: Options = {}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  async function submit(payload: unknown, files: { field: string; files: File[] }[] = []) {
    setStatus("submitting");
    setError(null);
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    body.set("website", honeypot);
    if (token) body.set("turnstileToken", token);
    for (const group of files) for (const f of group.files) body.append(group.field, f);
    try {
      const res = await fetch(`/api/forms/${type}`, { method: "POST", body });
      const data = (await res.json()) as { ok: boolean; error?: string; reference?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus("success");
      if (redirect) router.push(`/thank-you?type=${type}&ref=${encodeURIComponent(data.reference ?? "")}`);
      return data;
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      return null;
    }
  }

  return { submit, status, error, setToken, honeypot, setHoneypot };
}
