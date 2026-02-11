import { useAuthStore } from '@/stores/authStore';

// ─── JWT 디코딩 유틸 ─────────────────────────────────────

/**
 * Base64url → Base64 변환 후 디코딩
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  // 브라우저는 window.atob 지원
  return window.atob(base64);
}

/**
 * JWT 토큰의 페이로드를 디코딩하여 클레임 객체를 반환합니다.
 */
function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('유효하지 않은 JWT 형식입니다.');
    }
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    console.error('[TokenManager] JWT 디코딩 실패:', error);
    return {};
  }
}

// ─── 토큰 만료 관련 ─────────────────────────────────────

function getTokenExpiryMs(token: string): number | null {
  const claims = decodeJwtPayload(token);
  if (typeof claims.exp !== 'number') {
    return null;
  }
  return claims.exp * 1000;
}

function isTokenExpired(token: string): boolean {
  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) {
    return true;
  }
  return Date.now() >= expiryMs;
}

/**
 * JWT의 만료까지 남은 시간이 threshold 이하인지 확인합니다.
 * @param thresholdMs 밀리초 단위 임계값 (기본: 60_000 = 1분)
 */
function isTokenExpiringSoon(
  token: string,
  thresholdMs: number = 60_000,
): boolean {
  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) {
    return true;
  }
  return expiryMs - Date.now() <= thresholdMs;
}

// ─── 토큰 갱신 뮤텍스 ─────────────────────────────────────

let refreshPromise: Promise<string | null> | null = null;

/**
 * Access Token 갱신 API를 직접 호출합니다.
 * 순환 참조 방지를 위해 http() 대신 raw fetch + dynamic import 사용
 */
async function refreshAccessTokenRaw(
  refreshToken: string,
): Promise<{ accessToken: string; tokenType: string } | null> {
  // dynamic import로 순환 참조 방지
  const { USERS_API_URL } = await import('../../services/config/http');

  try {
    // API URL 구성 (환경 변수 또는 상수에서 가져옴)
    // http.ts에서 toUrl 로직을 복제하거나 해당 모듈이 export하는 base URL 사용
    const baseUrl = USERS_API_URL || import.meta.env.VITE_API_URL || '/api';
    const finalUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    const res = await fetch(`${finalUrl}/auth/access-token/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Refresh-Token': refreshToken,
      },
    });

    if (!res.ok) {
      console.error('[TokenManager] 토큰 갱신 실패:', res.status);
      if (res.status === 401) {
        console.log('[TokenManager] Refresh Token 만료 → 로그아웃');
        useAuthStore.getState().logout();
      }
      return null;
    }

    const json = await res.json();
    return json.data as { accessToken: string; tokenType: string };
  } catch (error) {
    console.error('[TokenManager] 토큰 갱신 네트워크 오류:', error);
    return null;
  }
}

// ─── TokenManager 클래스 (싱글톤) ─────────────────────────

class TokenManagerService {
  /** AccessToken은 메모리에만 보관 (localStorage에 저장하지 않음) */
  private accessToken: string | null = null;
  // private tokenType: string = 'Bearer'; // 현재 미사용

  // ─── 토큰 getter ─────────────────────────────

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return useAuthStore.getState().refreshToken;
  }

  // ─── 유효한 AccessToken 획득 ─────────────────

  async getValidAccessToken(): Promise<string | null> {
    if (!this.accessToken) {
      return null;
    }

    // 아직 유효하고 만료 임박하지 않은 경우
    if (!isTokenExpiringSoon(this.accessToken)) {
      return this.accessToken;
    }

    const refreshToken = this.getRefreshToken();

    // Refresh Token이 없으면 갱신 불가
    if (!refreshToken) {
      console.warn('[TokenManager] Refresh Token 없음 - 갱신 불가');
      return isTokenExpired(this.accessToken) ? null : this.accessToken;
    }

    // Refresh Token 자체가 만료된 경우 → 로그아웃
    if (isTokenExpired(refreshToken)) {
      console.log('[TokenManager] Refresh Token 만료 → 로그아웃');
      this.logout();
      return null;
    }

    // 뮤텍스: 이미 갱신 중이면 기존 Promise를 재사용
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const result = await refreshAccessTokenRaw(refreshToken);
        if (result) {
          this.accessToken = result.accessToken;
          // this.tokenType = result.tokenType;
          console.log('[TokenManager] Access Token 갱신 완료');
          return result.accessToken;
        }
        return null;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  }

  // ─── 로그인 / 로그아웃 ─────────────────────────

  login(accessToken: string, refreshToken: string, _tokenType: string): void {
    this.accessToken = accessToken;
    // this.tokenType = tokenType;
    useAuthStore.getState().setRefreshToken(refreshToken);
    console.log('[TokenManager] 로그인 - 토큰 저장 완료');
  }

  logout(): void {
    this.accessToken = null;
    // this.tokenType = 'Bearer';
    refreshPromise = null;
    useAuthStore.getState().logout();
    console.log('[TokenManager] 로그아웃 - 토큰 제거 완료');
  }

  // ─── JWT 클레임 접근 ─────────────────────────

  getAccessTokenClaims(): Record<string, unknown> | null {
    if (!this.accessToken) {
      return null;
    }
    return decodeJwtPayload(this.accessToken);
  }

  getClaim<T = unknown>(claimKey: string): T | undefined {
    if (!this.accessToken) {
      return undefined;
    }
    const claims = decodeJwtPayload(this.accessToken);
    return claims[claimKey] as T | undefined;
  }

  getCustomClaims(): Record<string, unknown> | null {
    if (!this.accessToken) {
      return null;
    }
    const standardClaims = new Set([
      'iss',
      'sub',
      'aud',
      'exp',
      'nbf',
      'iat',
      'jti',
    ]);
    const allClaims = decodeJwtPayload(this.accessToken);
    const custom: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(allClaims)) {
      if (!standardClaims.has(key)) {
        custom[key] = value;
      }
    }
    return custom;
  }

  // ─── 상태 확인 ─────────────────────────

  isLoggedIn(): boolean {
    if (this.accessToken && !isTokenExpired(this.accessToken)) {
      return true;
    }
    const refreshToken = this.getRefreshToken();
    return !!refreshToken && !isTokenExpired(refreshToken);
  }
}

export const TokenManager = new TokenManagerService();
