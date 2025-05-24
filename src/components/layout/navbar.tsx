
import Link from 'next/link';
import { Brain, Menu, HelpCircle } from 'lucide-react'; // Added HelpCircle for potential future use, not used yet.
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription, SheetHeader } from '@/components/ui/sheet';

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
           <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
             <Link href="/signup">Get Started</Link>
           </Button>
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
                  <Button variant="ghost" className="justify-start text-lg text-foreground hover:text-primary" asChild>
                    <Link href="/#features">Features</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start text-lg text-foreground hover:text-primary" asChild>
                    <Link href="/#testimonials">Testimonials</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start text-lg text-foreground hover:text-primary" asChild>
                    <Link href="/#pricing">Pricing</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start text-lg text-foreground hover:text-primary" asChild>
                    <Link href="/#faq">FAQ</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="justify-center text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/signup">Get Started</Link>
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
