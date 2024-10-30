import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  return NextResponse.json({
    isAuthenticated: !!authCookie,
  });
}
