import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Let's Build Your AI System",
  description:
    "Get in touch with Atif Malik for AI video production, business automation, AI agents, chatbots, and custom AI systems. Free AI automation audit available.",
};

export default function ContactPage() {
  return <ContactContent />;
}
