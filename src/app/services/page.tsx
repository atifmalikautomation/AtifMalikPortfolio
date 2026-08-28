import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "AI Services — AI Video, Automation, Agents & Chatbots",
  description:
    "Explore Atif Malik's AI services: AI video production, business automation with n8n, AI agents, chatbots, content systems, web development, and lead automation. Pakistan's AI growth systems expert.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
