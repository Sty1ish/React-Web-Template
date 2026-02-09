import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, AuthLayout, BlankLayout } from '@/layouts';
import { HomePage } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage';

/**
 * React Router 설정
 * 
 * 레이아웃 구조:
 * - MainLayout: 일반 페이지 (Header + Footer)
 * - AuthLayout: 인증 페이지 (로그인, 회원가입)
 * - BlankLayout: 에러 페이지 (404, 500)
 */
export const router = createBrowserRouter([
  // MainLayout 적용 페이지들
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <div>About Page (추가 예정)</div>,
      },
      {
        path: '/contact',
        element: <div>Contact Page (추가 예정)</div>,
      },
    ],
  },

  // AuthLayout 적용 페이지들
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <div>Login Page (추가 예정)</div>,
      },
      {
        path: '/signup',
        element: <div>Signup Page (추가 예정)</div>,
      },
    ],
  },

  // BlankLayout 적용 페이지들 (에러 페이지)
  {
    element: <BlankLayout />,
    children: [
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
