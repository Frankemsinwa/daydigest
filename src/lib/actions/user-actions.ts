
'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserFullName(fullName: string) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error fetching user for name update:', userError);
    return { success: false, error: 'User not authenticated.' };
  }

  if (!fullName.trim()) {
    return { success: false, error: 'Full name cannot be empty.' };
  }

  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) {
    console.error('Error updating user full name:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard'); // Revalidate to reflect changes
  return { success: true, data };
}

export async function sendPasswordReset() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    console.error('Error fetching user for password reset or email missing:', userError);
    return { success: false, error: 'User not authenticated or email is missing.' };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login?message=Your password has been reset. Please login.`, // Or a dedicated update-password page
  });

  if (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
