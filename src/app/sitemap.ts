import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const priorityMap: Record<string, number> = {
    "": 1,
    "/services": 0.9,
    "/portfolio": 0.9,
    "/about": 0.8,
    "/insights": 0.8,
    "/calculator": 0.7,
    "/contact": 0.7,
    "/book": 0.7,
    "/privacy": 0.3,
    "/terms": 0.3,
  };

  const weeklyPages = new Set(["", "/insights", "/services"]);

  const staticPages = Object.keys(priorityMap).map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: weeklyPages.has(path) ? "weekly" as const : "monthly" as const,
    priority: priorityMap[path],
  }));

  const servicePages = siteConfig.services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioPages = siteConfig.portfolio.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightPages = siteConfig.insights.map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages, ...insightPages];
}
