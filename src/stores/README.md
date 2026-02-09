# Stores

전역 상태 관리를 관리합니다.

## 지원 라이브러리

- Zustand (추천)
- Recoil
- Redux Toolkit
- Jotai

## 예시 (Zustand)

```ts
// stores/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```
