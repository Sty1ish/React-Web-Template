# Services

API 요청 및 외부 서비스 통신을 관리합니다.

## 구조

```
services/
├── api/
│   ├── axiosInstance.ts  # axios 설정
│   └── endpoints.ts       # API 엔드포인트
├── userService.ts
└── authService.ts
```

## 예시

```ts
// services/api/axiosInstance.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// services/userService.ts
import { apiClient } from './api/axiosInstance';

export const userService = {
  getUser: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, data: User) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },
};
```
