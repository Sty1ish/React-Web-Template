# Services

API 요청 및 외부 서비스 통신을 관리합니다.

## 구조

```
services/
├── config/             # 핵심 설정 및 클라이언트 초기화
│   ├── index.ts        # Barrel export
│   ├── api.ts          # Axios 인스턴스 설정
│   ├── firebase.ts     # Firebase 초기화
│   ├── queryClient.ts  # React Query 설정
│   └── types.ts        # 공통 API 타입 (ApiResponse, ApiError 등)
├── auth/               # 인증 관련 서비스
│   ├── index.ts        # Barrel export
│   ├── authService.ts  # Firebase 인증 로직
│   └── types.ts        # 인증 타입 (LoginCredentials, SignupData 등)
└── user/               # 사용자 관련 서비스
    ├── index.ts        # Barrel export
    ├── userService.ts  # 사용자 API 로직
    └── types.ts        # 사용자 타입 (User 등)
```

> **📁 구조 철학**:
>
> - **config/**: 앱 전체에서 사용하는 기반 설정 (axios, Firebase, React Query)
> - **feature/**: 기능별 비즈니스 로직과 타입을 함께 관리하여 확장성 향상

## 사용 예시

### Axios (API 클라이언트)

```ts
import { apiClient } from '@/services/config';

const fetchUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
```

### Firebase Auth

```ts
import { authService } from '@/services/auth';

const login = async (email: string, password: string) => {
  const user = await authService.loginWithEmail(email, password);
  return user;
};
```

### User Service

```ts
import { userService, type User } from '@/services/user';

const updateProfile = async (userId: string, data: Partial<User>) => {
  const updatedUser = await userService.updateUser(userId, data);
  return updatedUser;
};
```

### React Query

```ts
import { queryClient } from '@/services/config';
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
```
