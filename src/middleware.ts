import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

export default async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get('cookie'),
    },
  };

  // @ts-ignore: Unreachable code error
  const session = await getSession({ req: requestForNextAuth });

  if (request.url.includes('/api/auth/signin') && session) {
    return NextResponse.redirect(new URL('/profile/overview', request.url));
  } else if (request.url.includes('/profile') && !session) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/profile/:path*', '/api/auth/signin'],
};
