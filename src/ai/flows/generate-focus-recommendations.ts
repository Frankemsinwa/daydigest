// src/ai/flows/generate-focus-recommendations.ts
'use server';

/**
 * @fileOverview AI-powered focus recommendation generator based on user's accomplishments, reflections, and goals.
 *
 * - generateFocusRecommendations - A function that generates focus recommendations.
 * - GenerateFocusRecommendationsInput - The input type for the generateFocusRecommendations function.
 * - GenerateFocusRecommendationsOutput - The return type for the generateFocusRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFocusRecommendationsInputSchema = z.object({
  accomplishments: z
    .string()
    .describe('A summary of the user\'s accomplishments for the day.'),
  reflections: z
    .string()
    .describe('The user\'s reflections on the day\'s events and experiences.'),
  goals: z
    .string()
    .optional()
    .describe('The user\'s personal or professional goals to align focus.'),
  userName: z
    .string()
    .optional()
    .describe("The user's first name for personalization."),
});

export type GenerateFocusRecommendationsInput = z.infer<
  typeof GenerateFocusRecommendationsInputSchema
>;

const GenerateFocusRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized and actionable focus recommendations for the next day.'),
});

export type GenerateFocusRecommendationsOutput = z.infer<
  typeof GenerateFocusRecommendationsOutputSchema
>;

export async function generateFocusRecommendations(
  input: GenerateFocusRecommendationsInput
): Promise<GenerateFocusRecommendationsOutput> {
  return generateFocusRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFocusRecommendationsPrompt',
  input: { schema: GenerateFocusRecommendationsInputSchema },
  output: { schema: GenerateFocusRecommendationsOutputSchema },
  prompt: `You are an AI assistant that provides motivational and practical focus recommendations for the user.

Consider the user's accomplishments, reflections, and (if provided) their long-term goals. Your output should be personal, insightful, and action-oriented.

{{#if userName}}User: {{{userName}}}{{/if}}
Accomplishments: {{{accomplishments}}}
Reflections: {{{reflections}}}
{{#if goals}}Goals: {{{goals}}}{{/if}}

Based on the above, provide clear and motivating focus recommendations for the next day.

Focus Recommendations:`,
});

const generateFocusRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateFocusRecommendationsFlow',
    inputSchema: GenerateFocusRecommendationsInputSchema,
    outputSchema: GenerateFocusRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);