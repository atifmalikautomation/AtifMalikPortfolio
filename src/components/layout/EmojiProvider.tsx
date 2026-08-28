"use client";

import { useEffect } from "react";
import Script from "next/script";

export function EmojiProvider() {
  useEffect(() => {
    // Parse emojis after page loads and on route changes
    const parse = () => {
      if (typeof window !== "undefined" && (window as any).twemoji) {
        (window as any).twemoji.parse(document.body, {
          folder: "svg",
          ext: ".svg",
          base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
        });
      }
    };

    // Initial parse
    parse();

    // Re-parse on DOM changes (for dynamic content)
    const observer = new MutationObserver(() => parse());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/dist/twemoji.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if ((window as any).twemoji) {
          (window as any).twemoji.parse(document.body, {
            folder: "svg",
            ext: ".svg",
            base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
          });
        }
      }}
    />
  );
}
