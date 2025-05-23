
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChromeIcon } from 'lucide-react'; // Using ChromeIcon as a stand-in for Google logo

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
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export function SignUpForm() {
  const router = useRouter();
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
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // emailRedirectTo: `${window.location.origin}/auth/callback`, // For email confirmation
      },
    });
    setIsLoading(false);

    if (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      toast({
        title: 'Email Confirmation Required',
        description: 'This email is already registered but not confirmed. Please check your inbox for a confirmation link, or try signing in.',
        variant: 'default',
        duration: 10000,
      });
    } else if (data.session) {
      toast({
        title: 'Sign Up Successful',
        description: 'Welcome! You are now signed in.',
      });
      router.push('/');
      router.refresh();
    } else if (data.user) {
      toast({
        title: 'Sign Up Successful',
        description: 'Please check your email to confirm your account.',
        duration: 10000,
      });
      // router.push('/check-email'); // Optionally redirect
    }
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // redirectTo: `${window.location.origin}/auth/callback`
      },
    });
    setIsGoogleLoading(false);

    if (error) {
      toast({
        title: 'Google Sign-Up Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
    // Supabase handles the redirect and session establishment.
  }

  return (
    <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border border-border/70">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-foreground">Create an Account</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your email and password to get started.
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
                    <Input placeholder="•••••••• (min. 6 characters)" {...field} type="password" disabled={isLoading || isGoogleLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full rounded-full" disabled={isLoading || isGoogleLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
          Already have an account?{' '}
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
