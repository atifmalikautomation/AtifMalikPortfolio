/**
 * Admin authentication (server-only).
 *
 * - Passwords: Node scrypt with a random salt per user (stored as "scrypt$N$salt$hash").
 * - Sessions: signed httpOnly cookie (see admin-session.ts). Rotating ADMIN_SESSION_SECRET logs everyone out.
 * - Route protection is layered: proxy.ts blocks unauthenticated requests to /admin and /api/admin,
 *   and every page/route also calls requireAdmin()/getAdmin() (defense in depth).
 */
import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ensureSchema, isDbConfigured, sql } from "@/lib/db";
import { readSessionToken, SESSION_COOKIE, type SessionPayload } from "@/lib/admin-session";

export { createSessionToken, readSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/admin-session";

const SCRYPT_N = 16384;
const KEY_LEN = 64;

/* ── Password hashing ── */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, KEY_LEN, { N: SCRYPT_N });
  return `scrypt$${SCRYPT_N}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, nStr, saltB64, hashB64] = stored.split("$");
  if (scheme !== "scrypt" || !nStr || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = crypto.scryptSync(password, Buffer.from(saltB64, "base64"), expected.length, { N: Number(nStr) });
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

/** Current admin, or null. Use in server components / route handlers. */
export async function getAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Guard for admin pages: redirects to the login page when not signed in. */
export async function requireAdmin(): Promise<SessionPayload> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

/* ── Login rate limiting (per IP, best-effort per instance) ── */

const attempts = new Map<string, { count: number; reset: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60_000;

export function loginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.reset) {
    attempts.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export function clearLoginAttempts(ip: string) {
  attempts.delete(ip);
}

/** Returns the admin user if the credentials are valid. */
export async function authenticate(email: string, password: string): Promise<{ id: number; email: string } | null> {
  if (!isDbConfigured()) return null;
  await ensureSchema();
  const rows = (await sql()`
    SELECT id, email, password_hash FROM admin_users WHERE email = ${email.trim().toLowerCase()} LIMIT 1`) as {
    id: number;
    email: string;
    password_hash: string;
  }[];
  const user = rows[0];
  // Hash anyway when the user doesn't exist, so response time doesn't reveal valid emails.
  const ok = user ? verifyPassword(password, user.password_hash) : (verifyPassword(password, hashPassword("timing-equalizer")), false);
  if (!user || !ok) return null;
  await sql()`UPDATE admin_users SET last_login_at = now() WHERE id = ${user.id}`;
  return { id: user.id, email: user.email };
}

/** Change the signed-in admin's password after verifying the current one. */
export async function changePassword(uid: number, current: string, next: string): Promise<"ok" | "wrong" | "weak"> {
  if (next.length < 10) return "weak";
  await ensureSchema();
  const rows = (await sql()`SELECT password_hash FROM admin_users WHERE id = ${uid}`) as { password_hash: string }[];
  if (!rows[0] || !verifyPassword(current, rows[0].password_hash)) return "wrong";
  await sql()`UPDATE admin_users SET password_hash = ${hashPassword(next)} WHERE id = ${uid}`;
  return "ok";
}
