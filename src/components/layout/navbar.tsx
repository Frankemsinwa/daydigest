
import Link from 'next/link';
import { Brain, Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server'; // For server-side user fetch

export async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
           {user ? (
             <AuthButton user={user} />
           ) : (
             <>
               <Link href="/login" passHref legacyBehavior>
                 <Button variant="ghost" asChild className="text-foreground hover:text-primary">
                    <a>Login</a>
                 </Button>
               </Link>
               <Link href="/signup" passHref legacyBehavior>
                  <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a>Get Started</a>
                  </Button>
                </Link>
             </>
           )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <AuthButton user={user} />
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
                {!user && (
                  <>
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          "h-auto justify-start px-2 py-1.5 text-lg text-foreground hover:text-primary"
                        )}
                      >
                        Login
                      </Link>
                    </SheetClose>
                     <SheetClose asChild>
                      <Link
                        href="/signup"
                         className={cn(
                          buttonVariants({ variant: 'default' }),
                          "h-auto justify-center text-lg rounded-full px-4 py-2 text-primary-foreground"
                        )}
                      >
                        Get Started
                      </Link>
                    </SheetClose>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
