import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  refreshToken: string | null; // AccessToken은 TokenManager가 메모리 관리
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setRefreshToken: (token: string) => void;
}

/**
 * 인증 상태 관리 스토어
 * persist 미들웨어로 localStorage에 자동 저장
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, refreshToken) =>
        set({
          user,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),

      setRefreshToken: (token) => set({ refreshToken: token }),
    }),
    {
      name: 'auth-storage',
      // AccessToken은 저장하지 않음 (메모리 관리)
      partialize: (state) => ({ 
        user: state.user, 
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
