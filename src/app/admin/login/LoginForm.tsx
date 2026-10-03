"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E07A5F]/60 placeholder:text-zinc-500";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-[#121826] ring-1 ring-white/10 p-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
        <input id="email" type="email" autoComplete="username" required value={email}
          onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password}
          onChange={(e) => setPassword(e.target.value)} className={input} placeholder="••••••••" />
      </div>
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full rounded-xl bg-[#E07A5F] hover:bg-[#d56a4f] disabled:opacity-60 py-3 text-sm font-semibold text-white transition-colors">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
