import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for atifmalik.me — AI Growth Systems & AI Video Production.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 section-padding">
      <div className="container-narrow mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>Last updated: August 2026</p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Information We Collect</h2>
          <p>
            When you use our website, we may collect information you provide directly, such as your name,
            email address, and project details when you submit the contact form or interact with the AI chat assistant.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">How We Use Information</h2>
          <p>
            We use the information collected to respond to your inquiries, provide our services,
            improve our website, and communicate with you about projects and updates.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">AI Chat Assistant</h2>
          <p>
            Our AI chat assistant processes your messages to provide helpful responses about our services.
            Conversations are not stored permanently and are not used to train AI models. Messages are
            processed through secure API endpoints.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information. API keys and credentials
            are stored securely in server-side environment variables and are never exposed in client-side code.
          </p>

          <h2 className="text-xl font-semibold text-text-primary mt-8">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us through the contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
