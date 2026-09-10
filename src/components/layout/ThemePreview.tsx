"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface ThemePalette {
  primary: string;
  hover: string;
  g1: string;
  g2: string;
  bg: string;
  bg2: string;
  bg3: string;
  card: string;
  wh: string;
  gr: string;
  dm: string;
  dm2: string;
  bodyGrad: string;
  glass: string;
  footer: string;
  surfaceHover: string;
  navScrolled: string;
}

const themes: Record<string, ThemePalette> = {
  emerald: {
    primary: "#00C853", hover: "#00E676", g1: "#4ADE80", g2: "#059669",
    bg: "#020D04", bg2: "#041408", bg3: "#071E0C", card: "#0A2410",
    wh: "#F0FFF4", gr: "#8FAF98", dm: "#4A6B52", dm2: "#2A4032",
    bodyGrad: "linear-gradient(160deg,#020D04 0%,#041408 30%,#051A0A 55%,#071E0C 80%,#020D04 100%)",
    glass: "rgba(2,13,4,0.92)", footer: "#010A03", surfaceHover: "#0C3014", navScrolled: "rgba(2,13,4,0.92)",
  },
  ocean: {
    primary: "#0288D1", hover: "#29B6F6", g1: "#4FC3F7", g2: "#01579B",
    bg: "#020810", bg2: "#041018", bg3: "#061A24", card: "#08202E",
    wh: "#E1F5FE", gr: "#80A8C0", dm: "#456580", dm2: "#263848",
    bodyGrad: "linear-gradient(160deg,#020810 0%,#041018 30%,#031220 55%,#061A24 80%,#020810 100%)",
    glass: "rgba(2,8,16,0.92)", footer: "#010610", surfaceHover: "#0A2838", navScrolled: "rgba(2,8,16,0.92)",
  },
  sunset: {
    primary: "#FF6D00", hover: "#FF9100", g1: "#FFB74D", g2: "#E65100",
    bg: "#100804", bg2: "#180E06", bg3: "#22140A", card: "#2C1A0E",
    wh: "#FFF3E0", gr: "#C09870", dm: "#806040", dm2: "#483820",
    bodyGrad: "linear-gradient(160deg,#100804 0%,#180E06 30%,#141008 55%,#201810 80%,#100804 100%)",
    glass: "rgba(16,8,4,0.92)", footer: "#0E0603", surfaceHover: "#342012", navScrolled: "rgba(16,8,4,0.92)",
  },
  royal: {
    primary: "#7C4DFF", hover: "#B388FF", g1: "#B39DDB", g2: "#4527A0",
    bg: "#08040E", bg2: "#0E0818", bg3: "#160E24", card: "#1C1430",
    wh: "#EDE7F6", gr: "#9A88B8", dm: "#604E78", dm2: "#382A4A",
    bodyGrad: "linear-gradient(160deg,#08040E 0%,#0E0818 30%,#0C0620 55%,#140C22 80%,#08040E 100%)",
    glass: "rgba(8,4,14,0.92)", footer: "#06030C", surfaceHover: "#221838", navScrolled: "rgba(8,4,14,0.92)",
  },
  golden: {
    primary: "#FFB300", hover: "#FFD54F", g1: "#FFE082", g2: "#FF8F00",
    bg: "#0E0A02", bg2: "#161004", bg3: "#201808", card: "#2A200C",
    wh: "#FFF8E1", gr: "#B8A870", dm: "#786838", dm2: "#484018",
    bodyGrad: "linear-gradient(160deg,#0E0A02 0%,#161004 30%,#121006 55%,#1C1808 80%,#0E0A02 100%)",
    glass: "rgba(14,10,2,0.92)", footer: "#0C0802", surfaceHover: "#322810", navScrolled: "rgba(14,10,2,0.92)",
  },
  crimson: {
    primary: "#D32F2F", hover: "#EF5350", g1: "#EF9A9A", g2: "#B71C1C",
    bg: "#0E0404", bg2: "#180808", bg3: "#240E0E", card: "#2E1414",
    wh: "#FFEBEE", gr: "#B88080", dm: "#784848", dm2: "#482828",
    bodyGrad: "linear-gradient(160deg,#0E0404 0%,#180808 30%,#140606 55%,#200C0C 80%,#0E0404 100%)",
    glass: "rgba(14,4,4,0.92)", footer: "#0C0303", surfaceHover: "#361818", navScrolled: "rgba(14,4,4,0.92)",
  },
  cyber: {
    primary: "#00E5FF", hover: "#18FFFF", g1: "#84FFFF", g2: "#0097A7",
    bg: "#020A0C", bg2: "#041214", bg3: "#081C20", card: "#0C2428",
    wh: "#E0F7FA", gr: "#80C8D0", dm: "#488890", dm2: "#285058",
    bodyGrad: "linear-gradient(160deg,#020A0C 0%,#041214 30%,#031018 55%,#061820 80%,#020A0C 100%)",
    glass: "rgba(2,10,12,0.92)", footer: "#01080A", surfaceHover: "#0E2C32", navScrolled: "rgba(2,10,12,0.92)",
  },
  rosegold: {
    primary: "#E8A0B4", hover: "#F0B8C8", g1: "#F5D0DA", g2: "#C0708A",
    bg: "#0E0808", bg2: "#160E10", bg3: "#201418", card: "#2A1A1E",
    wh: "#FFF0F4", gr: "#B89098", dm: "#786068", dm2: "#483840",
    bodyGrad: "linear-gradient(160deg,#0E0808 0%,#160E10 30%,#120C0E 55%,#1C1216 80%,#0E0808 100%)",
    glass: "rgba(14,8,8,0.92)", footer: "#0C0606", surfaceHover: "#321E24", navScrolled: "rgba(14,8,8,0.92)",
  },
  navy: {
    primary: "#1565C0", hover: "#42A5F5", g1: "#90CAF9", g2: "#0D47A1",
    bg: "#04060E", bg2: "#080C18", bg3: "#0C1424", card: "#101A30",
    wh: "#E3F2FD", gr: "#8098B8", dm: "#486080", dm2: "#283848",
    bodyGrad: "linear-gradient(160deg,#04060E 0%,#080C18 30%,#060A1A 55%,#0C1222 80%,#04060E 100%)",
    glass: "rgba(4,6,14,0.92)", footer: "#03050C", surfaceHover: "#141E38", navScrolled: "rgba(4,6,14,0.92)",
  },
  sage: {
    primary: "#7CB342", hover: "#9CCC65", g1: "#C5E1A5", g2: "#558B2F",
    bg: "#080A04", bg2: "#101208", bg3: "#181C0E", card: "#202614",
    wh: "#F1F8E9", gr: "#98A880", dm: "#607048", dm2: "#384028",
    bodyGrad: "linear-gradient(160deg,#080A04 0%,#101208 30%,#0E0E06 55%,#161A0C 80%,#080A04 100%)",
    glass: "rgba(8,10,4,0.92)", footer: "#060802", surfaceHover: "#282E18", navScrolled: "rgba(8,10,4,0.92)",
  },
  cherry: {
    primary: "#F06292", hover: "#F48FB1", g1: "#F8BBD0", g2: "#C2185B",
    bg: "#0E0408", bg2: "#18080E", bg3: "#240E16", card: "#2E141C",
    wh: "#FCE4EC", gr: "#C08898", dm: "#805868", dm2: "#483040",
    bodyGrad: "linear-gradient(160deg,#0E0408 0%,#18080E 30%,#14060C 55%,#200C14 80%,#0E0408 100%)",
    glass: "rgba(14,4,8,0.92)", footer: "#0C0306", surfaceHover: "#361820", navScrolled: "rgba(14,4,8,0.92)",
  },
  violet: {
    primary: "#AA00FF", hover: "#D500F9", g1: "#EA80FC", g2: "#6200EA",
    bg: "#08020E", bg2: "#100418", bg3: "#1A0824", card: "#220C30",
    wh: "#F3E5F5", gr: "#A880C0", dm: "#684898", dm2: "#3A2060",
    bodyGrad: "linear-gradient(160deg,#08020E 0%,#100418 30%,#0C0220 55%,#180824 80%,#08020E 100%)",
    glass: "rgba(8,2,14,0.92)", footer: "#06010C", surfaceHover: "#2A1038", navScrolled: "rgba(8,2,14,0.92)",
  },
  copper: {
    primary: "#D4764E", hover: "#E09070", g1: "#ECAA90", g2: "#A04E28",
    bg: "#0C0806", bg2: "#140E0A", bg3: "#1E1610", card: "#281E16",
    wh: "#FBF0EA", gr: "#B09080", dm: "#786050", dm2: "#483828",
    bodyGrad: "linear-gradient(160deg,#0C0806 0%,#140E0A 30%,#100C08 55%,#1C1410 80%,#0C0806 100%)",
    glass: "rgba(12,8,6,0.92)", footer: "#0A0604", surfaceHover: "#30241A", navScrolled: "rgba(12,8,6,0.92)",
  },
  arctic: {
    primary: "#4DD0E1", hover: "#80DEEA", g1: "#B2EBF2", g2: "#00838F",
    bg: "#040A0C", bg2: "#081214", bg3: "#0E1C20", card: "#142428",
    wh: "#E0F7FA", gr: "#88B8C0", dm: "#507880", dm2: "#2C4A50",
    bodyGrad: "linear-gradient(160deg,#040A0C 0%,#081214 30%,#060E14 55%,#0C181E 80%,#040A0C 100%)",
    glass: "rgba(4,10,12,0.92)", footer: "#03080A", surfaceHover: "#182C30", navScrolled: "rgba(4,10,12,0.92)",
  },
  coral: {
    primary: "#FF7043", hover: "#FF8A65", g1: "#FFAB91", g2: "#D84315",
    bg: "#0E0604", bg2: "#180C08", bg3: "#22140E", card: "#2C1A14",
    wh: "#FBE9E7", gr: "#C09080", dm: "#806050", dm2: "#483828",
    bodyGrad: "linear-gradient(160deg,#0E0604 0%,#180C08 30%,#140A06 55%,#201210 80%,#0E0604 100%)",
    glass: "rgba(14,6,4,0.92)", footer: "#0C0503", surfaceHover: "#342018", navScrolled: "rgba(14,6,4,0.92)",
  },
  steel: {
    primary: "#78909C", hover: "#90A4AE", g1: "#B0BEC5", g2: "#546E7A",
    bg: "#08090A", bg2: "#0E1012", bg3: "#16181C", card: "#1E2024",
    wh: "#ECEFF1", gr: "#90989E", dm: "#586068", dm2: "#343A40",
    bodyGrad: "linear-gradient(160deg,#08090A 0%,#0E1012 30%,#0C0E10 55%,#14161A 80%,#08090A 100%)",
    glass: "rgba(8,9,10,0.92)", footer: "#060708", surfaceHover: "#262A2E", navScrolled: "rgba(8,9,10,0.92)",
  },
  wine: {
    primary: "#AD1457", hover: "#D81B60", g1: "#F06292", g2: "#880E4F",
    bg: "#0C0408", bg2: "#14080E", bg3: "#1E0E16", card: "#28141E",
    wh: "#FCE4EC", gr: "#B08090", dm: "#785060", dm2: "#482838",
    bodyGrad: "linear-gradient(160deg,#0C0408 0%,#14080E 30%,#10060C 55%,#1C0C14 80%,#0C0408 100%)",
    glass: "rgba(12,4,8,0.92)", footer: "#0A0306", surfaceHover: "#301824", navScrolled: "rgba(12,4,8,0.92)",
  },
  mint: {
    primary: "#00FFAB", hover: "#33FFBB", g1: "#66FFC8", g2: "#00CC88",
    bg: "#020C08", bg2: "#041410", bg3: "#081E16", card: "#0C281C",
    wh: "#E0FFF5", gr: "#80D0B8", dm: "#4A9A82", dm2: "#2A6A56",
    bodyGrad: "linear-gradient(160deg,#020C08 0%,#041410 30%,#031210 55%,#061C14 80%,#020C08 100%)",
    glass: "rgba(2,12,8,0.92)", footer: "#010A06", surfaceHover: "#103020", navScrolled: "rgba(2,12,8,0.92)",
  },
  teal: {
    primary: "#009688", hover: "#26A69A", g1: "#4DB6AC", g2: "#00695C",
    bg: "#020C0B", bg2: "#041410", bg3: "#081E18", card: "#0C2820",
    wh: "#E0F2F1", gr: "#80ADA8", dm: "#4A7A75", dm2: "#2A4A48",
    bodyGrad: "linear-gradient(160deg,#020C0B 0%,#041410 30%,#031210 55%,#061A16 80%,#020C0B 100%)",
    glass: "rgba(2,12,11,0.92)", footer: "#010A09", surfaceHover: "#103028", navScrolled: "rgba(2,12,11,0.92)",
  },
  matrix: {
    primary: "#00FF41", hover: "#33FF66", g1: "#66FF88", g2: "#00CC33",
    bg: "#000A00", bg2: "#001200", bg3: "#001A00", card: "#002200",
    wh: "#E0FFE0", gr: "#7ABF7A", dm: "#3D6B3D", dm2: "#1F3D1F",
    bodyGrad: "linear-gradient(160deg,#000A00 0%,#001200 30%,#000F00 55%,#001800 80%,#000A00 100%)",
    glass: "rgba(0,10,0,0.94)", footer: "#000800", surfaceHover: "#003000", navScrolled: "rgba(0,10,0,0.94)",
  },
};

const STYLE_ID = "theme-preview-override";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function injectTheme(t: ThemePalette) {
  const root = document.documentElement;
  const rgb = hexToRgb(t.primary);
  const g2Rgb = hexToRgb(t.g2);

  root.style.setProperty("--bg", t.bg);
  root.style.setProperty("--bg2", t.bg2);
  root.style.setProperty("--bg3", t.bg3);
  root.style.setProperty("--card", t.card);
  root.style.setProperty("--pink", t.primary);
  root.style.setProperty("--pink-hover", t.hover);
  root.style.setProperty("--pink12", `rgba(${rgb},0.12)`);
  root.style.setProperty("--pink06", `rgba(${rgb},0.06)`);
  root.style.setProperty("--wh", t.wh);
  root.style.setProperty("--gr", t.gr);
  root.style.setProperty("--dm", t.dm);
  root.style.setProperty("--dm2", t.dm2);

  const css = `
    body {
      background: ${t.bodyGrad} !important;
      background-attachment: fixed !important;
    }
    .glass, .nav-scrolled { background: ${t.glass} !important; }
    .footer-bg { background: ${t.footer} !important; }
    .text-gradient, html.light .text-gradient {
      background: linear-gradient(135deg, ${t.primary}, ${t.g1}, ${t.g2}) !important;
      -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; background-clip: text !important;
    }
    .glow { box-shadow: 0 0 40px rgba(${rgb},0.15) !important; }
    .glow-text { text-shadow: 0 0 30px rgba(${rgb},0.3) !important; }
    .btn-p:hover { box-shadow: 0 8px 24px rgba(${rgb},0.3) !important; }
    .hero-cta-btn {
      background: linear-gradient(135deg, ${t.primary}, ${t.g1} 22%, ${t.primary}, ${t.g1} 78%, ${t.primary}) !important;
      box-shadow: 0 14px 36px -10px rgba(${rgb},0.45), 0 0 24px rgba(${rgb},0.25) !important;
    }
    .hero-cta-btn:hover { box-shadow: 0 22px 50px -10px rgba(${rgb},0.55), 0 0 32px rgba(${rgb},0.35) !important; }
    .hero-cta-inner-btn { background: linear-gradient(135deg, ${t.primary}, ${t.g1}) !important; }
    .cw-glass-pink {
      background: linear-gradient(135deg, ${t.primary}eb, ${t.g2}eb) !important;
      box-shadow: 0 4px 16px rgba(${g2Rgb},0.2), inset 0 1px rgba(255,255,255,0.3) !important;
    }
    .cw-pink-ring { box-shadow: 0 0 0 1.5px rgba(${rgb},0.7), 0 0 0 4px rgba(${rgb},0.15) !important; }
    .chat-dot { background: rgba(${rgb},0.5) !important; }
    ::selection { background: ${t.primary} !important; }
    :focus-visible { outline-color: ${t.primary} !important; }

    /* === HARDCODED INLINE STYLE OVERRIDES === */
    [style*="linear-gradient"][style*="#E0008A"],
    [style*="linear-gradient"][style*="#e0008a"],
    [style*="linear-gradient"][style*="#C20076"],
    [style*="linear-gradient"][style*="#c20076"],
    [style*="linear-gradient"][style*="#A00062"],
    [style*="linear-gradient"][style*="#FF4DA6"],
    [style*="linear-gradient"][style*="#ff4da6"],
    [style*="linear-gradient"][style*="224, 0, 138"],
    [style*="linear-gradient"][style*="224,0,138"],
    [style*="linear-gradient"][style*="160, 0, 98"],
    [style*="linear-gradient"][style*="160,0,98"] {
      background: linear-gradient(135deg, ${t.primary} 0%, ${t.g2} 40%, ${t.g2} 100%) !important;
    }

    [style*="box-shadow"][style*="224, 0, 138"],
    [style*="box-shadow"][style*="224,0,138"],
    [style*="box-shadow"][style*="194, 0, 118"],
    [style*="box-shadow"][style*="194,0,118"] {
      box-shadow: 0 8px 24px rgba(${rgb},0.25) !important;
    }

    [style*="border"][style*="#E0008A"],
    [style*="border"][style*="#e0008a"],
    [style*="border"][style*="224, 0, 138"],
    [style*="border"][style*="224,0,138"] {
      border-color: ${t.primary} !important;
    }

    [style*="color: #E0008A"], [style*="color:#E0008A"], [style*="color: #e0008a"], [style*="color:#e0008a"],
    [style*="color: #C20076"], [style*="color:#C20076"], [style*="color: #c20076"], [style*="color:#c20076"],
    [style*="color: #FF4DA6"], [style*="color:#FF4DA6"] {
      color: ${t.primary} !important;
    }

    [style*="background: #E0008A"], [style*="background:#E0008A"],
    [style*="background-color: #E0008A"], [style*="background-color:#E0008A"],
    [style*="background: #C20076"], [style*="background:#C20076"],
    [style*="background: #FF4DA6"], [style*="background:#FF4DA6"] {
      background: ${t.primary} !important;
    }

    [style*="background"][style*="rgba(224, 0, 138"],
    [style*="background"][style*="rgba(224,0,138"],
    [style*="background"][style*="rgba(194, 0, 118"],
    [style*="background"][style*="rgba(194,0,118"],
    [style*="background"][style*="rgba(209, 0, 120"],
    [style*="background"][style*="rgba(209,0,120"],
    [style*="background"][style*="rgba(160, 0, 98"],
    [style*="background"][style*="rgba(160,0,98"] {
      background: rgba(${rgb},0.12) !important;
    }

    [style*="#651545"] { background: ${t.bg2} !important; }
    [style*="#FF4DA6"] { color: ${t.g1} !important; }

    [fill="#E0008A"], [fill="#C20076"], [fill="#FF4DA6"] { fill: ${t.primary} !important; }
    [stroke="#E0008A"], [stroke="#C20076"], [stroke="#FF4DA6"] { stroke: ${t.primary} !important; }

    /* Tailwind arbitrary value overrides */
    .border-\\[rgba\\(224\\,0\\,138\\,0\\.3\\)\\],
    .hover\\:border-\\[rgba\\(224\\,0\\,138\\,0\\.3\\)\\]:hover,
    .hover\\:border-\\[rgba\\(224\\,0\\,138\\,0\\.25\\)\\]:hover,
    .hover\\:border-\\[rgba\\(224\\,0\\,138\\,0\\.4\\)\\]:hover,
    [class*="border-[rgba(224"] {
      border-color: rgba(${rgb},0.3) !important;
    }
    [class*="shadow-"][class*="rgba(224"] {
      box-shadow: 0 8px 32px rgba(${rgb},0.1) !important;
    }
    [class*="to-[#651545]"] { --tw-gradient-to: ${t.bg3} !important; }
    [class*="via-pink-300"] { --tw-gradient-via: ${t.g1} !important; }

    /* Theme label */
    body::after {
      content: "${Object.entries(themes).find(([, v]) => v.primary === t.primary)?.[0]?.toUpperCase() || ""}";
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      z-index: 99999; padding: 8px 24px; border-radius: 999px;
      background: ${t.primary}; color: ${t.bg}; font-weight: 800;
      font-size: 14px; letter-spacing: 0.1em; pointer-events: none;
      font-family: var(--fd);
    }
  `;

  const existing = document.getElementById(STYLE_ID);
  if (existing) { existing.textContent = css; }
  else {
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }
}

export function ThemePreview() {
  const searchParams = useSearchParams();
  const themeKey = searchParams.get("theme");

  useEffect(() => {
    if (themeKey && themes[themeKey]) {
      injectTheme(themes[themeKey]);
    }
    return () => {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    };
  }, [themeKey]);

  return null;
}

export const themeNames = Object.keys(themes);
