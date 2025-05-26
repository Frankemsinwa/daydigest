
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Response object to be potentially modified with cookies

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

  const authRoutes = ['/signin', '/signup'];
  const protectedRoute = '/dashboard';

  // Handle the /auth/callback route FIRST
  // This is crucial because this is where the session is established after OAuth or email confirm.
  if (req.nextUrl.pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    if (code) {
      // Exchange the code for a session.
      // This will set the session cookies on the `res` object via the cookie handlers.
      await supabase.auth.exchangeCodeForSession(code);
    }
    
    // IMPORTANT: Clone the URL to avoid modifying the original request URL object if it's used later.
    const redirectUrl = new URL(req.url); 
    redirectUrl.pathname = protectedRoute; // Set path to dashboard
    redirectUrl.searchParams.delete('code'); // Clean up the 'code' query parameter from the URL
    
    // Redirect to the dashboard, ensuring cookies set by exchangeCodeForSession are included.
    return NextResponse.redirect(redirectUrl, { headers: res.headers });
  }

  // For all OTHER routes, now attempt to get the user.
  // This relies on cookies already being present from previous interactions or the callback.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // If an authenticated user tries to access auth pages (signin/signup),
    // redirect them to the dashboard.
    if (authRoutes.includes(req.nextUrl.pathname)) {
      const redirectUrl = new URL(protectedRoute, req.url);
      return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  } else {
    // If an unauthenticated user tries to access a protected route,
    // redirect them to the signin page.
    if (req.nextUrl.pathname.startsWith(protectedRoute)) {
      const redirectFrom = req.nextUrl.pathname; // Keep track of where they were trying to go
      const redirectUrl = new URL(`/signin?redirectedFrom=${encodeURIComponent(redirectFrom)}`, req.url);
      return NextResponse.redirect(redirectUrl, { headers: res.headers });
    }
  }

  // Allow the request to proceed.
  // If supabase.auth.getUser() refreshed a token, `res` will have the updated Set-Cookie header.
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
