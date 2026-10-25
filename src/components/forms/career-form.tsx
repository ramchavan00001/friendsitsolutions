"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { careerSchema, uploadRules, type CareerInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { ConsentCheckbox, Field, FormFooter, Honeypot, a11y } from "./fields";
import { FileInput, checkFiles } from "./file-input";
import { useI18n } from "@/i18n/provider";

const rule = uploadRules.career!;

export function CareerForm({ positions, defaultPosition }: { positions: string[]; defaultPosition?: string }) {
  const t = useI18n().t.forms;
  const [resume, setResume] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("career");
  const { register, handleSubmit, formState: { errors } } = useForm<CareerInput>({
    resolver: zodResolver(careerSchema),
    defaultValues: { position: defaultPosition ?? positions[0] },
  });

  const onSubmit = handleSubmit((v) => {
    const fe = resume.length ? checkFiles(resume, rule.maxBytes / 1024 / 1024, rule.types, t) : t.attachResume;
    setFileError(fe);
    if (fe) return;
    return submit(v, [{ field: rule.field, files: resume }]);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5" aria-label={t.jobApplication}>
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <Field id="a-position" label={t.position} required>
        <Select {...a11y("a-position")} {...register("position")}>
          {positions.map((p) => <option key={p}>{p}</option>)}
        </Select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="a-name" label={t.fullName} required error={errors.name?.message}>
          <Input autoComplete="name" {...a11y("a-name", errors.name?.message)} {...register("name")} />
        </Field>
        <Field id="a-email" label={t.email} required error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...a11y("a-email", errors.email?.message)} {...register("email")} />
        </Field>
        <Field id="a-phone" label={t.phone} required error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...a11y("a-phone", errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id="a-exp" label={t.experience} required error={errors.experience?.message}>
          <Input placeholder={t.experiencePh} {...a11y("a-exp", errors.experience?.message)} {...register("experience")} />
        </Field>
        <Field id="a-loc" label={t.location} required error={errors.currentLocation?.message}>
          <Input autoComplete="address-level2" {...a11y("a-loc", errors.currentLocation?.message)} {...register("currentLocation")} />
        </Field>
        <Field id="a-notice" label={t.notice}>
          <Input placeholder={t.noticePh} {...a11y("a-notice")} {...register("noticePeriod")} />
        </Field>
        <Field id="a-li" label={t.linkedin} error={errors.linkedin?.message}>
          <Input type="url" placeholder="https://linkedin.com/in/…" {...a11y("a-li", errors.linkedin?.message)} {...register("linkedin")} />
        </Field>
        <Field id="a-pf" label={t.portfolio} error={errors.portfolio?.message}>
          <Input type="url" placeholder="https://…" {...a11y("a-pf", errors.portfolio?.message)} {...register("portfolio")} />
        </Field>
      </div>
      <FileInput label={t.resume} required files={resume} onChange={(f) => { setResume(f); setFileError(null); }} accept=".pdf,.doc,.docx" maxFiles={1} maxMb={rule.maxBytes / 1024 / 1024} error={fileError} />
      <Field id="a-cover" label={t.whyJoin}>
        <Textarea rows={4} {...a11y("a-cover")} {...register("coverLetter")} />
      </Field>
      <ConsentCheckbox id="a-consent" registration={register("consent")} error={errors.consent?.message} />
      <FormFooter onToken={setToken} error={error} />
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? <><Loader2 className="animate-spin" /> {t.submitting}</> : <><Send /> {t.submitApplication}</>}
      </Button>
    </form>
  );
}
