# Components

재사용 가능한 UI 컴포넌트들을 관리합니다.

## 구조

```
components/
├── common/          # 공통 컴포넌트 (Button, Input, Modal 등)
├── layout/          # 레이아웃 컴포넌트 (Header, Footer, Sidebar)
└── [Component]/
    ├── Component.tsx
    ├── Component.module.css
    ├── Component.test.tsx
    └── index.ts
```

## 예시

```tsx
// components/Button/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```
