import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-card">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Unlock Your Day&apos;s Potential with DayDigest
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Transform daily reflections into actionable insights and focused growth. AI-powered summaries, recommendations, and prompts at your fingertips.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105">
            Start Your Journey
          </Button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group">
           <Image 
            src="https://placehold.co/600x400.png" 
            alt="Productivity illustration" 
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="productivity abstract"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
