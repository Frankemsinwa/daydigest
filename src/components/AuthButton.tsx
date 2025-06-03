
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { User } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';
import { signout } from '@/lib/auth-actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthButtonProps {
  user: User | null;
}

function getUserInitials(name?: string | null): string {
  if (!name) return 'GU'; // Guest User or Generic User
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}


export default function AuthButton({ user }: AuthButtonProps) {
  const handleSignOut = async () => {
    await signout();
  };

  if (user) {
    const userEmail = user.email;
    const userFullName = user.user_metadata?.full_name;
    const userAvatarUrl = user.user_metadata?.avatar_url;
    const displayName = userFullName || userEmail;


    return (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {userAvatarUrl && <AvatarImage src={userAvatarUrl} alt={displayName || 'User Avatar'} />}
                <AvatarFallback>{getUserInitials(displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                {userFullName && <p className="text-sm font-medium leading-none">{userFullName}</p> }
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={handleSignOut} className="w-full">
              <Button variant="ghost" type="submit" className="w-full justify-start px-2 py-1.5 text-sm">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button variant="outline" className="rounded-full">
        Login
      </Button>
    </Link>
  );
}
