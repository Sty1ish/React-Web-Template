# React Web Template

Vite + React + TypeScript 기반의 모던 웹 애플리케이션 템플릿입니다.

## 🚀 시작하기

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── assets/           # 이미지, 폰트, SVG 등 정적 리소스
├── components/       # 재사용 가능한 UI 컴포넌트
├── pages/            # 라우팅 단위 페이지
├── layouts/          # 페이지 공통 레이아웃
├── hooks/            # 커스텀 훅 (useXXX)
├── stores/           # 전역 상태 관리
├── services/         # API 요청 로직
├── utils/            # 유틸리티 함수
├── routes/           # 라우터 설정
├── constants/        # 상수 정의
├── styles/           # 전역 스타일
├── App.tsx           # 루트 컴포넌트
└── main.tsx          # 진입점
```

## 📚 폴더별 설명

각 폴더에는 `README.md`가 포함되어 있습니다. 자세한 사용법은 각 폴더의 README를 참고하세요.

### 핵심 원칙

1. **Colocation (관련된 것끼리 가까이)**
   - 컴포넌트와 스타일은 같은 폴더에
   - 재사용되지 않으면 가까운 곳에 위치

2. **명확한 책임 분리**
   - `hooks/`: React 훅 사용 로직
   - `utils/`: 순수 함수만
   - `services/`: API 통신
   - `stores/`: 전역 상태

3. **확장 가능한 구조**
   - 필요에 따라 폴더 추가 가능
   - 규모에 맞게 조정

## 🛠 기술 스택

### 핵심
- **React** 19+ - UI 라이브러리
- **TypeScript** 5.9+ - 타입 안정성
- **Vite** 8.0+ - 빌드 도구
- **Tailwind CSS** 3+ - 유틸리티 우선 스타일링

### 상태 관리 & 데이터
- **Zustand** - 경량 상태 관리
- **React Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### 라우팅 & 네비게이션
- **React Router** - SPA 라우팅

### 폼 & 유효성 검증
- **React Hook Form** - 고성능 폼
- **Formik** - 폼 관리 대안
- **Zod** - TypeScript 우선 스키마 검증
- **Yup** - 스키마 검증 대안

### UI & 애니메이션
- **Framer Motion** - 애니메이션 라이브러리
- **Lucide React** - 아이콘 라이브러리
- **React Hot Toast** - 알림 토스트
- **Swiper** - 터치 슬라이더/캐러셀
- **@use-gesture/react** - 제스처 핸들링

### 데이터 시각화
- **Recharts** - 차트 라이브러리
- **React Big Calendar** - 캘린더 컴포넌트

### 파일 & 이미지
- **React Dropzone** - 파일 업로드
- **React Image Crop** - 이미지 크롭

### Firebase
- **Firebase** - 인증, 데이터베이스, 스토리지, 분석

### 유틸리티
- **date-fns** - 날짜 유틸리티
- **clsx** - 조건부 클래스명
- **nanoid** - 고유 ID 생성
- **localforage** - 향상된 로컬 스토리지
- **js-cookie** - 쿠키 관리
- **react-use** - 유용한 React 훅 모음

## 📦 설치된 패키지

모든 필수 패키지가 이미 설치되어 있습니다! 추가 설치 없이 바로 개발을 시작할 수 있습니다.

## 🎨 스타일링

**Tailwind CSS**가 기본 설정되어 있습니다:
- CSS Modules과 함께 사용 가능
- 유틸리티 클래스로 빠른 스타일링
- 커스텀 디자인 시스템 (CSS 변수 연동)

## 📝 주요 기능

### 1. 인증 (Firebase)
```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginPage() {
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleLogin = async () => {
    await login('email@example.com', 'password');
  };

  return <button onClick={loginWithGoogle}>Google 로그인</button>;
}
```

### 2. API 요청 (React Query)
```tsx
import { useUser } from '@/hooks/useUser';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### 3. 상태 관리 (Zustand)
```tsx
import { useAuthStore } from '@/stores/authStore';

function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
```

### 4. 폼 관리 (React Hook Form + Zod)
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      <input {...register('password')} type="password" />
      <button type="submit">로그인</button>
    </form>
  );
}
```

### 5. 알림 (React Hot Toast)
```tsx
import toast from 'react-hot-toast';

toast.success('성공!');
toast.error('에러 발생');
toast.loading('로딩 중...');
```

## ⚙️ 환경 설정

1. `.env.example`을 복사해서 `.env.local` 생성
2. Firebase 설정 값 입력
3. API URL 설정

```bash
cp .env.example .env.local
```

## 🔧 VSCode 추천 확장

- **CSS Modules** (기본 설정)
- **Tailwind CSS** - 유틸리티 우선
- **Styled-components** - CSS-in-JS
- **Emotion** - CSS-in-JS

## 📝 코딩 컨벤션

### 파일명
- 컴포넌트: `PascalCase.tsx`
- 훅: `useCamelCase.ts`
- 유틸: `camelCase.ts`
- 스타일: `Component.module.css`

### Import 순서
1. React 및 외부 라이브러리
2. 내부 절대 경로 import
3. 상대 경로 import
4. 스타일 import

```tsx
import { useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

import { formatDate } from './utils';
import styles from './Component.module.css';
```

## 🔧 VSCode 추천 확장

- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- Auto Import

## 📄 라이센스

MIT
