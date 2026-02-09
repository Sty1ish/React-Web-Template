import { useState, useEffect } from 'react';

/**
 * 입력 값을 지연시켜 반환하는 커스텀 훅
 * 검색어 입력 등에서 API 호출을 줄이기 위해 사용
 * 
 * @param value - 지연시킬 값
 * @param delay - 지연 시간 (밀리초)
 * @returns 지연된 값
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // API 호출
 *   searchAPI(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};