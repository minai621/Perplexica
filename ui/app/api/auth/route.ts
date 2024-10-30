import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  return NextResponse.json({
    isAuthenticated: !!authCookie,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.PASSWORD;

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: '잘못된 비밀번호입니다.' },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
