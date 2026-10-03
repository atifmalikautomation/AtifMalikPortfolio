import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/chat/", "/admin"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
