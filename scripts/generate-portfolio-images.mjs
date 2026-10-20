import { writeFileSync } from "fs";
import { join } from "path";

// ── Exact website theme tokens (dark mode default) ──
const T = {
  bg: "#141210",
  bg2: "#1C1914",
  card: "#201C16",
  accent: "#E07A5F",
  white: "#F5F0E8",
  gray: "#B5A99A",
  dim: "#7A6E62",
  dim2: "#4A4035",
  border: "#F5B49B",
  font: "'Bricolage Grotesque',system-ui,-apple-system,sans-serif",
};

const items = [
  {
    slug: "ecommerce-automation",
    title: "Shopify Order\nAutomation",
    category: "AI AUTOMATION",
    tagline: "n8n  ·  Shopify  ·  WhatsApp",
    metrics: [{ v: "847/day", l: "ORDERS" }, { v: "4.5h", l: "SAVED DAILY" }, { v: "+32%", l: "REVENUE" }],
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
  {
    slug: "ai-product-video",
    title: "AI Video\nCampaign",
    category: "AI VIDEO",
    tagline: "Veo 3  ·  Kling  ·  ElevenLabs",
    metrics: [{ v: "10×", l: "FASTER" }, { v: "90%", l: "COST SAVED" }, { v: "5 min", l: "PER VIDEO" }],
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    slug: "multi-platform-chatbot",
    title: "Multi-Platform\nAI Chatbot",
    category: "AI CHATBOT",
    tagline: "WhatsApp  ·  Instagram  ·  Web",
    metrics: [{ v: "24/7", l: "AVAILABLE" }, { v: "85%", l: "RESOLVED" }, { v: "3 min", l: "AVG REPLY" }],
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    slug: "real-estate-leads",
    title: "Real Estate\nLead System",
    category: "LEAD AUTOMATION",
    tagline: "GHL  ·  n8n  ·  WhatsApp",
    metrics: [{ v: "3×", l: "MORE LEADS" }, { v: "40%", l: "CLOSE RATE" }, { v: "$120K", l: "PIPELINE" }],
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    slug: "content-pipeline",
    title: "AI Content\nPipeline",
    category: "AI CONTENT",
    tagline: "GPT-4  ·  n8n  ·  Social APIs",
    metrics: [{ v: "50+", l: "POSTS/MO" }, { v: "8h", l: "SAVED/WEEK" }, { v: "3×", l: "ENGAGEMENT" }],
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Admin\nDashboard",
    category: "WEB DEVELOPMENT",
    tagline: "Next.js  ·  PostgreSQL  ·  Stripe",
    metrics: [{ v: "99.9%", l: "UPTIME" }, { v: "0.3s", l: "LOAD TIME" }, { v: "500+", l: "DAILY USERS" }],
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    slug: "ghl-fitness-crm",
    title: "Fitness Studio\nCRM System",
    category: "LEAD AUTOMATION",
    tagline: "GoHighLevel  ·  Funnels  ·  SMS",
    metrics: [{ v: "2×", l: "RETENTION" }, { v: "45%", l: "CONVERSION" }, { v: "60", l: "NEW MEMBERS" }],
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    slug: "email-automation",
    title: "Email Marketing\nAutomation",
    category: "AI AUTOMATION",
    tagline: "n8n  ·  Email API  ·  A/B Testing",
    metrics: [{ v: "42%", l: "OPEN RATE" }, { v: "8.5%", l: "CLICK RATE" }, { v: "3.2×", l: "ROI" }],
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    slug: "wordpress-consulting",
    title: "Business\nWordPress Site",
    category: "WEB DEVELOPMENT",
    tagline: "WordPress  ·  SEO  ·  Analytics",
    metrics: [{ v: "Pg 1", l: "GOOGLE RANK" }, { v: "5K+", l: "VISITORS/MO" }, { v: "95+", l: "PAGESPEED" }],
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    slug: "helping-hopes-academy",
    title: "Helping Hopes\nAcademy",
    category: "WEB DEVELOPMENT",
    tagline: "React  ·  TypeScript  ·  Vite",
    metrics: [{ v: "100%", l: "RESPONSIVE" }, { v: "97", l: "LIGHTHOUSE" }, { v: "2 wks", l: "DELIVERED" }],
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    slug: "pulseboard-saas-demo",
    title: "Pulseboard\nSaaS Dashboard",
    category: "WEB DEVELOPMENT",
    tagline: "Chart.js  ·  RBAC  ·  CSV Export",
    metrics: [{ v: "10+", l: "CHART TYPES" }, { v: "RBAC", l: "ROLES" }, { v: "Live", l: "DEMO" }],
    icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
  },
  {
    slug: "brightsmile-ai-chatbot",
    title: "BrightSmile\nAI Receptionist",
    category: "AI CHATBOT",
    tagline: "Gemini API  ·  3 Languages",
    metrics: [{ v: "3", l: "LANGUAGES" }, { v: "24/7", l: "ACTIVE" }, { v: "90%", l: "BOOKINGS" }],
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
  {
    slug: "leadflow-n8n-demo",
    title: "LeadFlow\nn8n Automation",
    category: "AI AUTOMATION",
    tagline: "n8n  ·  OpenAI  ·  HubSpot",
    metrics: [{ v: "100%", l: "AUTOMATED" }, { v: "5 min", l: "RESPONSE" }, { v: "3×", l: "LEAD QUALITY" }],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

function generateSVG(item) {
  const [line1, line2 = ""] = item.title.split("\n");
  const pillW = item.category.length * 8.5 + 34;

  // 3 metric boxes centered
  const bw = 168, gap = 14;
  const totalW = bw * 3 + gap * 2;
  const sx = (1200 - totalW) / 2;

  const metricBoxes = item.metrics.map((m, i) => {
    const bx = sx + i * (bw + gap);
    return `<rect x="${bx}" y="418" width="${bw}" height="78" rx="14" fill="${T.card}" stroke="${T.border}" stroke-opacity="0.15" stroke-width="1"/>
    <text x="${bx + bw / 2}" y="452" text-anchor="middle" fill="${T.accent}" font-family="${T.font}" font-size="24" font-weight="800">${m.v}</text>
    <text x="${bx + bw / 2}" y="474" text-anchor="middle" fill="${T.dim}" font-family="${T.font}" font-size="10" font-weight="700" letter-spacing="1.5">${m.l}</text>`;
  }).join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <radialGradient id="glow" cx="50%" cy="30%" r="55%">
      <stop offset="0%" style="stop-color:${T.accent};stop-opacity:0.07"/>
      <stop offset="100%" style="stop-color:${T.bg};stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" style="stop-color:${T.bg2}"/>
      <stop offset="100%" style="stop-color:${T.bg}"/>
    </linearGradient>
  </defs>

  <!-- Base background -->
  <rect width="1200" height="675" fill="${T.bg}"/>
  <rect width="1200" height="675" fill="url(#glow)"/>

  <!-- Subtle grid -->
  <g opacity="0.025" stroke="${T.accent}" stroke-width="0.5">
    ${Array.from({ length: 21 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="675"/>`).join("\n    ")}
    ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}"/>`).join("\n    ")}
  </g>

  <!-- Top accent line -->
  <rect width="1200" height="4" fill="${T.accent}"/>

  <!-- Category pill (centered) -->
  <rect x="${(1200 - pillW) / 2}" y="36" width="${pillW}" height="28" rx="14" fill="none" stroke="${T.accent}" stroke-width="1.2" opacity="0.55"/>
  <text x="600" y="55" text-anchor="middle" fill="${T.accent}" font-family="${T.font}" font-size="10.5" font-weight="700" letter-spacing="2.5">${item.category}</text>

  <!-- Icon glow circles -->
  <circle cx="600" cy="155" r="72" fill="${T.accent}" opacity="0.07"/>
  <circle cx="600" cy="155" r="48" fill="${T.accent}" opacity="0.06"/>

  <!-- Icon (24×24 scaled 2× centered at 600,155) -->
  <g transform="translate(576,131) scale(2)" fill="none" stroke="${T.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="${item.icon}"/>
  </g>

  <!-- Title -->
  <text x="600" y="278" text-anchor="middle" fill="${T.white}" font-family="${T.font}" font-size="48" font-weight="800" letter-spacing="-1">${line1}</text>
  ${line2 ? `<text x="600" y="334" text-anchor="middle" fill="${T.white}" font-family="${T.font}" font-size="48" font-weight="800" letter-spacing="-1">${line2}</text>` : ""}

  <!-- Tagline -->
  <text x="600" y="383" text-anchor="middle" fill="${T.gray}" font-family="${T.font}" font-size="15" font-weight="500">${item.tagline}</text>

  <!-- Metric boxes -->
  ${metricBoxes}

  <!-- Bottom bar -->
  <rect y="545" width="1200" height="130" fill="url(#bottomGrad)"/>
  <line x1="0" y1="545" x2="1200" y2="545" stroke="${T.accent}" stroke-opacity="0.2" stroke-width="1"/>

  <!-- AM avatar -->
  <rect x="50" y="570" width="52" height="52" rx="12" fill="${T.accent}" opacity="0.14"/>
  <text x="76" y="603" text-anchor="middle" fill="${T.accent}" font-family="${T.font}" font-size="18" font-weight="800">AM</text>

  <!-- Name + subtitle -->
  <text x="118" y="590" fill="${T.white}" font-family="${T.font}" font-size="16" font-weight="700">Atif Malik</text>
  <text x="118" y="610" fill="${T.accent}" font-family="${T.font}" font-size="10" font-weight="600" letter-spacing="2">AI VIDEO &amp; AUTOMATION</text>

  <!-- Website URL -->
  <circle cx="1142" cy="596" r="3.5" fill="${T.accent}" opacity="0.4"/>
  <text x="1130" y="600" text-anchor="end" fill="${T.dim}" font-family="${T.font}" font-size="13" font-weight="500">atifmalik.me</text>

  <!-- Bottom accent line -->
  <rect y="671" width="1200" height="4" fill="${T.accent}"/>
</svg>`;
}

for (const item of items) {
  const svg = generateSVG(item);
  writeFileSync(join("public", "portfolio", `${item.slug}.svg`), svg);
  console.log(`  ${item.slug}.svg`);
}
console.log("\nDone - 13 thumbnails with website theme.");
