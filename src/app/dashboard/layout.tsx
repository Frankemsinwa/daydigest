
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardClientLayout from './dashboard-client-layout';
import type { Metadata } from 'next';
import type { User } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering for authentication checks

export const metadata: Metadata = {
  title: 'DayDigest Dashboard',
  description: 'Your personal DayDigest dashboard.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(); // Ensure this is the server client
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth/login'); // Redirect to the new login path
  }
  
  const typedUser = user as User | null;

  return (
    <DashboardClientLayout user={typedUser}>
      {children}
    </DashboardClientLayout>
  );
}
