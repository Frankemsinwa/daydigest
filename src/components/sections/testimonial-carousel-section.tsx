
"use client"

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';
import Autoplay from 'embla-carousel-autoplay';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      "DayDigest has completely transformed my end-of-day routine. The AI summaries are spot-on and save me so much time.",
    author: 'Sarah L., Project Manager',
    role: 'Tech Solutions Inc.',
    avatarUrl: 'https://placehold.co/80x80.png',
  },
  {
    id: '2',
    quote:
      "The personalized focus recommendations are a game-changer. I feel more prepared and productive each morning.",
    author: 'Michael B., Entrepreneur',
    role: 'Innovate Hub',
    avatarUrl: 'https://placehold.co/80x80.png',
  },
  {
    id: '3',
    quote:
      "I used to dread writing daily updates. Now, with DayDigest, it's a breeze. The reflection prompts are also fantastic for clarity.",
    author: 'Jessica W., Marketing Lead',
    role: 'Creative Co.',
    avatarUrl: 'https://placehold.co/80x80.png',
  },
  {
    id: '4',
    quote:
      "As a team lead, getting concise daily updates from my team via DayDigest has improved our syncs and overall efficiency.",
    author: 'David K., Engineering Manager',
    role: 'Future Systems',
    avatarUrl: 'https://placehold.co/80x80.png',
  },
  {
    id: '5',
    quote:
      "The elegant interface and insightful AI features make DayDigest an indispensable tool for personal and professional growth.",
    author: 'Emily R., Freelance Consultant',
    role: 'Self-Employed',
    avatarUrl: 'https://placehold.co/80x80.png',
  },
];

export function TestimonialCarouselSection() {
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();

  const autoplayPlugin = React.useMemo(() => {
    if (isMobile) {
      return Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true });
    }
    return undefined;
  }, [isMobile]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-transparent animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Hear From Our Users
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how DayDigest is helping individuals and teams reflect, focus, and grow.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
          setApi={setApi}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 flex flex-col h-full p-6 md:p-8 relative overflow-hidden transition-all duration-300 ease-out hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                    <div
                      aria-hidden="true"
                      className="absolute -top-20 -left-20 w-60 h-60 bg-primary opacity-[0.03] rounded-full blur-[70px] -z-0 pointer-events-none"
                    />
                    <svg
                      className="w-8 h-8 text-primary/50 mb-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M6 2a3 3 0 00-3 3v6a3 3 0 003 3h2a1 1 0 001-1V9a1 1 0 00-1-1H5V5a1 1 0 011-1h1a1 1 0 100-2H6zM14 2a3 3 0 00-3 3v6a3 3 0 003 3h2a1 1 0 001-1V9a1 1 0 00-1-1h-3V5a1 1 0 011-1h1a1 1 0 100-2h-1z"
                      ></path>
                    </svg>
                    <CardContent className="p-0 flex-grow mb-6">
                      <p className="text-base md:text-lg text-foreground/90 leading-relaxed italic">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </CardContent>
                    <div className="mt-auto flex items-center z-10">
                      {testimonial.avatarUrl && (
                        <Image
                          src={testimonial.avatarUrl}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="rounded-full mr-4 border-2 border-primary/20"
                          data-ai-hint="person portrait"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-16px] md:left-[-24px] lg:left-[-50px] top-1/2 -translate-y-1/2 bg-background/80 border-border/80 text-foreground enabled:hover:bg-primary enabled:hover:text-primary-foreground hidden sm:inline-flex" />
          <CarouselNext className="absolute right-[-16px] md:right-[-24px] lg:right-[-50px] top-1/2 -translate-y-1/2 bg-background/80 border-border/80 text-foreground enabled:hover:bg-primary enabled:hover:text-primary-foreground hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
