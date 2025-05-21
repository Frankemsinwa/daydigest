import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
          {badgeText && <Badge variant="secondary" className="mt-1 bg-accent/20 text-accent border-accent/30">{badgeText}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="mt-auto bg-secondary/50 p-4 rounded-md border border-border">
          <p className="text-sm text-foreground/80 italic">
            &quot;{exampleContent}&quot;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
