'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 감지

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/perplexica/api/auth/check');
        const data = await response.json();
        // {"isAuthenticated":false}이면 로그인 페이지로 이동
        if (!data.isAuthenticated) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname]); // pathname이 변경될 때마다 인증 체크

  return <>{children}</>;
}
