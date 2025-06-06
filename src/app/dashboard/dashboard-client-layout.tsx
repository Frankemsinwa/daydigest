
'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import Sidebar from '@/components/dashboard/sidebar';
import TopBar from '@/components/dashboard/top-bar';
import { Toaster } from "@/components/ui/toaster";
import type { User } from '@supabase/supabase-js';
import AddToHomeScreen from '@/components/pwa/add-to-home-screen';


export default function DashboardClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {isMobile ? (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64 bg-card border-r border-border/70">
            <SheetHeader className="sr-only">
              <SheetTitle>Dashboard Menu</SheetTitle>
              <SheetDescription>Main navigation for the dashboard.</SheetDescription>
            </SheetHeader>
            <Sidebar
              user={user} 
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>
      ) : (
        <Sidebar user={user} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          user={user}
          isMobile={isMobile || false}
          onMenuButtonClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Toaster />
      <AddToHomeScreen />
    </div>
  );
}
