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

- **React** 18+ - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **ESLint** - 코드 품질

## 📦 추천 패키지

```bash
# 라우팅
npm install react-router-dom

# 상태 관리
npm install zustand

# API 통신
npm install axios

# 폼 관리
npm install react-hook-form zod

# UI 라이브러리
npm install @radix-ui/react-*

# 유틸리티
npm install clsx tailwind-merge date-fns
```

## 🎨 스타일링 옵션

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
