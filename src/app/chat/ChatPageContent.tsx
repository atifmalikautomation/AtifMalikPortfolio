"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Smile, Mic, Paperclip, Volume2, Smartphone, Pause, UserCircle, Plus } from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";
import Link from "next/link";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  time?: string;
}

const avatars = ["😎", "🦊", "🐼", "🐱", "🦁", "🐧", "🦄", "🐸", "👾", "🤠", "🧑‍🚀", "🦖", "🐙", "🌟", "🍕", "🎮"];

const accentColors = [
  { value: "#0d9488", label: "Teal" },
  { value: "#22C55E", label: "Green" },
  { value: "#F5D020", label: "Gold" },
  { value: "#E0008A", label: "Pink" },
  { value: "#2563EB", label: "Blue" },
  { value: "#EF4444", label: "Red" },
  { value: "#F97316", label: "Orange" },
  { value: "#EC4899", label: "Rose" },
];

const quickActions = [
  { label: "Book a call", emoji: "📅", action: "I want to book a call" },
  { label: "Start a project", emoji: "🚀", action: "I want to start a project" },
  { label: "Portfolio", emoji: "👀", action: "Show me your portfolio" },
  { label: "Pricing", emoji: "💰", action: "What are your prices?" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getToday() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ChatPageContent() {
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("😎");
  const [userColor, setUserColor] = useState("#0d9488");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingText, scrollToBottom]);
  useEffect(() => { if (joined) inputRef.current?.focus(); }, [joined]);

  useEffect(() => {
    if (!joined) return;
    // Add "joined the chat" system message
    setMessages([{
      role: "system",
      content: `${userName || "Guest"} joined the chat 🎉`,
      time: getTime(),
    }]);
  }, [joined, userName]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim(), time: getTime() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStreamingText("");

    try {
      const apiMessages = newMessages
        .filter((m): m is Message & { role: "user" | "assistant" } => m.role !== "system")
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      if (!res.ok) throw new Error("Failed");

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
        setMessages(prev => [...prev, { role: "assistant", content: accumulated || "Couldn't generate a response.", time: getTime() }]);
        setStreamingText("");
      } else {
        const data = await res.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.content, time: getTime() }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Try the contact page.", time: getTime() }]);
      setStreamingText("");
    } finally {
      setLoading(false);
    }
  }

  // ─── ONBOARDING SCREEN (Yasir-exact style) ───
  if (!joined) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #fce4f0 0%, #fff5f9 25%, #ffffff 50%, #f0fdf4 80%, #d1fae5 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md md:max-w-3xl rounded-2xl sm:rounded-[2rem] md:grid md:grid-cols-2 md:gap-0 overflow-hidden mx-4 sm:mx-0"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
        >
          {/* Left — Branding */}
          <div className="p-6 md:p-10 flex flex-col justify-center" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 50%, #ecfdf5 100%)" }}>
            <div className="mx-auto md:mx-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl overflow-hidden" style={{ border: "2px solid rgba(224,0,138,0.2)" }}>
              <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={80} height={80} className="w-full h-full object-cover object-top" />
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-[2rem] mt-4 md:mt-5 text-center md:text-left" style={{ color: "#1a1a1a" }}>
              Atif&apos;s Studio
            </h1>
            <p className="text-sm mt-1 text-center md:text-left" style={{ color: "#888" }}>
              Premium websites &amp; AI growth systems,{" "}
              <em style={{ color: "#E0008A", fontStyle: "italic" }}>engineered to convert.</em>
            </p>

            {/* Preview avatar */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-6 md:mt-8">
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl"
                style={{ border: `2px solid ${userColor}20`, background: `${userColor}10` }}
              >
                {userAvatar}
              </div>
              <div className="text-left leading-tight">
                <div className="font-display font-bold" style={{ color: "#1a1a1a" }}>{userName || "Your name"}</div>
                <div className="text-[12px]" style={{ color: "#bbb" }}>{userEmail || "you@email.com"}</div>
              </div>
            </div>
          </div>

          {/* Divider mobile */}
          <div className="md:hidden h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

          {/* Right — Form */}
          <div className="p-6 md:p-10">
            <p className="font-display font-bold text-sm mb-4" style={{ color: "#1a1a1a" }}>Choose your vibe to join the chat</p>
            <input
              type="text"
              placeholder="Your name..."
              aria-label="Your name"
              maxLength={28}
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-[14px] outline-none mb-2.5 transition-colors"
              style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.08)", color: "#1a1a1a" }}
            />
            <input
              type="email"
              placeholder="Your email..."
              aria-label="Your email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 text-[14px] outline-none mb-1.5 transition-colors"
              style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.08)", color: "#1a1a1a" }}
            />
            <p className="text-[11px] mb-4" style={{ color: "#bbb" }}>No spam, ever. Your chat may be saved so Atif can jump in and help.</p>

            <div className="text-[12px] font-semibold mb-2.5" style={{ color: "#999" }}>Pick an avatar</div>
            <div className="grid grid-cols-8 gap-[6px] mb-5">
              {avatars.map(a => (
                <button
                  key={a}
                  onClick={() => setUserAvatar(a)}
                  className="w-9 h-9 rounded-lg text-[18px] flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    background: userAvatar === a ? `${userColor}18` : "#f5f5f5",
                    border: userAvatar === a ? `2px solid ${userColor}50` : "2px solid transparent",
                    transform: userAvatar === a ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  {a}
                </button>
              ))}
            </div>

            <div className="text-[12px] font-semibold mb-2.5" style={{ color: "#999" }}>Pick a color</div>
            <div className="flex items-center gap-3 mb-6">
              {accentColors.map(c => {
                const selected = userColor === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => setUserColor(c.value)}
                    className="rounded-full transition-all cursor-pointer flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: selected ? 34 : 28,
                      height: selected ? 34 : 28,
                      background: c.value,
                      boxShadow: selected ? `0 0 0 3px #fff, 0 0 0 5px ${c.value}` : "0 1px 3px rgba(0,0,0,0.12)",
                    }}
                    aria-label={c.label}
                  />
                );
              })}
            </div>

            <button
              onClick={() => { if (userName.trim()) setJoined(true); }}
              disabled={!userName.trim()}
              className="w-full py-3.5 rounded-2xl text-white font-display font-bold text-[14px] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${userColor}90, ${userColor}60)`,
              }}
            >
              Join the chat →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── CHAT SCREEN (Yasir-exact clone) ───
  return (
    <div className="h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #fce4f0 0%, #fff5f9 25%, #ffffff 50%, #f0fdf4 80%, #d1fae5 100%)" }}>
      {/* Header — frosted glass */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(224,0,138,0.2)" }}>
            <Image src="/images/atif-face.jpeg" alt="Atif Malik" width={36} height={36} className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <div className="text-sm font-display font-bold flex items-center gap-1.5" style={{ color: "#1a1a1a" }}>
              Atif&apos;s Studio <span className="text-sm">💬</span>
            </div>
            <div className="text-[11px]" style={{ color: "#999" }}>2 members · live</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors hover:opacity-80" style={{ color: "#666" }}>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block" />
            Visit site ↗
          </Link>
          <a
            href="https://wa.me/923196780720"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full text-white text-[12px] font-semibold hover:brightness-110 transition-all flex items-center gap-1.5"
            style={{ background: "linear-gradient(135deg, #E0008A, #FF4DA6)" }}
          >
            📞 <span className="hidden sm:inline">WhatsApp</span> call
          </a>
          {/* Avatar row */}
          <div className="hidden sm:flex items-center -space-x-2">
            <div className="w-7 h-7 rounded-full overflow-hidden" style={{ border: "2px solid #fff" }}>
              <Image src="/images/atif-face.jpeg" alt="Atif" width={28} height={28} className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ background: `${userColor}20`, border: "2px solid #fff" }}>
              {userAvatar}
            </div>
          </div>
          <button className="hidden sm:flex w-7 h-7 rounded-full items-center justify-center text-white" style={{ background: userColor }}>
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar (desktop only) — Yasir exact */}
        <div className="hidden md:flex flex-col w-[240px] shrink-0" style={{ background: "rgba(255,255,255,0.7)", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="p-5 pb-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: "2px solid rgba(224,0,138,0.2)" }}>
                <Image src="/images/atif-face.jpeg" alt="Atif" width={40} height={40} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="font-display font-bold text-sm" style={{ color: "#1a1a1a" }}>Atif&apos;s Studio</div>
                <div className="text-[11px]" style={{ color: "#999" }}>2 in the group</div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-4" style={{ color: "#bbb" }}>Members</div>

            {/* Atif — Host */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden" style={{ border: "1.5px solid rgba(224,0,138,0.2)" }}>
                  <Image src="/images/atif-face.jpeg" alt="Atif" width={36} height={36} className="w-full h-full object-cover object-top" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E]" style={{ border: "2px solid #fff" }} />
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "#1a1a1a" }}>Atif Malik</div>
                <div className="text-[10px] flex items-center gap-1" style={{ color: "#bbb" }}>
                  <span>👑</span> Host
                </div>
              </div>
            </div>

            {/* User — Guest */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base" style={{ background: `${userColor}15`, border: `1.5px solid ${userColor}30` }}>
                  {userAvatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E]" style={{ border: "2px solid #fff" }} />
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "#1a1a1a" }}>{userName} <span className="font-normal text-[11px]" style={{ color: "#bbb" }}>(you)</span></div>
                <div className="text-[10px]" style={{ color: "#bbb" }}>Guest</div>
              </div>
            </div>
          </div>

          {/* Add member button */}
          <div className="p-5 pt-0">
            <button
              className="w-full py-2.5 rounded-full text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${userColor}, ${userColor}cc)` }}
            >
              <Plus size={15} /> Add member
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Today divider */}
            <div className="flex justify-center mb-6">
              <span className="px-4 py-1 rounded-full text-[11px] font-medium" style={{ background: "rgba(255,255,255,0.8)", color: "#999", border: "1px solid rgba(0,0,0,0.06)" }}>
                Today
              </span>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg, i) => {
                // System message (joined the chat)
                if (msg.role === "system") {
                  return (
                    <div key={i} className="flex justify-center">
                      <span className="px-4 py-1.5 rounded-full text-[12px]" style={{ background: "rgba(0,0,0,0.04)", color: "#999" }}>
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={i}>
                    {(i === 0 || messages[i-1]?.role !== msg.role) && (
                      <div className="text-[10px] mb-1 ml-11" style={{ color: "#ccc" }}>{msg.time}</div>
                    )}
                    <div className={clsx("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}>
                      {msg.role === "assistant" ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1.5px solid rgba(224,0,138,0.2)" }}>
                          <Image src="/images/atif-face.jpeg" alt="Atif" width={32} height={32} className="w-full h-full object-cover object-top" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0" style={{ background: `${userColor}15`, border: `1.5px solid ${userColor}30` }}>{userAvatar}</div>
                      )}
                      <div>
                        <div className={clsx("text-[11px] font-medium mb-0.5", msg.role === "user" ? "text-right" : "")} style={{ color: "#bbb" }}>
                          {msg.role === "assistant" ? "Atif Malik" : userName}
                        </div>
                        <div
                          className={clsx("max-w-md rounded-[16px] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap", msg.role === "user" ? "rounded-tr-[4px]" : "rounded-tl-[4px]")}
                          style={msg.role === "user"
                            ? { background: userColor, color: "#fff" }
                            : { background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", color: "#444" }
                          }
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Streaming */}
              {streamingText && (
                <div className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ border: "1.5px solid rgba(224,0,138,0.2)" }}>
                    <Image src="/images/atif-face.jpeg" alt="Atif" width={32} height={32} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="text-[11px] mb-0.5" style={{ color: "#bbb" }}>Atif Malik</div>
                    <div className="max-w-md rounded-[16px] rounded-tl-[4px] px-4 py-2.5 text-[14px] whitespace-pre-wrap leading-relaxed" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", color: "#444" }}>
                      {streamingText}<span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse" style={{ background: `${userColor}60` }} />
                    </div>
                  </div>
                </div>
              )}

              {loading && !streamingText && (
                <div className="flex items-center gap-2 text-sm ml-11" style={{ color: "#bbb" }}>
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              )}
            </div>
          </div>

          {/* Quick actions — outlined pills like Yasir */}
          <div className="flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-2.5" style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
            {quickActions.map(a => (
              <button
                key={a.label}
                onClick={() => sendMessage(a.action)}
                className="px-4 py-2 text-[13px] rounded-full transition-all cursor-pointer hover:shadow-sm flex items-center gap-1.5 font-medium"
                style={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "#555",
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <span>{a.emoji}</span> {a.label}
              </button>
            ))}
          </div>

          {/* Input bar — Yasir exact with emoji, GIF, attachment, mic */}
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input); }}
            className="flex items-center gap-2 px-4 sm:px-6 py-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.7)" }}
          >
            <button type="button" className="p-1.5 rounded-full transition-colors cursor-pointer hover:bg-black/5" style={{ color: "#bbb" }} aria-label="Emoji">
              <Smile size={20} />
            </button>
            <span className="text-[13px] font-semibold cursor-pointer hover:opacity-70 transition-opacity select-none" style={{ color: "#bbb" }}>GIF</span>
            <button type="button" className="p-1.5 rounded-full transition-colors cursor-pointer hover:bg-black/5" style={{ color: "#bbb" }} aria-label="Attach">
              <Paperclip size={18} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Atif's Studio..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm outline-none transition-colors bg-transparent"
              style={{ color: "#1a1a1a" }}
            />
            {input.trim() ? (
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer hover:brightness-110"
                style={{ background: userColor }}
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            ) : (
              <button type="button" className="p-1.5 rounded-full transition-colors cursor-pointer hover:bg-black/5" style={{ color: "#bbb" }} aria-label="Voice">
                <Mic size={20} />
              </button>
            )}
          </form>
        </div>

        {/* Right side icons — Yasir exact vertical strip */}
        <div className="hidden md:flex flex-col items-center gap-3 py-6 px-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-black/5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)", color: "#999" }} aria-label="Sound">
            <Volume2 size={18} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-black/5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)", color: "#999" }} aria-label="Device">
            <Smartphone size={18} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{ background: userColor, color: "#fff" }} aria-label="Pause">
            <Pause size={18} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-black/5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.06)", color: "#999" }} aria-label="Profile">
            <UserCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
