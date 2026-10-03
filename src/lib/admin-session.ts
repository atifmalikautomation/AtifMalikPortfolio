/**
 * Stateless admin session tokens (HMAC-SHA256), usable from proxy.ts and server code.
 * Token = base64url(JSON payload) + "." + base64url(HMAC). Signed with ADMIN_SESSION_SECRET.
 */
import crypto from "node:crypto";

export const SESSION_COOKIE = "atif_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = { uid: number; email: string; exp: number; v?: number };

function secret(): Buffer {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters)");
  return Buffer.from(s);
}

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

export function createSessionToken(uid: number, email: string): string {
  const payload: SessionPayload = { uid, email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS, v: 1 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Returns the payload for a valid, unexpired token; otherwise null. Never throws. */
export function readSessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const expected = Buffer.from(sign(body));
    const given = Buffer.from(sig);
    if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
