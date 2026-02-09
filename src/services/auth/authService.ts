import { auth } from '@/services/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';

/**
 * Firebase 인증 서비스
 */
export const authService = {
  /**
   * 이메일/비밀번호 로그인
   */
  loginWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * 이메일/비밀번호 회원가입
   */
  signupWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  /**
   * Google 로그인
   */
  loginWithGoogle: async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  /**
   * 로그아웃
   */
  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  /**
   * 현재 사용자
   */
  getCurrentUser: () => {
    return auth.currentUser;
  },
};
