
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Create a response object to potentially modify

  // Initialize Supabase client, configured to use cookies from req and set them on res
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    }
  );

  const {
    data: { session }, // Check for an active session first
  } = await supabase.auth.getSession();


  const authRoutes = ['/signin', '/signup'];
  const protectedRoute = '/dashboard';
  const callbackPath = '/auth/callback';

  // Handle the /auth/callback route FIRST to establish the session
  if (req.nextUrl.pathname === callbackPath) {
    const code = req.nextUrl.searchParams.get('code');
    if (code) {
      // Exchange the code for a session.
      // This will set the session cookies on the `res` object.
      await supabase.auth.exchangeCodeForSession(code);
    }
    // Construct the redirect URL to the dashboard, removing the code.
    const redirectUrl = req.nextUrl.clone(); // Clone to safely modify
    redirectUrl.pathname = protectedRoute;
    redirectUrl.searchParams.delete('code');
    // Redirect to the dashboard, ensuring cookies set by exchangeCodeForSession are included.
    return NextResponse.redirect(redirectUrl, { headers: res.headers });
  }

  // Now, get the user from the (potentially newly established) session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // If authenticated user tries to access auth pages, redirect to dashboard
    if (authRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(protectedRoute, req.url), { headers: res.headers });
    }
  } else {
    // If unauthenticated user tries to access a protected route, redirect to signin
    // Check if the current path STARTS WITH the protected route (e.g. /dashboard/settings)
    if (req.nextUrl.pathname.startsWith(protectedRoute)) {
      const redirectFrom = req.nextUrl.pathname;
      return NextResponse.redirect(new URL(`/signin?redirectedFrom=${encodeURIComponent(redirectFrom)}`, req.url), { headers: res.headers });
    }
  }

  // Allow the request to proceed. If getSession() refreshed the token,
  // `res` will have the updated cookies and they will be set.
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
