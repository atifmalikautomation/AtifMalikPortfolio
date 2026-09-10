"use client";

import { useState } from "react";
import { X, ExternalLink, Mail } from "lucide-react";

/* ── Book a Call Modal ── */
export function BookCallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(15,46,39,0.25)] backdrop-blur-sm" />
      <div className="relative cw-glass rounded-3xl w-full max-w-3xl max-h-[96vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="font-display font-extrabold text-lg flex items-center gap-2" style={{ color: "#0f2e27" }}>📅 Book a 30-min call</h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(15,46,39,0.55)" }}>Pick a time that works, it lands straight on Atif&apos;s calendar.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(0,200,83,0.06)] transition cursor-pointer" style={{ color: "rgba(15,46,39,0.4)" }}><X size={20} /></button>
        </div>
        {/* Cal.com embed */}
        <div className="flex-1 px-5 overflow-hidden">
          <iframe src="https://cal.com/atifmalik/30min" className="w-full h-[500px] rounded-2xl border-0" style={{ background: "rgba(255,255,255,0.5)" }} />
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between p-5 pt-3">
          <a href="https://cal.com/atifmalik/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold transition" style={{ color: "#009624" }}>
            <ExternalLink size={14} /> Open in new tab
          </a>
          <a href="mailto:atifmalikfreelancer@gmail.com?subject=Booking a call" className="flex items-center gap-1.5 text-sm font-semibold transition" style={{ color: "rgba(15,46,39,0.5)" }}>
            <Mail size={14} /> Prefer email?
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Start a Project Modal ── */
export function ProjectModal({ open, onClose, userName, userEmail }: { open: boolean; onClose: () => void; userName: string; userEmail: string }) {
  const [project, setProject] = useState("AI Video");
  const [budget, setBudget] = useState("$300 - $500");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    setSent(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          service: project,
          business: budget,
          message: details || `New ${project} project inquiry (Budget: ${budget})`,
          source: "chat-project-modal",
        }),
      });
    } catch {
      // silent fail — user already sees "Sent!" confirmation
    }
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(15,46,39,0.25)] backdrop-blur-sm" />
      <div className="relative cw-glass rounded-3xl w-full max-w-sm p-5 max-h-[88vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-lg flex items-center gap-2" style={{ color: "#0f2e27" }}>🚀 Start a project</h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(15,46,39,0.55)" }}>Tell Atif what you&apos;re building, he&apos;ll scope it and reply within 24h.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(0,200,83,0.06)] transition cursor-pointer shrink-0" style={{ color: "rgba(15,46,39,0.4)" }}><X size={20} /></button>
        </div>

        <label className="block text-[12px] font-semibold mb-1" style={{ color: "rgba(15,46,39,0.5)" }}>Your name</label>
        <input type="text" defaultValue={userName} className="w-full cw-glass rounded-xl px-3 py-2 text-sm outline-none mb-2" style={{ color: "#0f2e27" }} />

        <label className="block text-[12px] font-semibold mb-1" style={{ color: "rgba(15,46,39,0.5)" }}>Email</label>
        <input type="email" defaultValue={userEmail} className="w-full cw-glass rounded-xl px-3 py-2 text-sm outline-none mb-2" style={{ color: "#0f2e27" }} />

        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <label className="block text-[12px] font-semibold mb-1" style={{ color: "rgba(15,46,39,0.5)" }}>Project</label>
            <select value={project} onChange={(e) => setProject(e.target.value)} className="w-full cw-glass rounded-xl px-3 py-2 text-sm outline-none cursor-pointer" style={{ color: "#0f2e27" }}>
              <option>AI Video</option>
              <option>n8n Automation</option>
              <option>AI Chatbot</option>
              <option>GoHighLevel CRM</option>
              <option>SaaS / Web App</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold mb-1" style={{ color: "rgba(15,46,39,0.5)" }}>Budget</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full cw-glass rounded-xl px-3 py-2 text-sm outline-none cursor-pointer" style={{ color: "#0f2e27" }}>
              <option>$300 - $500</option>
              <option>$500 - $1k</option>
              <option>$1k - $3k</option>
              <option>$3k+</option>
              <option>Custom</option>
            </select>
          </div>
        </div>

        <label className="block text-[12px] font-semibold mb-1" style={{ color: "rgba(15,46,39,0.5)" }}>Anything else?</label>
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Goals, timeline, links..." rows={3} className="w-full cw-glass rounded-xl px-3 py-2 text-sm outline-none resize-none mb-4" style={{ color: "#0f2e27" }} />

        <button onClick={handleSubmit} disabled={sent} className="w-full cw-glass-pink cw-pink-ring rounded-2xl py-3 text-white font-display font-bold transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-60">
          {sent ? "Sent! ✓" : "Send inquiry →"}
        </button>
      </div>
    </div>
  );
}

/* ── Portfolio Modal ── */
const portfolioItems = [
  { title: "AI Commercial", category: "AI Video", desc: "30s cinematic AI commercial for a brand.", stats: ["HD", "5 days", "ElevenLabs"], img: "🎬" },
  { title: "Bayou Savage Graphic Novel", category: "AI Video", desc: "Full AI graphic novel with character consistency.", stats: ["120 pages", "AI Art", "Cinematic"], img: "📖" },
  { title: "n8n Lead Automation", category: "Automation", desc: "Automated lead capture, qualify & follow-up system.", stats: ["40hrs saved/wk", "24/7", "n8n"], img: "⚡" },
  { title: "WhatsApp AI Chatbot", category: "Chatbots", desc: "AI chatbot handling customer support on WhatsApp.", stats: ["80% automated", "24/7", "Instant"], img: "💬" },
  { title: "GoHighLevel CRM Setup", category: "Automation", desc: "Full CRM, funnel & pipeline with automation.", stats: ["3x leads", "Auto follow-up", "GHL"], img: "🎯" },
  { title: "Academic Support Platform", category: "Web Apps", desc: "Full-stack Next.js platform for AIOU students.", stats: ["40 routes", "71 files", "Prisma"], img: "🎓" },
  { title: "ToolVault AI Marketplace", category: "Web Apps", desc: "AI tools marketplace with auth, billing & admin.", stats: ["9 phases", "SaaS", "Next.js"], img: "🛠️" },
  { title: "YouTube Automation System", category: "Automation", desc: "Auto-posting and channel management system.", stats: ["Daily posts", "Auto", "n8n"], img: "▶️" },
];

const categories = ["All", "AI Video", "Automation", "Chatbots", "Web Apps"];

export function PortfolioModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [filter, setFilter] = useState("All");
  if (!open) return null;
  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(15,46,39,0.25)] backdrop-blur-sm" />
      <div className="relative cw-glass rounded-3xl w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="font-display font-extrabold text-lg flex items-center gap-2" style={{ color: "#0f2e27" }}>👀 Atif&apos;s work</h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(15,46,39,0.55)" }}>{portfolioItems.length} real builds, tap any to explore.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(0,200,83,0.06)] transition cursor-pointer" style={{ color: "rgba(15,46,39,0.4)" }}><X size={20} /></button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className="px-3 py-1.5 text-[13px] font-semibold rounded-full whitespace-nowrap transition cursor-pointer" style={{
              background: filter === cat ? "#00C853" : "rgba(0,200,83,0.06)",
              color: filter === cat ? "#fff" : "#009624",
              border: `1px solid ${filter === cat ? "#00C853" : "rgba(0,200,83,0.12)"}`,
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div key={item.title} className="cw-glass rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform cursor-pointer group">
                {/* Image placeholder */}
                <div className="aspect-[16/10] flex items-center justify-center text-5xl" style={{ background: "rgba(0,200,83,0.04)" }}>
                  {item.img}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm" style={{ color: "#0f2e27" }}>{item.title}</h3>
                  <p className="text-[12px] mt-0.5" style={{ color: "rgba(15,46,39,0.45)" }}>{item.category}</p>
                  <p className="text-[13px] mt-2" style={{ color: "rgba(15,46,39,0.6)" }}>{item.desc}</p>
                  <div className="flex gap-3 mt-3">
                    {item.stats.map((s) => (
                      <span key={s} className="text-[11px] font-display font-bold" style={{ color: "#009624" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <a href="https://atifmalik.me/portfolio" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold transition" style={{ color: "#009624" }}>
              See full portfolio on atifmalik.me ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pricing Modal — Yasir style with two cards ── */
export function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(15,46,39,0.25)] backdrop-blur-sm" />
      <div className="relative cw-glass rounded-3xl w-full max-w-4xl max-h-[96vh] overflow-y-auto no-scrollbar p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-lg flex items-center gap-2" style={{ color: "#0f2e27" }}>💰 Packages</h2>
            <p className="text-sm mt-0.5" style={{ color: "rgba(15,46,39,0.55)" }}>Project-based systems with clear scope. Custom builds welcome too.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[rgba(0,200,83,0.06)] transition cursor-pointer shrink-0" style={{ color: "rgba(15,46,39,0.4)" }}><X size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Starter */}
          <div className="cw-glass rounded-2xl p-6 flex flex-col">
            <h3 className="font-display font-extrabold text-lg" style={{ color: "#0f2e27" }}>AI Starter</h3>
            <p className="text-[13px] mt-1" style={{ color: "rgba(15,46,39,0.55)" }}>Everything you need to start with one focused AI system.</p>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-display font-extrabold text-3xl" style={{ color: "#009624" }}>$300</span>
              <span className="text-sm" style={{ color: "rgba(15,46,39,0.45)" }}>starting</span>
            </div>
            <div className="h-px my-4" style={{ background: "rgba(0,200,83,0.08)" }} />
            <ul className="space-y-2.5 flex-1">
              {["1 AI video OR automation workflow", "Basic AI chatbot setup", "CRM or tool integration", "1 landing page or funnel", "1-2 week delivery", "14-day post-launch support", "Unlimited revisions"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(15,46,39,0.65)" }}>
                  <span style={{ color: "#009624" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/book" className="mt-5 w-full cw-glass-pink cw-pink-ring rounded-2xl py-3 text-white font-display font-bold text-center transition-transform hover:scale-[1.01] active:scale-95 block">Book a strategy call</a>
          </div>

          {/* Full System */}
          <div className="rounded-2xl p-6 flex flex-col relative" style={{ background: "linear-gradient(135deg, #00C853 0%, #009624 40%, #009624 100%)" }}>
            <span className="absolute -top-3 right-6 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full cw-glass" style={{ color: "#009624" }}>Most popular</span>
            <h3 className="font-display font-extrabold text-lg text-white">Full AI System</h3>
            <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>The complete AI system, done for you, end to end.</p>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="font-display font-extrabold text-3xl text-white">$1,500</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>starting</span>
            </div>
            <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.15)" }} />
            <ul className="space-y-2.5 flex-1">
              {["Everything in Starter, plus:", "AI video production (up to 5 assets)", "Up to 10 n8n automation workflows", "Multi-platform AI chatbot", "GoHighLevel CRM setup", "Email + SMS sequences", "Social media automation", "2-4 week delivery", "30-day support + optimization"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="/book" className="mt-5 w-full cw-glass rounded-2xl py-3 font-display font-bold text-center transition-transform hover:scale-[1.01] active:scale-95 block" style={{ color: "#009624" }}>Book a strategy call</a>
          </div>
        </div>

        <div className="text-center mt-5">
          <button onClick={onClose} className="text-sm font-semibold transition" style={{ color: "#009624" }}>
            Need something custom? Start a project →
          </button>
        </div>
      </div>
    </div>
  );
}
