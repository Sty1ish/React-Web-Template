/**
 * 라우트 경로 상수
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
