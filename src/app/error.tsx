"use client";

import { RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-pink/20 font-display mb-4">
          500
        </div>
        <h1 className="text-2xl font-display font-bold text-wh mb-2">Something Went Wrong</h1>
        <p className="text-gr mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="hero-cta-btn inline-flex items-center gap-2"
        >
          <span className="hero-cta-inner-btn">
            <RefreshCw size={16} />
            Try Again
          </span>
        </button>
      </div>
    </div>
  );
}
