"use client";

import { useState } from "react";

/* ── Invite Modal ── */
export function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleInvite = () => {
    if (!name.trim() || !email.trim()) return;
    const subject = encodeURIComponent(`Join Atif's Studio chat`);
    const body = encodeURIComponent(`Hey ${name},\n\nAtif invited you to join the chat!\n\nJoin here: ${window.location.href}\n\nSee you there 👋`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(15,46,39,0.25)" }} />
      <div className="cg rounded-3xl w-full max-w-sm p-5 relative max-h-[88vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="font-display font-extrabold text-lg" style={{ color: "#1a1a1a" }}>Invite a teammate</h3>
        <p className="text-sm mb-3" style={{ color: "rgba(0,0,0,0.4)" }}>Bring a partner or colleague in, we&apos;ll open an email so you can send the link.</p>
        <div className="flex flex-col gap-2.5">
          <input className="w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none" style={{ color: "#1a1a1a" }}
            value={name} onChange={e => setName(e.target.value)} placeholder="Their name" />
          <input className="w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none" style={{ color: "#1a1a1a" }}
            type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="their@email.com"
            onKeyDown={e => e.key === "Enter" && handleInvite()} />
          <button onClick={handleInvite} disabled={!name.trim() || !email.trim() || sent}
            className="cg-accent cg-gold rounded-2xl py-2.5 text-white font-display font-bold transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-40">
            {sent ? "Sent! ✓" : "Send invite ✉️"}
          </button>
        </div>
        <button onClick={onClose} className="mt-4 w-full rounded-2xl py-2.5 text-sm font-semibold hover:bg-black/5 transition cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}>Done</button>
      </div>
    </div>
  );
}

function Modal({ onClose, title, subtitle, emoji, maxWidth = "max-w-md", children, footer }: {
  onClose: () => void; title: string; subtitle?: string; emoji?: string; maxWidth?: string;
  children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(15,46,39,0.25)" }} />
      <div className="cg rounded-3xl w-full relative flex flex-col max-h-[88vh] overflow-hidden" style={{ maxWidth }} onClick={e => e.stopPropagation()}>
        <div className="flex items-start gap-3 p-5 pb-3 shrink-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-extrabold text-lg leading-tight" style={{ color: "#1a1a1a" }}>
              {emoji && <span className="mr-1.5">{emoji}</span>}{title}
            </h3>
            {subtitle && <p className="text-sm mt-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-lg transition active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}>
            ✕
          </button>
        </div>
        <div className="px-5 pb-5 overflow-y-auto">{children}</div>
        {footer && <div className="p-4 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.4)" }}>{footer}</div>}
      </div>
    </div>
  );
}

/* ── Book a Call Modal ── */
export function BookCallModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <Modal emoji="📅" title="Book a 30-min call" subtitle="Pick a time that works, it lands straight on Atif's calendar." onClose={onClose} maxWidth="48rem"
      footer={
        <div className="flex items-center justify-between gap-3 text-sm">
          <a href="https://cal.com/atifmalik/30min" target="_blank" rel="noreferrer" className="font-semibold transition" style={{ color: "#E0008A" }}>Open in new tab ↗</a>
          <a href="mailto:atifmalikfreelancer@gmail.com?subject=Booking%20a%20call" className="font-semibold transition" style={{ color: "rgba(0,0,0,0.4)" }}>Prefer email?</a>
        </div>
      }
    >
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.4)" }}>
        <iframe src="https://cal.com/atifmalik/30min" title="Book a call with Atif" className="w-full h-[60vh] min-h-[420px]" loading="lazy" />
      </div>
    </Modal>
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
          name: userName, email: userEmail, service: project, business: budget,
          message: details || `New ${project} project inquiry (Budget: ${budget})`,
          source: "chat-project-modal",
        }),
      });
    } catch { /* silent */ }
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  const inputCls = "w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none mb-2" as const;

  return (
    <Modal emoji="🚀" title="Start a project" subtitle="Tell Atif what you're building, he'll scope it and reply within 24h." onClose={onClose} maxWidth="24rem">
      <div className="flex flex-col gap-2.5">
        <input type="text" defaultValue={userName} placeholder="Your name" className={inputCls} style={{ color: "#1a1a1a" }} />
        <input type="email" defaultValue={userEmail} placeholder="their@email.com" className={inputCls} style={{ color: "#1a1a1a" }} />
        <div className="grid grid-cols-2 gap-2.5">
          <select value={project} onChange={e => setProject(e.target.value)} className={inputCls} style={{ color: "#1a1a1a" }}>
            <option>AI Video</option><option>n8n Automation</option><option>AI Chatbot</option>
            <option>GoHighLevel CRM</option><option>SaaS / Web App</option><option>Custom</option>
          </select>
          <select value={budget} onChange={e => setBudget(e.target.value)} className={inputCls} style={{ color: "#1a1a1a" }}>
            <option>$300 - $500</option><option>$500 - $1k</option><option>$1k - $3k</option>
            <option>$3k+</option><option>Custom</option>
          </select>
        </div>
        <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Goals, timeline, links..." rows={3} className="w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none resize-none" style={{ color: "#1a1a1a" }} />
        <button onClick={handleSubmit} disabled={sent} className="cg-accent cg-gold rounded-2xl py-2.5 text-white font-display font-bold transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-40">
          {sent ? "Sent! ✓" : "Send inquiry ✉️"}
        </button>
      </div>
    </Modal>
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
  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter(p => p.category === filter);

  return (
    <Modal emoji="👀" title="Atif's work" subtitle={`${portfolioItems.length} real builds, tap any to explore.`} onClose={onClose} maxWidth="56rem">
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className="px-3 py-1.5 text-[13px] font-semibold rounded-full whitespace-nowrap transition cursor-pointer"
            style={{
              background: filter === cat ? "#E0008A" : "rgba(224,0,138,0.06)",
              color: filter === cat ? "#fff" : "#E0008A",
              border: `1px solid ${filter === cat ? "#E0008A" : "rgba(224,0,138,0.12)"}`,
            }}
          >{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item.title} className="cg rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="aspect-[16/10] flex items-center justify-center text-5xl" style={{ background: "rgba(224,0,138,0.04)" }}>{item.img}</div>
            <div className="p-4">
              <h3 className="font-display font-bold text-sm" style={{ color: "#1a1a1a" }}>{item.title}</h3>
              <p className="text-[12px] mt-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>{item.category}</p>
              <p className="text-[13px] mt-2" style={{ color: "rgba(0,0,0,0.55)" }}>{item.desc}</p>
              <div className="flex gap-3 mt-3">
                {item.stats.map(s => <span key={s} className="text-[11px] font-display font-bold" style={{ color: "#E0008A" }}>{s}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/portfolio" className="text-sm font-semibold transition" style={{ color: "#E0008A" }}>See full portfolio on atifmalik.me ↗</a>
      </div>
    </Modal>
  );
}

/* ── Pricing Modal ── */
export function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <Modal emoji="💰" title="Packages" subtitle="Project-based systems with clear scope. Custom builds welcome too." onClose={onClose} maxWidth="56rem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="cg rounded-2xl p-6 flex flex-col">
          <h3 className="font-display font-extrabold text-lg" style={{ color: "#1a1a1a" }}>AI Starter</h3>
          <p className="text-[13px] mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>Everything you need to start with one focused AI system.</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="font-display font-extrabold text-3xl" style={{ color: "#E0008A" }}>$300</span>
            <span className="text-sm" style={{ color: "rgba(0,0,0,0.35)" }}>starting</span>
          </div>
          <div className="h-px my-4" style={{ background: "rgba(224,0,138,0.08)" }} />
          <ul className="space-y-2.5 flex-1">
            {["1 AI video OR automation workflow", "Basic AI chatbot setup", "CRM or tool integration", "1 landing page or funnel", "1-2 week delivery", "14-day post-launch support", "Unlimited revisions"].map(f => (
              <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(0,0,0,0.55)" }}>
                <span style={{ color: "#E0008A" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <a href="/book" className="mt-5 w-full cg-accent cg-gold rounded-2xl py-3 text-white font-display font-bold text-center transition-transform hover:scale-[1.01] active:scale-95 block">Book a strategy call</a>
        </div>
        <div className="rounded-2xl p-6 flex flex-col relative" style={{ background: "linear-gradient(135deg, #E0008A 0%, #B80068 40%, #B80068 100%)" }}>
          <span className="absolute -top-3 right-6 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full cg" style={{ color: "#E0008A" }}>Most popular</span>
          <h3 className="font-display font-extrabold text-lg text-white">Full AI System</h3>
          <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>The complete AI system, done for you, end to end.</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="font-display font-extrabold text-3xl text-white">$1,500</span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>starting</span>
          </div>
          <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.15)" }} />
          <ul className="space-y-2.5 flex-1">
            {["Everything in Starter, plus:", "AI video production (up to 5 assets)", "Up to 10 n8n automation workflows", "Multi-platform AI chatbot", "GoHighLevel CRM setup", "Email + SMS sequences", "Social media automation", "2-4 week delivery", "30-day support + optimization"].map(f => (
              <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <a href="/book" className="mt-5 w-full cg rounded-2xl py-3 font-display font-bold text-center transition-transform hover:scale-[1.01] active:scale-95 block" style={{ color: "#E0008A" }}>Book a strategy call</a>
        </div>
      </div>
    </Modal>
  );
}
