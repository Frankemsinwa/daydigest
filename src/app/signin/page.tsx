
// This file is no longer needed as we are using /auth/login/page.tsx provided by the Supabase UI recipe.
// You can safely delete this file.
// For now, redirecting to the new login page to avoid broken links if any still point here.
import { redirect } from 'next/navigation';

export default function SignInPage() {
  redirect('/auth/login');
  return null; // Or a loading indicator, but redirect should be immediate
}
