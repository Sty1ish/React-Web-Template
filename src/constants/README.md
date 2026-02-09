# Constants

애플리케이션 전체에서 사용되는 상수들을 관리합니다.

## 구조

```
constants/
├── routes.ts         # 라우트 경로 상수
├── api.ts            # API 엔드포인트 상수
├── app.ts            # 앱 전역 상수
└── index.ts          # 통합 export
```

## 예시

### 라우트 경로

```ts
// constants/routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;
```

### API 엔드포인트

```ts
// constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    GET: (id: string) => `/users/${id}`,
    CREATE: '/users',
  },
} as const;
```

### 앱 상수

```ts
// constants/app.ts
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

export const QUERY_KEYS = {
  USER: 'user',
  USERS: 'users',
} as const;
```
