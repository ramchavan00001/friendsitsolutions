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
import { useErrorText, useI18n } from "@/i18n/provider";
import { fmt } from "@/i18n/format";

/** `title` is the English name (submitted value); `label` is shown in the visitor's language. */
type Group = { label: string; services: { slug: string; title: string; label: string }[] };

const stepFields: FieldPath<QuoteInput>[][] = [
  ["services", "projectType"],
  ["description"],
  ["budget", "timeline"],
  ["name", "email", "phone", "company", "preferredContact", "consent"],
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
  const { t: ui } = useI18n();
  const t = ui.forms;
  const te = useErrorText();
  const steps = t.steps.map((title, i) => ({ title, fields: stepFields[i] }));
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
    const fe = checkFiles(files, rule.maxBytes / 1024 / 1024, rule.types, t);
    setFileError(fe);
    if (fe) return goTo(1);
    return submit(v, [{ field: rule.field, files }]);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative" aria-label={t.quoteLabel}>
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {/* Progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label={t.progress}>
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
        {fmt(t.stepOf, { n: step + 1, total: steps.length, title: steps[step].title })}
      </h2>

      {step === 0 && (
        <fieldset className="space-y-6">
          <legend className="sr-only">{t.whichServices}</legend>
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">{g.label}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {g.services.map((s) => (
                  <OptionCard key={s.slug} type="checkbox" value={s.title} checked={values.services?.includes(s.title) ?? false} {...register("services")}>
                    {s.label}
                  </OptionCard>
                ))}
              </div>
            </div>
          ))}
          {errors.services && <p role="alert" className="text-sm font-medium text-destructive">{te(errors.services.message)}</p>}
          <div>
            <p className="mb-3 text-sm font-semibold">{t.projectType}</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {(["New project", "Improve existing", "Ongoing support", "Consultation"] as const).map((pt) => (
                <OptionCard key={pt} type="radio" value={pt} checked={values.projectType === pt} {...register("projectType")}>{t.projectTypes[pt]}</OptionCard>
              ))}
            </div>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <Field id="q-desc" label={t.describeProject} required error={errors.description?.message} hint={t.describeHint}>
            <Textarea rows={7} {...a11y("q-desc", errors.description?.message)} {...register("description")} />
          </Field>
          <FileInput
            label={t.attachments}
            files={files}
            onChange={(f) => { setFiles(f); setFileError(checkFiles(f, rule.maxBytes / 1024 / 1024, rule.types, t)); }}
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
            <legend className="mb-3 text-sm font-semibold">{t.budget} <span className="text-destructive" aria-hidden="true">*</span></legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {budgetRanges.map((b) => <OptionCard key={b} type="radio" value={b} checked={values.budget === b} {...register("budget")}>{t.budgets[b]}</OptionCard>)}
            </div>
            {errors.budget && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{te(errors.budget.message)}</p>}
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">{t.timeline} <span className="text-destructive" aria-hidden="true">*</span></legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {timelines.map((tl) => <OptionCard key={tl} type="radio" value={tl} checked={values.timeline === tl} {...register("timeline")}>{t.timelines[tl]}</OptionCard>)}
            </div>
            {errors.timeline && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{te(errors.timeline.message)}</p>}
          </fieldset>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="q-name" label={t.fullName} required error={errors.name?.message}>
              <Input autoComplete="name" {...a11y("q-name", errors.name?.message)} {...register("name")} />
            </Field>
            <Field id="q-email" label={t.email} required error={errors.email?.message}>
              <Input type="email" autoComplete="email" {...a11y("q-email", errors.email?.message)} {...register("email")} />
            </Field>
            <Field id="q-phone" label={t.phoneWhatsapp} required error={errors.phone?.message}>
              <Input type="tel" autoComplete="tel" {...a11y("q-phone", errors.phone?.message)} {...register("phone")} />
            </Field>
            <Field id="q-company" label={t.companyOrg}>
              <Input autoComplete="organization" {...a11y("q-company")} {...register("company")} />
            </Field>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold">{t.preferredContact}</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {(["Email", "Phone", "WhatsApp"] as const).map((c) => <OptionCard key={c} type="radio" value={c} checked={values.preferredContact === c} {...register("preferredContact")}>{t.contactMethods[c]}</OptionCard>)}
            </div>
          </fieldset>
          <ConsentCheckbox id="q-consent" registration={register("consent")} error={errors.consent?.message} />
          <FormFooter onToken={setToken} error={error} />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3 border-t pt-6">
        <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} disabled={step === 0}>
          <ArrowLeft /> {t.back}
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>{t.continue} <ArrowRight /></Button>
        ) : (
          <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? <><Loader2 className="animate-spin" /> {t.submitting}</> : <>{t.submitQuote} <ArrowRight /></>}
          </Button>
        )}
      </div>
    </form>
  );
}
