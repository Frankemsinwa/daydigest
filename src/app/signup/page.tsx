
// This file is no longer needed as we are using /auth/sign-up/page.tsx provided by the Supabase UI recipe.
// You can safely delete this file.
// For now, redirecting to the new sign-up page to avoid broken links if any still point here.
import { redirect } from 'next/navigation';

export default function SignUpPage() {
  redirect('/auth/sign-up');
  return null; // Or a loading indicator, but redirect should be immediate
}
