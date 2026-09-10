import type { Metadata } from "next";
import { BookPageContent } from "./BookPageContent";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call — Atif Malik AI Agency",
  description:
    "Schedule a free 30-minute AI automation audit with Atif Malik. No obligation, no fluff — just actionable insights for your business.",
  alternates: { canonical: "https://atifmalik.me/book" },
};

export default function BookPage() {
  return <BookPageContent />;
}
