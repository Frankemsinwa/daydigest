// src/components/dashboard/generate-section.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookText, Target, MessageSquareQuote, Save } from 'lucide-react';

import { generateDailySummary, type GenerateDailySummaryInput } from '@/ai/flows/generate-daily-summary';
import { generateFocusRecommendations, type GenerateFocusRecommendationsInput } from '@/ai/flows/generate-focus-recommendations';
import { generateReflectionPrompt, type GenerateReflectionPromptInput } from '@/ai/flows/generate-reflection-prompt';

import { saveDailySummary, saveFocusRecommendations, saveReflectionPromptEntry } from '@/lib/actions/history-actions';

interface GenerateSectionProps {
  userId: string;
}

export default function GenerateSection({ userId }: GenerateSectionProps) {
  const { toast } = useToast();

  const [accomplishments, setAccomplishments] = useState('');
  const [insights, setInsights] = useState('');
  const [dailySummary, setDailySummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isSummarySaving, setIsSummarySaving] = useState(false);

  const [focusAccomplishments, setFocusAccomplishments] = useState('');
  const [focusReflections, setFocusReflections] = useState('');
  const [focusRecommendations, setFocusRecommendations] = useState('');
  const [isFocusLoading, setIsFocusLoading] = useState(false);
  const [isFocusSaving, setIsFocusSaving] = useState(false);
  
  const [promptUserContext, setPromptUserContext] = useState('');
  const [promptDailyAccomplishments, setPromptDailyAccomplishments] = useState('');
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const [isPromptSaving, setIsPromptSaving] = useState(false);

  const getCurrentDateFormatted = () => new Date().toISOString().split('T')[0];

  const handleGenerateDailySummary = async () => {
    if (!accomplishments.trim() && !insights.trim()) {
      toast({ title: 'Input Required', description: 'Please provide accomplishments or insights.', variant: 'destructive' });
      return;
    }
    setIsSummaryLoading(true);
    setDailySummary('');
    try {
      const input: GenerateDailySummaryInput = { accomplishments, insights };
      const result = await generateDailySummary(input);
      setDailySummary(result.summary);
      toast({ title: 'Summary Generated!', description: 'Your daily summary is ready.' });
    } catch (error) {
      console.error('Error generating daily summary:', error);
      toast({ title: 'Generation Failed', description: 'Could not generate daily summary.', variant: 'destructive' });
    }
    setIsSummaryLoading(false);
  };

  const handleSaveDailySummary = async () => {
    if (!dailySummary || !userId) return;
    setIsSummarySaving(true);
    const entryDate = getCurrentDateFormatted();
    const result = await saveDailySummary(userId, dailySummary, entryDate);
    if (result.success) {
      toast({ title: 'Success!', description: 'Daily summary saved to your history.' });
    } else {
      toast({ title: 'Save Failed', description: result.error || 'Could not save daily summary.', variant: 'destructive' });
    }
    setIsSummarySaving(false);
  };
  
  const handleGenerateFocusRecommendations = async () => {
    if (!focusAccomplishments.trim() && !focusReflections.trim()) {
      toast({ title: 'Input Required', description: 'Please provide accomplishments or reflections.', variant: 'destructive' });
      return;
    }
    setIsFocusLoading(true);
    setFocusRecommendations('');
    try {
      const input: GenerateFocusRecommendationsInput = { accomplishments: focusAccomplishments, reflections: focusReflections };
      const result = await generateFocusRecommendations(input);
      setFocusRecommendations(result.recommendations);
      toast({ title: 'Recommendations Generated!', description: 'Your focus recommendations are ready.' });
    } catch (error) {
      console.error('Error generating focus recommendations:', error);
      toast({ title: 'Generation Failed', description: 'Could not generate focus recommendations.', variant: 'destructive' });
    }
    setIsFocusLoading(false);
  };

  const handleSaveFocusRecommendations = async () => {
    if (!focusRecommendations || !userId) return;
    setIsFocusSaving(true);
    const result = await saveFocusRecommendations(userId, focusRecommendations);
    if (result.success) {
      toast({ title: 'Success!', description: 'Focus recommendations saved to your history.' });
    } else {
      toast({ title: 'Save Failed', description: result.error || 'Could not save recommendations.', variant: 'destructive' });
    }
    setIsFocusSaving(false);
  };

  const handleGenerateReflectionPrompt = async () => {
    if (!promptUserContext.trim() && !promptDailyAccomplishments.trim()) {
      toast({ title: 'Input Required', description: 'Please provide user context or daily accomplishments.', variant: 'destructive' });
      return;
    }
    setIsPromptLoading(true);
    setReflectionPrompt('');
    try {
      const input: GenerateReflectionPromptInput = { userContext: promptUserContext, dailyAccomplishments: promptDailyAccomplishments };
      const result = await generateReflectionPrompt(input);
      setReflectionPrompt(result.reflectionPrompt);
      toast({ title: 'Reflection Prompt Generated!', description: 'Your reflection prompt is ready.' });
    } catch (error) {
      console.error('Error generating reflection prompt:', error);
      toast({ title: 'Generation Failed', description: 'Could not generate reflection prompt.', variant: 'destructive' });
    }
    setIsPromptLoading(false);
  };

  const handleSaveReflectionPrompt = async () => {
    if (!reflectionPrompt || !userId) return;
    setIsPromptSaving(true);
    const entryDate = getCurrentDateFormatted();
    const result = await saveReflectionPromptEntry(userId, reflectionPrompt, promptUserContext, promptDailyAccomplishments, entryDate);
     if (result.success) {
      toast({ title: 'Success!', description: 'Reflection prompt and inputs saved to your history.' });
    } else {
      toast({ title: 'Save Failed', description: result.error || 'Could not save prompt.', variant: 'destructive' });
    }
    setIsPromptSaving(false);
  };

  return (
    <section id="generate-ai" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Generate with AI</h2>
      <Tabs defaultValue="daily-summary" className="w-full">
        <TabsList className="flex w-full items-center justify-around rounded-md bg-muted p-1 text-muted-foreground mb-4 md:grid md:grid-cols-3">
           <TabsTrigger value="daily-summary" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <BookText className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
            <span className="hidden md:inline">Daily Summary</span>
          </TabsTrigger>
          <TabsTrigger value="focus-recommendations" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Target className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
            <span className="hidden md:inline">Focus</span>
          </TabsTrigger>
          <TabsTrigger value="reflection-prompt" className="flex items-center justify-center gap-2 whitespace-normal text-center px-2 py-1.5 md:px-3 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <MessageSquareQuote className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
            <span className="hidden md:inline">Reflection</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily-summary">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Generate Daily Summary</CardTitle>
              <CardDescription>Detail your day's accomplishments and insights to get an AI-powered summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="accomplishments">Accomplishments</Label>
                <Textarea id="accomplishments" placeholder="e.g., Launched new feature, closed a deal..." value={accomplishments} onChange={(e) => setAccomplishments(e.target.value)} rows={4}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="insights">Insights</Label>
                <Textarea id="insights" placeholder="e.g., Realized the importance of..." value={insights} onChange={(e) => setInsights(e.target.value)} rows={3}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateDailySummary} disabled={isSummaryLoading || isSummarySaving} className="w-full md:w-auto">
                {isSummaryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
              {dailySummary && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Generated Summary:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{dailySummary}</p>
                  <Button onClick={handleSaveDailySummary} disabled={isSummarySaving || isSummaryLoading} className="mt-4 w-full md:w-auto" variant="outline">
                    {isSummarySaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    {isSummarySaving ? 'Saving...' : 'Save to History'}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="focus-recommendations">
           <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Get Focus Recommendations</CardTitle>
              <CardDescription>Provide accomplishments and reflections for AI-powered focus suggestions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="focus-accomplishments">Today's Accomplishments</Label>
                <Textarea id="focus-accomplishments" placeholder="What you achieved today." value={focusAccomplishments} onChange={(e) => setFocusAccomplishments(e.target.value)} rows={3}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="focus-reflections">Today's Reflections</Label>
                <Textarea id="focus-reflections" placeholder="Your thoughts on today's events." value={focusReflections} onChange={(e) => setFocusReflections(e.target.value)} rows={3}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateFocusRecommendations} disabled={isFocusLoading || isFocusSaving} className="w-full md:w-auto">
                {isFocusLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isFocusLoading ? 'Generating...' : 'Get Recommendations'}
              </Button>
              {focusRecommendations && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Focus Recommendations:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{focusRecommendations}</p>
                   <Button onClick={handleSaveFocusRecommendations} disabled={isFocusSaving || isFocusLoading} className="mt-4 w-full md:w-auto" variant="outline">
                    {isFocusSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                     <Save className="mr-2 h-4 w-4" />
                    {isFocusSaving ? 'Saving...' : 'Save to History'}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reflection-prompt">
           <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Generate Reflection Prompt</CardTitle>
              <CardDescription>Share context and accomplishments for a personalized reflection prompt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="prompt-user-context">Your Context</Label>
                <Textarea id="prompt-user-context" placeholder="e.g., Software developer on a new project." value={promptUserContext} onChange={(e) => setPromptUserContext(e.target.value)} rows={3}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="prompt-daily-accomplishments">Daily Accomplishments (briefly)</Label>
                <Textarea id="prompt-daily-accomplishments" placeholder="e.g., Attended planning meeting." value={promptDailyAccomplishments} onChange={(e) => setPromptDailyAccomplishments(e.target.value)} rows={3}/>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateReflectionPrompt} disabled={isPromptLoading || isPromptSaving} className="w-full md:w-auto">
                {isPromptLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPromptLoading ? 'Generating...' : 'Get Prompt'}
              </Button>
              {reflectionPrompt && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Reflection Prompt:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{reflectionPrompt}</p>
                  <Button onClick={handleSaveReflectionPrompt} disabled={isPromptSaving || isPromptLoading} className="mt-4 w-full md:w-auto" variant="outline">
                    {isPromptSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    {isPromptSaving ? 'Saving...' : 'Save to History'}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
