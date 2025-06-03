// src/components/dashboard/history/daily-summary-history.tsx
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { BookOpenText } from 'lucide-react';

type DailySummaryHistoryProps = {
  userId: string;
};

export default async function DailySummaryHistory({ userId }: DailySummaryHistoryProps) {
  const supabase = createClient();
  const { data: summaries, error } = await supabase
    .from('daily_summaries')
    .select('id, date, summary, created_at')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false }) // Secondary sort for multiple entries on the same date
    .limit(20); 

  if (error) {
    console.error('Error fetching daily summaries:', error);
    return <p className="text-destructive p-4">Could not load daily summary history. Please try again later.</p>;
  }

  if (!summaries || summaries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border/70 rounded-lg bg-card/50">
        <BookOpenText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Summaries Yet</h3>
        <p className="text-muted-foreground">Your generated daily summaries will appear here.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4"> {/* Adjust height as needed */}
      <div className="space-y-4">
        {summaries.map((item) => (
          <Card key={item.id} className="border-border/70 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BookOpenText className="h-5 w-5 mr-2 text-primary" />
                Summary for {format(new Date(item.date), 'MMMM d, yyyy')}
              </CardTitle>
              <CardDescription className="text-xs">
                Saved on: {format(new Date(item.created_at!), 'MMM d, yyyy HH:mm')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
