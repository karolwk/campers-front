import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/blog') {
    url.pathname = '/blog/strona/1';
    return NextResponse.redirect(url);
  }
}
