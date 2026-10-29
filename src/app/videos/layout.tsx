import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Portfolio — Cinematic AI Videos & Graphic Novels",
  description:
    "Watch studio-quality AI videos, product ads, social content, and explore AI graphic novel samples. Created by Atif Malik using Higgsfield, Kling, VEO, and Seedance.",
  alternates: { canonical: "https://atifmalik.me/videos" },
  openGraph: {
    title: "AI Video Portfolio — Atif Malik",
    description:
      "Studio-quality AI videos, product ads, social content, and AI graphic novel production. Pakistan's leading AI video production agency.",
    url: "https://atifmalik.me/videos",
    type: "website",
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
