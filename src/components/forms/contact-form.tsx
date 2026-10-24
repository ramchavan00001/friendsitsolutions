"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/forms/schemas";
import { useFormSubmit } from "./use-form-submit";
import { ConsentCheckbox, Field, FormFooter, Honeypot, a11y } from "./fields";

export function ContactForm({ services }: { services: string[] }) {
  const { submit, status, error, setToken, honeypot, setHoneypot } = useFormSubmit("contact");
  const { register, handleSubmit, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { source: "contact-page" },
  });

  return (
    <form noValidate onSubmit={handleSubmit((v) => submit(v))} className="relative space-y-5" aria-label="Contact form">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Full name" required error={errors.name?.message}>
          <Input autoComplete="name" {...a11y("c-name", errors.name?.message)} {...register("name")} />
        </Field>
        <Field id="c-email" label="Email" required error={errors.email?.message}>
          <Input type="email" autoComplete="email" {...a11y("c-email", errors.email?.message)} {...register("email")} />
        </Field>
        <Field id="c-phone" label="Phone / WhatsApp" error={errors.phone?.message}>
          <Input type="tel" autoComplete="tel" {...a11y("c-phone", errors.phone?.message)} {...register("phone")} />
        </Field>
        <Field id="c-company" label="Company" error={errors.company?.message}>
          <Input autoComplete="organization" {...a11y("c-company")} {...register("company")} />
        </Field>
      </div>
      <Field id="c-service" label="I'm interested in">
        <Select {...a11y("c-service")} {...register("service")}>
          <option value="">Select a service (optional)</option>
          {services.map((s) => <option key={s}>{s}</option>)}
          <option>Something else</option>
        </Select>
      </Field>
      <Field id="c-message" label="How can we help?" required error={errors.message?.message}>
        <Textarea rows={5} {...a11y("c-message", errors.message?.message)} {...register("message")} />
      </Field>
      <ConsentCheckbox id="c-consent" registration={register("consent")} error={errors.consent?.message} />
      <FormFooter onToken={setToken} error={error} />
      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Send message</>}
      </Button>
    </form>
  );
}
