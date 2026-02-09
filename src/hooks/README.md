# Hooks

여러 컴포넌트에서 재사용되는 커스텀 훅들을 관리합니다.

## 규칙

- React 훅을 사용하는 로직 (useState, useEffect 등)
- 반드시 `use`로 시작하는 이름
- 한 컴포넌트에서만 사용되면 컴포넌트 폴더 안에 위치

## 예시

```tsx
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
```
