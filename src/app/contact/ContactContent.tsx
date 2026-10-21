"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { Mail, MessageCircle, Send } from "lucide-react";
import { getTrackingIds } from "@/lib/tracker-client";

export function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form", ...(getTrackingIds() ?? {}) }),
      });
      const data: { error?: string } = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message || "Failed to send. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pt-4">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Contact"
            title="Let's Build Something Together"
            subtitle="Tell me about your project. I'll get back to you within 24 hours."
          />

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            {/* Form */}
            <div className="rounded-2xl border border-bd bg-card p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-pink12 border border-pink/30 mx-auto mb-4 flex items-center justify-center">
                    <Send size={24} className="text-pink" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-wh mb-2">Message Sent!</h3>
                  <p className="text-gr">
                    I&apos;ll review your message and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                    />
                    <FormField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                    />
                  </div>
                  <FormField
                    label="Business / Company"
                    value={form.business}
                    onChange={(v) => setForm({ ...form, business: v })}
                  />
                  <div>
                    <label className="block text-sm text-gr mb-2">
                      What do you need?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full bg-bg2 border border-bd rounded-xl px-4 py-3 text-sm text-wh focus:border-pink/40 focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      {siteConfig.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Other">Other / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gr mb-2">
                      Tell me about your project
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      required
                      placeholder="What are you trying to achieve? What's the current problem?"
                      className="w-full bg-bg2 border border-bd rounded-xl px-4 py-3 text-sm text-wh placeholder:text-dm focus:border-pink/40 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-red-500">
                      {error}{" "}
                      <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
                        WhatsApp
                      </a>
                    </p>
                  )}
                  <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-display font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-50" style={{ background: "var(--pink)" }}>
                    {sending ? "Sending..." : "Send Message"}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-bd bg-card p-6">
                <h3 className="text-sm font-display font-semibold text-wh mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 text-sm text-gr hover:text-pink transition-colors"
                  >
                    <Mail size={16} />
                    {siteConfig.contact.email}
                  </a>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gr hover:text-pink transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-pink/20 bg-pink/5 p-6">
                <h3 className="text-sm font-display font-semibold text-pink mb-2">
                  Free AI Audit
                </h3>
                <p className="text-xs text-gr leading-relaxed">
                  Not sure where to start? Request a free AI automation audit.
                  I&apos;ll analyze your business processes and identify the highest-impact
                  automation opportunities.
                </p>
              </div>

              <div className="rounded-2xl border border-bd bg-card p-6">
                <h3 className="text-sm font-display font-semibold text-wh mb-2">Response Time</h3>
                <p className="text-xs text-gr">
                  I typically respond within 24 hours. For urgent projects,
                  reach out via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-gr mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-bg2 border border-bd rounded-xl px-4 py-3 text-sm text-wh placeholder:text-dm focus:border-pink/40 focus:outline-none transition-colors"
      />
    </div>
  );
}
