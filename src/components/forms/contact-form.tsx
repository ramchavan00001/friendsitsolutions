"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { ConsentCheckbox, Field, FormFooter, Honeypot, a11y } from "./fields";
import { useI18n } from "@/i18n/provider";

export function ContactForm({ services }: { services: { value: string; label: string }[] }) {
  const t = useI18n().t.forms;
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("contact");
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { source: "contact-page" },
  });

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative space-y-5" aria-label={t.howHelp}>
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label={t.fullName} required error={errors.name?.message}>
          <Input autoComplete="name" {...a11y("c-name", errors.name?.message)} {...register("name")} />
        </Field>
        <Field id="c-email" label={t.email} required error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...a11y("c-email", errors.email?.message)} {...register("email")} />
        </Field>
        <Field id="c-phone" label={t.phoneWhatsapp} error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...a11y("c-phone", errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id="c-company" label={t.company} error={errors.company?.message}>
          <Input autoComplete="organization" {...a11y("c-company")} {...register("company")} />
        </Field>
      </div>
      <Field id="c-service" label={t.interestedIn}>
        <Select {...a11y("c-service")} {...register("service")}>
          <option value="">{t.selectService}</option>
          {services.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          <option value="Something else">{t.somethingElse}</option>
        </Select>
      </Field>
      <Field id="c-message" label={t.howHelp} required error={errors.message?.message}>
        <Textarea rows={5} {...a11y("c-message", errors.message?.message)} {...register("message")} />
      </Field>
      <ConsentCheckbox id="c-consent" registration={register("consent")} error={errors.consent?.message} />
      <FormFooter onToken={setToken} error={error} />
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? <><Loader2 className="animate-spin" /> {t.sending}</> : <><Send /> {t.send}</>}
      </Button>
    </form>
  );
}
