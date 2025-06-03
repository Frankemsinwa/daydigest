
'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signout } from '@/lib/auth-actions';

export default function LogoutButton({ className, variant = "ghost" }: { className?: string; variant?: "ghost" | "default" | "destructive" | "outline" | "secondary" | "link" | null | undefined }) {
  return (
    <form action={signout} className="w-full">
      <Button variant={variant} className={`w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 ${className}`}>
        <LogOut className="mr-3 h-5 w-5" />
        Log Out
      </Button>
    </form>
  );
}
