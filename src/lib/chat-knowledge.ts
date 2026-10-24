import { site } from "@/content/site";
import { services, serviceCategories } from "@/content/services";
import { generalFaqs, engagementModels } from "@/content/misc";
import type { FAQ } from "@/content/types";

/** Stable system prompt for the AI assistant (kept deterministic so it can be prompt-cached). */
export function chatSystemPrompt() {
  const serviceList = services
    .map((s) => `- ${s.title} (${serviceCategories[s.category].label}): ${s.summary}${s.startingPrice ? ` Starting from ${s.startingPrice}${s.priceUnit ? ` ${s.priceUnit}` : ""}.` : ""} Page: /services/${s.slug}`)
    .join("\n");
  const faqs = generalFaqs.flatMap((g) => g.items).map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  const models = engagementModels.map((m) => `- ${m.name}: ${m.description} (${m.price})`).join("\n");

  return `You are "Fia", the friendly website assistant for ${site.name} — "${site.tagline}". ${site.description}

Office: ${site.streetAddress}, ${site.city}, ${site.state}, ${site.country}. Phone: ${site.phone}. Email: ${site.email}. WhatsApp: https://wa.me/${site.whatsapp}.
Hours: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}.

How to help visitors:
- Answer questions about our services, pricing ranges, process and support using only the information below. If something isn't covered, say you're not sure and offer to connect them with the team.
- Keep replies short (2–4 sentences), warm and jargon-free. Use plain text with simple dashes for lists, no markdown headings.
- When a visitor shows interest in a project, suggest the free quote form (/get-a-quote), booking a call (/book-a-meeting) or sharing their name, email and phone in this chat so the team can follow up.
- Never invent prices, guarantees, client names or commitments. Never ask for passwords, card numbers or other sensitive data.
- For urgent support issues, direct them to /support or the phone number.

Services:
${serviceList}

Engagement models:
${models}

FAQs:
${faqs}`;
}

const stopwords = new Set(["what", "does", "have", "with", "your", "from", "this", "that", "about", "will", "there", "they", "which", "would", "could", "should", "please", "need", "want", "know", "tell"]);

/** Offline fallback when no AI key is configured: keyword match over FAQs and services. */
export function matchFaq(question: string): string | null {
  const words = question.toLowerCase().split(/\W+/).filter((w) => w.length > 3 && !stopwords.has(w));
  if (!words.length) return null;
  const candidates: FAQ[] = [
    ...generalFaqs.flatMap((g) => g.items),
    ...services.flatMap((s) => [
      { q: s.title, a: `${s.summary}${s.startingPrice ? ` Pricing starts from ${s.startingPrice}${s.priceUnit ? ` ${s.priceUnit}` : ""}.` : ""} Learn more at /services/${s.slug}.` },
      ...s.faqs,
      {
        q: `How much does ${s.title.toLowerCase()} cost? price pricing`,
        a: s.startingPrice
          ? `${s.title} starts from ${s.startingPrice}${s.priceUnit ? ` ${s.priceUnit}` : ""}. The final price depends on scope — get an itemised quote at /get-a-quote.`
          : `${s.title} is priced per project. Share your requirements at /get-a-quote for a tailored estimate.`,
      },
    ]),
  ];
  let best = { score: 0, a: "" };
  for (const c of candidates) {
    const q = c.q.toLowerCase();
    const a = c.a.toLowerCase();
    // Matches in the question count most; answer matches break ties.
    const score = words.reduce((sum, w) => sum + (q.includes(w) ? 2 : a.includes(w) ? 0.5 : 0), 0);
    if (score > best.score) best = { score, a: c.a };
  }
  return best.score >= 2 ? best.a : null;
}
