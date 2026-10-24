import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { chatSystemPrompt, matchFaq } from "@/lib/chat-knowledge";
import { clientIp, rateLimit } from "@/lib/forms/rate-limit";
import { site } from "@/content/site";

export const runtime = "nodejs";

const bodySchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1000) }))
    .min(1)
    .max(16),
});

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
const model = process.env.ANTHROPIC_MODEL ?? "claude-opus-5-5";
const fallbackReply = `I'm not sure about that one — our team will be happy to help. Call ${site.phone}, WhatsApp us, or request a free quote at /get-a-quote.`;

export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientIp(request.headers)}`, 20, 60_000).ok) {
    return NextResponse.json({ reply: "You're sending messages quickly — please wait a moment and try again." }, { status: 429 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  // The conversation must start with a user turn.
  const messages = parsed.data.messages.slice(parsed.data.messages.findIndex((m) => m.role === "user"));
  const lastQuestion = messages[messages.length - 1].content;

  if (!client) {
    return NextResponse.json({ reply: matchFaq(lastQuestion) ?? fallbackReply, mode: "faq" });
  }

  try {
    const response = await client.beta.messages.create({
      model,
      max_tokens: 1024,
      // Short, conversational answers: low effort keeps latency and cost down.
      output_config: { effort: "low" },
      // If the model declines a request, the API retries on a fallback model within the same call.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      cache_control: { type: "ephemeral" },
      system: chatSystemPrompt(),
      messages,
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json({ reply: fallbackReply, mode: "ai" });
    }
    const reply = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || fallbackReply, mode: "ai" });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) console.warn("[chat] rate limited");
    else if (error instanceof Anthropic.APIError) console.error(`[chat] API error ${error.status}`, error.message);
    else console.error("[chat]", error);
    return NextResponse.json({ reply: matchFaq(lastQuestion) ?? fallbackReply, mode: "faq" });
  }
}
