// src/app/dashboard/page.tsx
import React from 'react';
import GenerateSection from '@/components/dashboard/generate-section';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DailySummaryHistory from '@/components/dashboard/history/daily-summary-history';
import FocusRecommendationsHistory from '@/components/dashboard/history/focus-recommendations-history';
import ReflectionPromptsHistory from '@/components/dashboard/history/reflection-prompts-history';
import SettingsSection from '@/components/dashboard/settings-section';
import { SkeletonHistoryList } from '@/components/ui/skeleton-history-card';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { BookOpenText, Target, MessageSquareQuote } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This check is also in layout.tsx, but good for direct page access safety
    redirect('/login');
  }

  return (
    <div className="space-y-8">
      <GenerateSection userId={user.id} />
      
      <Separator className="my-10 bg-border/50" />
      
      <section id="history" className="scroll-mt-20">
        <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">Your History</h2>
        <Tabs defaultValue="daily-summary" className="w-full">
          <TabsList className="flex w-full items-center justify-around rounded-md bg-muted p-1 text-muted-foreground mb-6 md:grid md:grid-cols-3">
            <TabsTrigger value="daily-summary" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <BookOpenText className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" /> <span className="hidden md:inline">Daily Summaries</span>
            </TabsTrigger>
            <TabsTrigger value="focus-recommendations" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <Target className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" /> <span className="hidden md:inline">Focus</span>
            </TabsTrigger>
            <TabsTrigger value="reflection-prompts" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
              <MessageSquareQuote className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" /> <span className="hidden md:inline">Reflections</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily-summary">
            <React.Suspense fallback={<SkeletonHistoryList count={3} />}>
              <DailySummaryHistory userId={user.id} />
            </React.Suspense>
          </TabsContent>
          <TabsContent value="focus-recommendations">
            <React.Suspense fallback={<SkeletonHistoryList count={3} />}>
              <FocusRecommendationsHistory userId={user.id} />
            </React.Suspense>
          </TabsContent>
          <TabsContent value="reflection-prompts">
            <React.Suspense fallback={<SkeletonHistoryList count={3} />}>
              <ReflectionPromptsHistory userId={user.id} />
            </React.Suspense>
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="my-10 bg-border/50" />

      <section id="quick-notes" className="scroll-mt-20">
        <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">Quick Notes / Thought Recorder</h2>
        <div className="bg-card p-6 rounded-lg border border-border/70 text-muted-foreground">
          <p>A mini textarea with "Save Note" button will be here...</p>
          <p>This section is under construction. Forms used here should be responsive.</p>
        </div>
      </section>

      <Separator className="my-10 bg-border/50" />

      <SettingsSection />

    </div>
  );
}
