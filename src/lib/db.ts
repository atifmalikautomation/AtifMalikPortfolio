/**
 * Database layer (Neon serverless Postgres over HTTP).
 *
 * - Works on Vercel serverless with no connection pooling setup.
 * - Schema is created automatically on first use (idempotent CREATE ... IF NOT EXISTS),
 *   so a fresh database needs no manual migration step.
 * - If DATABASE_URL is missing, `isDbConfigured()` returns false and callers skip logging,
 *   so the public website and chatbot keep working even without a database.
 *
 * Privacy: no raw IP addresses are stored. Location is coarse (country/region/city)
 * from Vercel's geo headers. Visitors are anonymous UUIDs unless they voluntarily
 * share a name/email in the chat or contact form.
 */
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function sql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

let schemaReady: Promise<void> | null = null;

/** Create tables once per server instance. Safe to call on every request. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = createSchema().catch((err) => {
      schemaReady = null; // retry next time
      throw err;
    });
  }
  return schemaReady;
}

async function createSchema() {
  const db = sql();

  await db`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            SERIAL PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_login_at TIMESTAMPTZ
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  /* ── Visitor tracking ── */
  await db`
    CREATE TABLE IF NOT EXISTS visitors (
      id               UUID PRIMARY KEY,
      short_id         TEXT NOT NULL,
      first_seen_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_seen_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
      session_count    INTEGER NOT NULL DEFAULT 0,
      pageview_count   INTEGER NOT NULL DEFAULT 0,
      total_duration_s INTEGER NOT NULL DEFAULT 0,
      first_source     TEXT,
      first_referrer   TEXT,
      first_landing    TEXT,
      country          TEXT,
      region           TEXT,
      city             TEXT,
      device_type      TEXT,
      browser          TEXT,
      os               TEXT,
      name             TEXT,
      email            TEXT
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS sessions (
      id                  UUID PRIMARY KEY,
      visitor_id          UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
      started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_heartbeat_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_interaction_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      ended_at            TIMESTAMPTZ,
      visible             BOOLEAN NOT NULL DEFAULT true,
      current_path        TEXT,
      current_title       TEXT,
      landing_path        TEXT,
      exit_path           TEXT,
      referrer            TEXT,
      source              TEXT NOT NULL DEFAULT 'Direct',
      utm_source          TEXT,
      utm_medium          TEXT,
      utm_campaign        TEXT,
      device_type         TEXT,
      browser             TEXT,
      os                  TEXT,
      screen              TEXT,
      language            TEXT,
      country             TEXT,
      region              TEXT,
      city                TEXT,
      pageviews           INTEGER NOT NULL DEFAULT 0,
      is_returning        BOOLEAN NOT NULL DEFAULT false,
      chat_opened         BOOLEAN NOT NULL DEFAULT false,
      chat_messages       INTEGER NOT NULL DEFAULT 0
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS page_views (
      id          BIGSERIAL PRIMARY KEY,
      session_id  UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      visitor_id  UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
      path        TEXT NOT NULL,
      title       TEXT,
      entered_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      left_at     TIMESTAMPTZ,
      duration_ms INTEGER
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS visitor_events (
      id         BIGSERIAL PRIMARY KEY,
      visitor_id UUID REFERENCES visitors(id) ON DELETE CASCADE,
      session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
      type       TEXT NOT NULL,
      path       TEXT,
      metadata   JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  /* ── Chatbot ── */
  await db`
    CREATE TABLE IF NOT EXISTS conversations (
      id              UUID PRIMARY KEY,
      visitor_id      UUID REFERENCES visitors(id) ON DELETE CASCADE,
      session_id      UUID REFERENCES sessions(id) ON DELETE SET NULL,
      visitor_name    TEXT,
      visitor_email   TEXT,
      source          TEXT NOT NULL DEFAULT 'chat',
      page            TEXT,
      country         TEXT,
      city            TEXT,
      user_agent      TEXT,
      referrer        TEXT,
      handoff         BOOLEAN NOT NULL DEFAULT false,
      message_count   INTEGER NOT NULL DEFAULT 0,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_message_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS messages (
      id              BIGSERIAL PRIMARY KEY,
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      role            TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
      content         TEXT NOT NULL,
      model           TEXT,
      latency_ms      INTEGER,
      is_voice        BOOLEAN NOT NULL DEFAULT false,
      page            TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  await db`
    CREATE TABLE IF NOT EXISTS leads (
      id              BIGSERIAL PRIMARY KEY,
      name            TEXT,
      email           TEXT,
      phone           TEXT,
      company         TEXT,
      service         TEXT,
      message         TEXT,
      source          TEXT NOT NULL DEFAULT 'chat',
      status          TEXT NOT NULL DEFAULT 'new'
                      CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
      notes           TEXT,
      visitor_id      UUID REFERENCES visitors(id) ON DELETE SET NULL,
      conversation_id UUID UNIQUE REFERENCES conversations(id) ON DELETE SET NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;

  /* ── Indexes ── */
  await db`CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors (last_seen_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_visitors_email ON visitors (email)`;
  await db`CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions (visitor_id, started_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_sessions_heartbeat ON sessions (last_heartbeat_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions (started_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_sessions_open ON sessions (last_heartbeat_at) WHERE ended_at IS NULL`;
  await db`CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views (session_id, entered_at)`;
  await db`CREATE INDEX IF NOT EXISTS idx_pv_entered ON page_views (entered_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_pv_visitor ON page_views (visitor_id)`;
  await db`CREATE INDEX IF NOT EXISTS idx_events_session ON visitor_events (session_id, created_at)`;
  await db`CREATE INDEX IF NOT EXISTS idx_events_visitor ON visitor_events (visitor_id, created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_events_created ON visitor_events (created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_events_type ON visitor_events (type, created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_conv_visitor ON conversations (visitor_id)`;
  await db`CREATE INDEX IF NOT EXISTS idx_conv_last ON conversations (last_message_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages (conversation_id, created_at)`;
  await db`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages (created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status)`;
  await db`CREATE INDEX IF NOT EXISTS idx_leads_visitor ON leads (visitor_id)`;
}

/* ── Settings (admin-configurable, cached briefly per instance) ── */

export type AppSettings = {
  /** Seconds without a heartbeat before a visitor is considered LEFT */
  leftAfterSeconds: number;
  /** Seconds without interaction before an online visitor is IDLE */
  idleAfterSeconds: number;
  /** Delete tracking + chat data older than this many days (0 = keep forever) */
  retentionDays: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  leftAfterSeconds: Number(process.env.VISITOR_LEFT_AFTER_SECONDS) || 90,
  idleAfterSeconds: 60,
  retentionDays: 180,
};

let settingsCache: { value: AppSettings; at: number } | null = null;

export async function getSettings(): Promise<AppSettings> {
  if (settingsCache && Date.now() - settingsCache.at < 30_000) return settingsCache.value;
  await ensureSchema();
  const rows = (await sql()`SELECT value FROM settings WHERE key = 'app'`) as { value: Partial<AppSettings> }[];
  const value = { ...DEFAULT_SETTINGS, ...(rows[0]?.value ?? {}) };
  settingsCache = { value, at: Date.now() };
  return value;
}

export async function saveSettings(next: AppSettings): Promise<void> {
  await ensureSchema();
  await sql()`
    INSERT INTO settings (key, value, updated_at) VALUES ('app', ${JSON.stringify(next)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
  settingsCache = { value: next, at: Date.now() };
}
