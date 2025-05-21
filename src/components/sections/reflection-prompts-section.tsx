import { MessageCircleQuestion } from "lucide-react";
import { AiFeatureCard } from "./ai-feature-card";

export function ReflectionPromptsSection() {
  return (
    <section id="reflection-prompts" className="py-16 md:py-24 bg-transparent"> {/* bg-transparent */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Deepen Your Self-Understanding
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Engage with thought-provoking, AI-generated prompts designed to foster self-assessment and mental clarity.
          </p>
        </div>
         <div className="max-w-2xl mx-auto">
          <AiFeatureCard
            icon={MessageCircleQuestion}
            title="Engaging Reflection Prompts"
            description="End your day with meaningful reflection. Our AI crafts unique prompts to guide your thoughts and uncover valuable insights."
            exampleContent="Considering today's challenges, what's one new strength you discovered in yourself, and how can you nurture it further?"
          />
        </div>
      </div>
    </section>
  );
}
