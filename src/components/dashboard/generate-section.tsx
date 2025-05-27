
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookText, Target, MessageSquareQuote } from 'lucide-react';

// Import AI flow functions
import { generateDailySummary, type GenerateDailySummaryInput } from '@/ai/flows/generate-daily-summary';
import { generateFocusRecommendations, type GenerateFocusRecommendationsInput } from '@/ai/flows/generate-focus-recommendations';
import { generateReflectionPrompt, type GenerateReflectionPromptInput } from '@/ai/flows/generate-reflection-prompt';


export default function GenerateSection() {
  const { toast } = useToast();

  // State for Daily Summary
  const [accomplishments, setAccomplishments] = useState('');
  const [insights, setInsights] = useState('');
  const [dailySummary, setDailySummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  // State for Focus Recommendations
  const [focusAccomplishments, setFocusAccomplishments] = useState('');
  const [focusReflections, setFocusReflections] = useState('');
  const [focusRecommendations, setFocusRecommendations] = useState('');
  const [isFocusLoading, setIsFocusLoading] = useState(false);
  
  // State for Reflection Prompt
  const [promptUserContext, setPromptUserContext] = useState('');
  const [promptDailyAccomplishments, setPromptDailyAccomplishments] = useState('');
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [isPromptLoading, setIsPromptLoading] = useState(false);


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
  
  const handleGenerateFocusRecommendations = async () => {
    if (!focusAccomplishments.trim() && !focusReflections.trim()) {
      toast({ title: 'Input Required', description: 'Please provide accomplishments or reflections for focus recommendations.', variant: 'destructive' });
      return;
    }
    setIsFocusLoading(true);
    setFocusRecommendations('');
    try {
      const input: GenerateFocusRecommendationsInput = { accomplishments: focusAccomplishments, reflections: focusReflections };
      const result = await generateFocusRecommendations(input);
      setFocusRecommendations(result.recommendations);
      toast({ title: 'Focus Recommendations Generated!', description: 'Your focus recommendations are ready.' });
    } catch (error) {
      console.error('Error generating focus recommendations:', error);
      toast({ title: 'Generation Failed', description: 'Could not generate focus recommendations.', variant: 'destructive' });
    }
    setIsFocusLoading(false);
  };

  const handleGenerateReflectionPrompt = async () => {
    if (!promptUserContext.trim() && !promptDailyAccomplishments.trim()) {
      toast({ title: 'Input Required', description: 'Please provide user context or daily accomplishments for reflection prompt.', variant: 'destructive' });
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


  return (
    <section id="generate-ai" className="scroll-mt-20">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Generate with AI</h2>
      <Tabs defaultValue="daily-summary" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-4">
          <TabsTrigger value="daily-summary" className="flex items-center justify-center gap-2 whitespace-normal text-center">
            <BookText className="h-4 w-4 flex-shrink-0" /> Generate Daily Summary
          </TabsTrigger>
          <TabsTrigger value="focus-recommendations" className="flex items-center justify-center gap-2 whitespace-normal text-center">
            <Target className="h-4 w-4 flex-shrink-0" /> Get Focus Recommendations
          </TabsTrigger>
          <TabsTrigger value="reflection-prompt" className="flex items-center justify-center gap-2 whitespace-normal text-center">
            <MessageSquareQuote className="h-4 w-4 flex-shrink-0" /> Generate Reflection Prompt
          </TabsTrigger>
        </TabsList>

        {/* Daily Summary Tab */}
        <TabsContent value="daily-summary">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Generate Daily Summary</CardTitle>
              <CardDescription>Detail your day's accomplishments and insights to get an AI-powered summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="accomplishments">Accomplishments</Label>
                <Textarea
                  id="accomplishments"
                  placeholder="e.g., Launched new feature, closed a deal, learned a new skill..."
                  value={accomplishments}
                  onChange={(e) => setAccomplishments(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="insights">Insights</Label>
                <Textarea
                  id="insights"
                  placeholder="e.g., Realized the importance of..., Discovered a new approach for..."
                  value={insights}
                  onChange={(e) => setInsights(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateDailySummary} disabled={isSummaryLoading} className="w-full md:w-auto">
                {isSummaryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
              {dailySummary && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Generated Summary:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{dailySummary}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Focus Recommendations Tab */}
        <TabsContent value="focus-recommendations">
           <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Get Focus Recommendations</CardTitle>
              <CardDescription>Provide your accomplishments and reflections to receive AI-powered focus suggestions for tomorrow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="focus-accomplishments">Today's Accomplishments</Label>
                <Textarea
                  id="focus-accomplishments"
                  placeholder="Briefly list what you achieved today."
                  value={focusAccomplishments}
                  onChange={(e) => setFocusAccomplishments(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="focus-reflections">Today's Reflections</Label>
                <Textarea
                  id="focus-reflections"
                  placeholder="What are your thoughts on today's events, challenges, or learnings?"
                  value={focusReflections}
                  onChange={(e) => setFocusReflections(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateFocusRecommendations} disabled={isFocusLoading} className="w-full md:w-auto">
                {isFocusLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isFocusLoading ? 'Generating...' : 'Get Recommendations'}
              </Button>
              {focusRecommendations && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Focus Recommendations:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{focusRecommendations}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reflection Prompt Tab */}
        <TabsContent value="reflection-prompt">
           <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Generate Reflection Prompt</CardTitle>
              <CardDescription>Share some context about yourself and your day for a personalized reflection prompt.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="prompt-user-context">Your Context</Label>
                <Textarea
                  id="prompt-user-context"
                  placeholder="e.g., Software developer working on a new project, feeling a bit stuck."
                  value={promptUserContext}
                  onChange={(e) => setPromptUserContext(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="prompt-daily-accomplishments">Daily Accomplishments (briefly)</Label>
                <Textarea
                  id="prompt-daily-accomplishments"
                  placeholder="e.g., Attended planning meeting, debugged a critical issue."
                  value={promptDailyAccomplishments}
                  onChange={(e) => setPromptDailyAccomplishments(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button onClick={handleGenerateReflectionPrompt} disabled={isPromptLoading} className="w-full md:w-auto">
                {isPromptLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPromptLoading ? 'Generating...' : 'Get Prompt'}
              </Button>
              {reflectionPrompt && (
                <div className="w-full p-4 bg-secondary/50 rounded-md border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Reflection Prompt:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{reflectionPrompt}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

    