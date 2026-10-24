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

const rule = uploadRules.career!;

export function CareerForm({ positions, defaultPosition }: { positions: string[]; defaultPosition?: string }) {
  const [resume, setResume] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("career");
  const { register, handleSubmit, formState: { errors } } = useForm<CareerInput>({
    resolver: zodResolver(careerSchema),
    defaultValues: { position: defaultPosition ?? positions[0] },
  });

  const onSubmit = handleSubmit((v) => {
    const fe = resume.length ? checkFiles(resume, rule.maxBytes / 1024 / 1024, rule.types) : "Please attach your resume.";
    setFileError(fe);
    if (fe) return;
    return submit(v, [{ field: rule.field, files: resume }]);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5" aria-label="Job application">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <Field id="a-position" label="Position" required>
        <Select {...a11y("a-position")} {...register("position")}>
          {positions.map((p) => <option key={p}>{p}</option>)}
        </Select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="a-name" label="Full name" required error={errors.name?.message}>
          <Input autoComplete="name" {...a11y("a-name", errors.name?.message)} {...register("name")} />
        </Field>
        <Field id="a-email" label="Email" required error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...a11y("a-email", errors.email?.message)} {...register("email")} />
        </Field>
        <Field id="a-phone" label="Phone" required error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...a11y("a-phone", errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id="a-exp" label="Total experience" required error={errors.experience?.message}>
          <Input placeholder="e.g. 3 years" {...a11y("a-exp", errors.experience?.message)} {...register("experience")} />
        </Field>
        <Field id="a-loc" label="Current location" required error={errors.currentLocation?.message}>
          <Input autoComplete="address-level2" {...a11y("a-loc", errors.currentLocation?.message)} {...register("currentLocation")} />
        </Field>
        <Field id="a-notice" label="Notice period">
          <Input placeholder="e.g. 30 days" {...a11y("a-notice")} {...register("noticePeriod")} />
        </Field>
        <Field id="a-li" label="LinkedIn URL" error={errors.linkedin?.message}>
          <Input type="url" placeholder="https://linkedin.com/in/…" {...a11y("a-li", errors.linkedin?.message)} {...register("linkedin")} />
        </Field>
        <Field id="a-pf" label="Portfolio / GitHub URL" error={errors.portfolio?.message}>
          <Input type="url" placeholder="https://…" {...a11y("a-pf", errors.portfolio?.message)} {...register("portfolio")} />
        </Field>
      </div>
      <FileInput label="Resume (PDF or Word)" required files={resume} onChange={(f) => { setResume(f); setFileError(null); }} accept=".pdf,.doc,.docx" maxFiles={1} maxMb={rule.maxBytes / 1024 / 1024} error={fileError} />
      <Field id="a-cover" label="Why do you want to join us?">
        <Textarea rows={4} {...a11y("a-cover")} {...register("coverLetter")} />
      </Field>
      <ConsentCheckbox id="a-consent" registration={register("consent")} error={errors.consent?.message} />
      <FormFooter onToken={setToken} error={error} />
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? <><Loader2 className="animate-spin" /> Submitting…</> : <><Send /> Submit application</>}
      </Button>
    </form>
  );
}
