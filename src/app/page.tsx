import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { DailySummarySection } from "@/components/sections/daily-summary-section";
import { FocusRecommendationsSection } from "@/components/sections/focus-recommendations-section";
import { ReflectionPromptsSection } from "@/components/sections/reflection-prompts-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="space-y-16 md:space-y-24">
          <DailySummarySection />
          <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
          <FocusRecommendationsSection />
          <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
          <ReflectionPromptsSection />
          <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
          <PricingSection />
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
