import type { Metadata } from "next";
import { BookPageContent } from "./BookPageContent";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call",
  description:
    "Schedule a free 30-minute AI automation audit with Atif Malik. No obligation, no fluff — just actionable insights for your business.",
};

export default function BookPage() {
  return <BookPageContent />;
}
