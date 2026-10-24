"use client";

import { useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { budgetRanges, quoteSchema, timelines, uploadRules, type QuoteInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { ConsentCheckbox, Field, FormFooter, Honeypot, a11y } from "./fields";
import { FileInput, checkFiles } from "./file-input";
import { cn } from "@/lib/utils";

type Group = { label: string; services: { slug: string; title: string }[] };

const steps: { title: string; fields: FieldPath<QuoteInput>[] }[] = [
  { title: "Services", fields: ["services", "projectType"] },
  { title: "Project details", fields: ["description"] },
  { title: "Budget & timeline", fields: ["budget", "timeline"] },
  { title: "Your details", fields: ["name", "email", "phone", "company", "preferredContact", "consent"] },
];

const rule = uploadRules.quote!;

function OptionCard({ checked, children, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { checked: boolean }) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-3 rounded-sm border p-3.5 text-sm transition-colors", checked ? "border-primary bg-primary/5 ring-1 ring-primary dark:border-accent dark:ring-accent" : "hover:bg-secondary")}>
      <input className="h-4 w-4 accent-[#123A2C]" checked={checked} {...props} />
      <span className="font-medium">{children}</span>
    </label>
  );
}

export function QuoteForm({ groups, initialService }: { groups: Group[]; initialService?: string }) {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("quote");

  const initial = groups.flatMap((g) => g.services).find((s) => s.slug === initialService)?.title;
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: initial ? [initial] : [], projectType: "New project", preferredContact: "WhatsApp" },
    mode: "onTouched",
  });
  const values = watch();

  const goTo = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  const next = async () => {
    if (await trigger(steps[step].fields)) goTo(step + 1);
  };

  const onSubmit = handleSubmit((v) => {
    const fe = checkFiles(files, rule.maxBytes / 1024 / 1024, rule.types);
    setFileError(fe);
    if (fe) return goTo(1);
    return submit(v, [{ field: rule.field, files }]);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative" aria-label="Get a free quote">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {/* Progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full", i <= step ? "bg-gold" : "bg-secondary")} />
            <span className={cn("mt-2 hidden text-xs font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
              {i < step && <Check className="mr-1 inline h-3 w-3" aria-hidden="true" />}
              {i + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-2xl font-light outline-none">
        Step {step + 1} of {steps.length}: {steps[step].title}
      </h2>

      {step === 0 && (
        <fieldset className="space-y-6">
          <legend className="sr-only">Which services do you need?</legend>
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">{g.label}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {g.services.map((s) => (
                  <OptionCard key={s.slug} type="checkbox" value={s.title} checked={values.services?.includes(s.title) ?? false} {...register("services")}>
                    {s.title}
                  </OptionCard>
                ))}
              </div>
            </div>
          ))}
          {errors.services && <p role="alert" className="text-sm font-medium text-destructive">{errors.services.message}</p>}
          <div>
            <p className="mb-3 text-sm font-semibold">What best describes your project?</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {(["New project", "Improve existing", "Ongoing support", "Consultation"] as const).map((t) => (
                <OptionCard key={t} type="radio" value={t} checked={values.projectType === t} {...register("projectType")}>{t}</OptionCard>
              ))}
            </div>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <Field id="q-desc" label="Tell us about your project" required error={errors.description?.message} hint="Goals, key features, current setup, users, integrations — anything that helps us understand.">
            <Textarea rows={7} {...a11y("q-desc", errors.description?.message)} {...register("description")} />
          </Field>
          <FileInput
            label="Attachments (optional)"
            files={files}
            onChange={(f) => { setFiles(f); setFileError(checkFiles(f, rule.maxBytes / 1024 / 1024, rule.types)); }}
            accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.zip"
            maxFiles={rule.maxFiles}
            maxMb={rule.maxBytes / 1024 / 1024}
            error={fileError}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">Estimated budget <span className="text-destructive" aria-hidden="true">*</span></legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {budgetRanges.map((b) => <OptionCard key={b} type="radio" value={b} checked={values.budget === b} {...register("budget")}>{b}</OptionCard>)}
            </div>
            {errors.budget && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.budget.message}</p>}
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">Desired timeline <span className="text-destructive" aria-hidden="true">*</span></legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {timelines.map((t) => <OptionCard key={t} type="radio" value={t} checked={values.timeline === t} {...register("timeline")}>{t}</OptionCard>)}
            </div>
            {errors.timeline && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.timeline.message}</p>}
          </fieldset>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="q-name" label="Full name" required error={errors.name?.message}>
              <Input autoComplete="name" {...a11y("q-name", errors.name?.message)} {...register("name")} />
            </Field>
            <Field id="q-email" label="Email" required error={errors.email?.message}>
              <Input type="email" autoComplete="email" {...a11y("q-email", errors.email?.message)} {...register("email")} />
            </Field>
            <Field id="q-phone" label="Phone / WhatsApp" required error={errors.phone?.message}>
              <Input type="tel" autoComplete="tel" {...a11y("q-phone", errors.phone?.message)} {...register("phone")} />
            </Field>
            <Field id="q-company" label="Company / organisation">
              <Input autoComplete="organization" {...a11y("q-company")} {...register("company")} />
            </Field>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">Preferred way to contact you</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(["Email", "Phone", "WhatsApp"] as const).map((c) => <OptionCard key={c} type="radio" value={c} checked={values.preferredContact === c} {...register("preferredContact")}>{c}</OptionCard>)}
            </div>
          </fieldset>
          <ConsentCheckbox id="q-consent" registration={register("consent")} error={errors.consent?.message} />
          <FormFooter onToken={setToken} error={error} />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
        <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} disabled={step === 0}>
          <ArrowLeft /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>Continue <ArrowRight /></Button>
        ) : (
          <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? <><Loader2 className="animate-spin" /> Submitting…</> : <>Get my free quote <ArrowRight /></>}
          </Button>
        )}
      </div>
    </form>
  );
}
