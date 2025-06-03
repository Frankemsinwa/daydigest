
'use client';

import type { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Cog, UserCircle, ShieldCheck, Loader2 } from "lucide-react";
import { updateUserFullName, sendPasswordReset } from '@/lib/actions/user-actions';

interface SettingsSectionProps {
  user: User | null;
}

export default function SettingsSection({ user }: SettingsSectionProps) {
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isPasswordResetLoading, setIsPasswordResetLoading] = useState(false);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name);
    } else if (user?.email) {
      setFullName(user.email.split('@')[0] || '');
    }
  }, [user]);

  const handleUpdateName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsNameLoading(true);
    const result = await updateUserFullName(fullName);
    if (result.success) {
      toast({ title: 'Success!', description: 'Your name has been updated.' });
    } else {
      toast({ title: 'Error', description: result.error || 'Could not update your name.', variant: 'destructive' });
    }
    setIsNameLoading(false);
  };

  const handleSendPasswordReset = async () => {
    setIsPasswordResetLoading(true);
    const result = await sendPasswordReset();
    if (result.success) {
      toast({ title: 'Password Reset Email Sent', description: 'Check your inbox for instructions to reset your password.' });
    } else {
      toast({ title: 'Error', description: result.error || 'Could not send password reset email.', variant: 'destructive' });
    }
    setIsPasswordResetLoading(false);
  };

  if (!user) {
    return (
      <section id="settings" className="scroll-mt-20">
        <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">Settings</h2>
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cog className="h-6 w-6 mr-2 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Please log in to manage your settings.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="settings" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">Settings</h2>
      <div className="space-y-8">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="h-6 w-6 mr-2 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Manage your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email || ''} readOnly disabled className="bg-muted/50" />
            </div>
            <form onSubmit={handleUpdateName} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <Button type="submit" disabled={isNameLoading} className="w-full sm:w-auto">
                {isNameLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isNameLoading ? 'Updating...' : 'Update Name'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
              Account Security
            </CardTitle>
            <CardDescription>Manage your account security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="block mb-1">Password</Label>
              <p className="text-sm text-muted-foreground mb-2">
                To change your password, we will send a reset link to your email address.
              </p>
              <Button onClick={handleSendPasswordReset} disabled={isPasswordResetLoading} variant="outline" className="w-full sm:w-auto">
                {isPasswordResetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPasswordResetLoading ? 'Sending...' : 'Send Password Reset Email'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
