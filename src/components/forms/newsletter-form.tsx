"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { Honeypot } from "./fields";
import { Turnstile } from "./turnstile";

export function NewsletterForm() {
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("newsletter", { redirect: false });
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-teal-200" role="status">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> You&apos;re subscribed — welcome aboard!
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (v) => {
        if (await submit(v)) reset();
      })}
      className="relative space-y-2"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={errors.email ? true : undefined}
          className="h-10 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-blue-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-10 items-center rounded-lg bg-brand-teal px-4 text-sm font-semibold text-slate-950 hover:bg-teal-400 disabled:opacity-60"
        >
          {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Subscribing" /> : "Subscribe"}
        </button>
      </div>
      <Turnstile onToken={setToken} />
      {(errors.email || error) && (
        <p role="alert" className="text-xs text-red-300">{errors.email?.message ?? error}</p>
      )}
    </form>
  );
}
