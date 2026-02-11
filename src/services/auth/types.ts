// Auth 관련 타입 정의

/**
 * 서버 OAuth 로그인 응답 타입
 * POST /auth/login/oauth2/{provider} 응답 body
 */
export interface ServerLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

/**
 * Access Token 갱신 응답 타입
 * POST /auth/access-token/refresh 응답 body
 */
export interface RefreshAccessTokenResponse {
  accessToken: string;
  tokenType: string;
}
