
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Card is still used for structure
import { CheckCircle2, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "Get started with core reflection tools.",
    features: [
      "AI Daily Summary (1 per day)",
      "Basic Reflection Prompts",
      "Community Support",
    ],
    cta: "Get Started for Free",
    variant: "outline" as "outline" | "default",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    description: "Unlock the full power of DayDigest.",
    features: [
      "Unlimited AI Daily Summaries",
      "Personalized Focus Recommendations",
      "Advanced Reflection Prompts",
      "Progress Tracking & Analytics",
      "Priority Support",
    ],
    cta: "Upgrade to Pro",
    variant: "default" as "outline" | "default",
    highlight: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-transparent scroll-mt-20 animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out"> {/* bg-transparent or subtle contrast like bg-card */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Find the Plan That&apos;s Right for You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing. Choose the plan that fits your journey to enhanced productivity and self-awareness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col bg-card/70 backdrop-blur-sm rounded-xl border ${plan.highlight ? 'border-primary ring-2 ring-primary/50' : 'border-border/70'}`}> {/* Removed shadows, adjusted bg, border, rounded */}
              <CardHeader className="pb-4">
                {plan.highlight && (
                   <div className="flex justify-center mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                   </div>
                )}
                <CardTitle className="text-2xl font-semibold text-center text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-center text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-center mb-6">
                  <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" /> {/* Changed icon color to primary */}
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" variant={plan.variant} className="w-full mt-4 rounded-full"> {/* Added rounded-full */}
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
