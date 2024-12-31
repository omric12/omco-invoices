import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('token');
  // console.log('Token:', token); // Debug token

  // Protected Dashboard Route
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    // console.console.log('Redirecting to login');

    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Public routes
  if (
    token &&
    (request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
