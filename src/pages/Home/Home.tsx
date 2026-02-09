import { Button } from '@/components/Button';
import styles from './Home.module.css';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>React Web Template</h1>
        <p className={styles.subtitle}>
          Vite + React + TypeScript 기반의 모던 웹 애플리케이션 템플릿
        </p>
      </header>

      <div className={styles.content}>
        <p>프로젝트 구조가 준비되었습니다. 이제 개발을 시작하세요!</p>
        
        <div className={styles.buttonGroup}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>

        <div className={styles.buttonGroup}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
    </div>
  );
};