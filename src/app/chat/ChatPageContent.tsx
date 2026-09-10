"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";
import { BookCallModal, ProjectModal, PortfolioModal, PricingModal, InviteModal } from "./ChatModals";

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

const EMOJI_GRID = ["😀","😁","😂","🤣","😊","😍","😎","🤩","🥳","😇","🤔","😏","😅","🤯","👍","👎","👏","🙌","🤝","🙏","💪","✌️","🤙","👋","🔥","✨","⚡","💯","🎉","🚀","💸","💰","📈","❤️","💛","💚","💙","💜","🤍","💖"];

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

/* ── Sound system (Yasir exact — Web Audio API) ── */
let audioCtx: AudioContext | null = null;
function getAudioCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function tone(freq: number, time: number, dur: number, opts: { type?: OscillatorType; gain?: number; glideTo?: number } = {}) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const { type = "sine", gain = 0.14, glideTo } = opts;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, time + dur);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(gain, time + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(time); osc.stop(time + dur + 0.03);
}
function playJoinSound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  tone(523.25, t, 0.5, { gain: 0.11 });
  tone(659.25, t + 0.09, 0.5, { gain: 0.11 });
  tone(783.99, t + 0.18, 0.6, { gain: 0.12 });
  tone(1046.5, t + 0.27, 0.75, { gain: 0.09 });
}
function playReceiveSound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  tone(880, t, 0.22, { gain: 0.11 });
  tone(1174.66, t + 0.1, 0.32, { gain: 0.10 });
}
function playSendSound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  tone(440, ctx.currentTime, 0.18, { type: "triangle", gain: 0.13, glideTo: 880 });
}

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
  const [soundOn, setSoundOn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
      if (soundOn) playJoinSound();
      await wait(400);

      // Send welcome bubbles one by one with typing
      for (const bubble of WELCOME_BUBBLES) {
        if (cancelled) return;
        setTyping(true);
        await wait(bubble.kind === "text" ? 650 : 820);
        if (cancelled) return;
        setTyping(false);
        setMessages(prev => [...prev, { senderId: "atif", bubbles: [bubble], time: getTime() }]);
        if (soundOn) playReceiveSound();
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
    if (soundOn) playSendSound();
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
        if (soundOn) playReceiveSound();
        setStreamingText("");
      } else {
        const data = await res.json();
        setMessages(prev => [...prev, { senderId: "atif", bubbles: [{ kind: "text", text: data.content }], time: getTime() }]);
        if (soundOn) playReceiveSound();
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
        {/* Mobile sidebar overlay */}
        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={clsx(
          "fixed md:static z-40 top-0 left-0 h-full w-72 shrink-0 p-3 transition-transform md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="cg rounded-3xl h-full flex flex-col p-4">
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-10 h-10 rounded-full cg-accent cg-gold overflow-hidden shrink-0">
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
            <button onClick={() => setPanel("invite")} className="mt-3 cg-accent cg-gold rounded-2xl py-3 font-display font-bold text-white text-sm transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer">➕ Add member</button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header — Yasir exact */}
          <header className="cg flex items-center px-4 sm:px-5 py-3 shrink-0 gap-3 mx-3 mt-3 rounded-full" style={{ border: "none" }}>
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden w-9 h-9 rounded-xl hover:bg-black/5 flex items-center justify-center cursor-pointer" style={{ color: "#1a1a1a" }}>☰</button>
            {/* Title */}
            <div className="leading-tight min-w-0">
              <div className="font-display font-extrabold truncate flex items-center gap-1.5" style={{ color: "#1a1a1a" }}>Atif&apos;s Studio 💬</div>
              <div className="text-[12px]" style={{ color: "#E0008A" }}>2 members · live</div>
            </div>
            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-semibold hover:bg-black/5 transition-colors" style={{ color: "#E0008A" }}>
                🌐 <span>Visit site ↗</span>
              </Link>
              <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer"
                className="cg-accent cg-gold rounded-full pl-2.5 pr-3 h-9 flex items-center gap-1.5 text-white text-[13px] font-semibold transition-transform hover:scale-105 active:scale-95">
                📞 <span className="hidden sm:inline">WhatsApp call</span>
              </a>
            </div>
            {/* Avatar stack */}
            <div className="hidden md:flex -space-x-2.5">
              <div className="ring-2 ring-white rounded-full"><div className="w-8 h-8 rounded-full overflow-hidden"><Image src="/images/atif-face.jpeg" alt="Atif" width={32} height={32} className="w-full h-full object-cover object-top" /></div></div>
              <div className="ring-2 ring-white rounded-full"><Av emoji={userAvatar} color={userColor} size={32} /></div>
            </div>
            {/* + button */}
            <button onClick={() => setPanel("invite")} className="hidden md:flex cg-accent cg-gold w-9 h-9 rounded-full items-center justify-center text-white text-lg transition-transform hover:scale-110 active:scale-90 shrink-0 cursor-pointer">＋</button>
            {/* User's avatar — click to open profile */}
            <button onClick={() => setProfileOpen(true)} title="Your profile" className="hidden md:block shrink-0 rounded-full ring-2 ring-white transition-transform hover:scale-110 active:scale-90 cursor-pointer">
              <Av emoji={userAvatar} color={userColor} size={34} />
            </button>
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

          {/* Standalone quick action pills — Yasir exact: glass rounded-full */}
          <div className="flex gap-2 px-4 sm:px-6 py-2 overflow-x-auto">
            {[
              { label: "📅 Book a call", panel: "book" },
              { label: "🚀 Start a project", panel: "project" },
              { label: "👀 Portfolio", panel: "portfolio" },
              { label: "💰 Pricing", panel: "pricing" },
            ].map(a => (
              <button key={a.panel} onClick={() => setPanel(a.panel)}
                className="cg rounded-full px-3.5 py-1.5 text-[13px] font-semibold hover:bg-pink/10 transition active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
                style={{ color: "#E0008A" }}>
                {a.label}
              </button>
            ))}
          </div>

          {/* Input bar — Yasir exact: footer with glass container */}
          <footer className="px-3 pb-4 pt-1">
            <div className="max-w-4xl mx-auto w-full relative">
              {/* Emoji picker popup */}
              {emojiOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute bottom-full mb-3 left-0 z-30 cg rounded-2xl p-3 w-[320px] max-w-[80vw]">
                  <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                    {EMOJI_GRID.map(e => (
                      <button key={e} type="button" onClick={() => { setInput(prev => prev + e); setEmojiOpen(false); inputRef.current?.focus(); }}
                        className="aspect-square rounded-lg text-lg flex items-center justify-center hover:bg-pink/15 transition active:scale-90 cursor-pointer">{e}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Hidden file input */}
              <input ref={fileRef} type="file" className="hidden" onChange={e => {
                const file = e.target.files?.[0];
                if (file) sendMessage(`📎 Sent a file: ${file.name}`);
                e.target.value = "";
              }} />

              <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="cg rounded-[1.75rem] p-2 flex items-center gap-1" style={{ border: "none" }}>
                <button type="button" onClick={() => setEmojiOpen(!emojiOpen)}
                  className={clsx("w-10 h-10 rounded-full text-xl flex items-center justify-center transition active:scale-90 cursor-pointer", emojiOpen ? "bg-pink/20" : "hover:bg-black/5")}>😊</button>
                <button type="button" onClick={() => sendMessage("Show me some fun GIFs!")}
                  className={clsx("h-10 px-2.5 rounded-full text-[12px] font-extrabold tracking-wide flex items-center justify-center hover:bg-black/5 transition active:scale-90 cursor-pointer")}
                  style={{ color: "rgba(0,0,0,0.4)" }}>GIF</button>
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="w-10 h-10 rounded-full text-lg flex items-center justify-center hover:bg-black/5 transition active:scale-90 cursor-pointer">📎</button>
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                  onFocus={() => setEmojiOpen(false)} placeholder="Message Atif's Studio…" disabled={loading}
                  className="flex-1 bg-transparent px-3 py-2.5 text-[15px] placeholder:opacity-40 outline-none min-w-0" style={{ color: "#1a1a1a" }} />
                {input.trim() ? (
                  <button type="submit" disabled={loading} className="cg-accent cg-gold w-11 h-11 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-transform active:scale-90 shrink-0 cursor-pointer" aria-label="Send">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></svg>
                  </button>
                ) : (
                  <button type="button"
                    className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-pink/15 transition-transform active:scale-90 shrink-0 cursor-pointer" style={{ color: "#E0008A" }} aria-label="Voice"
                    title="Type a message to send">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                  </button>
                )}
              </form>
            </div>
          </footer>
        </div>

        {/* Right side — Yasir exact: fixed, functional buttons with emoji */}
        <div className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col gap-2.5">
          {[
            { icon: soundOn ? "🔊" : "🔇", label: soundOn ? "Sound on" : "Sound off", onClick: () => setSoundOn(!soundOn) },
            { icon: "📄", label: "Save as PDF", onClick: () => {
              const chatEl = scrollRef.current;
              if (!chatEl) return;
              const win = window.open("", "_blank");
              if (!win) return;
              const msgs = messages.filter(m => m.senderId !== "sys").map(m => {
                const name = m.senderId === "me" ? userName : "Atif Malik";
                const texts = m.bubbles.filter((b): b is { kind: "text"; text: string } => b.kind === "text").map(b => b.text).join("\n");
                return `<div style="margin-bottom:16px"><strong>${name}</strong> <span style="color:#999;font-size:12px">${m.time || ""}</span><p style="margin:4px 0;white-space:pre-wrap">${texts}</p></div>`;
              }).join("");
              win.document.write(`<!DOCTYPE html><html><head><title>Chat with Atif - ${new Date().toLocaleDateString()}</title><style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#333}h1{font-size:20px;color:#E0008A}hr{border:none;border-top:1px solid #eee;margin:20px 0}</style></head><body><h1>Atif's Studio — Chat Export</h1><p style="color:#999">${new Date().toLocaleString()}</p><hr/>${msgs}<hr/><p style="color:#999;font-size:12px">Exported from atifmalik.me/chat</p></body></html>`);
              win.document.close();
              win.print();
            } },
            { icon: "⏸️", label: "Pause & exit", onClick: () => { setJoined(false); setMessages([]); } },
            { icon: "🗑️", label: "Start over", onClick: () => { setMessages([]); setJoined(false); }, danger: true },
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick} title={btn.label}
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center text-lg transition active:scale-90 cursor-pointer",
                "danger" in btn && btn.danger ? "cg hover:bg-red-500/10" : "cg hover:bg-black/5"
              )}>
              {btn.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Profile popup — Yasir exact */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" onClick={() => setProfileOpen(false)}>
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(15,46,39,0.25)" }} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={e => e.stopPropagation()}
            className="cg rounded-3xl w-full max-w-sm p-5 relative text-center">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-extrabold text-lg" style={{ color: "#1a1a1a" }}>👤 Your profile</h3>
              <button onClick={() => setProfileOpen(false)} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-lg transition active:scale-90 cursor-pointer" style={{ color: "rgba(0,0,0,0.4)" }}>✕</button>
            </div>
            <div className="flex flex-col items-center gap-3 py-4">
              <Av emoji={userAvatar} color={userColor} size={56} />
              <div>
                <div className="font-display font-extrabold text-lg" style={{ color: "#1a1a1a" }}>{userName}</div>
                {userEmail && <div className="text-[13px]" style={{ color: "rgba(0,0,0,0.4)" }}>{userEmail}</div>}
                <div className="text-[12px] mt-0.5" style={{ color: "#E0008A" }}>Signed in</div>
              </div>
            </div>
            <button onClick={() => { setProfileOpen(false); setJoined(false); setMessages([]); }}
              className="w-full cg rounded-2xl py-3 font-display font-bold text-red-500 hover:bg-red-500/10 transition active:scale-[0.98] cursor-pointer">
              Sign out
            </button>
            <p className="text-[11px] text-center mt-2" style={{ color: "rgba(0,0,0,0.35)" }}>
              Signing out ends this chat. You can sign back in anytime.
            </p>
          </motion.div>
        </div>
      )}

      {/* Modals */}
      <BookCallModal open={panel === "book"} onClose={() => setPanel(null)} />
      <ProjectModal open={panel === "project"} onClose={() => setPanel(null)} userName={userName} userEmail={userEmail} />
      <PortfolioModal open={panel === "portfolio"} onClose={() => setPanel(null)} />
      <PricingModal open={panel === "pricing"} onClose={() => setPanel(null)} />
      <InviteModal open={panel === "invite"} onClose={() => setPanel(null)} />
    </>
  );
}
