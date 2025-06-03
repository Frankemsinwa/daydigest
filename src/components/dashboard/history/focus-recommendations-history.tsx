// src/components/dashboard/history/focus-recommendations-history.tsx
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Target } from 'lucide-react';

type FocusRecommendationsHistoryProps = {
  userId: string;
};

export default async function FocusRecommendationsHistory({ userId }: FocusRecommendationsHistoryProps) {
  const supabase = createClient();
  const { data: recommendations, error } = await supabase
    .from('focus_recommendations')
    .select('id, recommendations, generated_at')
    .eq('user_id', userId)
    .order('generated_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching focus recommendations:', error);
    return <p className="text-destructive p-4">Could not load focus recommendations history. Please try again later.</p>;
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border/70 rounded-lg bg-card/50">
        <Target className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Recommendations Yet</h3>
        <p className="text-muted-foreground">Your generated focus recommendations will appear here.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {recommendations.map((item) => (
          <Card key={item.id} className="border-border/70 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Focus Recommendations
              </CardTitle>
              <CardDescription className="text-xs">
                Generated on: {format(new Date(item.generated_at), 'MMMM d, yyyy HH:mm')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{item.recommendations}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
