import { ListChecks } from "lucide-react";
import { AiFeatureCard } from "./ai-feature-card";

export function DailySummarySection() {
  return (
    <section id="daily-summary" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Recap Your Day Instantly
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI crafts concise summaries of your accomplishments and insights, helping you see the bigger picture.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <AiFeatureCard
            icon={ListChecks}
            title="AI Daily Summaries"
            description="Get a clear overview of your daily progress without the fluff. Perfect for quick reviews and identifying patterns."
            exampleContent="Today, you successfully launched the new marketing campaign, finalized the Q3 budget, and mentored a junior team member on project management. Key insight: delegating tasks more effectively led to increased team productivity."
          />
        </div>
      </div>
    </section>
  );
}
