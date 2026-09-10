import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atif Malik — AI Video Production & Automation",
    short_name: "Atif Malik",
    description:
      "Pakistan's No.1 AI Video Production and Automation Agency. Premium AI video, automation systems, and intelligent agents.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0008",
    theme_color: "#E0008A",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
