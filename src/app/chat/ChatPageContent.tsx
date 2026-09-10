"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2, Volume2, Copy, Pause, User } from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { BookCallModal, ProjectModal, PortfolioModal, PricingModal } from "./ChatModals";

/* ── Types ── */
type BubbleKind =
  | { kind: "text"; text: string }
  | { kind: "stat"; items: { value: string; label: string }[] }
  | { kind: "actions"; items: { label: string; panel: string }[] }
  | { kind: "system"; text: string };

interface ChatMsg {
  senderId: "atif" | "me" | "sys";
  bubbles: BubbleKind[];
  time?: string;
}

/* ── Config ── */
const avatars = ["😎", "🦊", "🐼", "🐱", "🦁", "🐧", "🦄", "🐸", "👾", "🤠", "🧑‍🚀", "🦖", "🐙", "🌟", "🍕", "🎮"];

const accentColors = [
  { value: "#0d9488", label: "Teal" }, { value: "#22C55E", label: "Green" },
  { value: "#F5D020", label: "Gold" }, { value: "#E0008A", label: "Pink" },
  { value: "#2563EB", label: "Blue" }, { value: "#EF4444", label: "Red" },
  { value: "#F97316", label: "Orange" }, { value: "#EC4899", label: "Rose" },
];

/* Initial welcome messages — Yasir exact flow */
const WELCOME_BUBBLES: BubbleKind[] = [
  { kind: "text", text: "Hey, so glad you're here 👋 I'm Atif. I build premium websites, AI video content, and automation systems that actually convert." },
  { kind: "stat", items: [{ value: "5+ yrs", label: "experience" }, { value: "800+", label: "projects" }, { value: "5★", label: "Fiverr & Upwork" }] },
  { kind: "text", text: "Think of this as my whole studio in one chat. Ask me anything, or just jump straight in below. Whatever's easiest for you 👇" },
  { kind: "actions", items: [{ label: "📅 Book a call", panel: "book" }, { label: "🚀 Start a project", panel: "project" }, { label: "👀 See my work", panel: "portfolio" }, { label: "💰 Pricing", panel: "pricing" }] },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

/* ── Avatar bubble (Yasir Rn clone) ── */
function Av({ emoji, color, size = 40 }: { emoji: string; color: string; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${color}, ${color}cc)`, fontSize: size * 0.5, boxShadow: `0 2px 8px ${color}55` }}>
      <span style={{ lineHeight: 1 }}>{emoji}</span>
    </div>
  );
}

/* ── Typing indicator (3 bouncing dots) ── */
function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
        <Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[12px] font-semibold ml-1 mb-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>Atif Malik</span>
        <div className="cg rounded-3xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: "rgba(224,0,138,0.5)" }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export function ChatPageContent() {
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("😎");
  const [userColor, setUserColor] = useState("#0d9488");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [typing, setTyping] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingText, typing, scrollToBottom]);
  useEffect(() => { if (joined) inputRef.current?.focus(); }, [joined]);

  /* Auto welcome flow — Yasir exact: typing indicator → message → next */
  useEffect(() => {
    if (!joined) return;
    let cancelled = false;

    (async () => {
      // System message: "X joined the chat 🎉"
      setMessages([{ senderId: "sys", bubbles: [{ kind: "system", text: `${userName} joined the chat 🎉` }], time: getTime() }]);
      await wait(400);

      // Send welcome bubbles one by one with typing
      for (const bubble of WELCOME_BUBBLES) {
        if (cancelled) return;
        setTyping(true);
        await wait(bubble.kind === "text" ? 650 : 820);
        if (cancelled) return;
        setTyping(false);
        setMessages(prev => [...prev, { senderId: "atif", bubbles: [bubble], time: getTime() }]);
        await wait(180);
      }
    })();

    return () => { cancelled = true; };
  }, [joined, userName]);

  /* Send user message to AI */
  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMsg = { senderId: "me", bubbles: [{ kind: "text", text: text.trim() }], time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingText("");
    setTyping(true);

    try {
      const history = messages
        .filter(m => m.senderId !== "sys")
        .flatMap(m => m.bubbles.filter((b): b is { kind: "text"; text: string } => b.kind === "text")
          .map(b => ({ role: m.senderId === "me" ? "user" as const : "assistant" as const, content: b.text })))
        .concat([{ role: "user" as const, content: text.trim() }]);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error("Failed");

      setTyping(false);

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            for (const line of chunk.split("\n")) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) { accumulated += parsed.text; setStreamingText(accumulated); }
                } catch { /* skip */ }
              }
            }
          }
        }
        setMessages(prev => [...prev, { senderId: "atif", bubbles: [{ kind: "text", text: accumulated || "Couldn't generate a response." }], time: getTime() }]);
        setStreamingText("");
      } else {
        const data = await res.json();
        setMessages(prev => [...prev, { senderId: "atif", bubbles: [{ kind: "text", text: data.content }], time: getTime() }]);
      }
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, { senderId: "atif", bubbles: [{ kind: "text", text: "Sorry, something went wrong. Try the contact page." }], time: getTime() }]);
      setStreamingText("");
    } finally {
      setLoading(false);
    }
  }

  /* ── Render a single bubble ── */
  function renderBubble(bubble: BubbleKind) {
    switch (bubble.kind) {
      case "text":
        return <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{bubble.text}</p>;
      case "stat":
        return (
          <div className="grid grid-cols-3 gap-3 py-1">
            {bubble.items.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-extrabold text-xl leading-none" style={{ color: "#E0008A" }}>{s.value}</div>
                <div className="text-[11px] mt-1 leading-tight" style={{ color: "rgba(0,0,0,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        );
      case "actions":
        return (
          <div className="flex flex-wrap gap-2 py-0.5">
            {bubble.items.map(a => (
              <button key={a.panel} onClick={() => setPanel(a.panel)}
                className="cg-accent cg-gold rounded-2xl px-4 py-2.5 text-white font-display font-bold text-[14px] transition-transform hover:scale-[1.03] active:scale-95 cursor-pointer">
                {a.label}
              </button>
            ))}
          </div>
        );
      case "system":
        return null; // rendered separately
    }
  }

  // ─── ONBOARDING ───
  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fce4f0 0%, #fff5f9 25%, #ffffff 50%, #f0fdf4 80%, #d1fae5 100%)" }}>
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md md:max-w-3xl rounded-2xl sm:rounded-[2rem] md:grid md:grid-cols-2 overflow-hidden mx-4 sm:mx-0"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 25px 80px rgba(0,0,0,0.1)" }}>
          <div className="p-6 md:p-10 flex flex-col justify-center" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 50%, #ecfdf5 100%)" }}>
            <div className="mx-auto md:mx-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl overflow-hidden cg-gold" style={{ border: "2px solid rgba(224,0,138,0.2)" }}>
              <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={80} height={80} className="w-full h-full object-cover object-top" />
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-[2rem] mt-4 md:mt-5 text-center md:text-left" style={{ color: "#1a1a1a" }}>Atif&apos;s Studio</h1>
            <p className="text-sm mt-1 text-center md:text-left" style={{ color: "#888" }}>
              Premium websites &amp; AI growth systems, <em style={{ color: "#E0008A", fontStyle: "italic" }}>engineered to convert.</em>
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3 md:mt-6">
              <Av emoji={userAvatar} color={userColor} size={56} />
              <div className="text-left leading-tight">
                <div className="font-display font-bold" style={{ color: "#1a1a1a" }}>{userName || "Your name"}</div>
                <div className="text-[12px]" style={{ color: "#bbb" }}>{userEmail || "you@email.com"}</div>
              </div>
            </div>
          </div>
          <div className="md:hidden h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
          <div className="p-6 md:p-10">
            <p className="font-display font-bold text-sm mb-2" style={{ color: "#1a1a1a" }}>Choose your vibe to join the chat</p>
            <input type="text" placeholder="Your name…" maxLength={28} value={userName} onChange={e => setUserName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && userName.trim() && setJoined(true)}
              className="w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none mb-2 placeholder:opacity-40" style={{ color: "#1a1a1a" }} />
            <input type="email" placeholder="Your email…" value={userEmail} onChange={e => setUserEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && userName.trim() && setJoined(true)}
              className="w-full cg rounded-2xl px-4 py-2.5 text-[15px] outline-none mb-1 placeholder:opacity-40" style={{ color: "#1a1a1a" }} />
            <p className="text-[11px] mb-3" style={{ color: "#bbb" }}>No spam, ever. Your chat may be saved so Atif can jump in and help.</p>
            <div className="text-[12px] font-semibold mb-1.5" style={{ color: "#999" }}>Pick an avatar</div>
            <div className="grid grid-cols-8 gap-1.5 mb-3">
              {avatars.map(a => (
                <button key={a} onClick={() => setUserAvatar(a)}
                  className={clsx("aspect-square rounded-xl text-lg md:text-xl flex items-center justify-center transition cursor-pointer", userAvatar === a ? "scale-110" : "hover:bg-black/5")}
                  style={userAvatar === a ? { background: `${userColor}20` } : undefined}>{a}</button>
              ))}
            </div>
            <div className="text-[12px] font-semibold mb-1.5" style={{ color: "#999" }}>Pick a color</div>
            <div className="grid grid-cols-8 gap-2 mb-4">
              {accentColors.map(c => (
                <button key={c.value} onClick={() => setUserColor(c.value)}
                  className={clsx("w-7 h-7 rounded-full transition mx-auto cursor-pointer", userColor === c.value && "ring-2 ring-offset-2 scale-110")}
                  style={{ background: c.value, ...(userColor === c.value ? { "--tw-ring-color": "rgba(15,46,39,0.4)" } as React.CSSProperties : {}) }}
                  aria-label={c.label} />
              ))}
            </div>
            <button onClick={() => { if (userName.trim()) setJoined(true); }} disabled={!userName.trim()}
              className="cg-accent cg-gold w-full rounded-2xl py-3 font-display font-bold text-white text-base transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
              Join the chat →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── CHAT SCREEN ───
  return (
    <>
      <div className="h-screen flex" style={{ background: "linear-gradient(180deg, #fce4f0 0%, #fff5f9 25%, #ffffff 50%, #f0fdf4 80%, #d1fae5 100%)" }}>
        {/* Sidebar */}
        <aside className="hidden md:block w-72 shrink-0 p-3">
          <div className="cg rounded-3xl h-full flex flex-col p-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-10 h-10 rounded-2xl cg-accent cg-gold overflow-hidden">
                <Image src="/images/atif-face.jpeg" alt="Atif" width={40} height={40} className="w-full h-full object-cover object-top" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-[15px]" style={{ color: "#1a1a1a" }}>Atif&apos;s Studio</div>
                <div className="text-[11px]" style={{ color: "#E0008A" }}>2 in the group</div>
              </div>
            </div>
            <div className="h-px my-4" style={{ background: "rgba(0,0,0,0.08)" }} />
            <div className="text-[11px] font-bold uppercase tracking-wider px-1 mb-2" style={{ color: "rgba(0,0,0,0.3)" }}>Members</div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1">
              <div className="flex items-center gap-3 px-1.5 py-1.5 rounded-2xl hover:bg-black/5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full overflow-hidden"><Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" /></div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#36c9ab" }} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "#1a1a1a" }}>Atif Malik</div>
                  <div className="text-[11px] truncate" style={{ color: "rgba(0,0,0,0.4)" }}>👑 Host</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-1.5 py-1.5 rounded-2xl hover:bg-black/5">
                <div className="relative">
                  <Av emoji={userAvatar} color={userColor} size={36} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#36c9ab" }} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "#1a1a1a" }}>{userName}<span className="font-normal" style={{ color: "rgba(0,0,0,0.3)" }}> (you)</span></div>
                  <div className="text-[11px] truncate" style={{ color: "rgba(0,0,0,0.4)" }}>Guest</div>
                </div>
              </div>
            </div>
            <button className="mt-3 cg-accent cg-gold rounded-2xl py-3 font-display font-bold text-white text-sm transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer">➕ Add member</button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="cg flex items-center justify-between px-4 sm:px-5 py-3 shrink-0" style={{ borderRadius: 0, border: "none", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden md:hidden" style={{ border: "1px solid rgba(224,0,138,0.2)" }}>
                <Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="text-sm font-display font-bold flex items-center gap-1.5" style={{ color: "#1a1a1a" }}>Atif&apos;s Studio <span>💬</span></div>
                <div className="text-[11px]" style={{ color: "#999" }}>2 members · live</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold hover:bg-black/5 transition-colors rounded-full px-2.5 py-1.5" style={{ color: "#666" }}>🌐 Visit site ↗</Link>
              <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer"
                className="cg-accent cg-gold rounded-full pl-2.5 pr-3 h-9 flex items-center gap-1.5 text-white text-[13px] font-semibold transition-transform hover:scale-105 active:scale-95">
                📞 <span className="hidden sm:inline">WhatsApp call</span>
              </a>
              <div className="hidden md:flex -space-x-2.5">
                <div className="ring-2 ring-white rounded-full"><div className="w-8 h-8 rounded-full overflow-hidden"><Image src="/images/atif-face.jpeg" alt="Atif" width={32} height={32} className="w-full h-full object-cover object-top" /></div></div>
                <div className="ring-2 ring-white rounded-full"><Av emoji={userAvatar} color={userColor} size={32} /></div>
              </div>
              <button className="hidden md:flex cg-accent cg-gold w-9 h-9 rounded-full items-center justify-center text-white text-lg transition-transform hover:scale-110 active:scale-90 shrink-0 cursor-pointer">＋</button>
            </div>
          </header>

          {/* Chat body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex justify-center mb-4">
              <span className="cg rounded-full px-4 py-1 text-[11px] font-medium" style={{ color: "#999" }}>Today</span>
            </div>

            <div className="space-y-3">
              {messages.map((msg, i) => {
                // System message
                if (msg.senderId === "sys") {
                  return (
                    <div key={i} className="flex justify-center my-1">
                      <span className="cg rounded-full px-3.5 py-1 text-[12px]" style={{ color: "rgba(0,0,0,0.4)" }}>
                        {(msg.bubbles[0] as { kind: "system"; text: string }).text}
                      </span>
                    </div>
                  );
                }

                const isMe = msg.senderId === "me";

                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className={clsx("flex gap-2.5", isMe ? "flex-row-reverse" : "flex-row")}>
                    {!isMe ? (
                      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0"><Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" /></div>
                    ) : <Av emoji={userAvatar} color={userColor} size={36} />}
                    <div className={clsx("flex flex-col", isMe ? "items-end" : "items-start")} style={{ maxWidth: "min(78%, 520px)" }}>
                      {!isMe && <span className="text-[12px] font-semibold ml-1 mb-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>Atif Malik</span>}
                      <div className={clsx("px-4 py-2.5", isMe ? "cg-accent text-white rounded-3xl rounded-tr-md" : "cg rounded-3xl rounded-tl-md")}
                        style={!isMe ? { color: "#444" } : undefined}>
                        {msg.bubbles.map((b, j) => <div key={j}>{renderBubble(b)}</div>)}
                      </div>
                      <div className={clsx("flex items-center gap-1 mt-0.5 px-1 text-[10px]", isMe && "flex-row-reverse")} style={{ color: "rgba(0,0,0,0.3)" }}>
                        <span>{msg.time}</span>
                        {isMe && <span className="font-bold" style={{ color: "#E0008A" }}>✓</span>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {typing && <TypingDots />}

              {/* Streaming */}
              {streamingText && (
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0"><Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" /></div>
                  <div className="flex flex-col items-start" style={{ maxWidth: "min(78%, 520px)" }}>
                    <span className="text-[12px] font-semibold ml-1 mb-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>Atif Malik</span>
                    <div className="cg rounded-3xl rounded-tl-md px-4 py-2.5 text-[15px] whitespace-pre-wrap leading-relaxed break-words" style={{ color: "#444" }}>
                      {streamingText}<span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse rounded-sm" style={{ background: "rgba(224,0,138,0.4)" }} />
                    </div>
                  </div>
                </div>
              )}

              {loading && !streamingText && !typing && (
                <div className="flex items-center gap-2 text-sm ml-12" style={{ color: "#bbb" }}>
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              )}
            </div>
          </div>

          {/* Standalone quick action buttons — outlined pills like Yasir */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-2">
            {[
              { label: "📅 Book a call", panel: "book" },
              { label: "🚀 Start a project", panel: "project" },
              { label: "👀 Portfolio", panel: "portfolio" },
              { label: "💰 Pricing", panel: "pricing" },
            ].map(a => (
              <button key={a.panel} onClick={() => setPanel(a.panel)}
                className="cg rounded-full px-4 py-2 text-[13px] font-medium transition hover:scale-105 active:scale-95 cursor-pointer"
                style={{ color: "#E0008A" }}>
                {a.label}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div className="px-3 sm:px-4 pb-3 pt-1">
            <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="cg rounded-[1.75rem] p-2 flex items-center gap-1" style={{ border: "none" }}>
              <button type="button" className="w-10 h-10 rounded-full text-xl flex items-center justify-center hover:bg-black/5 transition active:scale-90 cursor-pointer">😊</button>
              <button type="button" className="h-10 px-2.5 rounded-full text-[12px] font-extrabold tracking-wide flex items-center justify-center hover:bg-black/5 transition active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}>GIF</button>
              <button type="button" className="w-10 h-10 rounded-full text-lg flex items-center justify-center hover:bg-black/5 transition active:scale-90 cursor-pointer">📎</button>
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Message Atif's Studio…" disabled={loading}
                className="flex-1 bg-transparent px-3 py-2.5 text-[15px] placeholder:opacity-40 outline-none min-w-0" style={{ color: "#1a1a1a" }} />
              {input.trim() ? (
                <button type="submit" disabled={loading} className="cg-accent cg-gold w-11 h-11 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-transform active:scale-90 shrink-0 cursor-pointer" aria-label="Send">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
                </button>
              ) : (
                <button type="button" className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-pink/15 transition-transform active:scale-90 shrink-0 cursor-pointer" style={{ color: "#E0008A" }} aria-label="Voice">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right icons — Yasir exact: Lucide icons in circles */}
        <div className="hidden md:flex flex-col items-center gap-3 py-6 px-3 shrink-0">
          <button className="w-10 h-10 rounded-full flex items-center justify-center cg hover:bg-black/5 transition-transform active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}><Volume2 size={18} /></button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center cg hover:bg-black/5 transition-transform active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}><Copy size={18} /></button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center cg-accent cg-gold text-white transition-transform active:scale-90 cursor-pointer"><Pause size={18} /></button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center cg hover:bg-black/5 transition-transform active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}><User size={18} /></button>
        </div>
      </div>

      {/* Modals */}
      <BookCallModal open={panel === "book"} onClose={() => setPanel(null)} />
      <ProjectModal open={panel === "project"} onClose={() => setPanel(null)} userName={userName} userEmail={userEmail} />
      <PortfolioModal open={panel === "portfolio"} onClose={() => setPanel(null)} />
      <PricingModal open={panel === "pricing"} onClose={() => setPanel(null)} />
    </>
  );
}
