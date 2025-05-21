import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground">DayDigest</span>
        </Link>
        <nav className="flex items-center space-x-2">
           <Button variant="ghost">Features</Button>
           <Button variant="ghost">Pricing</Button>
           <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
