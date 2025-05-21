
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { DailySummarySection } from "@/components/sections/daily-summary-section";
import { FocusRecommendationsSection } from "@/components/sections/focus-recommendations-section";
import { ReflectionPromptsSection } from "@/components/sections/reflection-prompts-section";
import { TestimonialCarouselSection } from "@/components/sections/testimonial-carousel-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background"> {/* bg-background will now be dark due to globals.css and body background image */}
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="space-y-12 md:space-y-20"> {/* Adjusted spacing slightly */}
          <section id="features" className="scroll-mt-20 container mx-auto px-4">
            <div className="space-y-12 md:space-y-16"> {/* Grouping features with consistent spacing */}
              <DailySummarySection />
              <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/30" />
              <FocusRecommendationsSection />
              <Separator className="my-8 md:my-12 max-w-xs mx-auto bg-border/30" />
              <ReflectionPromptsSection />
            </div>
          </section>
          <Separator className="my-8 md:my-12 max-w-md mx-auto bg-border/30" />
          <TestimonialCarouselSection />
          <Separator className="my-8 md:my-12 max-w-md mx-auto bg-border/30" />
          <section id="pricing" className="scroll-mt-20">
            <PricingSection />
          </section>
          <Separator className="my-8 md:my-12 max-w-md mx-auto bg-border/30" />
          <FaqSection />
          <Separator className="my-8 md:my-12 max-w-md mx-auto bg-border/30" />
          <section id="get-started" className="py-16 md:py-24 text-center scroll-mt-20 container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join DayDigest today and transform your daily reflections into growth.
              </p>
              {/* You could add a call to action button here if desired, similar to the navbar/hero */}
            </div>
          </section>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}
