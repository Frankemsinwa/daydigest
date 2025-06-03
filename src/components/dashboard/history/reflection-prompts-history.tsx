// src/components/dashboard/history/reflection-prompts-history.tsx
import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { MessageSquareQuote } from 'lucide-react';

type ReflectionPromptsHistoryProps = {
  userId: string;
};

export default async function ReflectionPromptsHistory({ userId }: ReflectionPromptsHistoryProps) {
  const supabase = createClient();
  const { data: prompts, error } = await supabase
    .from('reflection_prompts')
    .select('id, prompt, context, accomplishments, date, created_at')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching reflection prompts:', error);
    return <p className="text-destructive p-4">Could not load reflection prompt history. Please try again later.</p>;
  }

  if (!prompts || prompts.length === 0) {
     return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border/70 rounded-lg bg-card/50">
        <MessageSquareQuote className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Prompts Yet</h3>
        <p className="text-muted-foreground">Your generated reflection prompts will appear here.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {prompts.map((item) => (
          <Card key={item.id} className="border-border/70 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageSquareQuote className="h-5 w-5 mr-2 text-primary" />
                Reflection for {format(new Date(item.date), 'MMMM d, yyyy')}
              </CardTitle>
              <CardDescription className="text-xs">
                Saved on: {format(new Date(item.created_at!), 'MMM d, yyyy HH:mm')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground/80 mb-1">Prompt:</p>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap italic leading-relaxed">"{item.prompt}"</p>
              </div>
              {(item.context || item.accomplishments) && <hr className="border-border/50 my-3" />}
              {item.context && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Your Context Provided:</p>
                  <p className="text-xs text-foreground/80 whitespace-pre-wrap">{item.context}</p>
                </div>
              )}
              {item.accomplishments && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Accomplishments Provided:</p>
                  <p className="text-xs text-foreground/80 whitespace-pre-wrap">{item.accomplishments}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
