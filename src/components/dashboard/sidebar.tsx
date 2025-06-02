
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Home,
  BookText,
  Target,
  MessageSquareQuote,
  BarChart3,
  Settings,
  Brain,
  UserCircle,
} from 'lucide-react';

interface SidebarProps {
  user: any | null; // Prop kept for structure, but will be null
  onLinkClick?: () => void;
}

export default function Sidebar({ user, onLinkClick }: SidebarProps) {
  const menuItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Daily Summary', icon: BookText, href: '/dashboard#generate-ai' },
    { name: 'Focus Recommendations', icon: Target, href: '/dashboard#generate-ai' },
    { name: 'Reflection Prompts', icon: MessageSquareQuote, href: '/dashboard#generate-ai' },
    { name: 'Insights/History', icon: BarChart3, href: '/dashboard#history' },
    { name: 'Settings', icon: Settings, href: '/dashboard#quick-notes' }, // Example link
  ];

  const displayName = 'Guest User';

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
        <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-border/70">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <UserCircle className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground truncate">
              {displayName}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
