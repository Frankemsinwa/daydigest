// src/ai/flows/generate-daily-summary.ts
'use server';

/**
 * @fileOverview Generates a daily summary of a user's accomplishments and insights.
 *
 * - generateDailySummary - A function that generates the daily summary.
 * - GenerateDailySummaryInput - The input type for the generateDailySummary function.
 * - GenerateDailySummaryOutput - The return type for the generateDailySummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateDailySummaryInputSchema = z.object({
  accomplishments: z
    .string()
    .describe('A detailed list of accomplishments for the day.'),
  insights: z
    .string()
    .describe('A summary of insights gained during the day.'),
  mood: z
    .string()
    .optional()
    .describe('The user’s general mood or emotional state during the day.'),
  userName: z
    .string()
    .optional()
    .describe("The user's first name to personalize the summary."),
});

export type GenerateDailySummaryInput = z.infer<typeof GenerateDailySummaryInputSchema>;

const GenerateDailySummaryOutputSchema = z.object({
  summary: z.string().describe('A concise AI-powered summary of the day.'),
});

export type GenerateDailySummaryOutput = z.infer<typeof GenerateDailySummaryOutputSchema>;

export async function generateDailySummary(
  input: GenerateDailySummaryInput
): Promise<GenerateDailySummaryOutput> {
  return generateDailySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailySummaryPrompt',
  input: { schema: GenerateDailySummaryInputSchema },
  output: { schema: GenerateDailySummaryOutputSchema },
  prompt: `You are an AI assistant designed to generate personalized and emotionally aware daily summaries.

Based on the user's input, provide a concise and encouraging summary that reflects their accomplishments, insights, and general mood. If available, include the user's first name in a natural and respectful tone.

{{#if userName}}Name: {{{userName}}}{{/if}}
Accomplishments: {{{accomplishments}}}
Insights: {{{insights}}}
{{#if mood}}Mood: {{{mood}}}{{/if}}

Summary:`,
});

const generateDailySummaryFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryFlow',
    inputSchema: GenerateDailySummaryInputSchema,
    outputSchema: GenerateDailySummaryOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);