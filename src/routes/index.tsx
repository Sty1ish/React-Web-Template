import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/Home';

/**
 * React Router 설정
 * 
 * 사용법:
 * - App.tsx에서 RouterProvider로 감싸기
 * - <RouterProvider router={router} />
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <div>About Page (추가 예정)</div>,
  },
  // 404 페이지
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
