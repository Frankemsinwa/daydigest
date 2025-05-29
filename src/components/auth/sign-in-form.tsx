
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
// useRouter is no longer needed for the primary redirect
import Link from 'next/link';
import { ChromeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export function SignInForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Sign In Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sign In Successful',
        description: 'Welcome back! Redirecting to dashboard...',
      });
      // Changed to window.location.href
      window.location.href = "/dashboard";
      // router.refresh(); // No longer needed with full page reload
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    // setIsGoogleLoading(false); // Keep loading state until redirect happens

    if (error) {
      setIsGoogleLoading(false); // Reset loading if error occurs before redirect
      toast({
        title: 'Google Sign-In Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
    // No client-side redirect here, middleware will handle it after /auth/callback
  }

  return (
    <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border border-border/70">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-foreground">Sign In</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} type="email" disabled={isLoading || isGoogleLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" {...field} type="password" disabled={isLoading || isGoogleLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-full" disabled={isLoading || isGoogleLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full rounded-full border-border/70 hover:bg-accent/50"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            'Redirecting...'
          ) : (
            <>
              <ChromeIcon className="mr-2 h-4 w-4" />
              Continue with Google
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 pt-6">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
