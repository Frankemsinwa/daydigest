
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Create an outgoing response object

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

  const {
    data: { user },
  } = await supabase.auth.getUser(); // Get user info based on current cookies in `req`

  const authRoutes = ['/signin', '/signup'];
  const protectedRoute = '/dashboard';

  // Handle the /auth/callback route separately
  if (req.nextUrl.pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    if (code) {
      // Exchange the code for a session.
      // The Supabase client (via the `set` cookie handler) will automatically
      // set the session cookies on the `res` object.
      await supabase.auth.exchangeCodeForSession(code);
    }
    // Redirect to the dashboard. The `res` object now contains the
    // new session cookies, which will be sent with this redirect response.
    const redirectUrl = new URL(protectedRoute, req.url);
    return NextResponse.redirect(redirectUrl, { headers: res.headers });
  }

  // If the user is authenticated
  if (user) {
    // If they are trying to access an auth page (signin/signup), redirect to dashboard
    if (authRoutes.includes(req.nextUrl.pathname)) {
      const redirectUrl = new URL(protectedRoute, req.url);
      // It's good practice to pass res.headers here too, in case getUser() refreshed tokens.
      return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  } else {
    // If the user is not authenticated
    // And trying to access a protected route (e.g., /dashboard or /dashboard/*)
    if (req.nextUrl.pathname.startsWith(protectedRoute)) {
      const redirectUrl = new URL(`/signin?redirectedFrom=${encodeURIComponent(req.nextUrl.pathname)}`, req.url);
      return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  }

  // For all other cases (e.g., public routes, or authenticated user accessing non-auth, non-protected routes),
  // return the response. If `getUser()` happened to refresh a token, `res` will have the updated cookies.
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
