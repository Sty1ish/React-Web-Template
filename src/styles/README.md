# Styles

전역 스타일을 관리합니다.

## 구조

```
styles/
├── global.css         # 전역 리셋, 기본 스타일
├── variables.css      # CSS 변수 (색상, 폰트, 간격)
├── typography.css     # 전역 타이포그래피
└── utilities.css      # 유틸리티 클래스
```

## 중요

**컴포넌트/페이지별 스타일은 각자 폴더 안에 위치해야 합니다!**

- ✅ `components/Button/Button.module.css`
- ✅ `pages/Home/Home.module.css`
- ❌ `styles/components/Button.css`

## 예시

```css
/* styles/variables.css */
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
}
```
