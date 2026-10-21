import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved. Return to Atif Malik's AI Video Production & Automation Agency.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-pink/20 font-display mb-4">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-wh mb-2">Page Not Found</h1>
        <p className="text-gr mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-display font-bold text-white transition-all hover:scale-105" style={{ background: "var(--pink)" }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
