/**
 * Request classification helpers (server-side, no third-party services).
 * Only coarse, non-identifying attributes are derived.
 */

const BOT_RE =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|quora link|whatsapp|telegram|discord|curl|wget|python-requests|axios|node-fetch|go-http|vercel-screenshot|uptime|monitor/i;

export function isBot(ua: string | null | undefined): boolean {
  return !ua || BOT_RE.test(ua);
}

export type DeviceInfo = { deviceType: "mobile" | "tablet" | "desktop"; browser: string; os: string };

export function parseUA(ua: string | null | undefined): DeviceInfo {
  const s = ua ?? "";
  const deviceType = /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(s)
    ? "tablet"
    : /Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(s)
      ? "mobile"
      : "desktop";
  const os = /iPhone|iPad|iPod/.test(s)
    ? "iOS"
    : /Android/.test(s)
      ? "Android"
      : /Windows/.test(s)
        ? "Windows"
        : /Mac OS X|Macintosh/.test(s)
          ? "macOS"
          : /CrOS/.test(s)
            ? "ChromeOS"
            : /Linux/.test(s)
              ? "Linux"
              : "Other";
  const browser = /Edg\//.test(s)
    ? "Edge"
    : /OPR\/|Opera/.test(s)
      ? "Opera"
      : /SamsungBrowser/.test(s)
        ? "Samsung Internet"
        : /FBAN|FBAV|Instagram/.test(s)
          ? "In-app (Meta)"
          : /Firefox\/|FxiOS/.test(s)
            ? "Firefox"
            : /Chrome\/|CriOS/.test(s)
              ? "Chrome"
              : /Safari\//.test(s)
                ? "Safari"
                : "Other";
  return { deviceType, browser, os };
}

/** Known traffic sources, matched against utm_source or the referrer hostname. */
const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\.|^google$/i, "Google"],
  [/(^|\.)bing\.com|^bing$/i, "Bing"],
  [/duckduckgo|yahoo\.|yandex\.|baidu\.|ecosia/i, "Other search"],
  [/instagram|^ig$/i, "Instagram"],
  [/facebook|fb\.com|^fb$|^meta$/i, "Facebook"],
  [/linkedin|lnkd\.in/i, "LinkedIn"],
  [/youtube|youtu\.be|^yt$/i, "YouTube"],
  [/fiverr/i, "Fiverr"],
  [/upwork/i, "Upwork"],
  [/tiktok/i, "TikTok"],
  [/twitter|t\.co$|^x$|x\.com/i, "X (Twitter)"],
  [/whatsapp|wa\.me/i, "WhatsApp"],
  [/chatgpt|openai|perplexity|claude\.ai|gemini\.google/i, "AI assistant"],
];

function classify(token: string): string | null {
  for (const [re, name] of SOURCES) if (re.test(token)) return name;
  return null;
}

/**
 * Decide the traffic source from real data only:
 * utm_source (if present) → referrer host → "Direct" when there is no external referrer.
 */
export function trafficSource(opts: { referrer?: string | null; utmSource?: string | null; siteHost?: string | null }): {
  source: string;
  referrerHost: string | null;
} {
  let referrerHost: string | null = null;
  if (opts.referrer) {
    try {
      referrerHost = new URL(opts.referrer).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      referrerHost = null;
    }
  }
  const site = opts.siteHost?.replace(/^www\./, "").toLowerCase() ?? null;
  if (referrerHost && site && (referrerHost === site || referrerHost.endsWith(".vercel.app") && site.endsWith(".vercel.app"))) {
    referrerHost = null; // internal navigation is not a traffic source
  }

  if (opts.utmSource) {
    return { source: classify(opts.utmSource) ?? `Campaign: ${opts.utmSource.slice(0, 40)}`, referrerHost };
  }
  if (referrerHost) return { source: classify(referrerHost) ?? "Other referral", referrerHost };
  return { source: "Direct", referrerHost: null };
}

/** Vercel geo headers (coarse location only, never the raw IP). */
export function geoFromHeaders(h: Headers): { country: string | null; region: string | null; city: string | null } {
  const dec = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  return {
    country: h.get("x-vercel-ip-country") || null,
    region: dec(h.get("x-vercel-ip-country-region")),
    city: dec(h.get("x-vercel-ip-city")),
  };
}

export function clientIp(h: Headers): string {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

/** Simple in-memory fixed-window rate limiter (per server instance, best-effort). */
export function makeRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, { count: number; reset: number }>();
  return (key: string): boolean => {
    const now = Date.now();
    if (hits.size > 5000) for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    const e = hits.get(key);
    if (!e || now > e.reset) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return false;
    }
    e.count++;
    return e.count > max;
  };
}
