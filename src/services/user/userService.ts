import { apiClient, type ApiResponse } from '@/services/config';
import type { User } from './types';

/**
 * 사용자 관련 API 서비스
 */
export const userService = {
  /**
   * 사용자 정보 조회
   */
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  /**
   * 현재 로그인한 사용자 정보
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data.data;
  },

  /**
   * 사용자 정보 업데이트
   */
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  /**
   * 사용자 삭제
   */
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
