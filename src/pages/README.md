# Pages

라우팅 단위의 페이지 컴포넌트들을 관리합니다.

## 구조

```
pages/
├── Home/
│   ├── Home.tsx
│   ├── Home.module.css
│   └── index.ts
├── About/
└── NotFound/
```

## 예시

```tsx
// pages/Home/Home.tsx
export const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
```
