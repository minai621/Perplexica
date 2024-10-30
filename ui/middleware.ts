import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const BASE_PATH = '/perplexica';
const PUBLIC_PATHS = [`${BASE_PATH}/login`, `${BASE_PATH}/api/auth`];

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth');

  // 공개 경로는 항상 허용
  if (isPublicPath(pathname)) {
    // 이미 인증된 사용자가 로그인 페이지에 접근할 경우 홈으로 리다이렉트
    if (pathname === `${BASE_PATH}/login` && authCookie?.value === 'true') {
      return NextResponse.redirect(new URL(BASE_PATH, request.url));
    }
    return NextResponse.next();
  }

  // 인증되지 않은 경우
  if (!authCookie || authCookie.value !== 'true') {
    // 모든 요청(RSC 포함)을 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL(`${BASE_PATH}/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // perplexica 경로에 대해서만 미들웨어 적용
    '/perplexica/:path*',
  ],
};
