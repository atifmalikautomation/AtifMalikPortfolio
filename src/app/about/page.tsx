import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Atif Malik — AI Growth Systems Expert",
  description:
    "Meet Atif Malik. AI video production specialist, automation architect, and full-stack builder helping businesses scale with intelligent AI systems. Based in Pakistan, serving clients worldwide.",
  openGraph: {
    title: "About Atif Malik — AI Growth Systems Expert",
    description:
      "AI video production, automation, and intelligent systems. Strategy + Build from one source.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
