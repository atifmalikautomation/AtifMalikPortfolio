import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { buildAboutSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Atif Malik — AI Growth Systems Expert",
  description:
    "Meet Atif Malik. AI video production specialist, automation architect, and full-stack builder helping businesses scale with intelligent AI systems. Based in Pakistan, serving clients worldwide.",
  alternates: { canonical: "https://atifmalik.me/about" },
  openGraph: {
    title: "About Atif Malik — AI Growth Systems Expert",
    description:
      "AI video production, automation, and intelligent systems. Strategy + Build from one source.",
  },
};

export default function AboutPage() {
  return (
    <>
      <SchemaScript data={buildAboutSchema()} />
      <AboutContent />
    </>
  );
}
