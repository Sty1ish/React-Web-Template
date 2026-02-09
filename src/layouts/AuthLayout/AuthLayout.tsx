import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
  children?: ReactNode;
}

/**
 * 인증 페이지용 레이아웃 (로그인, 회원가입)
 * - Header, Footer 없음
 * - 중앙 정렬
 * - 깔끔한 카드 스타일
 */
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md">
        {children || <Outlet />}
      </div>
    </div>
  );
};
