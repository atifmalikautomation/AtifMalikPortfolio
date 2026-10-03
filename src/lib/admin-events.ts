/** Human-readable descriptions for visitor_events (shared by live feed + timelines). */

export type EventLike = { type: string; path: string | null; metadata?: Record<string, unknown> | null };

const pageName = (p: string | null) => (!p || p === "/" ? "homepage" : p);

export function eventLabel(e: EventLike): { text: string; icon: string; tone: "green" | "coral" | "sky" | "amber" | "zinc" | "violet" } {
  const m = e.metadata ?? {};
  const preview = typeof m.preview === "string" ? `“${m.preview}”` : "";
  switch (e.type) {
    case "VISITOR_ENTERED": return { text: `Arrived on ${pageName(e.path)}`, icon: "🟢", tone: "green" };
    case "VISITOR_RETURNED": return { text: `Returned — landed on ${pageName(e.path)}`, icon: "🔁", tone: "violet" };
    case "SESSION_STARTED": return { text: "Session started", icon: "▶️", tone: "zinc" };
    case "SESSION_RESUMED": return { text: "Came back to the tab", icon: "↩️", tone: "zinc" };
    case "SESSION_ENDED": return { text: "Session ended", icon: "⏹️", tone: "zinc" };
    case "PAGE_VIEW": return { text: `Opened ${pageName(e.path)}`, icon: "📄", tone: "sky" };
    case "PAGE_EXIT": return { text: `Left page ${pageName(e.path)}${typeof m.durationMs === "number" ? ` after ${Math.round(m.durationMs / 1000)}s` : ""}`, icon: "↗️", tone: "zinc" };
    case "VISITOR_IDLE": return { text: "Went idle", icon: "💤", tone: "amber" };
    case "VISITOR_ACTIVE": return { text: "Active again", icon: "⚡", tone: "green" };
    case "VISITOR_LEFT": return { text: `Left the website from ${pageName(e.path)}`, icon: "🚪", tone: "zinc" };
    case "CHATBOT_OPENED": return { text: "Opened the chatbot", icon: "💬", tone: "coral" };
    case "CHATBOT_MESSAGE": return { text: `Asked ${preview || "a question"}${m.voice ? " (voice)" : ""}`, icon: "🙋", tone: "coral" };
    case "CHATBOT_RESPONSE": return { text: `Chatbot responded${typeof m.latencyMs === "number" ? ` in ${(m.latencyMs / 1000).toFixed(1)}s` : ""}`, icon: "🤖", tone: "sky" };
    case "LEAD_CREATED": return { text: `Became a lead${m.source === "contact-form" ? " (contact form)" : " (chat)"}`, icon: "⭐", tone: "coral" };
    case "LEAD_UPDATED": return { text: "Lead details updated", icon: "✏️", tone: "amber" };
    case "CONTACT_FORM_SUBMITTED": return { text: "Submitted the contact form", icon: "📝", tone: "coral" };
    default: return { text: e.type.toLowerCase().replace(/_/g, " "), icon: "•", tone: "zinc" };
  }
}

export const TONE_CLASSES: Record<string, string> = {
  green: "bg-emerald-400",
  coral: "bg-[#E07A5F]",
  sky: "bg-sky-400",
  amber: "bg-amber-400",
  zinc: "bg-zinc-500",
  violet: "bg-violet-400",
};
