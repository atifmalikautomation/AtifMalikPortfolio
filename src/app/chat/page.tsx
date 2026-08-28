import type { Metadata } from "next";
import { ChatPageContent } from "./ChatPageContent";

export const metadata: Metadata = {
  title: "Talk to Atif AI — AI Consultation Assistant",
  description:
    "Chat with Atif AI to explore AI video production, automation, agents, and chatbot solutions for your business. Get personalized recommendations instantly.",
};

export default function ChatPage() {
  return <ChatPageContent />;
}
