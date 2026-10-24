"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { readConsent, writeConsent } from "./consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener("fit-open-cookie-settings", reopen);
    return () => window.removeEventListener("fit-open-cookie-settings", reopen);
  }, []);

  if (!visible) return null;

  const decide = (a: boolean, m: boolean) => {
    writeConsent({ analytics: a, marketing: m });
    setVisible(false);
  };

  return (
    <div role="dialog" aria-labelledby="cookie-title" aria-live="polite" className="fixed inset-x-3 bottom-16 z-50 mx-auto max-w-2xl rounded-sm border bg-card p-5 shadow-2xl md:bottom-6">
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />
        <div className="flex-1">
          <p id="cookie-title" className="font-heading font-semibold">We value your privacy</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We use essential cookies to run this site and, with your consent, analytics and marketing cookies to improve it. See our{" "}
            <Link href="/cookie-policy" className="underline">Cookie Policy</Link>.
          </p>
          {customise && (
            <fieldset className="mt-4 space-y-2 text-sm">
              <legend className="sr-only">Cookie preferences</legend>
              <label className="flex items-center gap-2"><input type="checkbox" checked disabled className="h-4 w-4" /> Necessary (always on)</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-[#123A2C]" /> Analytics (Google Analytics)</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 accent-[#123A2C]" /> Marketing (Meta Pixel)</label>
            </fieldset>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {customise ? (
              <Button size="sm" onClick={() => decide(analytics, marketing)}>Save preferences</Button>
            ) : (
              <>
                <Button size="sm" onClick={() => decide(true, true)}>Accept all</Button>
                <Button size="sm" variant="outline" onClick={() => decide(false, false)}>Reject non-essential</Button>
                <Button size="sm" variant="ghost" onClick={() => setCustomise(true)}>Customise</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <Button variant="outline" onClick={() => window.dispatchEvent(new Event("fit-open-cookie-settings"))}>
      Change cookie preferences
    </Button>
  );
}
