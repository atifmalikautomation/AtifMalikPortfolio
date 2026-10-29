import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { buildContactSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Let's Build Your AI System",
  description:
    "Get in touch with Atif Malik for AI video production, business automation, AI agents, chatbots, and custom AI systems. Free AI automation audit available.",
  alternates: { canonical: "https://atifmalik.me/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SchemaScript data={buildContactSchema()} />
      <ContactContent />
    </>
  );
}
