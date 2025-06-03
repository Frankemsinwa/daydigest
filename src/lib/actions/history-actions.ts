// src/lib/actions/history-actions.ts
'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function saveDailySummary(
  userId: string,
  summary: string,
  entryDate: string // Expect YYYY-MM-DD format
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('daily_summaries')
    .insert({
      user_id: userId,
      summary: summary,
      date: entryDate,
    });

  if (error) {
    console.error('Error saving daily summary:', error);
    return { success: false, error: 'Could not save daily summary. ' + error.message };
  }
  revalidatePath('/dashboard'); // Revalidate to show new history
  return { success: true, data };
}

export async function saveFocusRecommendations(
  userId: string,
  recommendations: string
  // We could add accomplishments & reflections to the table if desired in the future
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('focus_recommendations')
    .insert({
      user_id: userId,
      recommendations: recommendations,
      // generated_at has a default of NOW() in the Supabase table
    });
  if (error) {
    console.error('Error saving focus recommendations:', error);
    return { success: false, error: 'Could not save focus recommendations. ' + error.message };
  }
  revalidatePath('/dashboard');
  return { success: true, data };
}

export async function saveReflectionPromptEntry(
  userId: string,
  prompt: string,
  userContext: string,
  dailyAccomplishments: string,
  entryDate: string // Expect YYYY-MM-DD format
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reflection_prompts')
    .insert({
      user_id: userId,
      prompt: prompt,
      context: userContext,
      accomplishments: dailyAccomplishments,
      date: entryDate,
    });
  if (error) {
    console.error('Error saving reflection prompt entry:', error);
    return { success: false, error: 'Could not save reflection prompt entry. ' + error.message };
  }
  revalidatePath('/dashboard');
  return { success: true, data };
}
