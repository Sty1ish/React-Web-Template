import { auth } from '@/services/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';

const FIREBASE_NOT_CONFIGURED_ERROR = 
  'Firebase가 설정되지 않았습니다. .env.local 파일에 Firebase 설정을 추가해주세요.';

/**
 * Firebase 인증 서비스
 */
export const authService = {
  /**
   * 이메일/비밀번호 로그인
   */
  loginWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    return await signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * 이메일/비밀번호 회원가입
   */
  signupWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  /**
   * Google 로그인
   */
  loginWithGoogle: async (): Promise<UserCredential> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  /**
   * 로그아웃
   */
  logout: async (): Promise<void> => {
    if (!auth) throw new Error(FIREBASE_NOT_CONFIGURED_ERROR);
    await signOut(auth);
  },

  /**
   * 현재 사용자
   */
  getCurrentUser: () => {
    if (!auth) return null;
    return auth.currentUser;
  },
};
