"use client";

import { Link } from "@/i18n/link";
import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquareText, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormSubmit } from "@/components/forms/use-form-submit";
import { Turnstile } from "@/components/forms/turnstile";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { fmt } from "@/i18n/format";

type Msg = { role: "user" | "assistant"; content: string };


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
  const { t: ui, locale } = useI18n();
  const t = ui.chat;
  const greeting = useRef<Msg>({ role: "assistant", content: t.greeting }).current;
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
        body: JSON.stringify({ locale, messages: next.filter((m) => m !== greeting).slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? t.error }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.offline }]);
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
      setMessages((m) => [...m, { role: "assistant", content: fmt(t.thanks, { name: lead.name.split(" ")[0], ref: ok.reference ?? "" }) }]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? t.close : t.open}
        className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageSquareText className="h-6 w-6" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={t.dialog}
          className="fixed bottom-36 right-3 z-50 flex h-[min(560px,calc(100vh-10rem))] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-sm border bg-card shadow-2xl md:bottom-24 md:right-6"
        >
          <div className="flex items-center gap-3 bg-forest p-4 text-cream">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream/10"><Bot className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="font-heading font-semibold leading-tight">{t.name}</p>
              <p className="text-xs text-[#D3DDD5]">{t.status}</p>
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
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> {t.typing}
              </p>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {t.quick.map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border px-3 py-1 text-xs hover:bg-secondary">
                    {q}
                  </button>
                ))}
              </div>
            )}
            {showLead && (
              <form onSubmit={submitLead} className="space-y-2 rounded-sm border bg-background p-3">
                <p className="text-sm font-semibold">{t.leadTitle}</p>
                <Input aria-label={t.leadName} placeholder={t.leadName} required minLength={2} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <Input aria-label={t.leadEmail} type="email" placeholder={t.leadEmail} required value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                <Input aria-label={t.leadPhone} type="tel" placeholder={t.leadPhone} value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
                <Turnstile onToken={lead$.setToken} />
                <p className="text-[11px] text-muted-foreground">
                  {t.leadConsent} <Link href="/privacy-policy" className="underline">{t.privacy}</Link>.
                </p>
                {lead$.error && <p role="alert" className="text-xs text-destructive">{lead$.error}</p>}
                <Button type="submit" size="sm" className="w-full" disabled={lead$.status === "submitting"}>
                  {lead$.status === "submitting" ? t.sending : t.requestCallback}
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
            <label htmlFor="chat-input" className="sr-only">{t.inputLabel}</label>
            <Input id="chat-input" ref={inputRef} value={input} maxLength={1000} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} autoComplete="off" />
            <Button type="submit" size="icon" aria-label={t.send} disabled={loading || !input.trim()}>
              <Send />
            </Button>
          </form>
          {!showLead && (
            <button type="button" onClick={() => setShowLead(true)} className="pb-2 text-center text-xs text-muted-foreground underline">
              {t.preferCallback}
            </button>
          )}
        </div>
      )}
    </>
  );
}
