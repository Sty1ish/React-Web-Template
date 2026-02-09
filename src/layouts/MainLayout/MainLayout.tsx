import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface MainLayoutProps {
  children?: ReactNode;
}

/**
 * 일반 페이지용 메인 레이아웃
 * - Header, Footer 포함
 * - 대부분의 페이지에서 사용
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
