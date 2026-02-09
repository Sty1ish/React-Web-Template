/**
 * 이메일 유효성을 검증합니다.
 * @param email - 검증할 이메일 주소
 * @returns 유효한 이메일이면 true, 아니면 false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 전화번호 유효성을 검증합니다. (한국 형식)
 * @param phone - 검증할 전화번호
 * @returns 유효한 전화번호면 true, 아니면 false
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * URL 유효성을 검증합니다.
 * @param url - 검증할 URL
 * @returns 유효한 URL이면 true, 아니면 false
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};