import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 현재 경로가 /login이 아닌 경우에만 리다이렉트
  if (!request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// matcher를 사용하여 특정 경로에만 미들웨어 적용
export const config = {
  // 예외처리가 필요한 경로는 여기에 추가 (예: api 라우트, 정적 파일 등)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
