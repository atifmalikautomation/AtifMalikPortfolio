/**
 * Browser-side visitor tracking (first-party, anonymous).
 *
 * - Visitor ID: random UUID in localStorage (no fingerprinting, no cookies, no third parties).
 * - Session ID: rotates after 30 minutes without activity; shared across tabs.
 * - Respects Global Privacy Control, automated browsers, and a per-browser opt-out
 *   (localStorage "am_optout" = "1", toggled from the admin Settings page).
 */

const VID = "am_vid";
const SID = "am_sid";
const LAST = "am_last";
const OPTOUT = "am_optout";
const SESSION_TIMEOUT_MS = 30 * 60_000;

type TrackEvent = { t: string; p?: string; ti?: string; m?: Record<string, unknown> };

let lastInteraction = Date.now();
let ctxSentFor = "";

function uuid(): string {
  const c: Crypto = globalThis.crypto;
  if (typeof c.randomUUID === "function") return c.randomUUID();
  const b = new Uint8Array(16);
  c.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export function trackingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(OPTOUT) === "1") return false;
  } catch {
    return false; // storage blocked → don't track
  }
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.globalPrivacyControl === true || nav.webdriver) return false;
  if (location.pathname.startsWith("/admin")) return false;
  return true;
}

export function setTrackingOptOut(optOut: boolean) {
  try {
    if (optOut) localStorage.setItem(OPTOUT, "1");
    else localStorage.removeItem(OPTOUT);
  } catch {
    /* ignore */
  }
}

export function isOptedOut(): boolean {
  try {
    return localStorage.getItem(OPTOUT) === "1";
  } catch {
    return false;
  }
}

/** Current anonymous ids (creates/rotates them). Null when tracking is not allowed. */
export function getTrackingIds(): { visitorId: string; sessionId: string; isNewSession: boolean } | null {
  if (!trackingAllowed()) return null;
  try {
    let visitorId = localStorage.getItem(VID);
    if (!visitorId) {
      visitorId = uuid();
      localStorage.setItem(VID, visitorId);
    }
    let sessionId = localStorage.getItem(SID);
    const last = Number(localStorage.getItem(LAST)) || 0;
    let isNewSession = false;
    if (!sessionId || Date.now() - last > SESSION_TIMEOUT_MS) {
      sessionId = uuid();
      localStorage.setItem(SID, sessionId);
      isNewSession = true;
    }
    localStorage.setItem(LAST, String(Date.now()));
    return { visitorId, sessionId, isNewSession };
  } catch {
    return null;
  }
}

export function noteInteraction() {
  lastInteraction = Date.now();
}

function context() {
  const q = new URLSearchParams(location.search);
  return {
    ref: document.referrer || undefined,
    utm_source: q.get("utm_source") || undefined,
    utm_medium: q.get("utm_medium") || undefined,
    utm_campaign: q.get("utm_campaign") || undefined,
    landing: location.pathname,
    screen: `${screen.width}x${screen.height}`,
    lang: navigator.language,
  };
}

/** Send events. `beacon` uses sendBeacon so it survives page unload. */
export function track(events: TrackEvent[], opts: { beacon?: boolean } = {}) {
  const ids = getTrackingIds();
  if (!ids) return;
  const payload: Record<string, unknown> = {
    v: ids.visitorId,
    s: ids.sessionId,
    events,
    hb: { vis: document.visibilityState === "visible", ia: Date.now() - lastInteraction },
  };
  // Attach source context once per session (or whenever a new session starts)
  if (ids.isNewSession || ctxSentFor !== ids.sessionId) {
    payload.ctx = context();
    ctxSentFor = ids.sessionId;
  }
  const body = JSON.stringify(payload);
  try {
    if (opts.beacon && navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  } catch {
    /* tracking must never break the site */
  }
}

/** Fire a single named event (e.g. "chatbot_opened"). */
export function trackEvent(type: string, meta?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  track([{ t: type, p: location.pathname, m: meta }]);
}
