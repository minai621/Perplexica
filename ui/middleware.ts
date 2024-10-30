import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 인증이 필요하지 않은 경로들을 정의
const PUBLIC_PATHS = ['/login', '/api/auth'];

// 정적 리소스 경로들
const STATIC_PATHS = ['/_next', '/favicon.ico', '/static'];

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath));
}

function isStaticPath(path: string) {
  return STATIC_PATHS.some((staticPath) => path.startsWith(staticPath));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth');

  // 정적 리소스는 항상 허용
  if (isStaticPath(pathname)) {
    return NextResponse.next();
  }

  // 공개 경로 처리
  if (isPublicPath(pathname)) {
    // 이미 인증된 사용자가 /login에 접근할 경우 홈으로 리다이렉트
    if (pathname === '/login' && authCookie?.value === 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // API 요청이 아닌 경우에만 리다이렉트
  if (!authCookie || authCookie.value !== 'true') {
    // API 요청의 경우 401 응답
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // 일반 페이지 요청의 경우 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // API 라우트
    '/api/:path*',
    // 페이지 라우트
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
