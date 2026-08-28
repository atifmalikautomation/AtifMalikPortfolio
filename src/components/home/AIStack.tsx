"use client";

import { siteConfig } from "@/lib/site-config";

export function AIStack() {
  const allTools = Object.values(siteConfig.toolGroups).flat();
  const half = Math.ceil(allTools.length / 2);
  const row1 = allTools.slice(0, half);
  const row2 = allTools.slice(half);

  return (
    <section className="section-padding" id="stack">
      <div className="max-w-6xl mx-auto">
        {/* Heading — like Yasir's */}
        <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-wh text-center mb-10 md:mb-14">
          The Tools &amp; Systems I Master{" "}
          <span className="text-pink">For Your Growth</span>
        </h2>

        {/* 2-line marquee with pill tags */}
        <div className="space-y-4">
          {/* Row 1 — left */}
          <div className="overflow-hidden py-2">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...row1, ...row1, ...row1, ...row1].map((tool, i) => (
                <span
                  key={`r1-${i}`}
                  className="mx-2 px-4 py-2 text-sm font-display font-semibold rounded-full border border-bd bg-card text-wh whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 — right */}
          <div className="overflow-hidden py-2">
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              {[...row2, ...row2, ...row2, ...row2].map((tool, i) => (
                <span
                  key={`r2-${i}`}
                  className="mx-2 px-4 py-2 text-sm font-display font-semibold rounded-full border border-bd bg-card text-wh whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
