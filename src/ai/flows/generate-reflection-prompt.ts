'use server';

/**
 * @fileOverview A reflection prompt generation AI agent.
 *
 * - generateReflectionPrompt - A function that generates a daily reflection prompt.
 * - GenerateReflectionPromptInput - The input type for the generateReflectionPrompt function.
 * - GenerateReflectionPromptOutput - The return type for the generateReflectionPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReflectionPromptInputSchema = z.object({
  userContext: z
    .string()
    .describe(
      'Information about the user, including their role, interests, and goals.'
    ),
  dailyAccomplishments: z
    .string()
    .describe(
      'A summary of the user\'s accomplishments for the day. Should include specific actions and outcomes.'
    ),
});
export type GenerateReflectionPromptInput = z.infer<
  typeof GenerateReflectionPromptInputSchema
>;

const GenerateReflectionPromptOutputSchema = z.object({
  reflectionPrompt: z
    .string()
    .describe(
      'A unique, AI-generated reflection prompt to help the user think about how the day went.'
    ),
});
export type GenerateReflectionPromptOutput = z.infer<
  typeof GenerateReflectionPromptOutputSchema
>;

export async function generateReflectionPrompt(
  input: GenerateReflectionPromptInput
): Promise<GenerateReflectionPromptOutput> {
  return generateReflectionPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReflectionPromptPrompt',
  input: {schema: GenerateReflectionPromptInputSchema},
  output: {schema: GenerateReflectionPromptOutputSchema},
  prompt: `You are an AI assistant designed to generate unique and engaging reflection prompts for users at the end of their day.

  Consider the user's context and their daily accomplishments to tailor the prompt to their specific situation.

  User Context: {{{userContext}}}
  Daily Accomplishments: {{{dailyAccomplishments}}}

  Generate a single, thought-provoking question that encourages the user to reflect on their day, their actions, and their learnings. Focus on promoting self-assessment and mental clarity.
  The reflection prompt should encourage self-assessment and mental clarity.
  Do not start the prompt with "Here is a reflection prompt" or anything similar.
  Do not generate more than one prompt.
  Reflection Prompt:`,
});

const generateReflectionPromptFlow = ai.defineFlow(
  {
    name: 'generateReflectionPromptFlow',
    inputSchema: GenerateReflectionPromptInputSchema,
    outputSchema: GenerateReflectionPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
