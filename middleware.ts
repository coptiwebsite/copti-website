import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BYPASS_COOKIE = 'copti_maintenance_bypass';

const ASSET = /\.(?:ico|png|jpe?g|gif|webp|svg|woff2?|txt|xml|webmanifest)$/i;

export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'true') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    ASSET.test(pathname)
  ) {
    return NextResponse.next();
  }

  const secret = process.env.MAINTENANCE_BYPASS_SECRET;
  if (secret) {
    const preview = request.nextUrl.searchParams.get('preview');
    if (preview === secret) {
      const url = request.nextUrl.clone();
      url.searchParams.delete('preview');
      const res = NextResponse.redirect(url);
      res.cookies.set(BYPASS_COOKIE, secret, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    if (request.cookies.get(BYPASS_COOKIE)?.value === secret) {
      return NextResponse.next();
    }
  }

  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/maintenance';
  url.search = '';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
