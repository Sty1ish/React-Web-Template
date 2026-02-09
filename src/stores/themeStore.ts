import { create } from 'zustand';

interface Theme {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
}

/**
 * 테마 상태 관리 스토어
 */
export const useThemeStore = create<Theme>((set) => ({
  mode: 'light',

  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),

  setTheme: (mode) => set({ mode }),
}));
