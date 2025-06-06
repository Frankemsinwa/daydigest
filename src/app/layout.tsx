
import type {Metadata, Viewport} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DayDigest - Reflect, Focus, Grow',
  description: 'AI-powered daily summaries, focus recommendations, and reflection prompts to enhance your productivity and personal growth.',
  manifest: '/manifest.json',
  icons: { apple: "/icons/icon-192x192.png"},
};

export const viewport: Viewport = {
  themeColor: '#483D8B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased font-sans`,
          "bg-background text-foreground"
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
