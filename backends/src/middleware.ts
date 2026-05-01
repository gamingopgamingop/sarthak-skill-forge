import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';

const protectedRoutes = ['/dashboard', '/admin'];
const publicRoutes = ['/login', '/register', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (path === '/admin' && session?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith('/dashboard') &&
    path !== '/'
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
