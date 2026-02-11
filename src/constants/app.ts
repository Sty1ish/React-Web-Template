/**
 * 애플리케이션 전역 상수
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'React Web Template';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

/**
 * 로컬 스토리지 키
 * 
 * 참고: 인증 토큰(AccessToken, RefreshToken)은 Zustand persist가
 * 'auth-storage' 키로 직접 관리하므로 여기에 포함하지 않습니다.
 * AccessToken은 메모리(TokenManager)에서만 관리됩니다.
 */
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * 쿼리 키 (React Query)
 */
export const QUERY_KEYS = {
  USER: 'user',
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
} as const;

/**
 * 페이지네이션 기본값
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;
