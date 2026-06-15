import { AiAdvisorSection } from "@/components/landing/AiAdvisorSection";
import { ChatDemoSection } from "@/components/landing/ChatDemoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { GamifiedOnboardingModal } from "@/components/landing/GamifiedOnboardingModal";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingThemeProvider } from "@/components/landing/LandingThemeProvider";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { NumbersSection } from "@/components/landing/NumbersSection";
import { PricingSection } from "@/components/landing/PricingSection";

export function LandingPage() {
  return (
    <LandingThemeProvider>
      <div className="relative min-h-dvh overflow-x-hidden bg-offwhite text-ink antialiased dark:bg-background dark:text-foreground">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9999] bg-landing-grain opacity-[0.55] dark:opacity-100"
        />
        <GamifiedOnboardingModal />
        <LandingNav />
        <HeroSection />
        <MarqueeStrip />
        <HowItWorksSection />
        <FeaturesSection />
        <ChatDemoSection />
        <AiAdvisorSection />
        <NumbersSection />
        <PricingSection />
        <FinalCtaSection />
        <LandingFooter />
      </div>
    </LandingThemeProvider>
  );
}
