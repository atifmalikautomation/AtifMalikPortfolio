"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { Mail, MessageCircle, Send } from "lucide-react";

export function ContactContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to CRM webhook / email service
    setSubmitted(true);
  }

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-narrow mx-auto">
          <SectionHeading
            label="Contact"
            title="Let's Build Something Together"
            subtitle="Tell me about your project. I'll get back to you within 24 hours."
          />

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            {/* Form */}
            <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-dim border border-accent/30 mx-auto mb-4 flex items-center justify-center">
                    <Send size={24} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">
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
                    <label className="block text-sm text-text-secondary mb-2">
                      What do you need?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full bg-bg-surface border border-border rounded-[var(--radius)] px-4 py-3 text-sm text-text-primary focus:border-accent/40 focus:outline-none transition-colors"
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
                    <label className="block text-sm text-text-secondary mb-2">
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
                      className="w-full bg-bg-surface border border-border rounded-[var(--radius)] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/40 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                    <Send size={16} />
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6">
                <h3 className="text-sm font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <Mail size={16} />
                    {siteConfig.contact.email}
                  </a>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-accent/20 bg-accent-dim/10 p-6">
                <h3 className="text-sm font-semibold text-accent mb-2">
                  Free AI Audit
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Not sure where to start? Request a free AI automation audit.
                  I&apos;ll analyze your business processes and identify the highest-impact
                  automation opportunities.
                </p>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6">
                <h3 className="text-sm font-semibold mb-2">Response Time</h3>
                <p className="text-xs text-text-secondary">
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
      <label className="block text-sm text-text-secondary mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-bg-surface border border-border rounded-[var(--radius)] px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/40 focus:outline-none transition-colors"
      />
    </div>
  );
}
