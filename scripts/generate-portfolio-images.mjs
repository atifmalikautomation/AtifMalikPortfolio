import { writeFileSync } from "fs";
import { join } from "path";

const portfolioItems = [
  { slug: "helping-hopes-academy", title: "Helping Hopes Academy", category: "Web Development", icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { slug: "pulseboard-saas-demo", title: "Pulseboard SaaS", category: "Web Development", icon: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" },
  { slug: "brightsmile-ai-chatbot", title: "BrightSmile AI", category: "AI Chatbot", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { slug: "leadflow-n8n-demo", title: "LeadFlow n8n", category: "AI Automation", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { slug: "ecommerce-automation", title: "Shopify Automation", category: "AI Automation", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
  { slug: "ai-product-video", title: "AI Video Campaign", category: "AI Video", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { slug: "multi-platform-chatbot", title: "Multi-Platform Bot", category: "AI Chatbot", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
  { slug: "real-estate-leads", title: "Real Estate Leads", category: "Lead Automation", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { slug: "content-pipeline", title: "Content Pipeline", category: "AI Content", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { slug: "saas-dashboard", title: "SaaS Dashboard", category: "Web Development", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { slug: "ghl-fitness-crm", title: "Fitness Studio CRM", category: "Lead Automation", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { slug: "email-automation", title: "Email Automation", category: "AI Automation", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { slug: "wordpress-consulting", title: "WordPress Consulting", category: "Web Development", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
];

const categoryColors = {
  "AI Automation": { bg1: "#1e1b4b", bg2: "#4338ca", accent: "#818cf8" },
  "AI Video": { bg1: "#4a0020", bg2: "#be185d", accent: "#f472b6" },
  "AI Chatbot": { bg1: "#042f2e", bg2: "#0d9488", accent: "#5eead4" },
  "Lead Automation": { bg1: "#1c1917", bg2: "#78716c", accent: "#d6d3d1" },
  "AI Content": { bg1: "#1a2e05", bg2: "#4d7c0f", accent: "#a3e635" },
  "Web Development": { bg1: "#0A0008", bg2: "#3D0028", accent: "#E0008A" },
};

for (const item of portfolioItems) {
  const colors = categoryColors[item.category] || categoryColors["Web Development"];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg1}"/>
      <stop offset="100%" style="stop-color:${colors.bg2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bg)"/>

  <!-- Grid pattern -->
  <g opacity="0.06" stroke="white" stroke-width="1">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="675"/>`).join('\n    ')}
    ${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}"/>`).join('\n    ')}
  </g>

  <!-- Accent glow circle -->
  <circle cx="900" cy="340" r="250" fill="${colors.accent}" opacity="0.07"/>
  <circle cx="200" cy="100" r="150" fill="${colors.accent}" opacity="0.04"/>

  <!-- Icon circle -->
  <circle cx="600" cy="240" r="60" fill="white" opacity="0.08"/>
  <g transform="translate(576, 216)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7">
    <path d="${item.icon}"/>
  </g>

  <!-- Category pill -->
  <rect x="460" y="330" rx="14" ry="14" width="280" height="28" fill="${colors.accent}" opacity="0.2"/>
  <text x="600" y="349" text-anchor="middle" fill="${colors.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="3" text-transform="uppercase">${item.category.toUpperCase()}</text>

  <!-- Title -->
  <text x="600" y="415" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" letter-spacing="-0.5">${item.title}</text>

  <!-- Bottom line -->
  <rect x="500" y="460" width="200" height="2" rx="1" fill="${colors.accent}" opacity="0.4"/>

  <!-- Brand -->
  <text x="600" y="510" text-anchor="middle" fill="white" opacity="0.35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" letter-spacing="4">ATIF MALIK</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="670" width="1200" height="5" fill="${colors.accent}" opacity="0.5"/>
</svg>`;

  const outputPath = join("public", "portfolio", `${item.slug}.jpg`);
  // SVG can be saved as SVG and referenced, but Next.js Image needs a real image
  // Save as SVG for now
  const svgPath = join("public", "portfolio", `${item.slug}.svg`);
  writeFileSync(svgPath, svg);
  console.log(`Generated: ${svgPath}`);
}

console.log("\nDone! Generated SVG images for all portfolio items.");
console.log("Note: Update image paths in site-config.ts from .jpg to .svg for new items.");
