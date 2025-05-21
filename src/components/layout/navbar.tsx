import Link from 'next/link';
import { Brain, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground">DayDigest</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
           <Button variant="ghost" asChild>
             <Link href="/#features">Features</Link>
           </Button>
           <Button variant="ghost" asChild>
             <Link href="/#pricing">Pricing</Link>
           </Button>
           <Button asChild>
             <Link href="/#get-started">Get Started</Link>
           </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start text-lg" asChild>
                    <Link href="/#features">Features</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start text-lg" asChild>
                    <Link href="/#pricing">Pricing</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="justify-center text-lg" asChild>
                    <Link href="/#get-started">Get Started</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
