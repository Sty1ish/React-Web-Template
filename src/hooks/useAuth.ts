import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/services/config';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

/**
 * Firebase 인증 상태 관리 훅
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, login, logout } = useAuthStore();

  useEffect(() => {
    // Firebase가 설정되지 않은 경우
    if (!auth) {
      setIsLoading(false);
      return;
    }

    // Firebase 인증 상태 변경 리스너
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // 현재 저장된 refresh token 확인
        const currentRefreshToken = useAuthStore.getState().refreshToken || '';
        
        // 로그인 상태
        login({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          avatar: firebaseUser.photoURL || undefined,
        }, currentRefreshToken);
      } else {
        // 로그아웃 상태
        logout();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [login, logout]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await authService.loginWithEmail(email, password);
      toast.success('로그인되었습니다.');
    } catch (error) {
      toast.error('로그인에 실패했습니다.');
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await authService.loginWithGoogle();
      toast.success('로그인되었습니다.');
    } catch (error) {
      toast.error('로그인에 실패했습니다.');
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      toast.success('로그아웃되었습니다.');
    } catch (error) {
      toast.error('로그아웃에 실패했습니다.');
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: handleLogin,
    loginWithGoogle: handleGoogleLogin,
    logout: handleLogout,
  };
};
