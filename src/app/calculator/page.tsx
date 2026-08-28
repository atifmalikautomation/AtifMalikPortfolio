import type { Metadata } from "next";
import { CalculatorPage } from "./CalculatorPage";

export const metadata: Metadata = {
  title: "AI Automation ROI Calculator",
  description:
    "Calculate how much manual work is costing your business. Estimate recoverable hours, monthly costs, and your automation opportunity score.",
};

export default function Calculator() {
  return <CalculatorPage />;
}
