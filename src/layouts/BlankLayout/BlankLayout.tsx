import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface BlankLayoutProps {
  children?: ReactNode;
}

/**
 * 최소 레이아웃
 * - 어떤 장식도 없음
 * - 에러 페이지, 특수 페이지용
 */
export const BlankLayout = ({ children }: BlankLayoutProps) => {
  return <>{children || <Outlet />}</>;
};
