import { Target } from "lucide-react";
import { AiFeatureCard } from "./ai-feature-card";

export function FocusRecommendationsSection() {
  return (
    <section id="focus-recommendations" className="py-16 md:py-24 bg-transparent"> {/* bg-transparent or subtle contrast */}
      <div className="container mx-auto px-4">
         <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sharpen Your Focus for Tomorrow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Receive personalized, AI-generated recommendations to help you prioritize tasks and hit the ground running.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <AiFeatureCard
            icon={Target}
            title="Personalized Focus Recommendations"
            description="Based on your daily activities and reflections, our AI suggests key areas to concentrate on for maximum impact."
            exampleContent="For tomorrow, prioritize: 1. Follow up with leads from the new campaign. 2. Prepare agenda for Q3 budget review. 3. Schedule a check-in with the junior team member."
          />
        </div>
      </div>
    </section>
  );
}
