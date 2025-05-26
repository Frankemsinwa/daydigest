
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  // Create an outgoing response object that Supabase can modify
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // The Supabase client will set cookies on the response
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // The Supabase client will delete cookies on the response
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Refresh session if expired - important to do this before any logic relying on user session
  // This operation will also update the cookies on the `res` object if needed.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user }, // For a more direct check of user existence
  } = await supabase.auth.getUser();


  const publicRoutes = ['/', '/#features', '/#testimonials', '/#pricing', '/#faq'];
  const authRoutes = ['/signin', '/signup'];
  const protectedRoute = '/dashboard';

  // If trying to access auth callback, let Supabase handle it
  if (req.nextUrl.pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    if (code) {
      // Supabase exchanges the code for a session,
      // and the `set` cookie handler above will store it in `res.cookies`.
      await supabase.auth.exchangeCodeForSession(code);
    }
    // Redirect to dashboard after successful auth callback.
    // The `res` object now contains the session cookies set by exchangeCodeForSession.
    // These cookies must be sent with the redirect response.
    const redirectUrl = new URL(protectedRoute, req.url);
    return NextResponse.redirect(redirectUrl, { headers: res.headers });
  }

  // If user is authenticated
  if (user && session) {
    // And trying to access an auth page (signin/signup), redirect to dashboard
    if (authRoutes.includes(req.nextUrl.pathname)) {
      const redirectUrl = new URL(protectedRoute, req.url);
      return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  } else {
    // If user is not authenticated
    // And trying to access a protected route (e.g. /dashboard or /dashboard/*)
    if (req.nextUrl.pathname.startsWith(protectedRoute)) {
       const redirectUrl = new URL(`/signin?redirectedFrom=${encodeURIComponent(req.nextUrl.pathname)}`, req.url);
       return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  }

  // For all other cases, return the response, which might have updated cookies from getSession()
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
