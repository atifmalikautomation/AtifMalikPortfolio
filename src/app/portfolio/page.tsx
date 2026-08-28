import type { Metadata } from "next";
import { PortfolioContent } from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio — AI Video, Automation & Agent Projects",
  description:
    "Explore Atif Malik's portfolio of AI video production, business automation, AI agent, chatbot, and web development projects. Real systems with real results.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
