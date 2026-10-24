"use client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Turnstile } from "./turnstile";
import Link from "next/link";
import type { UseFormRegisterReturn } from "react-hook-form";

export function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive" aria-hidden="true"> *</span>}
      </Label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria props that link an input to its error message. */
export const a11y = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

/** Hidden field that only bots fill in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function ConsentCheckbox({ registration, error, id = "consent" }: { registration: UseFormRegisterReturn; error?: string; id?: string }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input accent-[#14B8A6]" {...a11y(id, error)} {...registration} />
        <span>
          I agree to the <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link> and consent to
          FriendsITSolutions processing my details to respond to this request.
        </span>
      </label>
      {error && <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function FormFooter({ onToken, error }: { onToken: (t: string | null) => void; error: string | null }) {
  return (
    <>
      <Turnstile onToken={onToken} />
      {error && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
    </>
  );
}
