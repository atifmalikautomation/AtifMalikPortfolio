"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  time?: string;
}

const avatars = ["😎", "🦊", "🐼", "🐱", "🦁", "🐧", "🦄", "🐸", "👾", "🤠", "🧑‍🚀", "🦖", "🐙", "🌟", "🍕", "🎮"];

const quickActions = [
  { label: "📅 Book a call", action: "I want to book a call" },
  { label: "🚀 Start a project", action: "I want to start a project" },
  { label: "👀 Portfolio", action: "Show me your portfolio" },
  { label: "💰 Pricing", action: "What are your prices?" },
  { label: "🤝 Work with me", action: "How can I work with you?" },
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatPageContent() {
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("😎");
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

  // Auto welcome message after joining
  useEffect(() => {
    if (!joined) return;
    const timer = setTimeout(() => {
      setMessages([{
        role: "assistant",
        content: `Hey ${userName || "there"} 👋 Welcome to Atif's Studio!\n\nI'm Atif's AI assistant. Ask me anything about services, pricing, or portfolio. Want to flick through some real projects right here? 👇`,
        time: getTime(),
      }]);
    }, 800);
    return () => clearTimeout(timer);
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
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

  // ─── ONBOARDING SCREEN ───
  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-bg relative overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-pink/10 blur-[120px] animate-float" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-pink/5 blur-[120px] animate-float-reverse" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-card border border-bd rounded-[2rem] w-full max-w-md md:max-w-3xl p-6 md:p-9 md:grid md:grid-cols-2 md:gap-9 md:items-center"
        >
          {/* Left — Branding */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="mx-auto md:mx-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-pink to-[#651545] border-2 border-[rgba(224,0,138,0.3)] flex items-center justify-center font-display italic text-white text-xl md:text-3xl font-extrabold">
              AM
            </div>
            <h1 className="font-display font-extrabold text-xl md:text-3xl text-wh mt-3 md:mt-4">
              Atif&apos;s Studio
            </h1>
            <p className="hidden md:block text-gr text-sm mt-1">
              Premium AI video production &amp; automation, <em className="text-pink">engineered to convert.</em>
            </p>

            {/* Preview avatar */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4 md:mt-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl border-2 border-[rgba(224,0,138,0.3)] bg-pink12">
                {userAvatar}
              </div>
              <div className="text-left leading-tight">
                <div className="font-display font-bold text-wh">{userName || "Your name"}</div>
                <div className="text-[12px] text-dm">{userEmail || "you@email.com"}</div>
              </div>
            </div>
          </div>

          <div className="md:hidden h-px bg-bd my-4" />

          {/* Right — Form */}
          <div>
            <p className="font-display font-bold text-wh text-sm mb-3">Choose your vibe to join the chat</p>
            <input
              type="text"
              placeholder="Your name…"
              maxLength={28}
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full bg-bg3 border border-bd rounded-2xl px-4 py-2.5 text-[15px] text-wh placeholder:text-dm outline-none mb-2 focus:border-[rgba(224,0,138,0.3)] transition-colors"
            />
            <input
              type="email"
              placeholder="Your email…"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              className="w-full bg-bg3 border border-bd rounded-2xl px-4 py-2.5 text-[15px] text-wh placeholder:text-dm outline-none mb-1 focus:border-[rgba(224,0,138,0.3)] transition-colors"
            />
            <p className="text-[11px] text-dm mb-3">No spam, ever. Your chat may be saved so Atif can jump in and help.</p>

            <div className="text-[12px] font-semibold text-dm mb-1.5">Pick an avatar</div>
            <div className="grid grid-cols-8 gap-1.5 mb-4">
              {avatars.map(a => (
                <button
                  key={a}
                  onClick={() => setUserAvatar(a)}
                  className={clsx(
                    "aspect-square rounded-xl text-lg md:text-xl flex items-center justify-center transition cursor-pointer",
                    userAvatar === a ? "bg-pink/20 scale-110" : "hover:bg-bg3"
                  )}
                >
                  {a}
                </button>
              ))}
            </div>

            <button
              onClick={() => { if (userName.trim()) setJoined(true); }}
              disabled={!userName.trim()}
              className="w-full py-3 rounded-2xl bg-pink text-white font-display font-bold text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Join the chat →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── CHAT SCREEN ───
  return (
    <div className="h-screen flex flex-col bg-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-bd bg-bg2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink to-[#651545] flex items-center justify-center text-sm font-bold text-white font-display">
            AM
          </div>
          <div>
            <div className="text-sm font-display font-bold text-wh flex items-center gap-2">
              Atif&apos;s Studio
              <span className="text-[10px] text-dm font-mono font-normal">💬</span>
            </div>
            <div className="text-[11px] text-gr">2 members · live</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[11px] font-mono text-dm hover:text-wh transition-colors">🌐 Visit site ↗</Link>
          <a href="https://wa.me/923196780720" target="_blank" rel="noopener noreferrer" className="ml-2 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-semibold hover:brightness-110 transition-all flex items-center gap-1">
            📞 WhatsApp call
          </a>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop only) */}
        <div className="hidden md:flex flex-col w-[200px] border-r border-bd bg-bg2 p-4">
          <div className="text-[10px] font-mono text-dm uppercase tracking-[0.1em] mb-3">Members</div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-[#651545] flex items-center justify-center text-[10px] font-bold text-white font-display">AM</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-bg2" />
            </div>
            <div>
              <div className="text-xs font-semibold text-wh">Atif Malik</div>
              <div className="text-[10px] text-dm">🏠 Host</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-pink12 flex items-center justify-center text-base">{userAvatar}</div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-bg2" />
            </div>
            <div>
              <div className="text-xs font-semibold text-wh">{userName}</div>
              <div className="text-[10px] text-dm">Guest</div>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i}>
                {/* Timestamp */}
                {(i === 0 || messages[i-1]?.role !== msg.role) && (
                  <div className="text-[10px] text-dm mb-1 ml-11">{msg.time}</div>
                )}
                <div className={clsx("flex gap-2.5", msg.role === "user" && "flex-row-reverse")}>
                  {/* Avatar */}
                  {msg.role === "assistant" ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-[#651545] flex items-center justify-center text-[10px] font-bold text-white font-display flex-shrink-0">AM</div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-pink12 flex items-center justify-center text-base flex-shrink-0">{userAvatar}</div>
                  )}
                  <div>
                    <div className={clsx("text-[11px] font-medium mb-0.5", msg.role === "user" ? "text-right text-dm" : "text-dm")}>
                      {msg.role === "assistant" ? "Atif Malik" : userName}
                    </div>
                    <div className={clsx(
                      "max-w-md rounded-[16px] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-pink text-white rounded-tr-[4px]"
                        : "bg-bg2 border border-bd text-gr rounded-tl-[4px]"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                </div>

                {/* Action buttons after first assistant message */}
                {msg.role === "assistant" && i === 0 && (
                  <div className="flex gap-2 ml-11 mt-2">
                    <button onClick={() => sendMessage("Show me your portfolio")} className="px-4 py-2 text-[13px] rounded-full bg-pink text-white font-medium hover:brightness-110 transition-all cursor-pointer">
                      👀 Browse my work
                    </button>
                    <button onClick={() => sendMessage("I want to start a project")} className="px-4 py-2 text-[13px] rounded-full bg-pink text-white font-medium hover:brightness-110 transition-all cursor-pointer">
                      🚀 Start a project
                    </button>
                  </div>
                )}
              </div>
            ))}

            {streamingText && (
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink to-[#651545] flex items-center justify-center text-[10px] font-bold text-white font-display flex-shrink-0">AM</div>
                <div>
                  <div className="text-[11px] text-dm mb-0.5">Atif Malik</div>
                  <div className="max-w-md rounded-[16px] rounded-tl-[4px] bg-bg2 border border-bd px-4 py-2.5 text-[14px] text-gr whitespace-pre-wrap leading-relaxed">
                    {streamingText}<span className="inline-block w-1.5 h-4 bg-pink/60 ml-0.5 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {loading && !streamingText && (
              <div className="flex items-center gap-2 text-dm text-sm ml-11">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-1.5 px-4 sm:px-6 py-2 border-t border-bd">
            {quickActions.map(a => (
              <button key={a.label} onClick={() => sendMessage(a.action)} className="px-3 py-1.5 text-[11px] rounded-full border border-bd text-dm hover:text-wh hover:border-[rgba(224,0,138,0.3)] hover:bg-pink06 transition-all cursor-pointer">
                {a.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-3 px-4 sm:px-6 py-3 border-t border-bd">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Message Atif's Studio..."
              disabled={loading}
              className="flex-1 bg-bg2 rounded-full px-5 py-3 text-sm text-wh placeholder:text-dm border border-bd focus:border-[rgba(224,0,138,0.3)] focus:outline-none transition-colors"
            />
            <button type="submit" disabled={!input.trim() || loading} className="p-3 rounded-full bg-pink text-white hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
