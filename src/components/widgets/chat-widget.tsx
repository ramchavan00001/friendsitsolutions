"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquareText, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormSubmit } from "@/components/forms/use-form-submit";
import { Turnstile } from "@/components/forms/turnstile";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const greeting: Msg = {
  role: "assistant",
  content: "Hi! I'm Fia, the FriendsITSolutions assistant 👋 Ask me about our services, pricing or support — or leave your details and our team will call you back.",
};
const quickReplies = ["What services do you offer?", "How much does a website cost?", "Do you provide 24/7 support?", "I need a quote"];

/** Turns internal paths like /get-a-quote in a reply into links. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\/[a-z0-9][a-z0-9\-/]*)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\/[a-z0-9]/.test(p) ? (
          <Link key={i} href={p.replace(/[.,]$/, "")} className="font-semibold underline">
            {p}
          </Link>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const lead$ = useFormSubmit("contact", { redirect: false });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLead, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    if (/quote|call me|contact|price for my|estimate/i.test(content)) setShowLead(true);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== greeting).slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "Sorry, something went wrong. Please try again." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I'm having trouble connecting. You can reach us on WhatsApp or via /contact." }]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    const transcript = messages.map((m) => `${m.role === "user" ? "Visitor" : "Bot"}: ${m.content}`).join("\n").slice(-4000);
    const ok = await lead$.submit({
      ...lead,
      message: `Chatbot lead.\n\n${transcript}`,
      source: "chatbot",
      consent: true,
    });
    if (ok) {
      setShowLead(false);
      setMessages((m) => [...m, { role: "assistant", content: `Thanks ${lead.name.split(" ")[0]}! Our team will contact you shortly. Your reference is ${ok.reference}.` }]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : "Chat with our assistant"}
        className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageSquareText className="h-6 w-6" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label="Chat with FriendsITSolutions"
          className="fixed bottom-36 right-3 z-50 flex h-[min(560px,calc(100vh-10rem))] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-sm border bg-card shadow-2xl md:bottom-24 md:right-6"
        >
          <div className="flex items-center gap-3 bg-forest p-4 text-cream">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/10"><Bot className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="font-heading font-semibold leading-tight">Fia · FriendsIT Assistant</p>
              <p className="text-xs text-[#D3DDD5]">Typically replies instantly</p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-sm px-3.5 py-2 text-sm",
                    m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary",
                  )}
                >
                  {m.role === "assistant" ? <RichText text={m.content} /> : m.content}
                </p>
              </div>
            ))}
            {loading && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Fia is typing…
              </p>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border px-3 py-1 text-xs hover:bg-secondary">
                    {q}
                  </button>
                ))}
              </div>
            )}
            {showLead && (
              <form onSubmit={submitLead} className="space-y-2 rounded-sm border bg-background p-3">
                <p className="text-sm font-semibold">Leave your details for a callback</p>
                <Input aria-label="Your name" placeholder="Name" required minLength={2} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <Input aria-label="Email" type="email" placeholder="Email" required value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                <Input aria-label="Phone" type="tel" placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                <Turnstile onToken={lead$.setToken} />
                <p className="text-[11px] text-muted-foreground">
                  By submitting you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
                </p>
                {lead$.error && <p role="alert" className="text-xs text-destructive">{lead$.error}</p>}
                <Button type="submit" size="sm" className="w-full" disabled={lead$.status === "submitting"}>
                  {lead$.status === "submitting" ? "Sending…" : "Request callback"}
                </Button>
              </form>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t p-3"
          >
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <Input id="chat-input" ref={inputRef} value={input} maxLength={1000} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" autoComplete="off" />
            <Button type="submit" size="icon" aria-label="Send message" disabled={loading || !input.trim()}>
              <Send />
            </Button>
          </form>
          {!showLead && (
            <button type="button" onClick={() => setShowLead(true)} className="pb-2 text-center text-xs text-muted-foreground underline">
              Prefer a callback? Leave your details
            </button>
          )}
        </div>
      )}
    </>
  );
}
