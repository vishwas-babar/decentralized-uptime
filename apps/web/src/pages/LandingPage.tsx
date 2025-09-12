import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhyDecentralizedSection } from "@/components/landing/WhyDecentralizedSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyDecentralizedSection />
      <Footer />
    </div>
  );
}
