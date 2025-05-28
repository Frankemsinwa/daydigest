
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Client-side Supabase
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  BookText,
  Target,
  MessageSquareQuote,
  BarChart3,
  Settings,
  LogOut,
  Brain,
  UserCircle,
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface SidebarProps {
  user: User | null;
  onLinkClick?: () => void; // Optional: To close mobile menu on link click
}

export default function Sidebar({ user, onLinkClick }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLinkClick) onLinkClick(); // Close mobile menu if open
    router.push('/signin'); 
    router.refresh(); // Important to refresh server components and re-evaluate auth state
  };

  const menuItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Daily Summary', icon: BookText, href: '/dashboard#generate-ai' }, // Pointing to the section with tabs
    { name: 'Focus Recommendations', icon: Target, href: '/dashboard#generate-ai' },
    { name: 'Reflection Prompts', icon: MessageSquareQuote, href: '/dashboard#generate-ai' },
    { name: 'Insights/History', icon: BarChart3, href: '/dashboard#history' }, 
    { name: 'Settings', icon: Settings, href: '/dashboard#quick-notes' }, // Placeholder, can be /dashboard/settings later
  ];

  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    const nameParts = email.split('@')[0];
    return nameParts.substring(0, 2).toUpperCase();
  };

  const displayName = user?.user_metadata?.full_name || user?.email || 'Guest User';
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <aside className="w-64 h-full bg-card text-card-foreground p-4 flex flex-col border-r border-border/70 shrink-0">
      <div className="flex items-center space-x-2 mb-8">
        <Brain className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">DayDigest</span>
      </div>
      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10"
            asChild
            onClick={handleLinkClick} 
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
        <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-border/70">
          <Avatar className="h-10 w-10">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} data-ai-hint="person avatar" /> : null}
            <AvatarFallback>
              {user?.email ? getInitials(user.email) : <UserCircle className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground truncate">
              {displayName}
            </p>
            {/* <p className="text-xs text-muted-foreground">Pro Member</p> */}
          </div>
        </div>
      </div>
    </aside>
  );
}
