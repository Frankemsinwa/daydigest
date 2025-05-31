
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Handle auth callback
  if (pathname === '/auth/callback') {
    const code = request.nextUrl.searchParams.get('code');
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
    // Redirect to dashboard after successful auth or if already authenticated
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    redirectUrl.search = ''; // Clear any query params like 'code'
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated
  if (session) {
    // Redirect away from auth pages if logged in
    if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/sign-up') || pathname.startsWith('/auth/forgot-password') || pathname.startsWith('/auth/update-password')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to protected routes like /dashboard
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/protected')) {
      return response;
    }
  } else {
    // If user is not authenticated
    // Protect dashboard and other protected routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/protected')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
