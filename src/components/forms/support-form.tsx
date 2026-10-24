"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LifeBuoy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { supportSchema, uploadRules, type SupportInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { ConsentCheckbox, Field, FormFooter, Honeypot, a11y } from "./fields";
import { FileInput, checkFiles } from "./file-input";

const rule = uploadRules.support!;
const categories = supportSchema.shape.category.options;
const priorities = supportSchema.shape.priority.options;

export function SupportForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("support");
  const { register, handleSubmit, formState: { errors } } = useForm<SupportInput>({
    resolver: zodResolver(supportSchema),
    defaultValues: { priority: "Normal", category: "Other" },
  });

  const onSubmit = handleSubmit((v) => {
    const fe = checkFiles(files, rule.maxBytes / 1024 / 1024, rule.types);
    setFileError(fe);
    if (fe) return;
    return submit(v, [{ field: rule.field, files }]);
  });

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5" aria-label="Support ticket">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="s-name" label="Full name" required error={errors.name?.message}>
          <Input autoComplete="name" {...a11y("s-name", errors.name?.message)} {...register("name")} />
        </Field>
        <Field id="s-email" label="Email" required error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...a11y("s-email", errors.email?.message)} {...register("email")} />
        </Field>
        <Field id="s-phone" label="Phone" error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...a11y("s-phone", errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id="s-company" label="Company">
          <Input autoComplete="organization" {...a11y("s-company")} {...register("company")} />
        </Field>
        <Field id="s-cat" label="Category" required>
          <Select {...a11y("s-cat")} {...register("category")}>{categories.map((c) => <option key={c}>{c}</option>)}</Select>
        </Field>
        <Field id="s-pri" label="Priority" required hint="Critical = business stopped. Please also call us.">
          <Select {...a11y("s-pri")} {...register("priority")}>{priorities.map((p) => <option key={p}>{p}</option>)}</Select>
        </Field>
      </div>
      <Field id="s-subject" label="Subject" required error={errors.subject?.message}>
        <Input {...a11y("s-subject", errors.subject?.message)} {...register("subject")} />
      </Field>
      <Field id="s-desc" label="Describe the issue" required error={errors.description?.message} hint="What happened, when it started, error messages and what you've tried.">
        <Textarea rows={6} {...a11y("s-desc", errors.description?.message)} {...register("description")} />
      </Field>
      <FileInput label="Screenshots / logs (optional)" files={files} onChange={setFiles} accept=".pdf,.png,.jpg,.jpeg,.webp,.txt" maxFiles={rule.maxFiles} maxMb={rule.maxBytes / 1024 / 1024} error={fileError} />
      <ConsentCheckbox id="s-consent" registration={register("consent")} error={errors.consent?.message} />
      <FormFooter onToken={setToken} error={error} />
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? <><Loader2 className="animate-spin" /> Creating ticket…</> : <><LifeBuoy /> Create ticket</>}
      </Button>
    </form>
  );
}
