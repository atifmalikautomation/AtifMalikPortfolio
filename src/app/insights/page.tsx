import type { Metadata } from "next";
import { InsightsContent } from "./InsightsContent";

export const metadata: Metadata = {
  title: "AI Growth Lab — Insights on AI Video, Automation & Agents",
  description:
    "Expert insights on AI video production, business automation, AI agents, n8n workflows, and AI-powered growth systems. By Atif Malik.",
};

export default function InsightsPage() {
  return <InsightsContent />;
}
