"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 600, suffix: "+", label: "Projects Completed" },
  { target: 4.5, suffix: "", label: "Years of Experience" },
  { target: 98, suffix: "%", label: "Client Satisfaction Rate" },
  { target: 10, suffix: "\u00D7", label: "Faster Than Traditional Agencies" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const animate = () => {
            current += step;
            if (current >= target) {
              setCount(target);
            } else {
              setCount(Number.isInteger(target) ? Math.floor(current) : parseFloat(current.toFixed(1)));
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-5xl md:text-6xl text-pink">
      {count}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="section-padding" id="stats">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card border border-bd p-6 md:p-8 text-center flex flex-col items-center gap-3"
            >
              <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              <span className="text-gr text-sm md:text-base font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
