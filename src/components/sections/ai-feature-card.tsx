import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Card might be unused if we simplify
import { Badge } from "@/components/ui/badge";

interface AiFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  exampleContent: string;
  badgeText?: string;
}

export function AiFeatureCard({ icon: Icon, title, description, exampleContent, badgeText = "AI Powered" }: AiFeatureCardProps) {
  return (
    // Added relative and overflow-hidden
    <div className="relative overflow-hidden bg-transparent p-6 rounded-lg border border-border/70 flex flex-col h-full">
      <div className="flex flex-row items-start gap-4 space-y-0 pb-4 z-10"> {/* Ensure content is above flare */}
        <div className="p-3 rounded-full bg-primary/10 text-primary"> {/* Icon background style update */}
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3> {/* Changed to h3 for semantics */}
          {badgeText && <Badge variant="outline" className="mt-1 border-primary/50 text-primary bg-primary/10">{badgeText}</Badge>} {/* Adjusted badge style */}
        </div>
      </div>
      <div className="flex-grow flex flex-col z-10"> {/* Ensure content is above flare */}
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="mt-auto bg-secondary/30 p-4 rounded-md border border-border/50"> {/* Example content style update */}
          <p className="text-sm text-foreground/80 italic">
            &quot;{exampleContent}&quot;
          </p>
        </div>
      </div>
      {/* Blur glow light flare element */}
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary opacity-[0.08] rounded-full blur-[70px] -z-0 pointer-events-none"
      />
    </div>
  );
}
