import { writeFileSync } from "fs";
import { join } from "path";

const portfolioItems = [
  { slug: "ecommerce-automation", title: "Shopify Order\nAutomation", category: "AI AUTOMATION", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z", tagline: "n8n + Shopify + WhatsApp" },
  { slug: "ai-product-video", title: "AI Video\nCampaign", category: "AI VIDEO", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", tagline: "Veo 3 + Kling + ElevenLabs" },
  { slug: "multi-platform-chatbot", title: "Multi-Platform\nAI Chatbot", category: "AI CHATBOT", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", tagline: "WhatsApp + Instagram + Web" },
  { slug: "real-estate-leads", title: "Real Estate\nLead System", category: "LEAD AUTOMATION", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", tagline: "GHL + n8n + WhatsApp" },
  { slug: "content-pipeline", title: "AI Content\nPipeline", category: "AI CONTENT", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z", tagline: "GPT-4 + n8n + Social APIs" },
  { slug: "saas-dashboard", title: "SaaS Admin\nDashboard", category: "WEB DEVELOPMENT", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", tagline: "Next.js + PostgreSQL + APIs" },
  { slug: "ghl-fitness-crm", title: "Fitness Studio\nCRM System", category: "LEAD AUTOMATION", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", tagline: "GoHighLevel + Funnels" },
  { slug: "email-automation", title: "Email Marketing\nAutomation", category: "AI AUTOMATION", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", tagline: "n8n + Email API + A/B Testing" },
  { slug: "wordpress-consulting", title: "Business\nWordPress Site", category: "WEB DEVELOPMENT", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", tagline: "WordPress + SEO + Analytics" },
  { slug: "helping-hopes-academy", title: "Helping Hopes\nAcademy", category: "WEB DEVELOPMENT", icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", tagline: "React + TypeScript + Vite" },
  { slug: "pulseboard-saas-demo", title: "Pulseboard\nSaaS Dashboard", category: "WEB DEVELOPMENT", icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z", tagline: "Chart.js + RBAC + CSV" },
  { slug: "brightsmile-ai-chatbot", title: "BrightSmile\nAI Receptionist", category: "AI CHATBOT", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", tagline: "Gemini API + 3 Languages" },
  { slug: "leadflow-n8n-demo", title: "LeadFlow\nn8n Automation", category: "AI AUTOMATION", icon: "M13 10V3L4 14h7v7l9-11h-7z", tagline: "n8n + OpenAI + HubSpot" },
];

for (const item of portfolioItems) {
  const lines = item.title.split("\\n");
  const line1 = lines[0];
  const line2 = lines[1] || "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFAF6"/>
      <stop offset="100%" style="stop-color:#FFF5EE"/>
    </linearGradient>
    <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E0008A"/>
      <stop offset="100%" style="stop-color:#B8006F"/>
    </linearGradient>
    <clipPath id="avatarClip">
      <rect x="60" y="510" width="70" height="70" rx="16"/>
    </clipPath>
  </defs>

  <!-- Light background -->
  <rect width="1200" height="675" fill="url(#bg)"/>

  <!-- Subtle grid -->
  <g opacity="0.04" stroke="#E0008A" stroke-width="0.5">
    ${Array.from({length: 21}, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="675"/>`).join('\n    ')}
    ${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}"/>`).join('\n    ')}
  </g>

  <!-- Pink accent glow -->
  <circle cx="1000" cy="200" r="300" fill="#E0008A" opacity="0.04"/>
  <circle cx="150" cy="500" r="200" fill="#E0008A" opacity="0.03"/>

  <!-- Top pink bar -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#pinkGrad)"/>

  <!-- Category pill -->
  <rect x="60" y="50" rx="20" ry="20" width="${item.category.length * 11 + 40}" height="36" fill="none" stroke="#E0008A" stroke-width="1.5" opacity="0.6"/>
  <text x="${60 + (item.category.length * 11 + 40) / 2}" y="74" text-anchor="middle" fill="#E0008A" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="2.5">${item.category}</text>

  <!-- Main icon -->
  <circle cx="600" cy="220" r="80" fill="#E0008A" opacity="0.08"/>
  <circle cx="600" cy="220" r="55" fill="#E0008A" opacity="0.06"/>
  <g transform="translate(576, 196)" fill="none" stroke="#E0008A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="${item.icon}"/>
  </g>

  <!-- Title -->
  <text x="600" y="360" text-anchor="middle" fill="#1A0010" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="800" letter-spacing="-1">${line1}</text>
  <text x="600" y="415" text-anchor="middle" fill="#1A0010" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="800" letter-spacing="-1">${line2}</text>

  <!-- Tagline -->
  <text x="600" y="465" text-anchor="middle" fill="#E0008A" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="1" opacity="0.7">${item.tagline}</text>

  <!-- Bottom section -->
  <rect x="0" y="495" width="1200" height="180" fill="#E0008A" opacity="0.03"/>

  <!-- Avatar placeholder circle -->
  <rect x="60" y="520" width="60" height="60" rx="14" fill="#E0008A" opacity="0.12"/>
  <text x="90" y="556" text-anchor="middle" fill="#E0008A" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800">AM</text>

  <!-- Brand name -->
  <text x="140" y="546" fill="#1A0010" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800">Atif Malik</text>
  <text x="140" y="568" fill="#E0008A" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="1.5" opacity="0.7">AI VIDEO &amp; AUTOMATION</text>

  <!-- Pink dot -->
  <circle cx="1100" y="545" r="6" fill="#E0008A" opacity="0.5"/>
  <text x="1080" y="550" text-anchor="end" fill="#888" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500">atifmalik.me</text>

  <!-- Bottom pink bar -->
  <rect x="0" y="671" width="1200" height="4" fill="url(#pinkGrad)"/>
</svg>`;

  const svgPath = join("public", "portfolio", `${item.slug}.svg`);
  writeFileSync(svgPath, svg);
  console.log(`Generated: ${item.slug}.svg`);
}

console.log("\\nDone! 13 light-mode portfolio images generated.");
