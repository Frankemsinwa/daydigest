
import Link from 'next/link';
import { Brain, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-7 w-7 text-foreground" />
          <span className="text-2xl font-bold text-foreground">DayDigest</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
           <Button variant="ghost" asChild className="text-foreground hover:text-primary">
             <Link href="/#features">Features</Link>
           </Button>
           <Button variant="ghost" asChild className="text-foreground hover:text-primary">
             <Link href="/#testimonials">Testimonials</Link>
           </Button>
           <Button variant="ghost" asChild className="text-foreground hover:text-primary">
             <Link href="/#pricing">Pricing</Link>
           </Button>
           <Button variant="ghost" asChild className="text-foreground hover:text-primary">
             <Link href="/#faq">FAQ</Link>
           </Button>
           <Link href="/dashboard" asChild>
             <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
               Get Started
             </Button>
           </Link>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-foreground/50 text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground border-border">
              <SheetHeader className="mb-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for DayDigest</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Link
                    href="/#features"
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      "h-auto justify-start px-2 py-1.5 text-lg text-foreground hover:text-primary"
                    )}
                  >
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#testimonials"
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      "h-auto justify-start px-2 py-1.5 text-lg text-foreground hover:text-primary"
                    )}
                  >
                    Testimonials
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#pricing"
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      "h-auto justify-start px-2 py-1.5 text-lg text-foreground hover:text-primary"
                    )}
                  >
                    Pricing
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/#faq"
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      "h-auto justify-start px-2 py-1.5 text-lg text-foreground hover:text-primary"
                    )}
                  >
                    FAQ
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      "h-auto justify-center text-lg rounded-full px-4 py-2 text-primary-foreground"
                    )}
                  >
                    Get Started
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
