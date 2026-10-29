import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const commonDisallow = ["/api/", "/admin", "/chat"];

  return {
    rules: [
      // Search engines
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "YandexBot"],
        allow: "/",
        disallow: commonDisallow,
      },
      // AI search/retrieval crawlers (must be allowed for AI visibility)
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Claude-SearchBot",
          "Claude-User",
          "meta-externalfetcher",
          "Amazonbot",
          "cohere-ai",
          "YouBot",
          "DuckAssistBot",
        ],
        allow: "/",
        disallow: commonDisallow,
      },
      // AI training crawlers (allowed — brand visibility > content protection)
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "meta-externalagent",
          "Bytespider",
        ],
        allow: "/",
        disallow: commonDisallow,
      },
      // Default fallback
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
