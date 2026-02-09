import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/**
 * 500 Server Error 페이지
 * - 서버 오류 발생 시 표시
 */
export const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-300 dark:text-gray-700">
          500
        </h1>
        <h2 className="mb-4 text-3xl font-semibold">서버 오류가 발생했습니다</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
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
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <RefreshCw size={20} />
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
};
