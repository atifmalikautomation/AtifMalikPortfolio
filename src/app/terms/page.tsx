import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for atifmalik.me — AI Growth Systems & AI Video Production.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>Last updated: August 2026</p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Services</h2>
          <p>
            Atif Malik provides AI video production, business automation, AI agent development,
            chatbot development, and related AI services. Project scope, timeline, and deliverables
            are agreed upon individually for each engagement.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Website Use</h2>
          <p>
            This website is provided for informational purposes. The AI calculator provides estimates
            based on typical automation results and does not guarantee specific outcomes. Actual results
            depend on your specific business processes and implementation.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Intellectual Property</h2>
          <p>
            All content on this website, including text, design, and code, is the property of Atif Malik
            unless otherwise noted. Project deliverables and intellectual property rights are defined
            in individual project agreements.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Contact</h2>
          <p>
            For questions about these terms, please contact us through the contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
