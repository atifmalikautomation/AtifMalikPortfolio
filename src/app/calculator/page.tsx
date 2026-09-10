import type { Metadata } from "next";
import { CalculatorPage } from "./CalculatorPage";

export const metadata: Metadata = {
  title: "AI Automation ROI Calculator — Free Tool by Atif Malik",
  description:
    "Calculate how much manual work is costing your business. Estimate recoverable hours, monthly costs, and your automation opportunity score. Free tool by Pakistan's No.1 AI agency.",
  alternates: { canonical: "https://atifmalik.me/calculator" },
};

export default function Calculator() {
  return <CalculatorPage />;
}
