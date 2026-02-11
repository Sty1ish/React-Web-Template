import { auth } from '@/services/config';
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  type UserCredential,
} from 'firebase/auth';
import { http } from '@/services/config/http';
import { TokenManager } from '@/services/auth/tokenManager';

// 서버의 로그인 응답 타입 (userRequest 참고)
interface ServerLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

const FIREBASE_NOT_CONFIGURED_ERROR = 
  'Firebase가 설정되지 않았습니다. .env.local 파일에 Firebase 설정을 추가해주세요.';

/**
 * 서버에 OAuth 토큰을 보내고 우리 JWT를 발급받는 함수
 */
const syncWithServer = async (provider: string, idToken: string) => {
  const res = await http<ServerLoginResponse>(
    `/auth/login/oauth2/${provider}`,
    'POST',
    {
      auth: 'none',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  const { accessToken, refreshToken, tokenType } = res.data;
  
  // TokenManager에 JWT 저장 (메모리 + Store)
  TokenManager.login(accessToken, refreshToken, tokenType);
  
  return res.data;
};

/**
 * Firebase 인증 서비스
 */
export const authService = {
  // ... 기존 이메일/비밀번호 관련 메서드는 유지하지만
  // TokenManager 연동이 필요할 수 있음. (현재 질문 범위는 OAuth에 집중)

  /**
   * Google 로그인 + 서버 동기화
   * 1. Firebase Google 로그인
   * 2. ID 토큰 획득
   * 3. 서버 API (/auth/login/oauth2/google) 호출
   * 4. 서버 JWT TokenManager에 저장
   */
  loginWithGoogle: async (): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    
    // 1. Firebase 로그인
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 2. ID 토큰 가져오기
    const idToken = await user.getIdToken();

    // 3. 서버에 인증하고 JWT 발급받아 저장
    await syncWithServer('google', idToken);

    return result;
  },

  /**
   * 이메일 로그인
   */
  loginWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);

    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const idToken = await user.getIdToken();
    await syncWithServer('email', idToken);
    
    return result;
  },

  /**
   * 이메일 회원가입
   */
  signupWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);

    const result = await createUserWithEmailAndPassword(auth, email, password);
    // 회원가입 후 자동 로그인 처리 (syncWithServer)
    const user = result.user;
    const idToken = await user.getIdToken();
    await syncWithServer('email', idToken);

    return result;
  },

  /**
   * 로그아웃
   * - Firebase 로그아웃
   * - TokenManager 로그아웃 (서버 토큰 파기)
   */
  logout: async (): Promise<void> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    
    // Firebase 로그아웃
    await signOut(auth);
    
    // 우리 서버 토큰 로그아웃 (메모리+스토리지 클리어)
    TokenManager.logout();
  },

  /**
   * 현재 사용자
   */
  getCurrentUser: () => {
    if (!auth) return null;
    return auth.currentUser;
  },
};
