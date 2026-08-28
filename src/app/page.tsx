import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { AIStack } from "@/components/home/AIStack";
import { FrontierModels } from "@/components/home/FrontierModels";
import { BusinessPain } from "@/components/home/BusinessPain";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CalculatorEmbed } from "@/components/home/CalculatorEmbed";
import { ProblemsSection } from "@/components/home/ProblemsSection";
import { FiveStepClimb } from "@/components/home/FiveStepClimb";
import { GrowthSystem } from "@/components/home/GrowthSystem";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { AffiliateSection } from "@/components/home/AffiliateSection";
import { CallPopup } from "@/components/home/CallPopup";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <AboutSection />
      <StatsCounter />
      <AIStack />
      <FrontierModels />
      <BusinessPain />
      <ServicesGrid />
      <CalculatorEmbed />
      <ProblemsSection />
      <FiveStepClimb />
      <GrowthSystem />
      {/* Portfolio removed from homepage — available at /portfolio */}
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactCTA />
      {/* AffiliateSection removed */}
      <CallPopup />
    </>
  );
}
