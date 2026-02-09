# Utils

순수 JavaScript/TypeScript 유틸리티 함수들을 관리합니다.

## 규칙

- React 훅 사용 안함 (순수 함수만)
- 어디서든 호출 가능
- 계산, 변환, 포맷, 검증 등의 로직

## 예시

```ts
// utils/formatDate.ts
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// utils/validators.ts
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```
