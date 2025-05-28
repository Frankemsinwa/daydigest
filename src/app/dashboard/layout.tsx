
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardClientLayout from './dashboard-client-layout'; // New client component
import type { Metadata } from 'next';
import type { User } from '@supabase/supabase-js';

export const metadata: Metadata = {
  title: 'DayDigest Dashboard',
  description: 'Your personal DayDigest dashboard.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Ensure redirect is called correctly for Next.js App Router
    return redirect('/signin');
  }
  
  // Ensure the user object passed to client components is serializable and matches expected type
  // Supabase User object should be fine.
  const typedUser = user as User | null;

  return (
    <DashboardClientLayout user={typedUser}>
      {children}
    </DashboardClientLayout>
  );
}
