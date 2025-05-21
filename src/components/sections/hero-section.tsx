import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-transparent"> {/* Changed background */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"> {/* Changed text color */}
            Unlock Your Day&apos;s Potential with DayDigest
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Transform daily reflections into actionable insights and focused growth. AI-powered summaries, recommendations, and prompts at your fingertips.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 rounded-full"> {/* Added rounded-full */}
            Start Your Journey
          </Button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group border border-border/50"> {/* Added subtle border */}
           <Image 
            src="https://placehold.co/600x400.png" 
            alt="Productivity illustration" 
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="abstract technology"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> {/* Softened gradient */}
        </div>
      </div>
    </section>
  );
}
