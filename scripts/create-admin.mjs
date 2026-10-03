#!/usr/bin/env node
/**
 * Create or reset an admin login for /admin.
 *
 *   npm run admin:create -- you@example.com "YourStrongPassword"
 *
 * Reads DATABASE_URL from the environment or .env.local. Running it again with the
 * same email resets that admin's password.
 */
import fs from "node:fs";
import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";

function loadEnvLocal() {
  if (!fs.existsSync(".env.local")) return;
  for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}
loadEnvLocal();

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npm run admin:create -- <email> "<password>"');
  process.exit(1);
}
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (add it to .env.local or run `vercel env pull`).");
  process.exit(1);
}

// Must match hashPassword() in src/lib/admin-auth.ts
const N = 16384;
const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64, { N });
const stored = `scrypt$${N}$${salt.toString("base64")}$${hash.toString("base64")}`;

const sql = neon(url);
await sql`
  CREATE TABLE IF NOT EXISTS admin_users (
    id            SERIAL PRIMARY KEY,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at TIMESTAMPTZ
  )`;
await sql`
  INSERT INTO admin_users (email, password_hash) VALUES (${email.trim().toLowerCase()}, ${stored})
  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`;

console.log(`✓ Admin ready: ${email.trim().toLowerCase()}`);
