/**
 * HTTP 상태 코드
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * API 엔드포인트
 * 
 * 실제 코드에서 사용 중인 경로와 일치하도록 관리합니다.
 */
export const API_ENDPOINTS = {
  AUTH: {
    /** OAuth 로그인: POST /auth/login/oauth2/{provider} */
    OAUTH_LOGIN: (provider: string) => `/auth/login/oauth2/${provider}`,
    /** Access Token 갱신: POST /auth/access-token/refresh */
    REFRESH: '/auth/access-token/refresh',
  },
  USERS: {
    LIST: '/users',
    GET: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    ME: '/users/me',
  },
} as const;
