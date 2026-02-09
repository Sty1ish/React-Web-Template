# Layouts

페이지 공통 레이아웃 컴포넌트들을 관리합니다.

## 구조

```
layouts/
├── index.ts            # Barrel export
├── MainLayout/         # 일반 페이지용 (Header + Footer)
│   ├── MainLayout.tsx
│   └── index.ts
├── AuthLayout/         # 인증 페이지용 (중앙 정렬)
│   ├── AuthLayout.tsx
│   └── index.ts
└── BlankLayout/        # 최소 레이아웃 (에러 페이지용)
    ├── BlankLayout.tsx
    └── index.ts
```

## 레이아웃 종류

### 1. MainLayout

**사용처**: 일반 페이지 (홈, 소개, 문의 등)

**특징**:

- Header (로고, 네비게이션, 사용자 메뉴)
- Main (페이지 내용)
- Footer (회사 정보, 링크, 소셜)

```tsx
// routes/index.tsx
{
  element: <MainLayout />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/about', element: <AboutPage /> }
  ]
}
```

### 2. AuthLayout

**사용처**: 인증 페이지 (로그인, 회원가입)

**특징**:

- Header, Footer 없음
- 중앙 정렬 카드 스타일
- max-w-md 제한

```tsx
{
  element: <AuthLayout />,
  children: [
    { path: '/login', element: <LoginPage /> }
  ]
}
```

### 3. BlankLayout

**사용처**: 에러 페이지, 특수 페이지

**특징**:

- 어떤 장식도 없음
- children만 렌더링

```tsx
{
  element: <BlankLayout />,
  children: [
    { path: '*', element: <NotFoundPage /> }
  ]
}
```

## 에러 페이지 위치

**❌ Layout이 아닙니다**  
에러 페이지(404, 500)는 `src/pages/`에 위치합니다:

- `pages/NotFoundPage/` - 404
- `pages/ErrorPage/` - 500

Layout은 **공통 틀**, 에러 페이지는 **특정 상황의 페이지**입니다.
