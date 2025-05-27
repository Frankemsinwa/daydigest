
'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react'; // Added Menu icon
import { Button } from '@/components/ui/button';
import type { User } from '@supabase/supabase-js';

interface TopBarProps {
  user: User | null;
  isMobile: boolean; // Prop to know if it's mobile view
  onMenuButtonClick: () => void; // Function to open mobile menu
}

export default function TopBar({ user, isMobile, onMenuButtonClick }: TopBarProps) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  const getFirstName = () => {
    if (!user) return 'Guest';
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  }

  return (
    <header className="h-16 bg-card border-b border-border/70 px-4 md:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuButtonClick} 
            className="text-muted-foreground hover:text-primary md:hidden" // md:hidden to ensure it only shows on mobile
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Welcome back, {getFirstName()}!
          </h1>
          <p className="text-sm text-muted-foreground">{currentDate || 'Loading date...'}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {/* UserMenu could go here if needed */}
      </div>
    </header>
  );
}

