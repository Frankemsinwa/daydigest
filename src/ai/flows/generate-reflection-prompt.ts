// src/ai/flows/generate-reflection-prompt.ts
'use server';

/**
 * @fileOverview A reflection prompt generation AI agent.
 *
 * - generateReflectionPrompt - A function that generates a daily reflection prompt.
 * - GenerateReflectionPromptInput - The input type for the generateReflectionPrompt function.
 * - GenerateReflectionPromptOutput - The return type for the generateReflectionPrompt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReflectionPromptInputSchema = z.object({
  userContext: z
    .string()
    .describe('Information about the user, including their role, interests, and goals.'),
  dailyAccomplishments: z
    .string()
    .describe('Specific actions and outcomes achieved by the user today.'),
  goals: z
    .string()
    .optional()
    .describe('The user’s long-term goals for better alignment in reflection.'),
  userName: z
    .string()
    .optional()
    .describe("The user's name for a personalized experience."),
});

export type GenerateReflectionPromptInput = z.infer<
  typeof GenerateReflectionPromptInputSchema
>;

const GenerateReflectionPromptOutputSchema = z.object({
  reflectionPrompt: z
    .string()
    .describe('A unique, AI-generated reflection prompt to encourage self-assessment.'),
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
  input: { schema: GenerateReflectionPromptInputSchema },
  output: { schema: GenerateReflectionPromptOutputSchema },
  prompt: `You are an AI that crafts thoughtful, one-sentence reflection prompts.

{{#if userName}}User: {{{userName}}}{{/if}}
User Context: {{{userContext}}}
Accomplishments: {{{dailyAccomplishments}}}
{{#if goals}}Goals: {{{goals}}}{{/if}}

Generate one meaningful question to help the user reflect on:
- Their personal growth
- Key takeaways from the day
- Alignment with their goals

Avoid generic phrasing. Make it feel personal, deep, and relevant. Avoid starting with "Here is your prompt".

Reflection Prompt:`,
});

const generateReflectionPromptFlow = ai.defineFlow(
  {
    name: 'generateReflectionPromptFlow',
    inputSchema: GenerateReflectionPromptInputSchema,
    outputSchema: GenerateReflectionPromptOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);