# Routes

라우팅 설정을 관리합니다.

## 예시 (React Router)

```tsx
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/Home';
import { AboutPage } from '@/pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
]);
```
