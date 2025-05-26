
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { redirect } from 'next/navigation'; // No longer redirecting
// import { createClient } from '@/lib/supabase/server'; // No longer checking auth here

import Sidebar from '@/components/dashboard/sidebar';
import TopBar from '@/components/dashboard/top-bar';
import { Toaster } from "@/components/ui/toaster";
import type { User } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DayDigest Dashboard',
  description: 'Manage your daily reflections and insights.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect('/signin');
  // }
  
  // For now, user will be null as auth is bypassed
  const user: User | null = null; 

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
