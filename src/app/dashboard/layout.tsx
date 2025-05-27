
'use client';

import type { Metadata } from 'next'; // Metadata type can still be used if needed for export
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile'; // Hook to check for mobile
import { Sheet, SheetContent } from '@/components/ui/sheet'; // ShadCN Sheet components

import Sidebar from '@/components/dashboard/sidebar';
import TopBar from '@/components/dashboard/top-bar';
import { Toaster } from "@/components/ui/toaster";
import type { User } from '@supabase/supabase-js';

const inter = Inter({ subsets: ['latin'] });

// Note: `export const metadata` for Server Components doesn't work directly in Client Components.
// If dynamic metadata is needed, it would be handled differently (e.g. via head.js or API route).
// For a static title, you can set it in the RootLayout or page.tsx.
// For simplicity here, we'll assume the static metadata from RootLayout suffices.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // For now, user will be null as auth is bypassed
  const user: User | null = null; 

  // Effect to close mobile menu if window is resized to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {isMobile ? (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          {/* Trigger is in TopBar */}
          <SheetContent side="left" className="p-0 w-64 bg-card border-r border-border/70">
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
          isMobile={isMobile || false} // Pass isMobile, default to false if undefined during initial render
          onMenuButtonClick={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

