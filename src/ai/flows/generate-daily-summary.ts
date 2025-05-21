// src/ai/flows/generate-daily-summary.ts
'use server';

/**
 * @fileOverview Generates a daily summary of a user's accomplishments and insights.
 *
 * - generateDailySummary - A function that generates the daily summary.
 * - GenerateDailySummaryInput - The input type for the generateDailySummary function.
 * - GenerateDailySummaryOutput - The return type for the generateDailySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailySummaryInputSchema = z.object({
  accomplishments: z
    .string()
    .describe('A detailed list of accomplishments for the day.'),
  insights: z.string().describe('A summary of insights gained during the day.'),
});
export type GenerateDailySummaryInput = z.infer<typeof GenerateDailySummaryInputSchema>;

const GenerateDailySummaryOutputSchema = z.object({
  summary: z.string().describe('A concise AI-powered summary of the day.'),
});
export type GenerateDailySummaryOutput = z.infer<typeof GenerateDailySummaryOutputSchema>;

export async function generateDailySummary(input: GenerateDailySummaryInput): Promise<GenerateDailySummaryOutput> {
  return generateDailySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailySummaryPrompt',
  input: {schema: GenerateDailySummaryInputSchema},
  output: {schema: GenerateDailySummaryOutputSchema},
  prompt: `You are an AI assistant designed to provide concise and insightful daily summaries.

  Based on the user's input, create a brief summary recapping their accomplishments and insights from the day.

  Accomplishments: {{{accomplishments}}}
  Insights: {{{insights}}}

  Summary:`, // Prompt is now complete
});

const generateDailySummaryFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryFlow',
    inputSchema: GenerateDailySummaryInputSchema,
    outputSchema: GenerateDailySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
