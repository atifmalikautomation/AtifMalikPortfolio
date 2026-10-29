#!/usr/bin/env node
/**
 * IndexNow ping script — submits changed URLs to Bing/ChatGPT/Copilot.
 * Run after deploy: node scripts/seo/indexnow-ping.mjs
 * Requires INDEXNOW_KEY env var.
 */

const SITE = "https://atifmalik.me";
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.error("INDEXNOW_KEY env var not set. Skipping.");
  process.exit(0);
}

// All indexable URLs
const urls = [
  "/",
  "/services",
  "/portfolio",
  "/about",
  "/insights",
  "/calculator",
  "/contact",
  "/book",
  "/videos",
  // Service pages
  "/services/ai-video-production",
  "/services/ai-automation",
  "/services/ai-agents",
  "/services/ai-chatbots",
  "/services/ai-content-systems",
  "/services/ai-web-development",
  "/services/lead-sales-automation",
  "/services/custom-ai-systems",
  // Portfolio pages
  "/portfolio/ecommerce-automation",
  "/portfolio/ai-product-video",
  "/portfolio/multi-platform-chatbot",
  "/portfolio/real-estate-leads",
  "/portfolio/content-pipeline",
  "/portfolio/saas-dashboard",
  "/portfolio/ghl-fitness-crm",
  "/portfolio/email-automation",
  "/portfolio/wordpress-consulting",
  "/portfolio/helping-hopes-academy",
  "/portfolio/pulseboard-saas-demo",
  "/portfolio/brightsmile-ai-demo",
  "/portfolio/leadflow-n8n-demo",
  // Insight pages
  "/insights/ai-video-production-pakistan-marketing",
  "/insights/n8n-automation-guide-business",
  "/insights/ai-chatbots-vs-agents-business",
  "/insights/ai-lead-generation-system",
  "/insights/pakistan-businesses-ai-automation",
].map((p) => `${SITE}${p}`);

async function ping() {
  const body = {
    host: "atifmalik.me",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(`IndexNow response: ${res.status} ${res.statusText}`);
    if (res.ok) {
      console.log(`Submitted ${urls.length} URLs to IndexNow`);
    } else {
      const text = await res.text();
      console.error("IndexNow error:", text);
    }
  } catch (err) {
    console.error("IndexNow fetch failed:", err.message);
  }
}

ping();
