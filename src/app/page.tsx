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
          <section id="features" className="scroll-mt-20">
            <DailySummarySection />
            <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
            <FocusRecommendationsSection />
            <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
            <ReflectionPromptsSection />
          </section>
          <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/50" />
          <section id="pricing" className="scroll-mt-20">
            <PricingSection />
          </section>
          {/* Placeholder for Get Started section if needed, or remove if button links elsewhere */}
          <section id="get-started" className="py-16 md:py-24 text-center scroll-mt-20">
            <div className="container">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join DayDigest today and transform your daily reflections into growth.
              </p>
              {/* You can add a sign-up form or more content here */}
            </div>
          </section>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
