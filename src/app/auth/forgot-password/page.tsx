
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Brain } from 'lucide-react';

export default function ForgotPasswordPage() {
  const supabase = createClient();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-6 flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold text-foreground">DayDigest</span>
          </Link>
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive reset instructions.</CardDescription>
          </CardHeader>
        </div>
        <Card className="bg-card/70 backdrop-blur-sm border border-border/70 shadow-xl">
          <CardContent className="p-6 md:p-8">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary-foreground))',
                      brandButtonText: 'hsl(var(--primary-foreground))',
                      defaultButtonBackground: 'hsl(var(--secondary))',
                      defaultButtonBackgroundHover: 'hsl(var(--accent))',
                      defaultButtonBorder: 'hsl(var(--border))',
                      defaultButtonText: 'hsl(var(--secondary-foreground))',
                      inputBackground: 'hsl(var(--input))',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderHover: 'hsl(var(--ring))',
                      inputBorderFocus: 'hsl(var(--ring))',
                      inputText: 'hsl(var(--foreground))',
                      inputLabelText: 'hsl(var(--foreground))',
                      inputPlaceholder: 'hsl(var(--muted-foreground))',
                      messageText: 'hsl(var(--muted-foreground))',
                      messageTextDanger: 'hsl(var(--destructive))',
                      anchorTextColor: 'hsl(var(--primary))',
                      anchorTextColorHover: 'hsl(var(--primary))',
                    },
                     space: {
                      spaceSmall: '4px',
                      spaceMedium: '8px',
                      spaceLarge: '16px',
                      labelBottomMargin: '8px',
                      anchorBottomMargin: '4px',
                      emailInputSpacing: '4px',
                      socialAuthSpacing: '8px',
                      buttonPadding: '10px 15px',
                      inputPadding: '10px 15px',
                    },
                    fontSizes: {
                      baseBodySize: '14px',
                      baseInputSize: '14px',
                      baseLabelSize: '14px',
                      baseButtonSize: '14px',
                    },
                    fonts: {
                      bodyFontFamily: `var(--font-geist-sans), sans-serif`,
                      buttonFontFamily: `var(--font-geist-sans), sans-serif`,
                      inputFontFamily: `var(--font-geist-sans), sans-serif`,
                      labelFontFamily: `var(--font-geist-sans), sans-serif`,
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: 'var(--radius)',
                      buttonBorderRadius: 'var(--radius)',
                      inputBorderRadius: 'var(--radius)',
                    },
                  },
                },
              }}
              view="forgotten_password"
              showLinks={true}
              // The redirectTo prop for `resetPasswordForEmail` is configured in Supabase dashboard email templates.
              // Supabase sends an email with a link like: {{ .SiteURL }}/auth/update-password?token={{ .TokenHash }}&type=recovery
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email address',
                    password_label: 'Password',
                    button_label: 'Sign In',
                    social_provider_text: 'Continue with {{provider}}',
                    link_text: "Don't have an account? Sign Up",
                     forgot_password_link_text: 'Forgot your password?',
                  },
                  sign_up: {
                    email_label: 'Email address',
                    password_label: 'Password',
                    button_label: 'Sign Up',
                    social_provider_text: 'Continue with {{provider}}',
                    link_text: 'Already have an account? Sign In',
                  },
                   forgotten_password: {
                    email_label: 'Email address',
                    button_label: 'Send reset instructions',
                    link_text: 'Remembered your password? Sign In',
                  },
                  update_password: {
                    password_label: 'New Password',
                    button_label: 'Update Password',
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
