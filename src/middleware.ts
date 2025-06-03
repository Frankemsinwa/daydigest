
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware' // Assuming this is your updated middleware
import { createClient } from '@/utils/supabase/server' // To check auth state

export async function middleware(request: NextRequest) {
  // First, run the Supabase session update
  const supabaseResponse = await updateSession(request);

  const supabase = createClient(request.cookies); // Pass cookies for server client
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // If user is not authenticated
  if (!user) {
    // Allow access to landing page, login, signup, auth callbacks, and static assets
    if (
      pathname === '/' ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/auth/callback') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/static/') ||
      pathname.endsWith('.ico') ||
      pathname.endsWith('.png') ||
      pathname.endsWith('.jpg') ||
      pathname.endsWith('.svg')
    ) {
      return supabaseResponse;
    }
    // For any other route, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname); // Optionally pass the intended destination
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated
  if (user) {
    // If trying to access login or signup, redirect to dashboard
    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
