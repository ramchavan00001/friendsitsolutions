import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";
import { escapeHtml } from "./forms/sanitize";

type Attachment = { filename: string; content: Buffer };

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = process.env.EMAIL_FROM ?? `${site.name} <no-reply@friendsitsolutions.com>`;
export const adminRecipients = (process.env.ADMIN_EMAIL ?? site.email).split(",").map((e) => e.trim());

export async function sendEmail(opts: { to: string | string[]; subject: string; html: string; replyTo?: string; attachments?: Attachment[] }) {
  if (!resend) {
    console.info(`[email:dev] To: ${opts.to} | ${opts.subject}`);
    return;
  }
  const { error } = await resend.emails.send({ from, ...opts });
  if (error) throw new Error(`Email failed: ${error.message}`);
}

const layout = (body: string) => `
<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0B2A20">
  <div style="background:#123A2C;padding:20px 24px">
    <span style="color:#F4F1E8;font-size:20px;font-weight:500;letter-spacing:.02em">FriendsIT <span style="color:#C9A24B">Solutions</span></span>
  </div>
  <div style="border:1px solid #C4D6C8;border-top:3px solid #C9A24B;padding:24px;background:#FBF9F4">${body}</div>
  <p style="font-size:12px;color:#4C6458;text-align:center;margin-top:16px">
    ${escapeHtml(site.name)} · ${escapeHtml(site.city)}, ${escapeHtml(site.country)} · ${escapeHtml(site.phone)}
  </p>
</div>`;

const labels: Record<string, string> = {
  contact: "New contact enquiry",
  quote: "New quote request",
  career: "New job application",
  support: "New support ticket",
  newsletter: "New newsletter subscriber",
};

export function adminEmail(type: string, reference: string, data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .filter(([k]) => k !== "consent")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 8px;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 8px;white-space:pre-wrap">${escapeHtml(Array.isArray(v) ? v.join(", ") : v)}</td></tr>`,
    )
    .join("");
  return {
    subject: `${labels[type] ?? "New submission"} · ${reference}`,
    html: layout(`<h2 style="margin-top:0">${escapeHtml(labels[type])}</h2><p>Reference: <b>${escapeHtml(reference)}</b></p><table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>`),
  };
}

const replies: Record<string, (name: string, ref: string) => { subject: string; body: string }> = {
  contact: (name, ref) => ({
    subject: `Thanks for contacting ${site.name}`,
    body: `<p>Hi ${name},</p><p>Thanks for reaching out! A member of our team will get back to you within one business day.</p><p>Your reference number is <b>${ref}</b>.</p>`,
  }),
  quote: (name, ref) => ({
    subject: `We've received your quote request (${ref})`,
    body: `<p>Hi ${name},</p><p>Thank you for your quote request. Our solutions team is reviewing your requirements and will contact you within 24 hours to schedule a free consultation. You'll receive a detailed, itemised proposal shortly after.</p><p>Reference: <b>${ref}</b></p>`,
  }),
  career: (name, ref) => ({
    subject: `Application received — ${site.name}`,
    body: `<p>Hi ${name},</p><p>Thanks for applying to ${site.name}! Our hiring team reviews every application and will get in touch if your profile matches the role — usually within 7 working days.</p><p>Application ID: <b>${ref}</b></p>`,
  }),
  support: (name, ref) => ({
    subject: `Support ticket ${ref} created`,
    body: `<p>Hi ${name},</p><p>We've logged your support ticket <b>${ref}</b>. An engineer will respond according to your SLA. For critical issues, please also call us on ${escapeHtml(site.phone)}.</p>`,
  }),
  newsletter: () => ({
    subject: `Welcome to the ${site.name} newsletter`,
    body: `<p>Hi there,</p><p>Thanks for subscribing! Expect practical tech tips, security alerts and the occasional case study — no spam, ever. You can unsubscribe at any time by replying to this email.</p>`,
  }),
};

export function autoReplyEmail(type: string, name: string, reference: string) {
  const r = (replies[type] ?? replies.contact)(escapeHtml(name || "there"), escapeHtml(reference));
  return {
    subject: r.subject,
    html: layout(`${r.body}<p>Warm regards,<br/>Team ${escapeHtml(site.name)}<br/><i>${escapeHtml(site.tagline)}</i></p>`),
  };
}
