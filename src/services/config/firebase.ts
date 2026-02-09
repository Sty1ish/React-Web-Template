import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Firebase 설정
// .env 파일에서 환경 변수 사용
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase 설정 확인
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'your_api_key' &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'your_project_id';

// Firebase 초기화 (설정이 완료된 경우에만)
let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
} else {
  console.warn(
    '⚠️ Firebase가 아직 설정되지 않았습니다.\n' +
    '.env.local 파일을 생성하고 Firebase 설정값을 입력해주세요.\n' +
    '자세한 내용은 .env.example 파일을 참조하세요.'
  );
}

// Firebase 서비스 export
export { auth, db, storage, analytics };
export default app;
