'use server';

/**
 * @fileOverview AI-powered focus recommendation generator based on user's accomplishments and reflections.
 *
 * - generateFocusRecommendations - A function that generates focus recommendations.
 * - GenerateFocusRecommendationsInput - The input type for the generateFocusRecommendations function.
 * - GenerateFocusRecommendationsOutput - The return type for the generateFocusRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFocusRecommendationsInputSchema = z.object({
  accomplishments: z
    .string()
    .describe('A summary of the user\'s accomplishments for the day.'),
  reflections: z
    .string()
    .describe('The user\'s reflections on the day\'s events and experiences.'),
});

export type GenerateFocusRecommendationsInput = z.infer<
  typeof GenerateFocusRecommendationsInputSchema
>;

const GenerateFocusRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized focus recommendations for the user for the next day.'
    ),
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
  input: {schema: GenerateFocusRecommendationsInputSchema},
  output: {schema: GenerateFocusRecommendationsOutputSchema},
  prompt: `Based on the following accomplishments and reflections, provide personalized focus recommendations for the user for the next day.

Accomplishments: {{{accomplishments}}}
Reflections: {{{reflections}}}

Focus Recommendations:`,
});

const generateFocusRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateFocusRecommendationsFlow',
    inputSchema: GenerateFocusRecommendationsInputSchema,
    outputSchema: GenerateFocusRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
