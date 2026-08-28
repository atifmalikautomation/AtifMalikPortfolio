"use client";

import { motion } from "framer-motion";

const services = [
  { icon: "\uD83E\uDD16", title: "n8n Automation", desc: "Custom workflow automation that runs 24/7" },
  { icon: "\uD83C\uDFAF", title: "GoHighLevel", desc: "Full CRM, funnel & pipeline setup and management" },
  { icon: "\uD83C\uDFAC", title: "AI Video Production", desc: "UGC, ads & AI-powered video content at scale" },
  { icon: "\uD83D\uDCAC", title: "AI Chatbots", desc: "Web, WhatsApp & Messenger bots that qualify & book" },
  { icon: "\uD83C\uDF10", title: "WordPress Development", desc: "Custom sites built to perform" },
  { icon: "\uD83D\uDED2", title: "E-commerce Solutions", desc: "Store design, CRO & business building that converts" },
  { icon: "\uD83D\uDCF1", title: "Social Media Automation", desc: "Content systems running daily without you" },
  { icon: "\u25B6\uFE0F", title: "YouTube Automation", desc: "Channel systems that publish & grow on autopilot" },
  { icon: "\uD83D\uDCE7", title: "Email Marketing", desc: "Automated drip sequences and behavioral triggers" },
  { icon: "\uD83D\uDCCA", title: "Analytics & Tracking", desc: "Custom dashboards, GA4 & conversion tracking" },
  { icon: "\uD83D\uDD04", title: "Zapier/Make Setup", desc: "Multi-app integrations that sync your tech stack" },
  { icon: "\uD83D\uDCBC", title: "CRM Implementation", desc: "HubSpot, GHL & custom CRM builds with automation" },
  { icon: "\uD83D\uDCC4", title: "Document Automation", desc: "Auto-generate contracts, invoices & reports with AI" },
  { icon: "\uD83C\uDFA8", title: "AI Identity Design", desc: "Brand kits, logos & visual identity with AI tools" },
  { icon: "\uD83D\uDCC8", title: "Lead Generation", desc: "Automated lead capture funnels that fill your pipeline" },
  { icon: "\uD83E\uDDE0", title: "Automation Strategy", desc: "Audit workflows & design a custom automation roadmap" },
  { icon: "\u26A1", title: "Vibe Coding", desc: "Rapid prototyping and MVP development with AI" },
  { icon: "\uD83D\uDE80", title: "SaaS Web App", desc: "Full-stack SaaS with auth, billing & dashboards" },
  { icon: "\u2601\uFE0F", title: "Web App Deployment", desc: "CI/CD pipelines, cloud hosting & production deploy" },
  { icon: "\uD83D\uDD0D", title: "FREE CRO Audit", desc: "Conversion rate optimization audit with actionable fixes" },
  { icon: "\uD83D\uDD17", title: "Funnels & Landing Pages", desc: "High-converting funnels for maximum lead capture" },
  { icon: "\uD83D\uDCDE", title: "Booking Systems", desc: "Automated scheduling with reminders & follow-ups" },
  { icon: "\uD83E\uDD1D", title: "RevOps Systems", desc: "Revenue operations aligning sales & marketing" },
  { icon: "\uD83E\uDDE9", title: "AI Agents", desc: "Custom AI agents that handle tasks & decisions" },
];

export function ServicesGrid() {
  return (
    <section className="section-padding" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-bd text-sm font-display font-semibold text-wh">
            What I Build
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh text-center mb-4 leading-[1.1]"
        >
          The tools &amp; systems I master{" "}
          <span
            className="text-pink"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
            }}
          >
            for your growth.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gr text-base md:text-lg text-center max-w-xl mx-auto mb-12"
        >
          24 battle-tested services designed to automate, grow, and dominate your market.
        </motion.p>

        {/* Grid — 4 cols like Yasir */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
              className="bg-card border border-bd rounded-2xl p-6 md:p-7 hover:border-pink/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon + Pill title row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-pink/10 flex items-center justify-center text-lg shrink-0">
                  {service.icon}
                </span>
                <span className="inline-flex px-3 py-1 rounded-full bg-pink text-white text-xs font-display font-bold whitespace-nowrap">
                  {service.title}
                </span>
              </div>
              {/* Description */}
              <p className="text-sm text-gr leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
