export type ConsentState = { necessary: true; analytics: boolean; marketing: boolean; decidedAt: string };
export const CONSENT_KEY = "fit-cookie-consent";
export const CONSENT_EVENT = "fit-consent-change";

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Omit<ConsentState, "necessary" | "decidedAt">) {
  const value: ConsentState = { necessary: true, ...c, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — consent applies for this page view only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
