import { TokenManager } from '@/services/auth/tokenManager';
import type { ApiResponse } from './types';

// 환경 변수에서 기본 API URL 가져오기
export const USERS_API_URL = import.meta.env.VITE_API_URL || '/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * 인증 모드 (React Native 템플릿과 동일 구조)
 * - 'required': JWT 필수. 토큰이 없으면 에러를 throw.
 * - 'optional': JWT 있으면 포함, 없으면 미포함으로 요청.
 * - 'none'    : JWT를 포함하지 않음 (Public API).
 */
export type AuthMode = 'required' | 'optional' | 'none';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  auth?: AuthMode; // 기본: 'required'
  parseJson?: boolean; // 기본: true
  body?: string | FormData | Record<string, unknown>;
}

const toUrl = (path: string) =>
  path.startsWith('http')
    ? path
    : `${USERS_API_URL}${path.startsWith('/') ? '' : '/'}${path}`;

async function handleResponse<T>(
  res: Response,
  hadToken: boolean,
): Promise<ApiResponse<T>> {
  const text = await res.text();
  let json: ApiResponse<T> | null = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw {
      timestamp: new Date().toISOString(),
      status: res.status,
      path: res.url,
      code: 'NON_JSON_RESPONSE',
      message: text || res.statusText,
    };
  }

  if (!res.ok) {
    const error = json ?? {
      timestamp: new Date().toISOString(),
      status: res.status,
      path: res.url,
      code: 'UNKNOWN_ERROR',
      message: 'Unknown error',
    };

    // 401 에러 + 토큰이 있었던 경우 → 토큰 만료 가능성
    if (res.status === 401 && hadToken) {
      console.log('[http] 401 에러 - 토큰이 더 이상 유효하지 않음');
      TokenManager.logout();
    }

    // 4xx 클라이언트 에러는 재시도해도 소용없으므로 retry 스킵 플래그 (Tanstack Query용)
    if (res.status >= 400 && res.status < 500) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).skipRetry = true;
    }

    throw error;
  }

  return json as ApiResponse<T>;
}

/**
 * 인증 모드에 따라 Authorization 헤더를 설정합니다.
 */
async function resolveAuth(
  authMode: AuthMode,
): Promise<[boolean, string | null]> {
  if (authMode === 'none') {
    return [false, null];
  }

  // getValidAccessToken은 만료 임박(1분 미만) 시 자동 갱신을 시도합니다
  const accessToken = await TokenManager.getValidAccessToken();

  if (!accessToken) {
    if (authMode === 'required') {
      throw {
        timestamp: new Date().toISOString(),
        status: 401,
        path: '',
        code: 'AUTH_REQUIRED',
        message: '인증이 필요한 API입니다. 로그인 후 다시 시도해주세요.',
        skipRetry: true,
      };
    }
    // optional: 토큰 없이 진행
    return [false, null];
  }

  return [true, accessToken];
}

export async function http<T>(
  path: string,
  method: HttpMethod = 'GET',
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const {
    auth = 'required',
    parseJson = true,
    headers,
    body,
    ...rest
  } = options;

  const initHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(body instanceof FormData
      ? {} 
      : { 'Content-Type': 'application/json' }),
    ...((headers as Record<string, string>) || {}),
  };

  // 인증 처리
  const [hadToken, accessToken] = await resolveAuth(auth);
  if (accessToken) {
    initHeaders.Authorization = `Bearer ${accessToken}`;
  }

  // body 직렬화
  let serializedBody: string | FormData | undefined;
  if (body instanceof FormData) {
    serializedBody = body;
  } else if (typeof body === 'object' && body !== null) {
    serializedBody = JSON.stringify(body);
  } else if (typeof body === 'string') {
    serializedBody = body;
  }

  const res = await fetch(toUrl(path), {
    method,
    headers: initHeaders,
    body: serializedBody,
    ...rest,
  });

  return parseJson ? handleResponse<T>(res, hadToken) : (res as unknown as ApiResponse<T>);
}

// 파일 업로드용 (FormData) wrapper
export const httpUpload = async <T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'PATCH',
  formData: FormData,
  options: {
    auth?: AuthMode;
    headers?: Record<string, string>;
  } = {},
): Promise<ApiResponse<T>> => {
  const { auth = 'required', headers = {} } = options;

  const initHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  };

  const [hadToken, accessToken] = await resolveAuth(auth);
  if (accessToken) {
    initHeaders.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(toUrl(endpoint), {
    method,
    headers: initHeaders,
    body: formData,
  });

  return handleResponse<T>(res, hadToken);
};
