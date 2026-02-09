# Layouts

페이지 공통 레이아웃 컴포넌트들을 관리합니다.

## 구조

```
layouts/
├── MainLayout/
│   ├── MainLayout.tsx
│   └── index.ts
└── AuthLayout/
```

## 예시

```tsx
// layouts/MainLayout/MainLayout.tsx
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
```
