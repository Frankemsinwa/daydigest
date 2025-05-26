
import { createServerClient } from '@supabase/ssr'; // Standard import for Supabase SSR
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';
import type { CookieOptions } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient<Database>(
 process.env.NEXT_PUBLIC_SUPABASE_URL!, // Your Supabase Project URL
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Your Supabase Project anon key
 {
 cookies: {
 get(name: string) {
 return req.cookies.get(name)?.value;
      },
 set(name: string, value: string, options: CookieOptions) {
 res.cookies.set({ name, value, ...options });
      },
 remove(name: string, options: CookieOptions) {
 res.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicRoutes = ['/signin', '/signup', '/', '/#features', '/#testimonials', '/#pricing', '/#faq'];
  const authRoutes = ['/signin', '/signup'];
  const protectedRoute = '/dashboard';

  // If trying to access auth callback, let Supabase handle it
  if (req.nextUrl.pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
    // Redirect to dashboard after successful auth callback, or to home if something went wrong
    // We check session again to be sure
    const { data: { session: newSession } } = await supabase.auth.getSession();
    if (newSession) {
      return NextResponse.redirect(new URL(protectedRoute, req.url));
    }
    return NextResponse.redirect(new URL('/', req.url)); // Fallback to home
  }

  // If user is authenticated
  if (user && session) {
    // And trying to access an auth page (signin/signup), redirect to dashboard
    if (authRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(protectedRoute, req.url));
    }
  } else {
    // If user is not authenticated
    // And trying to access a protected route (not a public route and not an auth route), redirect to signin
    if (!publicRoutes.includes(req.nextUrl.pathname) && !authRoutes.includes(req.nextUrl.pathname)) {
      // Special handling for deep links to dashboard sub-pages
      if (req.nextUrl.pathname.startsWith(protectedRoute)) {
         return NextResponse.redirect(new URL(`/signin?redirectedFrom=${encodeURIComponent(req.nextUrl.pathname)}`, req.url));
      }
      // For other protected routes that are not explicitly dashboard
      // return NextResponse.redirect(new URL('/signin', req.url)); // Or handle as 404 or other logic
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
