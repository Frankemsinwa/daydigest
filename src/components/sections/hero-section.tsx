
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/assets/img/hero.jpg";
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-transparent">
      <div
        aria-hidden="true"
        className="absolute -top-80 -left-80 w-[700px] h-[700px]
                   bg-primary opacity-[0.08]
                   rounded-full
                   blur-[120px]
                   pointer-events-none "
      />
      <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Unlock Your Day&apos;s Potential with DayDigest
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:300ms]">
          Transform daily reflections into actionable insights and focused growth. AI-powered summaries, recommendations, and prompts at your fingertips.
          </p>
          <Link href="/signup" passHref legacyBehavior>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 rounded-full animate-in fade-in zoom-in-95 duration-700 [animation-delay:600ms]"
            >
              <a>Start Your Journey</a>
            </Button>
          </Link>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden group border border-primary/30 shadow-[0_0_35px_2px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_45px_5px_hsl(var(--primary)/0.4)] transition-shadow duration-300 ease-out animate-in fade-in zoom-in-95 [animation-delay:400ms]">
           <Image
            src={heroImage}
            alt="Stylized brain with a clock"
            fill
            style={{objectFit:"cover"}}
            className="w-full h-full transform transition-transform duration-500 group-hover:scale-105"
            priority
            data-ai-hint="brain clock"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
