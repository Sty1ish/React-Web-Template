/**
 * 날짜를 한국어 형식으로 포맷팅합니다.
 * @param date - Date 객체 또는 날짜 문자열
 * @param format - 'short' | 'long' | 'numeric'
 * @returns 포맷팅된 날짜 문자열
 * 
 * @example
 * formatDate(new Date(), 'long') // "2026년 2월 9일"
 * formatDate('2026-02-09', 'short') // "2/9/2026"
 */
export const formatDate = (
  date: Date | string,
  format: 'short' | 'long' | 'numeric' = 'long'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'numeric' : format === 'long' ? 'long' : '2-digit',
    day: 'numeric',
  };

  return dateObj.toLocaleDateString('ko-KR', options);
};

/**
 * 두 날짜 사이의 일수 차이를 계산합니다.
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @returns 일수 차이
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};