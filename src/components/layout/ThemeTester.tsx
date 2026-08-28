"use client";

import { useState } from "react";

const themes = [
  { id: "", label: "Pink", color: "#E0008A" },
  { id: "teal", label: "Teal", color: "#8EB69B" },
  { id: "maroon", label: "Maroon", color: "#59171B" },
];

export function ThemeTester() {
  const [active, setActive] = useState("");

  const switchTheme = (themeId: string) => {
    setActive(themeId);
    if (themeId) {
      document.documentElement.setAttribute("data-theme", themeId);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 z-[9999] flex flex-col gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => switchTheme(t.id)}
          className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
            active === t.id ? "border-white scale-110 shadow-lg" : "border-transparent"
          }`}
          style={{ background: t.color }}
          title={t.label}
        />
      ))}
      <span className="text-[9px] text-center text-gr font-mono mt-1">THEME</span>
    </div>
  );
}
