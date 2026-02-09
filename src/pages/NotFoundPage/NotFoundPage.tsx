import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/**
 * 404 Not Found 페이지
 * - 존재하지 않는 경로 접근 시 표시
 */
export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-300 dark:text-gray-700">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            <Home size={20} />
            홈으로 가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
};
