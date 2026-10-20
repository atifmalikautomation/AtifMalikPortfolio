import { writeFileSync } from "fs";
import { join } from "path";

const COLORS = {
  "AI AUTOMATION":   { accent: "#2563EB", light: "#DBEAFE", mid: "#BFDBFE" },
  "AI VIDEO":        { accent: "#7C3AED", light: "#EDE9FE", mid: "#DDD6FE" },
  "AI CHATBOT":      { accent: "#0891B2", light: "#CFFAFE", mid: "#A5F3FC" },
  "LEAD AUTOMATION": { accent: "#DC2626", light: "#FEE2E2", mid: "#FECACA" },
  "AI CONTENT":      { accent: "#059669", light: "#D1FAE5", mid: "#A7F3D0" },
  "WEB DEVELOPMENT": { accent: "#4F46E5", light: "#E0E7FF", mid: "#C7D2FE" },
};

const items = [
  {
    slug: "ecommerce-automation",
    title: "Shopify Order\nAutomation",
    category: "AI AUTOMATION",
    tagline: "n8n · Shopify · WhatsApp",
    tech: ["n8n", "Shopify API", "WhatsApp"],
    metrics: [{ v: "847/day", l: "ORDERS AUTO" }, { v: "4.5 hrs", l: "SAVED DAILY" }, { v: "+32%", l: "REVENUE" }],
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
  {
    slug: "ai-product-video",
    title: "AI Video\nCampaign",
    category: "AI VIDEO",
    tagline: "Veo 3 · Kling · ElevenLabs",
    tech: ["Veo 3", "Kling AI", "ElevenLabs"],
    metrics: [{ v: "10×", l: "FASTER PROD." }, { v: "90%", l: "COST SAVED" }, { v: "5 min", l: "PER VIDEO" }],
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    slug: "multi-platform-chatbot",
    title: "Multi-Platform\nAI Chatbot",
    category: "AI CHATBOT",
    tagline: "WhatsApp · Instagram · Web",
    tech: ["WhatsApp", "Instagram", "Web Chat"],
    metrics: [{ v: "24/7", l: "AVAILABLE" }, { v: "85%", l: "RESOLUTION" }, { v: "3 min", l: "AVG REPLY" }],
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    slug: "real-estate-leads",
    title: "Real Estate\nLead System",
    category: "LEAD AUTOMATION",
    tagline: "GHL · n8n · WhatsApp",
    tech: ["GoHighLevel", "n8n", "WhatsApp"],
    metrics: [{ v: "3×", l: "MORE LEADS" }, { v: "40%", l: "CLOSE RATE" }, { v: "$120K", l: "PIPELINE" }],
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    slug: "content-pipeline",
    title: "AI Content\nPipeline",
    category: "AI CONTENT",
    tagline: "GPT-4 · n8n · Social APIs",
    tech: ["GPT-4o", "n8n", "Social APIs"],
    metrics: [{ v: "50+", l: "POSTS/MONTH" }, { v: "8 hrs", l: "SAVED WEEKLY" }, { v: "3×", l: "ENGAGEMENT" }],
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Admin\nDashboard",
    category: "WEB DEVELOPMENT",
    tagline: "Next.js · PostgreSQL · Stripe",
    tech: ["Next.js", "PostgreSQL", "Stripe"],
    metrics: [{ v: "99.9%", l: "UPTIME" }, { v: "0.3s", l: "LOAD TIME" }, { v: "500+", l: "DAILY USERS" }],
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    slug: "ghl-fitness-crm",
    title: "Fitness Studio\nCRM System",
    category: "LEAD AUTOMATION",
    tagline: "GoHighLevel · Funnels · SMS",
    tech: ["GoHighLevel", "Funnels", "SMS"],
    metrics: [{ v: "2×", l: "RETENTION" }, { v: "45%", l: "CONVERSION" }, { v: "60", l: "NEW MEMBERS" }],
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    slug: "email-automation",
    title: "Email Marketing\nAutomation",
    category: "AI AUTOMATION",
    tagline: "n8n · Email API · A/B Testing",
    tech: ["n8n", "Email API", "A/B Testing"],
    metrics: [{ v: "42%", l: "OPEN RATE" }, { v: "8.5%", l: "CLICK RATE" }, { v: "3.2×", l: "ROI" }],
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    slug: "wordpress-consulting",
    title: "Business\nWordPress Site",
    category: "WEB DEVELOPMENT",
    tagline: "WordPress · SEO · Analytics",
    tech: ["WordPress", "SEO", "GA4"],
    metrics: [{ v: "Pg 1", l: "GOOGLE RANK" }, { v: "5K+", l: "MONTHLY VISITS" }, { v: "95+", l: "PAGESPEED" }],
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    slug: "helping-hopes-academy",
    title: "Helping Hopes\nAcademy",
    category: "WEB DEVELOPMENT",
    tagline: "React · TypeScript · Vite",
    tech: ["React", "TypeScript", "Vite"],
    metrics: [{ v: "100%", l: "RESPONSIVE" }, { v: "97", l: "LIGHTHOUSE" }, { v: "2 wks", l: "DELIVERY" }],
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    slug: "pulseboard-saas-demo",
    title: "Pulseboard\nSaaS Dashboard",
    category: "WEB DEVELOPMENT",
    tagline: "Chart.js · RBAC · CSV Export",
    tech: ["Chart.js", "RBAC", "CSV Export"],
    metrics: [{ v: "10+", l: "CHART TYPES" }, { v: "RBAC", l: "ROLES" }, { v: "Live", l: "DEMO READY" }],
    icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
  },
  {
    slug: "brightsmile-ai-chatbot",
    title: "BrightSmile\nAI Receptionist",
    category: "AI CHATBOT",
    tagline: "Gemini API · 3 Languages",
    tech: ["Gemini API", "WhatsApp", "3 Languages"],
    metrics: [{ v: "3", l: "LANGUAGES" }, { v: "24/7", l: "ACTIVE" }, { v: "90%", l: "BOOKING RATE" }],
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
  {
    slug: "leadflow-n8n-demo",
    title: "LeadFlow\nn8n Automation",
    category: "AI AUTOMATION",
    tagline: "n8n · OpenAI · HubSpot",
    tech: ["n8n", "OpenAI", "HubSpot"],
    metrics: [{ v: "100%", l: "AUTOMATED" }, { v: "5 min", l: "RESPONSE TIME" }, { v: "3×", l: "LEAD QUALITY" }],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

function generateSVG(item) {
  const c = COLORS[item.category] || COLORS["AI AUTOMATION"];
  const [line1, line2 = ""] = item.title.split("\n");

  const pillW = item.category.length * 8.2 + 32;

  // Tech tags (left side, y=468)
  let tx = 58;
  const techTags = item.tech.map((t) => {
    const tw = t.length * 7.5 + 22;
    const tag = `<rect x="${tx}" y="468" width="${tw}" height="26" rx="13" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.55"/>
    <text x="${tx + tw / 2}" y="485" text-anchor="middle" fill="${c.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="600">${t}</text>`;
    tx += tw + 9;
    return tag;
  }).join("\n    ");

  // Metrics on left side (y = 328, 376, 424)
  const metricRows = item.metrics.map((m, i) => {
    const my = 328 + i * 48;
    return `<circle cx="64" cy="${my}" r="4" fill="${c.accent}"/>
    <text x="78" y="${my + 5}" fill="#0A0A0A" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="800">${m.v}</text>
    <text x="78" y="${my + 20}" fill="#888" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="500" letter-spacing="0.5">${m.l}</text>`;
  }).join("\n    ");

  // Right card: 3 metric boxes at bottom
  const cardMetrics = item.metrics.map((m, i) => {
    const cx = 700 + i * 155;
    return `<rect x="${cx - 58}" y="405" width="116" height="72" rx="12" fill="${c.light}"/>
    <text x="${cx}" y="438" text-anchor="middle" fill="${c.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="24" font-weight="800">${m.v}</text>
    <text x="${cx}" y="457" text-anchor="middle" fill="#777" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="700" letter-spacing="0.8">${m.l}</text>`;
  }).join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <pattern id="dotgrid" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
      <circle cx="22" cy="22" r="1.4" fill="${c.accent}" opacity="0.07"/>
    </pattern>
    <filter id="cshadow" x="-8%" y="-8%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="22" flood-color="#000000" flood-opacity="0.07"/>
    </filter>
  </defs>

  <!-- Warm off-white background -->
  <rect width="1200" height="675" fill="#F8F6F3"/>
  <!-- Dot pattern -->
  <rect width="600" height="555" fill="url(#dotgrid)"/>
  <!-- Large soft circle accent left -->
  <circle cx="120" cy="490" r="220" fill="${c.accent}" opacity="0.03"/>

  <!-- Top accent bar -->
  <rect width="1200" height="5" fill="${c.accent}"/>

  <!-- Category pill -->
  <rect x="58" y="42" width="${pillW}" height="29" rx="14.5" fill="${c.light}"/>
  <text x="${58 + pillW / 2}" y="62" text-anchor="middle" fill="${c.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="10.5" font-weight="800" letter-spacing="2">${item.category}</text>

  <!-- Main title -->
  <text x="58" y="158" fill="#0D0D0D" font-family="system-ui,-apple-system,sans-serif" font-size="54" font-weight="800" letter-spacing="-1.5">${line1}</text>
  ${line2 ? `<text x="58" y="224" fill="#0D0D0D" font-family="system-ui,-apple-system,sans-serif" font-size="54" font-weight="800" letter-spacing="-1.5">${line2}</text>` : ""}

  <!-- Tagline -->
  <text x="58" y="270" fill="#888" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="500">${item.tagline}</text>

  <!-- Horizontal rule -->
  <line x1="58" y1="300" x2="360" y2="300" stroke="#E0DCD7" stroke-width="1"/>

  <!-- Metric rows -->
  ${metricRows}

  <!-- Tech tags -->
  ${techTags}

  <!-- ── RIGHT SIDE CARD ── -->
  <rect x="640" y="28" width="518" height="497" rx="22" fill="white" filter="url(#cshadow)"/>

  <!-- Card colored header -->
  <rect x="640" y="28" width="518" height="54" rx="22" fill="${c.accent}"/>
  <rect x="640" y="58" width="518" height="24" fill="${c.accent}"/>

  <!-- Window chrome dots -->
  <circle cx="671" cy="55" r="5.5" fill="white" opacity="0.35"/>
  <circle cx="693" cy="55" r="5.5" fill="white" opacity="0.35"/>
  <circle cx="715" cy="55" r="5.5" fill="white" opacity="0.35"/>

  <!-- URL bar placeholder -->
  <rect x="740" y="46" width="180" height="12" rx="6" fill="white" opacity="0.2"/>

  <!-- Icon display area -->
  <circle cx="899" cy="230" r="108" fill="${c.accent}" opacity="0.07"/>
  <circle cx="899" cy="230" r="74" fill="${c.light}" opacity="0.9"/>

  <!-- SVG icon scaled 2.2× centered at 899,230 (icon drawn in 24×24 box) -->
  <g transform="translate(872.6,203.6) scale(2.2)" fill="none" stroke="${c.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="${item.icon}"/>
  </g>

  <!-- Separator -->
  <line x1="658" y1="380" x2="1140" y2="380" stroke="#F0EBE5" stroke-width="1"/>

  <!-- 3 metric cards inside the card -->
  ${cardMetrics}

  <!-- Bottom "Live Demo" button inside card -->
  <rect x="658" y="492" width="150" height="18" rx="9" fill="${c.light}" opacity="0.7"/>
  <text x="733" y="505" text-anchor="middle" fill="${c.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="10.5" font-weight="700">Live Demo Available →</text>

  <!-- ── DARK BOTTOM BAR ── -->
  <rect y="555" width="1200" height="120" fill="#0D0D0D"/>
  <!-- Pink accent line -->
  <rect y="555" width="1200" height="2.5" fill="#E0008A"/>

  <!-- AM Avatar -->
  <rect x="50" y="575" width="58" height="58" rx="13" fill="#E0008A"/>
  <text x="79" y="611" text-anchor="middle" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="19" font-weight="800">AM</text>

  <!-- Name + subtitle -->
  <text x="124" y="597" fill="white" font-family="system-ui,-apple-system,sans-serif" font-size="17" font-weight="700">Atif Malik</text>
  <text x="124" y="618" fill="#E0008A" font-family="system-ui,-apple-system,sans-serif" font-size="11" font-weight="600" letter-spacing="1.8">AI VIDEO &amp; AUTOMATION</text>

  <!-- Separator dot -->
  <circle cx="318" cy="605" r="2.5" fill="#3a3a3a"/>

  <!-- Category label in bar -->
  <rect x="330" y="590" width="${Math.ceil(item.category.length * 6.8 + 22)}" height="28" rx="14" fill="${c.accent}" opacity="0.18"/>
  <text x="${330 + Math.ceil((item.category.length * 6.8 + 22) / 2)}" y="609" text-anchor="middle" fill="${c.accent}" font-family="system-ui,-apple-system,sans-serif" font-size="10" font-weight="800" letter-spacing="1.5">${item.category}</text>

  <!-- Website URL right side -->
  <circle cx="1158" cy="601" r="3.5" fill="#E0008A" opacity="0.55"/>
  <text x="1148" y="606" text-anchor="end" fill="#555" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="500">atifmalik.me</text>
</svg>`;
}

for (const item of items) {
  const svg = generateSVG(item);
  const dest = join("public", "portfolio", `${item.slug}.svg`);
  writeFileSync(dest, svg);
  console.log(`✓ ${item.slug}.svg`);
}

console.log("\nDone — 13 professional thumbnails generated.");
